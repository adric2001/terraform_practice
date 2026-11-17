"""
AWS Lambda Handler for Terraform Associate (004) Practice & Readiness Portal
Provides REST API endpoints for:
- User Profile & Cloud Progress Sync (/api/profile)
- Exam Session Recording & Question-Level Tracking (/api/sessions)
- Automated Weak-Area Detection & Lab Mapping (/api/weak-areas)
- Dynamic Custom Exam Generation (/api/exams/custom)
"""

import json
import os
import glob
import time
import uuid
import random
from decimal import Decimal
import boto3
from boto3.dynamodb.conditions import Key

# Environment Variables
AWS_REGION = os.environ.get("AWS_REGION", "us-east-1")
SESSIONS_TABLE_NAME = os.environ.get("SESSIONS_TABLE", "tf_practice_user_sessions")
QUESTIONS_TABLE_NAME = os.environ.get("QUESTIONS_TABLE", "tf_practice_user_questions")

dynamodb = boto3.resource("dynamodb", region_name=AWS_REGION)
sessions_table = dynamodb.Table(SESSIONS_TABLE_NAME)
questions_table = dynamodb.Table(QUESTIONS_TABLE_NAME)

# Domain to Recommended Lab Exercise Mapping
DOMAIN_LAB_MAP = {
    "Domain 1: Understand Infrastructure as Code (IaC) Concepts": [
        {"id": "01-first-resource", "title": "First Resource & Basic Workflow"},
        {"id": "02-local-exec-provisioner", "title": "Provisioners & Local-Exec"}
    ],
    "Domain 2: Understand Terraform's Purpose": [
        {"id": "01-first-resource", "title": "First Resource & State Management"},
        {"id": "06-state-basics", "title": "State Architecture & Inspection"}
    ],
    "Domain 3: Understand Terraform Basics": [
        {"id": "01-first-resource", "title": "Provider Configurations & Plugin Locks"},
        {"id": "02-local-exec-provisioner", "title": "Local Provisioners & CLI Basics"},
        {"id": "06-state-basics", "title": "Inspecting State with CLI"}
    ],
    "Domain 4: Use Terraform Outside the Core Workflow": [
        {"id": "11-lifecycle-rules", "title": "Lifecycle Rules & Prevent Destroy"},
        {"id": "12-sensitive-data", "title": "Protecting Sensitive Variables & State Hygiene"},
        {"id": "13-remote-state-locking", "title": "S3 Backend & DynamoDB Distributed Locking"},
        {"id": "14-workspaces", "title": "CLI Workspaces Isolation"}
    ],
    "Domain 5: Interact with Terraform Modules": [
        {"id": "08-simple-module", "title": "Custom Child Modules Design"},
        {"id": "09-module-sources", "title": "Registry, Git & Local Module Sources"},
        {"id": "16-custom-module-testing", "title": "Native Terraform Module Testing"}
    ],
    "Domain 6: Use the Core Terraform Workflow": [
        {"id": "01-first-resource", "title": "Init, Validate, Plan, Apply Cycle"},
        {"id": "04-input-validations", "title": "Input Variable Custom Validation"},
        {"id": "05-outputs-and-dependencies", "title": "Explicit vs Implicit Dependencies"}
    ],
    "Domain 7: Implement and Maintain State": [
        {"id": "06-state-basics", "title": "State List, Show, and Local State"},
        {"id": "13-remote-state-locking", "title": "Remote S3 State & State Locking"},
        {"id": "17-moved-blocks", "title": "Refactoring State with Declarative Moved Blocks"},
        {"id": "18-declarative-import", "title": "Declarative Import Blocks & Config Generation"}
    ],
    "Domain 8: Read, Generate, and Modify Configuration": [
        {"id": "03-variables-and-outputs", "title": "Variables Precedence & Output Values"},
        {"id": "07-builtin-functions", "title": "Built-in Functions (lookup, merge, flatten)"},
        {"id": "10-dynamic-blocks", "title": "Dynamic Blocks & Splat Expressions"},
        {"id": "15-complex-data-structures", "title": "Maps, Lists, and Advanced Projections"},
        {"id": "19-continuous-validation", "title": "Continuous Validation Check Blocks & Asserts"}
    ],
    "Domain 9: Understand Terraform Cloud/Enterprise Capabilities": [
        {"id": "13-remote-state-locking", "title": "Remote Backend Workspaces"},
        {"id": "20-zero-downtime-deployment", "title": "Blue/Green Zero-Downtime Deployments"},
        {"id": "21-capstone-production-system", "title": "Production Multi-Tier Infrastructure Capstone"}
    ]
}

