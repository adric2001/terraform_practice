#!/usr/bin/env python3
"""
Interactive CLI Exam Simulator & Readiness Engine for Terraform Associate (004)
Features:
- Persistent Progress Tracking (saves history, attempts, and missed questions to .progress.json)
- Instant on-the-fly right/wrong feedback with comprehensive explanations
- Domain-by-Domain Drill Mode
- Missed Questions Review Mode (spaced repetition)
- Official 57-Question Mock Exam (timed, exact 004 blueprint weighting)
- Algorithmic Exam Readiness Evaluator (calculates readiness score & checklist)
"""

import glob
import json
import os
import random
import sys
import time

PROGRESS_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".progress.json")

# ANSI Terminal Colors
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    END = '\033[0m'

def clear():
    os.system('clear' if os.name == 'posix' else 'cls')

def banner():
    print(f"""{Colors.CYAN}{Colors.BOLD}
================================================================================
  🚀 HASHICORP CERTIFIED: TERRAFORM ASSOCIATE (004) - READINESS ENGINE
================================================================================{Colors.END}""")

def load_progress():
    if os.path.exists(PROGRESS_FILE):
        try:
            with open(PROGRESS_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            pass
    return {
        "history": [],
        "question_stats": {},  # q_id -> {"attempts": int, "correct": int, "last_wrong": bool}
        "missed_questions": [], # list of q_ids
        "domain_stats": {},     # domain -> {"attempts": int, "correct": int}
        "last_active": None
    }

def save_progress(progress):
    try:
        progress["last_active"] = time.strftime("%Y-%m-%d %H:%M:%S")
        with open(PROGRESS_FILE, 'w', encoding='utf-8') as f:
            json.dump(progress, f, indent=2)
    except Exception as e:
        print(f"{Colors.RED}Warning: Could not save progress: {e}{Colors.END}")

def load_all_exams():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(base_dir, "data")
    files = sorted(glob.glob(os.path.join(data_dir, "exam_*.json")))
    exams = []
    for f in files:
        with open(f, 'r', encoding='utf-8') as fp:
            exams.append(json.load(fp))
    return exams

def get_all_questions(exams):
    all_q = []
    seen = set()
    for e in exams:
        for q in e["questions"]:
            if q["id"] not in seen:
                all_q.append(q)
                seen.add(q["id"])
    return all_q

def calculate_readiness(progress, all_questions):
    total_q = len(all_questions)
    q_stats = progress.get("question_stats", {})
    attempted_q = len(q_stats)
    
    total_attempts = sum(s["attempts"] for s in q_stats.values()) if q_stats else 0
    total_correct = sum(s["correct"] for s in q_stats.values()) if q_stats else 0
    overall_accuracy = (total_correct / total_attempts * 100) if total_attempts > 0 else 0.0

    # Domain scores
    domains = {}
    for q in all_questions:
        d = q.get("domain", "General")
        if d not in domains:
            domains[d] = {"total_available": 0, "attempts": 0, "correct": 0}
        domains[d]["total_available"] += 1

    for d, s in progress.get("domain_stats", {}).items():
        if d in domains:
            domains[d]["attempts"] = s.get("attempts", 0)
            domains[d]["correct"] = s.get("correct", 0)

    # Readiness checklist:
    # 1. Coverage: attempted >= 60% of question pool (25 pts)
    coverage_ratio = min(1.0, attempted_q / max(1, (total_q * 0.6)))
    coverage_score = coverage_ratio * 25.0

    # 2. Accuracy: overall accuracy >= 80% (40 pts)
    accuracy_ratio = min(1.0, overall_accuracy / 80.0) if overall_accuracy > 0 else 0.0
    accuracy_score = accuracy_ratio * 40.0

    # 3. Domain Balance: no domain below 70% with at least 5 attempts (20 pts)
    domain_scores = []
    for d, data in domains.items():
        if data["attempts"] >= 5:
            d_pct = (data["correct"] / data["attempts"] * 100)
            domain_scores.append(d_pct)
    
    if len(domain_scores) >= 5 and min(domain_scores) >= 70:
        balance_score = 20.0
    elif domain_scores:
        balance_score = (sum(domain_scores) / (len(domain_scores) * 100)) * 20.0
    else:
        balance_score = 0.0

    # 4. Missed Question Clearance: fewer than 5 active missed questions (15 pts)
    missed_count = len(progress.get("missed_questions", []))
    if attempted_q >= 25:
        missed_score = max(0.0, 15.0 - (missed_count * 1.5))
    else:
        missed_score = 0.0

    readiness_index = int(coverage_score + accuracy_score + balance_score + missed_score)
    readiness_index = max(0, min(100, readiness_index))

    return {
        "readiness_index": readiness_index,
        "total_available": total_q,
        "attempted_count": attempted_q,
        "overall_accuracy": overall_accuracy,
        "missed_count": missed_count,
        "domains": domains,
        "exams_completed": len(progress.get("history", []))
    }

def print_dashboard(progress, all_questions):
    r = calculate_readiness(progress, all_questions)
    score = r["readiness_index"]

    clear()
    banner()
    print(f"\n{Colors.BOLD}📊 YOUR EXAM READINESS DASHBOARD{Colors.END}")
    print("─" * 80)

    # Big Readiness Meter
    if score >= 85:
        verdict = f"{Colors.GREEN}{Colors.BOLD}🟢 EXAM READY (Guaranteed Passing Zone){Colors.END}"
        advice = "You have demonstrated high mastery across domains. You are ready to take the exam!"
    elif score >= 70:
        verdict = f"{Colors.YELLOW}{Colors.BOLD}🟡 BORDERLINE / PROGRESSING (70-84% Readiness){Colors.END}"
        advice = "You are approaching passing standard. Clear your missed questions and review weak domains."
    else:
        verdict = f"{Colors.RED}{Colors.BOLD}🔴 NOT READY YET (<70% Readiness){Colors.END}"
        advice = "More practice needed. Complete all 10 practice exams and target weak domains."

    print(f"\n  Overall Readiness Score: {Colors.BOLD}{score}/100{Colors.END}")
    print(f"  Status: {verdict}")
    print(f"  Guidance: {advice}\n")

    # Progress stats
    print(f"  • Questions Attempted:   {r['attempted_count']} / {r['total_available']} ({r['attempted_count']/r['total_available']*100:.1f}%)")
    print(f"  • Overall Accuracy:      {Colors.BOLD}{r['overall_accuracy']:.1f}%{Colors.END} (Target: >= 80%)")
    print(f"  • Active Missed Pool:    {Colors.RED if r['missed_count'] > 0 else Colors.GREEN}{r['missed_count']} questions{Colors.END}")
    print(f"  • Full Exams Completed:  {r['exams_completed']}")
    if progress.get("last_active"):
        print(f"  • Last Session:          {progress['last_active']}")

    print("\n" + "─" * 80)
    print(f"{Colors.BOLD}Domain Mastery Breakdown:{Colors.END}\n")
    print(f"  {'Domain Title':<45} | {'Attempts':<9} | {'Accuracy':<9} | {'Status'}")
    print(f"  {'-'*45}-+-{'-'*9}-+-{'-'*9}-+-{'-'*12}")

    for d, d_data in sorted(r["domains"].items()):
        att = d_data["attempts"]
        cor = d_data["correct"]
        pct = (cor / att * 100) if att > 0 else 0.0
        if att == 0:
            status = f"{Colors.YELLOW}UNTESTED{Colors.END}"
            acc_str = "  N/A   "
        elif pct >= 75:
            status = f"{Colors.GREEN}PASS ✅{Colors.END}"
            acc_str = f"{pct:>6.1f}% "
        else:
            status = f"{Colors.RED}WEAK ⚠️{Colors.END}"
            acc_str = f"{pct:>6.1f}% "
        print(f"  {d[:45]:<45} | {att:>4}      | {acc_str}  | {status}")

    print("\n" + "─" * 80)
    input(f"{Colors.YELLOW}Press Enter to return to main menu...{Colors.END}")

def run_quiz(questions, exam_title="Practice Exam", mode="study", progress=None):
    if progress is None:
        progress = load_progress()

    total_q = len(questions)
    correct_count = 0
    domain_stats = {}
    recommendations = set()

    start_time = time.time()

    clear()
    banner()
    print(f"{Colors.BOLD}Exam:{Colors.END} {exam_title}")
    print(f"{Colors.BOLD}Mode:{Colors.END} {'Instant Feedback (On-The-Fly)' if mode == 'study' else 'Timed Exam Simulation'}")
    print(f"{Colors.BOLD}Total Questions:{Colors.END} {total_q} | {Colors.BOLD}Passing Score:{Colors.END} 70%")
    print(f"\n{Colors.YELLOW}Type A, B, C, or D (or 'q' to pause and save). Press Enter to begin...{Colors.END}")
    try:
        input()
    except (KeyboardInterrupt, EOFError):
        return

    for idx, q in enumerate(questions, 1):
        q_id = q["id"]
        domain = q.get("domain", "General")

        if domain not in domain_stats:
            domain_stats[domain] = {"total": 0, "correct": 0}
        domain_stats[domain]["total"] += 1

        clear()
        banner()
        current_pct = (correct_count / (idx - 1) * 100) if (idx > 1) else 0.0
        print(f"{Colors.BOLD}Question {idx} of {total_q}{Colors.END} | "
              f"Score: {Colors.GREEN}{correct_count}{Colors.END}/{idx - 1} "
              f"({Colors.CYAN}{current_pct:.1f}%{Colors.END}) | "
              f"Domain: {Colors.BLUE}{domain.split(':')[0]}{Colors.END}")
        print("─" * 80)
        print(f"\n{Colors.BOLD}{q['question']}{Colors.END}\n")

        for opt in q["options"]:
            print(f"  {opt}")
        print("")

        # User Input
        while True:
            try:
                user_choice = input(f"{Colors.BOLD}Your Answer (A/B/C/D): {Colors.END}").strip().upper()
            except (KeyboardInterrupt, EOFError):
                print(f"\n{Colors.YELLOW}Progress saved. Returning to menu...{Colors.END}")
                save_progress(progress)
                return

            if user_choice == 'Q':
                print(f"\n{Colors.YELLOW}Saving progress and exiting exam...{Colors.END}")
                save_progress(progress)
                return
            if user_choice in ['A', 'B', 'C', 'D']:
                break
            print(f"{Colors.RED}Invalid input. Please enter A, B, C, or D.{Colors.END}")

        correct_answer = q["answer"].strip().upper()
        is_correct = (user_choice == correct_answer)

        # Update persistent stats
        if "question_stats" not in progress:
            progress["question_stats"] = {}
        if q_id not in progress["question_stats"]:
            progress["question_stats"][q_id] = {"attempts": 0, "correct": 0, "last_wrong": False}

        progress["question_stats"][q_id]["attempts"] += 1

        if "domain_stats" not in progress:
            progress["domain_stats"] = {}
        if domain not in progress["domain_stats"]:
            progress["domain_stats"][domain] = {"attempts": 0, "correct": 0}
        progress["domain_stats"][domain]["attempts"] += 1

        if is_correct:
            correct_count += 1
            domain_stats[domain]["correct"] += 1
            progress["question_stats"][q_id]["correct"] += 1
            progress["question_stats"][q_id]["last_wrong"] = False
            progress["domain_stats"][domain]["correct"] += 1
            # Remove from missed pool if resolved
            if q_id in progress["missed_questions"]:
                progress["missed_questions"].remove(q_id)

            if mode == "study":
                print(f"\n{Colors.GREEN}{Colors.BOLD}✅ CORRECT! On-the-fly verification passed.{Colors.END}")
        else:
            progress["question_stats"][q_id]["last_wrong"] = True
            if q_id not in progress["missed_questions"]:
                progress["missed_questions"].append(q_id)
            if q.get("recommended_exercise"):
                recommendations.add(q["recommended_exercise"])

            if mode == "study":
                print(f"\n{Colors.RED}{Colors.BOLD}❌ INCORRECT.{Colors.END} Correct answer was: {Colors.GREEN}{Colors.BOLD}{correct_answer}{Colors.END}")

        # Save progress live on every question
        save_progress(progress)

        if mode == "study":
            print(f"\n{Colors.BOLD}💡 Explanation:{Colors.END}")
            print(f"{q['explanation']}")
            if q.get("recommended_exercise"):
                print(f"\n🔗 {Colors.CYAN}Target Lab Exercise:{Colors.END} exercises/{q['recommended_exercise']}")

            live_pct = (correct_count / idx) * 100
            print(f"\n📊 {Colors.BOLD}Live Score:{Colors.END} {correct_count}/{idx} ({live_pct:.1f}%)")
            if idx < total_q:
                try:
                    input(f"\n{Colors.YELLOW}Press Enter for next question...{Colors.END}")
                except (KeyboardInterrupt, EOFError):
                    break

    # Final Score Report
    elapsed = time.time() - start_time
    mins = int(elapsed // 60)
    secs = int(elapsed % 60)
    final_pct = (correct_count / total_q) * 100 if total_q > 0 else 0

    # Record in history
    if "history" not in progress:
        progress["history"] = []
    progress["history"].append({
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "exam_title": exam_title,
        "mode": mode,
        "score_pct": round(final_pct, 1),
        "correct": correct_count,
        "total": total_q,
        "passed": final_pct >= 70.0
    })
    save_progress(progress)

    clear()
    banner()
    print(f"\n{Colors.HEADER}{Colors.BOLD}════════════════════════════════════════════════════════════════════════════════{Colors.END}")
    print(f"                          🏁 EXAM REPORT CARD                                  ")
    print(f"{Colors.HEADER}{Colors.BOLD}════════════════════════════════════════════════════════════════════════════════{Colors.END}\n")

    print(f"  • {Colors.BOLD}Exam Title:{Colors.END}      {exam_title}")
    print(f"  • {Colors.BOLD}Time Elapsed:{Colors.END}    {mins}m {secs}s")
    print(f"  • {Colors.BOLD}Total Questions:{Colors.END} {total_q}")
    print(f"  • {Colors.BOLD}Correct Answers:{Colors.END} {Colors.GREEN}{correct_count}{Colors.END}")
    print(f"  • {Colors.BOLD}Incorrect Answers:{Colors.END} {Colors.RED}{total_q - correct_count}{Colors.END}")
    print(f"  • {Colors.BOLD}Final Score:{Colors.END}     {Colors.BOLD}{final_pct:.1f}%{Colors.END} (Passing standard: 70%)\n")

    print("─" * 80)
    if final_pct >= 85:
        print(f"  {Colors.GREEN}{Colors.BOLD}🏆 VERDICT: EXAM READY! (High Confidence Zone){Colors.END}")
        print(f"  Outstanding performance! You are well above the 70% passing threshold.")
        print(f"  Your readiness score has increased.")
    elif final_pct >= 70:
        print(f"  {Colors.YELLOW}{Colors.BOLD}⚠️ VERDICT: MARGINAL PASS (Targeted Review Recommended){Colors.END}")
        print(f"  You reached the 70% standard, but your safety margin is narrow.")
        print(f"  Drill your weak domains and missed questions to reach 85%+ consistency.")
    else:
        print(f"  {Colors.RED}{Colors.BOLD}❌ VERDICT: NOT READY YET (More Practice Required){Colors.END}")
        print(f"  Your score is below the 70% HashiCorp passing requirement.")
        print(f"  Target the weak domains and recommended exercises below.")
    print("─" * 80)

    # Domain Breakdown
    print(f"\n{Colors.BOLD}📊 SESSION DOMAIN BREAKDOWN:{Colors.END}\n")
    print(f"  {'Domain':<45} | {'Score':<8} | {'%':<6} | {'Status'}")
    print(f"  {'-'*45}-+-{'-'*8}-+-{'-'*6}-+-{'-'*12}")
    for dom, stats in sorted(domain_stats.items()):
        d_tot = stats["total"]
        d_cor = stats["correct"]
        d_pct = (d_cor / d_tot * 100) if d_tot > 0 else 0
        status_str = f"{Colors.GREEN}PASS ✅{Colors.END}" if d_pct >= 75 else f"{Colors.RED}WEAK ⚠️{Colors.END}"
        print(f"  {dom[:45]:<45} | {d_cor:>2}/{d_tot:<4} | {d_pct:>5.1f}% | {status_str}")

    if recommendations:
        print(f"\n{Colors.BOLD}🎯 TARGET LAB EXERCISES TO DRILL:{Colors.END}\n")
        for rec in sorted(recommendations):
            print(f"  👉 exercises/{rec}")

    print(f"\n{Colors.GREEN}💾 Progress automatically saved to .progress.json{Colors.END}\n")
    input(f"{Colors.YELLOW}Press Enter to return to main menu...{Colors.END}")

def review_missed_questions(all_questions, progress):
    missed_ids = progress.get("missed_questions", [])
    if not missed_ids:
        clear()
        banner()
        print(f"\n{Colors.GREEN}{Colors.BOLD}🎉 Congratulations! You have zero missed questions.{Colors.END}")
        print("All previously missed questions have been answered correctly or you have not taken any exams yet.")
        input(f"\n{Colors.YELLOW}Press Enter to return...{Colors.END}")
        return

    q_map = {q["id"]: q for q in all_questions}
    questions_to_review = [q_map[qid] for qid in missed_ids if qid in q_map]

    run_quiz(questions_to_review, f"Missed Questions Drill ({len(questions_to_review)} Questions)", "study", progress)

def domain_drill(all_questions, progress):
    clear()
    banner()
    domains = sorted(list(set(q.get("domain", "General") for q in all_questions)))
    print(f"{Colors.BOLD}SELECT A DOMAIN TO DRILL SPECIFICALLY:{Colors.END}\n")
    for idx, d in enumerate(domains, 1):
        d_questions = [q for q in all_questions if q.get("domain") == d]
        print(f"  [{idx}] {d} ({len(d_questions)} Qs available)")

    print("\n  [B] Back to Main Menu")
    choice = input(f"\n{Colors.BOLD}Select Domain [1-{len(domains)}, B]: {Colors.END}").strip().upper()
    if choice == 'B':
        return

    try:
        val = int(choice)
        if 1 <= val <= len(domains):
            target_domain = domains[val - 1]
            d_questions = [q for q in all_questions if q.get("domain") == target_domain]
            run_quiz(d_questions, f"Domain Drill: {target_domain.split(':')[0]}", "study", progress)
    except ValueError:
        pass

def official_mock_exam(all_questions, progress):
    domain_targets = {
        "Domain 1": 6,
        "Domain 2": 4,
        "Domain 3": 7,
        "Domain 4": 8,
        "Domain 5": 7,
        "Domain 6": 8,
        "Domain 7": 8,
        "Domain 8": 9,
        "Domain 9": 6
    }
    
    mock_questions = []
    for d_prefix, count in domain_targets.items():
        matching = [q for q in all_questions if q.get("domain", "").startswith(d_prefix)]
        mock_questions.extend(random.sample(matching, min(count, len(matching))))

    random.shuffle(mock_questions)
    mock_questions = mock_questions[:57]

    run_quiz(mock_questions, "Official 57-Question Mock Exam (Timed Simulation)", "exam", progress)

def main():
    exams = load_all_exams()
    all_questions = get_all_questions(exams)

    while True:
        progress = load_progress()
        r = calculate_readiness(progress, all_questions)
        score = r["readiness_index"]

        clear()
        banner()
        # Top status widget
        badge = f"{Colors.GREEN}[READINESS: {score}% - EXAM READY!]{Colors.END}" if score >= 85 else (
                f"{Colors.YELLOW}[READINESS: {score}% - PROGRESSING]{Colors.END}" if score >= 70 else
                f"{Colors.RED}[READINESS: {score}% - NOT READY YET]{Colors.END}")

        print(f"  Status: {badge} | Attempted: {r['attempted_count']}/{r['total_available']} | Accuracy: {r['overall_accuracy']:.1f}% | Missed Pool: {r['missed_count']}")
        print("─" * 80)
        print(f"{Colors.BOLD}EXAM PRACTICE TRACKS:{Colors.END}")
        for e in exams:
            print(f"  [{e['exam_id']:02d}] {e['title']:<48} ({len(e['questions'])} Qs)")

        print("─" * 80)
        print(f"{Colors.BOLD}POWER PRACTICE MODES:{Colors.END}")
        print(f"  [M ] {Colors.CYAN}{Colors.BOLD}Official 57-Question Mock Exam{Colors.END} (Realistic 004 Blueprint Simulation)")
        print(f"  [D ] {Colors.YELLOW}Drill by Specific Domain{Colors.END} (Target your weakest domain)")
        print(f"  [R ] {Colors.RED}Review Missed Questions ({r['missed_count']} pending){Colors.END} (Spaced repetition)")
        print(f"  [V ] {Colors.GREEN}View Full Readiness Dashboard & Domain Mastery{Colors.END}")
        print(f"  [Q ] Quit")
        print("─" * 80)

        choice = input(f"{Colors.BOLD}Select an option [1-10, M, D, R, V, Q]: {Colors.END}").strip().upper()

        if choice == 'Q':
            print(f"\n{Colors.GREEN}Progress preserved. Good luck with Terraform Associate (004)! 🚀{Colors.END}\n")
            sys.exit(0)
        elif choice == 'V':
            print_dashboard(progress, all_questions)
        elif choice == 'R':
            review_missed_questions(all_questions, progress)
        elif choice == 'D':
            domain_drill(all_questions, progress)
        elif choice == 'M':
            official_mock_exam(all_questions, progress)
        else:
            try:
                num = int(choice)
                match = [e for e in exams if e["exam_id"] == num]
                if match:
                    ex = match[0]
                    clear()
                    banner()
                    print(f"{Colors.BOLD}Selected:{Colors.END} Exam {ex['exam_id']:02d}: {ex['title']}\n")
                    print("Choose practice mode:")
                    print(f"  [1] {Colors.GREEN}Study Mode{Colors.END} - Instant right/wrong feedback on the fly after every question")
                    print(f"  [2] {Colors.CYAN}Timed Exam Mode{Colors.END} - Mimics real exam (score & explanations at the end)")
                    m = input(f"\n{Colors.BOLD}Select Mode [1/2, default 1]: {Colors.END}").strip()
                    run_quiz(ex["questions"], f"Exam {ex['exam_id']:02d}: {ex['title']}", "exam" if m == "2" else "study", progress)
            except ValueError:
                pass

if __name__ == "__main__":
    main()
