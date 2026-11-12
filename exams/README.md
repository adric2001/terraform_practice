# 📝 Terraform Associate (004) Practice Exam Suite

A complete testing, tracking, and certification preparation engine containing **10 full-length practice exams (250 questions total)** aligned with the official **HashiCorp Certified: Terraform Associate (004)** exam blueprint (covering Terraform 1.4 – 1.8+).

---

## 🎯 What This Suite Offers

| Component | Description | Location |
| :--- | :--- | :--- |
| **Terminal Test Engine** | Interactive CLI with on-the-fly feedback, progress persistence, domain drilling, and readiness scoring | `python3 exams/simulator.py` or `./run_exam.sh` |
| **Offline Web Simulator** | Zero-dependency rich single-page app with `localStorage` persistence and readiness dial | `exams/simulator.html` (run `open exams/simulator.html`) |
| **10 Modular Exams** | 250 curated questions covering all 9 exam objectives | `exams/exam-01.md` through `exams/exam-10.md` |
| **Official 57-Question Mock** | Weighted diagnostic mock exam mirroring the exact HashiCorp test blueprint | CLI Option `4` or Web Simulator "Official 57Q Mock" |
| **Persistent Progress Tracker** | Tracks attempts, aggregate accuracy, missed questions pool, and exam readiness score | `exams/.progress.json` & Browser `localStorage` |
| **Spaced Repetition Review** | Automatically recycles questions you missed until you achieve 100% mastery | CLI Option `3` or Web Simulator "Missed Questions" |
| **Domain Targeted Drills** | Drill into specific weak domains (e.g., Domain 7: State or Domain 9: Cloud) | CLI Option `2` or Web Simulator "Domain Drills" |
| **Comprehensive Study Guide** | Deep dive into 004 blueprint, top 10 traps, and hands-on lab mapping | [`STUDY_GUIDE_004.md`](STUDY_GUIDE_004.md) |
| **50 Rapid-Fire Flashcards** | High-yield recall cards with collapsible answers for pre-exam cramming | [`FLASHCARDS_004.md`](FLASHCARDS_004.md) |

---

## ⚡ How the Exam Simulator Works

### 1. Interactive Terminal Simulator (`./run_exam.sh`)
* ⚡ **Instant Right/Wrong Feedback On-the-Fly:** Get immediate confirmation as you answer each question.
* 💡 **In-Depth Explanations:** Understand *why* the right answer is correct and *why* distractors are incorrect.
* 📊 **Live Running Score Meter:** Real-time accuracy tracked question-by-question.
* 💾 **Automatic Progress Saving:** Saved to `exams/.progress.json` after every completed session.
* 📈 **Algorithmic Readiness Evaluator:** Calculates a 0–100 Readiness Score:
  * **Question Coverage (25%)**: How many of the 250 unique questions you have tackled.
  * **Overall Accuracy (40%)**: Your average score across all attempts.
  * **Domain Balance (20%)**: Balanced competency across all 9 domains without fatal blindspots.
  * **Missed Pool Clearance (15%)**: Clearing the backlog of previously missed questions.

```bash
# Launch terminal simulator:
./run_exam.sh
# or:
python3 exams/simulator.py
```

### Main Menu Options:
1. **Take Practice Exam (01–10):** Take any of the 10 focused 25-question exams in Study Mode or Timed Exam Mode.
2. **Domain Targeted Drill:** Select one of the 9 official domains to answer only questions from that domain.
3. **Review Missed Questions Pool:** Practice only the questions you have previously answered incorrectly until mastered.
4. **Official 57-Question Mock Exam:** Generates a randomized 57-question test distributed across domains according to the official HashiCorp blueprint.
5. **View Overall Exam Readiness Dashboard:** Inspect your current readiness score, pass verdict, question coverage, and domain-by-domain accuracy.
6. **Reset All Progress:** Reset local history to start fresh.

---

### 2. Interactive Browser Web Application (`exams/simulator.html`)
* Completely offline, single-page application with **zero dependencies** and no local server needed!
* Automatically persists all test history, domain scores, and missed questions to browser **`localStorage`**.
* Interactive **Readiness Dial (0–100%)** with color-coded verdict banner:
  * 🟢 **EXAM READY ($\ge 85\%$)**: High confidence of passing the official exam on the first attempt.
  * 🟡 **MARGINAL PASS (70% – 84%)**: Passing threshold, but review weak domains to minimize risk.
  * 🔴 **NOT READY (< 70%)**: Below passing threshold. Re-study weak domains and clear missed questions.
* Instant toggle between **Study Mode** (immediate answer feedback and explanations) and **Timed Exam Mode** (exam conditions).

```bash
# Open in your default browser on macOS:
open exams/simulator.html
```

---

### 3. Markdown Editions & Flashcards

| Exam / Resource | Title | Focus Domains | Questions | File Link |
| :---: | :--- | :--- | :---: | :--- |
| **01** | Diagnostic Baseline Assessment | All 9 Domains | 25 | [`exam-01.md`](exam-01.md) |
| **02** | Core Workflow & CLI Deep Dive | Domains 3, 4, 6 | 25 | [`exam-02.md`](exam-02.md) |
| **03** | HCL Syntax, Variables, Collections & Functions | Domain 8 | 25 | [`exam-03.md`](exam-03.md) |
| **04** | State Architecture, Backends & State Surgery | Domain 7 | 25 | [`exam-04.md`](exam-04.md) |
| **05** | Modules, Registries & Architecture | Domain 5 | 25 | [`exam-05.md`](exam-05.md) |
| **06** | Dependencies, Lifecycles & Dynamic Blocks | Domains 4, 8 | 25 | [`exam-06.md`](exam-06.md) |
| **07** | Terraform 004 Modern Features (Moved, Import, Checks, Tests) | Domains 4, 8 | 25 | [`exam-07.md`](exam-07.md) |
| **08** | Security, Secrets & State Hygiene | Domains 7, 8, 9 | 25 | [`exam-08.md`](exam-08.md) |
| **09** | Terraform Cloud, Enterprise & Team Workflows | Domain 9 | 25 | [`exam-09.md`](exam-09.md) |
| **10** | Final Comprehensive Mock Exam (004 Blueprint) | All 9 Domains | 25 | [`exam-10.md`](exam-10.md) |
| 🃏 | **50 Rapid-Fire High-Yield Flashcards** | Core Recall & 004 Traps | 50 | [`FLASHCARDS_004.md`](FLASHCARDS_004.md) |
| 📖 | **Official 004 Study Guide & Lab Mapping** | Exam Strategy & Traps | Full Guide | [`STUDY_GUIDE_004.md`](STUDY_GUIDE_004.md) |

---

## 🏆 Passing Criteria & Readiness Guarantee

The official HashiCorp Terraform Associate (004) exam requires a passing score of **approximately 70%** within a 60-minute testing window.

To ensure you pass with absolute certainty, aim for the following targets in this suite:
1. **Total Question Coverage:** $\ge 80\%$ (at least 200 of the 250 questions attempted).
2. **Overall Accuracy:** $\ge 85\%$ across all attempts.
3. **No Domain Under 70%:** Check the Domain Diagnostic Breakdown to ensure you have no fatal blind spots.
4. **Missed Questions Pool:** Clear all questions from your missed pool using Spaced Repetition Mode until the pool is empty.
5. **Score on Exam 10 or 57Q Mock:** Achieve $\ge 85\%$ on the timed mock exam.
