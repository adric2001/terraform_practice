# 📝 Terraform Associate (004) Practice Exam Suite

A complete testing and certification preparation package containing **10 full-length practice exams (250 questions total)** aligned with the official **HashiCorp Certified: Terraform Associate (004)** exam blueprint.

---

## ⚡ Two Ways to Practice

### 1. Interactive Terminal Simulator (`python3 exams/simulator.py` or `./run_exam.sh`)
* ⚡ **Instant Right/Wrong Feedback On-the-fly:** Get immediate confirmation as you answer each question.
* 💡 **In-Depth Explanations:** Understand *why* the right answer is correct and *why* distractors are incorrect.
* 📊 **Live Score Meter:** Running score percentage updated after every question.
* 🏁 **End-of-Exam Scorecard:**
  * Total score and percentage.
  * **Readiness Verdict:** `EXAM READY (>=85%)`, `MARGINAL PASS (70%-84%)`, or `NOT READY (<70%)`.
  * **Domain Breakdown Table:** Diagnostic breakdown across all 9 official exam domains.
  * **Target Lab Recommendations:** Points you to exact exercises in `exercises/` to reinforce weak areas.
* ⏱️ **Timed Exam Simulation Mode:** Simulates real test conditions (60 minutes, score presented at end).

```bash
# Launch terminal simulator:
./run_exam.sh
# or:
python3 exams/simulator.py
```

---

### 2. Interactive Browser Web Application (`exams/simulator.html`)
* Completely offline, single-page application with **zero dependencies** and no local server needed!
* Double-click `exams/simulator.html` in Finder or open it in any browser (Safari, Chrome, Firefox, Edge).
* Toggle between **Study Mode (Instant Feedback on the fly)** and **Timed Exam Mode**.
* Visual domain readiness bar charts and interactive scorecard.

```bash
# Open in your default browser on macOS:
open exams/simulator.html
```

---

### 3. Offline Markdown Editions
Prefer reading on GitHub or mobile? Every exam is exported to clean GitHub Flavored Markdown with collapsible `<details>` answer toggles:

| Exam | Title | Focus Domains | Questions | Markdown Link |
| :---: | :--- | :--- | :---: | :--- |
| **01** | Diagnostic Baseline Assessment | All 9 Domains | 25 | [`exam-01.md`](exam-01.md) |
| **02** | Core Workflow & CLI Deep Dive | Domains 3, 4, 6 | 25 | [`exam-02.md`](exam-02.md) |
| **03** | HCL Syntax, Variables, Collections & Functions | Domain 8 | 25 | [`exam-03.md`](exam-03.md) |
| **04** | State Architecture, Backends & State Surgery | Domain 7 | 25 | [`exam-04.md`](exam-04.md) |
| **05** | Modules, Registries & Architecture | Domain 5 | 25 | [`exam-05.md`](exam-05.md) |
| **06** | Resource Dependencies, Lifecycles & Dynamic Blocks | Domains 4, 8 | 25 | [`exam-06.md`](exam-06.md) |
| **07** | Terraform 004 Modern Features (Moved, Import, Checks, Tests) | Domains 4, 8 | 25 | [`exam-07.md`](exam-07.md) |
| **08** | Security, Secrets & State Hygiene | Domains 7, 8, 9 | 25 | [`exam-08.md`](exam-08.md) |
| **09** | Terraform Cloud, Enterprise & Team Workflows | Domain 9 | 25 | [`exam-09.md`](exam-09.md) |
| **10** | Final Comprehensive Mock Exam (004 Blueprint) | All 9 Domains | 25 | [`exam-10.md`](exam-10.md) |

---

## 📚 Study Strategy & Blueprint

Read the [`STUDY_GUIDE_004.md`](STUDY_GUIDE_004.md) for:
* Complete 004 domain blueprint breakdown.
* What's new in 004 vs legacy 003.
* Top 10 high-yield exam traps & gotchas.
* Lab mapping matrix connecting the 21 exercises in `../exercises/` to exam objectives.
