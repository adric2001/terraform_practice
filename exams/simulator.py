#!/usr/bin/env python3
"""
Interactive CLI Exam Simulator for HashiCorp Certified: Terraform Associate (004)
Features:
- Instant on-the-fly right/wrong feedback with comprehensive explanations
- Live score calculation
- Final score report & Exam Readiness evaluation (Ready vs Not Ready)
- Domain-by-domain diagnostic breakdown
- Actionable exercise recommendations
"""

import glob
import json
import os
import random
import sys
import time

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
  🚀 HASHICORP CERTIFIED: TERRAFORM ASSOCIATE (004) - EXAM SIMULATOR
================================================================================{Colors.END}""")

def load_exam(exam_path):
    with open(exam_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def list_exams(data_dir):
    files = sorted(glob.glob(os.path.join(data_dir, "exam_*.json")))
    exams = []
    for f in files:
        data = load_exam(f)
        exams.append({
            "path": f,
            "id": data["exam_id"],
            "title": data["title"],
            "focus": data.get("domain_focus", "General"),
            "count": len(data["questions"])
        })
    return exams

def run_quiz(questions, exam_title="Practice Exam", mode="study"):
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
    print(f"\n{Colors.YELLOW}Type A, B, C, or D (or 'q' to quit at any time). Press Enter to start...{Colors.END}")
    try:
        input()
    except (KeyboardInterrupt, EOFError):
        return

    for idx, q in enumerate(questions, 1):
        domain = q.get("domain", "General")
        if domain not in domain_stats:
            domain_stats[domain] = {"total": 0, "correct": 0}
        domain_stats[domain]["total"] += 1

        clear()
        banner()
        # Progress & Live Score Bar
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

        # Get answer
        while True:
            try:
                user_choice = input(f"{Colors.BOLD}Your Answer (A/B/C/D): {Colors.END}").strip().upper()
            except (KeyboardInterrupt, EOFError):
                print(f"\n{Colors.YELLOW}Quiz aborted by user.{Colors.END}")
                return

            if user_choice == 'Q':
                print(f"\n{Colors.YELLOW}Exiting quiz...{Colors.END}")
                return
            if user_choice in ['A', 'B', 'C', 'D']:
                break
            print(f"{Colors.RED}Invalid input. Please enter A, B, C, or D.{Colors.END}")

        correct_answer = q["answer"].strip().upper()
        is_correct = (user_choice == correct_answer)

        if is_correct:
            correct_count += 1
            domain_stats[domain]["correct"] += 1
            if mode == "study":
                print(f"\n{Colors.GREEN}{Colors.BOLD}✅ CORRECT! Excellent job.{Colors.END}")
        else:
            if q.get("recommended_exercise"):
                recommendations.add(q["recommended_exercise"])
            if mode == "study":
                print(f"\n{Colors.RED}{Colors.BOLD}❌ INCORRECT.{Colors.END} Correct answer was: {Colors.GREEN}{Colors.BOLD}{correct_answer}{Colors.END}")

        if mode == "study":
            print(f"\n{Colors.BOLD}💡 Explanation:{Colors.END}")
            print(f"{q['explanation']}")
            if q.get("recommended_exercise"):
                print(f"\n🔗 {Colors.CYAN}Recommended Lab Exercise:{Colors.END} exercises/{q['recommended_exercise']}")

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
    print(f"  • {Colors.BOLD}Final Score:{Colors.END}     {Colors.BOLD}{final_pct:.1f}%{Colors.END} (Passing requirement: 70%)\n")

    # Readiness Verdict
    print("─" * 80)
    if final_pct >= 85:
        print(f"  {Colors.GREEN}{Colors.BOLD}🏆 VERDICT: EXAM READY! (High Confidence){Colors.END}")
        print(f"  Outstanding result! Your score is well above the 70% passing threshold.")
        print(f"  You have demonstrated strong mastery of the Terraform Associate (004) objectives.")
    elif final_pct >= 70:
        print(f"  {Colors.YELLOW}{Colors.BOLD}⚠️ VERDICT: MARGINAL PASS (Review Recommended){Colors.END}")
        print(f"  You met the 70% passing mark, but your score is close to the boundary.")
        print(f"  Review the weak domains listed below before sitting for the real exam.")
    else:
        print(f"  {Colors.RED}{Colors.BOLD}❌ VERDICT: NOT READY YET (More Practice Required){Colors.END}")
        print(f"  Passing score for the HashiCorp exam is 70%.")
        print(f"  Work through the recommended hands-on exercises below and re-test.")
    print("─" * 80)

    # Domain Breakdown
    print(f"\n{Colors.BOLD}📊 DOMAIN DIAGNOSTIC BREAKDOWN:{Colors.END}\n")
    print(f"  {'Domain':<45} | {'Score':<8} | {'%':<6} | {'Status'}")
    print(f"  {'-'*45}-+-{'-'*8}-+-{'-'*6}-+-{'-'*12}")
    for dom, stats in sorted(domain_stats.items()):
        d_tot = stats["total"]
        d_cor = stats["correct"]
        d_pct = (d_cor / d_tot * 100) if d_tot > 0 else 0
        status_str = f"{Colors.GREEN}READY ✅{Colors.END}" if d_pct >= 75 else f"{Colors.RED}NEEDS REVIEW ⚠️{Colors.END}"
        print(f"  {dom[:45]:<45} | {d_cor:>2}/{d_tot:<4} | {d_pct:>5.1f}% | {status_str}")

    # Actionable Exercise Recommendations
    if recommendations:
        print(f"\n{Colors.BOLD}🎯 RECOMMENDED HANDS-ON LABS TO REINFORCE WEAK AREAS:{Colors.END}\n")
        for rec in sorted(recommendations):
            print(f"  👉 exercises/{rec}")

    print(f"\n{Colors.CYAN}Tip: You can also practice these exams visually in your browser by opening:{Colors.END}")
    print(f"     file://{os.path.abspath('exams/simulator.html')}\n")

    input(f"{Colors.YELLOW}Press Enter to return to main menu...{Colors.END}")

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(base_dir, "data")

    while True:
        clear()
        banner()
        exams = list_exams(data_dir)

        print(f"{Colors.BOLD}AVAILABLE PRACTICE EXAMS (HashiCorp Certified: Terraform Associate 004):{Colors.END}\n")
        for e in exams:
            print(f"  [{e['id']:02d}] {Colors.CYAN}{e['title']:<48}{Colors.END} ({e['count']} Questions) - {Colors.BLUE}{e['focus']}{Colors.END}")

        print("\n" + "─" * 80)
        print(f"  [R ] {Colors.YELLOW}Random 25-Question Diagnostic Quiz (Selected across all 10 exams){Colors.END}")
        print(f"  [RA] {Colors.YELLOW}Full 50-Question Comprehensive Mock Exam{Colors.END}")
        print(f"  [Q ] Quit Simulator")
        print("─" * 80)

        choice = input(f"\n{Colors.BOLD}Select an Exam [1-10, R, RA, Q]: {Colors.END}").strip().upper()

        if choice == 'Q':
            print(f"\n{Colors.GREEN}Good luck with your Terraform Associate (004) preparation! Happy Terraforming! 🚀{Colors.END}\n")
            sys.exit(0)

        selected_questions = []
        exam_title = ""

        if choice in ['R', 'RANDOM']:
            all_q = []
            for e in exams:
                all_q.extend(load_exam(e["path"])["questions"])
            selected_questions = random.sample(all_q, min(25, len(all_q)))
            exam_title = "Random 25-Question Diagnostic Assessment"
        elif choice in ['RA', 'ALL']:
            all_q = []
            for e in exams:
                all_q.extend(load_exam(e["path"])["questions"])
            selected_questions = random.sample(all_q, min(50, len(all_q)))
            exam_title = "Full 50-Question Comprehensive Mock Exam"
        else:
            try:
                num = int(choice)
                match = [e for e in exams if e["id"] == num]
                if match:
                    data = load_exam(match[0]["path"])
                    selected_questions = data["questions"]
                    exam_title = f"Exam {data['exam_id']:02d}: {data['title']}"
                else:
                    print(f"{Colors.RED}Invalid Exam Number.{Colors.END}")
                    time.sleep(1)
                    continue
            except ValueError:
                print(f"{Colors.RED}Invalid input.{Colors.END}")
                time.sleep(1)
                continue

        # Choose mode
        clear()
        banner()
        print(f"{Colors.BOLD}Selected:{Colors.END} {exam_title}\n")
        print("Choose your practice mode:")
        print(f"  [1] {Colors.GREEN}Study Mode{Colors.END} - Instant right/wrong feedback on the fly after every question with full explanations")
        print(f"  [2] {Colors.CYAN}Timed Exam Mode{Colors.END} - Mimics real exam environment (score and explanations at the end only)")
        mode_choice = input(f"\n{Colors.BOLD}Select Mode [1/2, default: 1]: {Colors.END}").strip()
        mode = "exam" if mode_choice == "2" else "study"

        run_quiz(selected_questions, exam_title, mode)

if __name__ == "__main__":
    main()