# Cache for bundled questions
_QUESTIONS_CACHE = None

def load_all_bundled_questions():
    global _QUESTIONS_CACHE
    if _QUESTIONS_CACHE is not None:
        return _QUESTIONS_CACHE
    
    questions = []
    seen = set()
    data_dir = os.path.join(os.path.dirname(__file__), "data")
    if not os.path.exists(data_dir):
        # Fallback to current working directory data
        data_dir = os.path.join(os.path.dirname(__file__), "..", "exams", "data")
    
    files = sorted(glob.glob(os.path.join(data_dir, "exam_*.json")))
    for f in files:
        try:
            with open(f, "r", encoding="utf-8") as fp:
                exam_obj = json.load(fp)
                for q in exam_obj.get("questions", []):
                    if q["id"] not in seen:
                        questions.append(q)
                        seen.add(q["id"])
        except Exception as e:
            print(f"Error loading exam file {f}: {e}")
            
    _QUESTIONS_CACHE = questions
    return questions

def decimal_serializer(obj):
    if isinstance(obj, Decimal):
        return int(obj) if obj % 1 == 0 else float(obj)
    raise TypeError

def api_response(status_code, body):
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
        },
        "body": json.dumps(body, default=decimal_serializer)
    }

def extract_user_id(event):
    """Extract authenticated user ID from Cognito JWT authorizer claims."""
    try:
        claims = event.get("requestContext", {}).get("authorizer", {}).get("jwt", {}).get("claims", {})
        user_id = claims.get("sub") or claims.get("username") or claims.get("email")
        if user_id:
            return user_id
    except Exception:
        pass
    
    # Fallback for dev / unauthenticated testing if header provided
    headers = event.get("headers", {}) or {}
    dev_user = headers.get("x-user-id") or headers.get("X-User-Id")
    if dev_user:
        return dev_user
        
    return "anonymous_guest"

def handle_get_profile(user_id):
    """Retrieve user statistics, attempts, accuracy, and overall readiness score."""
    # Query question history for user
    q_resp = questions_table.query(
        KeyConditionExpression=Key("user_id").eq(user_id)
    )
    user_questions = q_resp.get("Items", [])
    
    total_attempted = len(user_questions)
    total_attempts_count = sum(int(item.get("attempts", 0)) for item in user_questions)
    total_correct_count = sum(int(item.get("correct_count", 0)) for item in user_questions)
    overall_accuracy = round((total_correct_count / total_attempts_count * 100), 1) if total_attempts_count > 0 else 0.0
    
    # Domain breakdown
    domain_stats = {}
    for item in user_questions:
        d = item.get("domain", "General")
        if d not in domain_stats:
            domain_stats[d] = {"attempts": 0, "correct": 0, "total_questions": 0}
        domain_stats[d]["attempts"] += int(item.get("attempts", 0))
        domain_stats[d]["correct"] += int(item.get("correct_count", 0))
        domain_stats[d]["total_questions"] += 1

    domain_summary = []
    for d, stats in domain_stats.items():
        acc = round((stats["correct"] / stats["attempts"] * 100), 1) if stats["attempts"] > 0 else 0.0
        domain_summary.append({
            "domain": d,
            "questions_done": stats["total_questions"],
            "accuracy": acc,
            "status": "PASS" if acc >= 70.0 else "REVIEW"
        })

    # Query recent sessions
    s_resp = sessions_table.query(
        KeyConditionExpression=Key("user_id").eq(user_id),
        ScanIndexForward=False,
        Limit=10
    )
    recent_sessions = s_resp.get("Items", [])
    
    # Calculate composite readiness score (0 - 100)
    all_questions = load_all_bundled_questions()
    total_available_q = len(all_questions) if all_questions else 250
    coverage_pct = (total_attempted / total_available_q) * 100
    
    readiness_score = int(min(100, round((0.25 * coverage_pct) + (0.50 * overall_accuracy) + (0.25 * (100 if overall_accuracy >= 75 else overall_accuracy)))))
    
    verdict = "EXAM READY" if readiness_score >= 85 and overall_accuracy >= 80 else ("MARGINAL PASS" if readiness_score >= 70 else "NOT READY")

    completed_labs = [s["lab_id"] for s in recent_sessions if s.get("type") == "lab_completion" and "lab_id" in s]

    return api_response(200, {
        "user_id": user_id,
        "total_available_questions": total_available_q,
        "questions_attempted": total_attempted,
        "coverage_percentage": round(coverage_pct, 1),
        "overall_accuracy": overall_accuracy,
        "readiness_score": readiness_score,
        "verdict": verdict,
        "completed_labs": completed_labs,
        "domain_summary": domain_summary,
        "recent_sessions": recent_sessions
    })

def handle_post_session(user_id, body):
    """Record completed exam session and update question-level history in DynamoDB."""
    session_id = f"sess_{int(time.time())}_{uuid.uuid4().hex[:6]}"
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime())
    
    exam_id = body.get("exam_id", "unknown")
    title = body.get("title", "Practice Exam")
    score_percentage = Decimal(str(body.get("score_percentage", 0)))
    total_q = len(body.get("answers", []))
    correct_q = sum(1 for a in body.get("answers", []) if a.get("is_correct"))
    domain_breakdown = body.get("domain_breakdown", {})
    
    # 1. Save session record
    session_item = {
        "user_id": user_id,
        "session_id": session_id,
        "exam_id": str(exam_id),
        "title": title,
        "score_percentage": score_percentage,
        "total_questions": total_q,
        "correct_questions": correct_q,
        "domain_breakdown": domain_breakdown,
        "created_at": timestamp
    }
    sessions_table.put_item(Item=session_item)
    
    # 2. Update individual question stats
    for ans in body.get("answers", []):
        qid = ans.get("question_id")
        if not qid:
            continue
        is_corr = bool(ans.get("is_correct", False))
        domain = ans.get("domain", "General")
        
        try:
            questions_table.update_item(
                Key={"user_id": user_id, "question_id": qid},
                UpdateExpression="SET domain = :d, last_result = :r, last_answered = :t ADD attempts :one, correct_count :c",
                ExpressionAttributeValues={
                    ":d": domain,
                    ":r": "CORRECT" if is_corr else "INCORRECT",
                    ":t": timestamp,
                    ":one": 1,
                    ":c": 1 if is_corr else 0
                }
            )
        except Exception as e:
            print(f"Error updating question {qid}: {e}")

    return api_response(200, {
        "message": "Session recorded successfully",
        "session_id": session_id,
        "score_percentage": float(score_percentage),
        "correct_questions": correct_q,
        "total_questions": total_q
    })

def handle_get_weak_areas(user_id):
    """Identify domains where user accuracy is < 70% and link recommended exercises."""
    q_resp = questions_table.query(
        KeyConditionExpression=Key("user_id").eq(user_id)
    )
    user_questions = q_resp.get("Items", [])
    
    domain_stats = {}
    missed_question_ids = []
    
    for item in user_questions:
        d = item.get("domain", "General")
        if d not in domain_stats:
            domain_stats[d] = {"attempts": 0, "correct": 0, "missed": 0}
        attempts = int(item.get("attempts", 0))
        correct = int(item.get("correct_count", 0))
        domain_stats[d]["attempts"] += attempts
        domain_stats[d]["correct"] += correct
        if item.get("last_result") == "INCORRECT":
            domain_stats[d]["missed"] += 1
            missed_question_ids.append(item.get("question_id"))

    weak_domains = []
    strong_domains = []
    
    for d, stats in domain_stats.items():
        acc = round((stats["correct"] / stats["attempts"] * 100), 1) if stats["attempts"] > 0 else 0.0
        domain_info = {
            "domain": d,
            "accuracy": acc,
            "attempts": stats["attempts"],
            "correct": stats["correct"],
            "missed_active": stats["missed"],
            "recommended_labs": DOMAIN_LAB_MAP.get(d, [])
        }
        if acc < 70.0:
            weak_domains.append(domain_info)
        else:
            strong_domains.append(domain_info)

    # Sort weak domains by lowest accuracy first
    weak_domains.sort(key=lambda x: x["accuracy"])

    return api_response(200, {
        "user_id": user_id,
        "has_weak_areas": len(weak_domains) > 0,
        "weak_domains": weak_domains,
        "strong_domains": strong_domains,
        "missed_questions_count": len(missed_question_ids),
        "missed_question_ids": missed_question_ids
    })

def handle_post_custom_exam(user_id, body):
    """Dynamically generate a custom exam focused on weak domains, missed questions, or custom selection."""
    mode = body.get("mode", "weak_domains") # 'weak_domains', 'missed_questions', 'domain_select'
    count = int(body.get("count", 15))
    target_domains = body.get("domains", [])
    
    all_questions = load_all_bundled_questions()
    selected_questions = []
    
    if mode == "weak_domains":
        # Get user weak domains
        q_resp = questions_table.query(KeyConditionExpression=Key("user_id").eq(user_id))
        user_questions = q_resp.get("Items", [])
        
        domain_correct = {}
        domain_attempts = {}
        for item in user_questions:
            d = item.get("domain", "")
            domain_attempts[d] = domain_attempts.get(d, 0) + int(item.get("attempts", 0))
            domain_correct[d] = domain_correct.get(d, 0) + int(item.get("correct_count", 0))
            
        weak_set = set()
        for d, att in domain_attempts.items():
            if (domain_correct.get(d, 0) / att) < 0.70:
                weak_set.add(d)
                
        # If no weak domains yet (e.g. brand new user), default to Domain 4 and Domain 8
        if not weak_set:
            weak_set = {
                "Domain 4: Use Terraform Outside the Core Workflow",
                "Domain 8: Read, Generate, and Modify Configuration"
            }
            
        candidate_pool = [q for q in all_questions if q.get("domain") in weak_set]
        random.shuffle(candidate_pool)
        selected_questions = candidate_pool[:min(count, len(candidate_pool))]
        title = f"Custom Weak-Area Drill ({len(selected_questions)} Questions)"
        
    elif mode == "missed_questions":
        q_resp = questions_table.query(KeyConditionExpression=Key("user_id").eq(user_id))
        missed_ids = {item["question_id"] for item in q_resp.get("Items", []) if item.get("last_result") == "INCORRECT"}
        candidate_pool = [q for q in all_questions if q["id"] in missed_ids]
        random.shuffle(candidate_pool)
        selected_questions = candidate_pool[:min(count, len(candidate_pool))]
        title = f"Missed Questions Spaced Repetition ({len(selected_questions)} Questions)"
        
    elif mode == "domain_select":
        target_set = set(target_domains)
        candidate_pool = [q for q in all_questions if q.get("domain") in target_set]
        random.shuffle(candidate_pool)
        selected_questions = candidate_pool[:min(count, len(candidate_pool))]
        title = f"Custom Domain Drill ({len(selected_questions)} Questions)"
        
    else:
        # Fallback: random selection
        candidate_pool = list(all_questions)
        random.shuffle(candidate_pool)
        selected_questions = candidate_pool[:min(count, len(candidate_pool))]
        title = f"Custom Practice Exam ({len(selected_questions)} Questions)"

    return api_response(200, {
        "exam_id": f"custom_{int(time.time())}",
        "title": title,
        "mode": mode,
        "total_questions": len(selected_questions),
        "passing_percentage": 70,
        "time_limit_minutes": max(15, len(selected_questions) * 2),
        "questions": selected_questions
    })

def handle_post_lab_complete(user_id, body):
    """Record completed hands-on exercise for user."""
    lab_id = body.get("lab_id", "unknown")
    title = body.get("title", lab_id)
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime())
    
    item = {
        "user_id": user_id,
        "session_id": f"lab_{lab_id}",
        "type": "lab_completion",
        "lab_id": lab_id,
        "title": title,
        "created_at": timestamp
    }
    sessions_table.put_item(Item=item)
    return api_response(200, {"message": f"Lab {lab_id} marked as completed", "lab_id": lab_id})

def lambda_handler(event, context):
    """Main API Gateway HTTP API v2 Router."""
    http_method = event.get("requestContext", {}).get("http", {}).get("method", "GET")
    raw_path = event.get("rawPath", "")
    
    # Handle CORS preflight
    if http_method == "OPTIONS":
        return api_response(200, {"message": "CORS OK"})
        
    user_id = extract_user_id(event)
    
    # Parse JSON body if present
    body = {}
    if event.get("body"):
        try:
            body = json.loads(event["body"])
        except Exception:
            pass

    # Routing
    if raw_path.endswith("/api/profile") and http_method == "GET":
        return handle_get_profile(user_id)
        
    elif raw_path.endswith("/api/sessions") and http_method == "POST":
        return handle_post_session(user_id, body)
        
    elif raw_path.endswith("/api/labs/complete") and http_method == "POST":
        return handle_post_lab_complete(user_id, body)
        
    elif raw_path.endswith("/api/weak-areas") and http_method == "GET":
        return handle_get_weak_areas(user_id)
        
    elif raw_path.endswith("/api/exams/custom") and http_method == "POST":
        return handle_post_custom_exam(user_id, body)
        
    elif raw_path.endswith("/api/health"):
        return api_response(200, {"status": "healthy", "user_id": user_id, "time": time.time()})
        
    return api_response(404, {"error": "Not Found", "path": raw_path, "method": http_method})
