/**
 * Terraform Associate (004) Cloud Readiness Portal - 2-Week Pass Engine
 * Features:
 * - 100% Clean Slate: Zero mock/fake baseline data
 * - AWS Cognito Authentication & DynamoDB Sync
 * - 14-Day Exam Acceleration Roadmap
 * - Interactive 50 High-Yield Flashcard Trainer
 * - 004 Exam Cheat Sheet & Top Traps Drawer
 * - 60-Minute / 57-Question Timed Mock with Question Navigator Grid & Flagging
 * - Starred Questions Bookmarking System
 * - 5-Point Exam Readiness Checklist
 */

(function() {
  // Configuration
  const config = window.PORTAL_CONFIG || {
    apiUrl: "",
    cognitoUserPoolId: "",
    cognitoClientId: "",
    awsRegion: "us-east-1"
  };

  // State
  let currentUser = null;
  let allQuestions = [];
  let userProgress = {
    history: [],
    questionStats: {}, // q_id -> { attempts, correct }
    domainStats: {},   // domain -> { attempts, correct }
    missedQuestions: [],
    starredQuestions: [],
    completedLabs: []  // array of completed lab IDs
  };

  // Lab Studio State
  let allExercises = [];
  let activeLab = null;
  let activeLabFile = "main.tf";
  let activeSolutionFile = "main.tf";
  let labDrafts = {}; // `${labId}:${fileName}` -> code string

  let activeExam = null;
  let activeExamIndex = 0;
  let currentAnswers = []; // array of { question_id, domain, selected, is_correct, time_spent, flagged }
  let isTimedExam = false;
  let examTimerInterval = null;
  let examSecondsRemaining = 3600; // 60 mins

  // Flashcards State
  let currentCardIndex = 0;
  let activeCards = [];

  // DOM Elements - Navigation & Auth
  const openAuthBtn = document.getElementById("openAuthBtn");
  const authModal = document.getElementById("authModal");
  const closeAuthModal = document.getElementById("closeAuthModal");
  const tabSignIn = document.getElementById("tabSignIn");
  const tabSignUp = document.getElementById("tabSignUp");
  const tabConfirm = document.getElementById("tabConfirm");
  const signInForm = document.getElementById("signInForm");
  const signUpForm = document.getElementById("signUpForm");
  const confirmForm = document.getElementById("confirmForm");
  const authMsg = document.getElementById("authMsg");
  const unauthControls = document.getElementById("unauth-controls");
  const authControls = document.getElementById("auth-controls");
  const userEmailBadge = document.getElementById("userEmailBadge");
  const signOutBtn = document.getElementById("signOutBtn");

  // Readiness Ribbon
  const readinessDial = document.getElementById("readinessDial");
  const readinessStatus = document.getElementById("readinessStatus");
  const readinessAdvice = document.getElementById("readinessAdvice");
  const coverageStat = document.getElementById("coverageStat");
  const accuracyStat = document.getElementById("accuracyStat");
  const syncStat = document.getElementById("syncStat");
  const userCountText = document.getElementById("userCountText");
  const communityStat = document.getElementById("communityStat");

  // Welcome & Weak Areas
  const welcomeCard = document.getElementById("welcomeCard");
  const startDiagnosticBtn = document.getElementById("startDiagnosticBtn");
  const weakAreasBanner = document.getElementById("weakAreasBanner");
  const weakPillsContainer = document.getElementById("weakPillsContainer");
  const drillWeakBtn = document.getElementById("drillWeakBtn");
  const recommendedLabsText = document.getElementById("recommendedLabsText");

  // Checklist
  const checklistScore = document.getElementById("checklistScore");
  const check1 = document.getElementById("check1");
  const check2 = document.getElementById("check2");
  const check3 = document.getElementById("check3");
  const check4 = document.getElementById("check4");
  const check5 = document.getElementById("check5");

  // Views & Action Cards
  const dashboardView = document.getElementById("dashboard-view");
  const examView = document.getElementById("exam-view");
  const scorecardView = document.getElementById("scorecard-view");
  const labStudioView = document.getElementById("lab-studio-view");

  // Lab Studio Elements
  const openLabStudioNavBtn = document.getElementById("openLabStudioNavBtn");
  const openLabStudioCardBtn = document.getElementById("openLabStudioCardBtn");
  const startLab01WelcomeBtn = document.getElementById("startLab01WelcomeBtn");
  const exitLabStudioBtn = document.getElementById("exitLabStudioBtn");
  const labSelect = document.getElementById("labSelect");
  const labStatusBadge = document.getElementById("labStatusBadge");
  const labTierBadge = document.getElementById("labTierBadge");
  const labTitle = document.getElementById("labTitle");
  const labObjectivesList = document.getElementById("labObjectivesList");
  const labRequirementsList = document.getElementById("labRequirementsList");
  const fileTabBar = document.getElementById("fileTabBar");
  const codeEditorArea = document.getElementById("codeEditorArea");
  const checkCodeBtn = document.getElementById("checkCodeBtn");
  const revealSolutionBtn = document.getElementById("revealSolutionBtn");
  const saveDraftBtn = document.getElementById("saveDraftBtn");
  const resetCodeBtn = document.getElementById("resetCodeBtn");
  const labDiagnostics = document.getElementById("labDiagnostics");
  const diagSummaryBadge = document.getElementById("diagSummaryBadge");
  const diagRulesList = document.getElementById("diagRulesList");
  const labStat = document.getElementById("labStat");

  // Reference Solution Modal Elements
  const solutionModal = document.getElementById("solutionModal");
  const closeSolutionModal = document.getElementById("closeSolutionModal");
  const closeSolutionBottomBtn = document.getElementById("closeSolutionBottomBtn");
  const solutionModalTitle = document.getElementById("solutionModalTitle");
  const solutionFileTabs = document.getElementById("solutionFileTabs");
  const solutionCodeDisplay = document.getElementById("solutionCodeDisplay");
  const copySolutionToEditorBtn = document.getElementById("copySolutionToEditorBtn");

  const examSelect = document.getElementById("examSelect");
  const startSelectedExamBtn = document.getElementById("startSelectedExamBtn");
  const start57MockBtn = document.getElementById("start57MockBtn");
  const startMissedBtn = document.getElementById("startMissedBtn");
  const startStarredBtn = document.getElementById("startStarredBtn");
  const cardLaunchBtn = document.getElementById("cardLaunchBtn");
  const resetAllDataBtn = document.getElementById("resetAllDataBtn");

  // Exam Active Controls
  const activeExamTitle = document.getElementById("activeExamTitle");
  const currentQNum = document.getElementById("currentQNum");
  const totalQNum = document.getElementById("totalQNum");
  const runningScore = document.getElementById("runningScore");
  const examTimerContainer = document.getElementById("examTimerContainer");
  const examTimer = document.getElementById("examTimer");
  const starQBtn = document.getElementById("starQBtn");
  const flagQBtn = document.getElementById("flagQBtn");
  const qDomain = document.getElementById("qDomain");
  const qText = document.getElementById("qText");
  const optionsContainer = document.getElementById("optionsContainer");
  const feedbackBox = document.getElementById("feedbackBox");
  const feedbackTitle = document.getElementById("feedbackTitle");
  const feedbackText = document.getElementById("feedbackText");
  const feedbackLab = document.getElementById("feedbackLab");
  const prevQBtn = document.getElementById("prevQBtn");
  const nextQBtn = document.getElementById("nextQBtn");
  const submitExamBtn = document.getElementById("submitExamBtn");
  const quitExamBtn = document.getElementById("quitExamBtn");
  const openNavGridBtn = document.getElementById("openNavGridBtn");

  // Scorecard View
  const scorecardDial = document.getElementById("scorecardDial");
  const scorecardVerdict = document.getElementById("scorecardVerdict");
  const scorecardSummary = document.getElementById("scorecardSummary");
  const domainBreakdownTbody = document.getElementById("domainBreakdownTbody");
  const scorecardReturnBtn = document.getElementById("scorecardReturnBtn");
  const scorecardDrillBtn = document.getElementById("scorecardDrillBtn");

  // Modals
  const openRoadmapBtn = document.getElementById("openRoadmapBtn");
  const roadmapModal = document.getElementById("roadmapModal");
  const closeRoadmapModal = document.getElementById("closeRoadmapModal");
  const closeRoadmapBottomBtn = document.getElementById("closeRoadmapBottomBtn");

  const openFlashcardsBtn = document.getElementById("openFlashcardsBtn");
  const flashcardModal = document.getElementById("flashcardModal");
  const closeFlashcardModal = document.getElementById("closeFlashcardModal");
  const flashcardWrapper = document.getElementById("flashcardWrapper");
  const flashcardInner = document.getElementById("flashcardInner");
  const cardNum = document.getElementById("cardNum");
  const cardTotal = document.getElementById("cardTotal");
  const cardCategoryFront = document.getElementById("cardCategoryFront");
  const cardQuestionText = document.getElementById("cardQuestionText");
  const cardCategoryBack = document.getElementById("cardCategoryBack");
  const cardAnswerText = document.getElementById("cardAnswerText");
  const prevCardBtn = document.getElementById("prevCardBtn");
  const nextCardBtn = document.getElementById("nextCardBtn");
  const shuffleCardsBtn = document.getElementById("shuffleCardsBtn");

  const openCheatSheetBtn = document.getElementById("openCheatSheetBtn");
  const cheatSheetModal = document.getElementById("cheatSheetModal");
  const closeCheatSheetModal = document.getElementById("closeCheatSheetModal");
  const closeCheatSheetBottomBtn = document.getElementById("closeCheatSheetBottomBtn");

  const navGridModal = document.getElementById("navGridModal");
  const closeNavGridModal = document.getElementById("closeNavGridModal");
  const doneNavGridBtn = document.getElementById("doneNavGridBtn");
  const navGridBoxes = document.getElementById("navGridBoxes");

  const openCustomBuilderBtn = document.getElementById("openCustomBuilderBtn");
  const customBuilderModal = document.getElementById("customBuilderModal");
  const closeBuilderModal = document.getElementById("closeBuilderModal");
  const cancelBuilderBtn = document.getElementById("cancelBuilderBtn");
  const qCountSlider = document.getElementById("qCountSlider");
  const qCountDisplay = document.getElementById("qCountDisplay");
  const launchCustomExamBtn = document.getElementById("launchCustomExamBtn");

  // ===========================================================================
  // Initialization & View Helpers
  // ===========================================================================
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function switchView(viewName) {
    dashboardView.style.display = viewName === "dashboard" ? "block" : "none";
    examView.style.display = viewName === "exam" ? "block" : "none";
    scorecardView.style.display = viewName === "scorecard" ? "block" : "none";
    if (labStudioView) {
      labStudioView.style.display = viewName === "lab-studio" ? "block" : "none";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function init() {
    loadCleanProgress();
    cleanAccidentalZeroSessions();
    loadLabDrafts();
    restoreAuthSession();
    await Promise.all([loadQuestionsData(), loadExercisesData()]);
    updateDashboardUI();
    fetchCommunityUserCount();
    setInterval(fetchCommunityUserCount, 60000);

    if (currentUser && config.apiUrl) {
      await syncWithCloud();
    }
  }

  // ===========================================================================
  // Clean Data Loading & Session Sanitization
  // ===========================================================================
  async function fetchCommunityUserCount() {
    if (!config.apiUrl) return;
    try {
      const resp = await fetch(`${config.apiUrl}/api/stats`);
      if (resp.ok) {
        const data = await resp.json();
        const active = data.active_users || 1;
        const registered = data.registered_users || 1;
        if (userCountText) userCountText.innerText = `👥 ${active} User${active === 1 ? '' : 's'} Online`;
        if (communityStat) communityStat.innerText = `${registered} Registered`;
      }
    } catch (e) {}
  }

  function cleanAccidentalZeroSessions() {
    if (!userProgress.history) return;
    const initialCount = userProgress.history.length;
    userProgress.history = userProgress.history.filter(h => {
      // Filter out accidental 0% submissions that have 0 total or 0 answered questions
      const isAccidental = (
        h.score_percentage === 0 &&
        (!h.correct_questions || h.correct_questions === 0) &&
        (!h.total_questions || h.total_questions === 0 || !h.answers || h.answers.length === 0 || h.title.includes("Exam 03") || h.title.includes("Exam 05"))
      );
      return !isAccidental;
    });

    if (userProgress.history.length !== initialCount) {
      recalculateDomainStatsFromHistory();
      saveLocalProgress();
    }
  }

  function recalculateDomainStatsFromHistory() {
    const dStats = {};
    for (const sess of (userProgress.history || [])) {
      const breakdown = sess.domain_breakdown || {};
      for (const [dom, stat] of Object.entries(breakdown)) {
        if (!dStats[dom]) dStats[dom] = { attempts: 0, correct: 0 };
        dStats[dom].attempts += (stat.total || stat.attempts || 0);
        dStats[dom].correct += (stat.correct || stat.correct_count || 0);
      }
    }
    userProgress.domainStats = dStats;
  }

  async function loadQuestionsData() {
    const questions = [];
    const seen = new Set();

    for (let i = 1; i <= 10; i++) {
      const pad = i < 10 ? `0${i}` : `${i}`;
      try {
        const resp = await fetch(`data/exam_${pad}.json`);
        if (resp.ok) {
          const data = await resp.json();
          for (const q of (data.questions || [])) {
            if (!seen.has(q.id)) {
              questions.push(q);
              seen.add(q.id);
            }
          }
        }
      } catch (e) {}
    }
    allQuestions = questions;
  }

  async function loadExercisesData() {
    try {
      const resp = await fetch("data/exercises.json");
      if (resp.ok) {
        allExercises = await resp.json();
        populateLabDropdown();
      }
    } catch (e) {
      console.error("Failed to load exercises.json", e);
    }
  }

  function loadCleanProgress() {
    const raw = localStorage.getItem("tf_exam_progress");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        // If it was the old seeded mock data, purge it cleanly
        if (parsed.history && parsed.history.length === 1 && parsed.history[0].title === "Diagnostic Baseline Assessment" && Object.keys(parsed.questionStats || {}).length === 0) {
          localStorage.removeItem("tf_exam_progress");
        } else {
          userProgress = {
            history: parsed.history || [],
            questionStats: parsed.questionStats || {},
            domainStats: parsed.domainStats || {},
            missedQuestions: parsed.missedQuestions || [],
            starredQuestions: parsed.starredQuestions || [],
            completedLabs: parsed.completedLabs || []
          };
          return;
        }
      } catch (e) {}
    }

    // Default clean state
    userProgress = {
      history: [],
      questionStats: {},
      domainStats: {},
      missedQuestions: [],
      starredQuestions: [],
      completedLabs: []
    };
  }

  function saveLocalProgress() {
    localStorage.setItem("tf_exam_progress", JSON.stringify(userProgress));
  }

  // ===========================================================================
  // Cloud Synchronization (API Gateway & DynamoDB)
  // ===========================================================================
  async function syncWithCloud() {
    if (!config.apiUrl || !currentUser || !currentUser.idToken) return;

    try {
      syncStat.innerText = "Syncing... ⏳";
      const resp = await fetch(`${config.apiUrl}/api/profile`, {
        headers: { "Authorization": `Bearer ${currentUser.idToken}` }
      });
      if (resp.ok) {
        const data = await resp.json();
        syncStat.innerText = "Cloud Synced 🟢";
        readinessDial.innerText = `${data.readiness_score || 0}%`;
        readinessStatus.innerText = data.verdict || "Ready to Begin";

        // Reconcile validated sessions from cloud
        if (data.recent_sessions && Array.isArray(data.recent_sessions)) {
          const validSessions = data.recent_sessions.filter(s => s.type !== "lab_completion" && (s.total_questions > 0 || s.correct_questions > 0));
          if (validSessions.length > 0) {
            userProgress.history = validSessions;
            recalculateDomainStatsFromHistory();
            updateDashboardUI();
          }
        }

        if (data.completed_labs && Array.isArray(data.completed_labs)) {
          const merged = new Set([...(userProgress.completedLabs || []), ...data.completed_labs]);
          userProgress.completedLabs = Array.from(merged);
          saveLocalProgress();
          if (labStat) labStat.innerText = `${userProgress.completedLabs.length} / 21`;
        }
      } else {
        syncStat.innerText = "Local Mode";
      }
    } catch (e) {
      syncStat.innerText = "Local Mode";
    }
  }

  // ===========================================================================
  // Dashboard & Diagnostic UI
  // ===========================================================================
  function updateDashboardUI() {
    const questionsAttempted = Object.keys(userProgress.questionStats || {}).length;
    const totalAvail = allQuestions.length || 250;
    const coveragePct = (questionsAttempted / totalAvail) * 100;

    let totalAttemptsCount = 0;
    let totalCorrectCount = 0;
    const weakDomains = [];

    const labRecommendations = {
      "Domain 4: Use Terraform Outside the Core Workflow": ["Exercises 11, 12, 13, 14"],
      "Domain 8: Read, Generate, and Modify Configuration": ["Exercises 03, 07, 10, 15, 19"],
      "Domain 7: Implement and Maintain State": ["Exercises 06, 13, 17, 18"],
      "Domain 5: Interact with Terraform Modules": ["Exercises 08, 09, 16"],
      "Domain 3: Understand Terraform Basics": ["Exercises 01, 02, 06"],
      "Domain 6: Use the Core Terraform Workflow": ["Exercises 01, 04, 05"],
      "Domain 1: Understand Infrastructure as Code (IaC) Concepts": ["Exercises 01, 02"],
      "Domain 2: Understand Terraform's Purpose": ["Exercises 01, 06"],
      "Domain 9: Understand Terraform Cloud/Enterprise Capabilities": ["Exercises 13, 20, 21"]
    };

    const dStats = userProgress.domainStats || {};
    for (const [domain, stat] of Object.entries(dStats)) {
      totalAttemptsCount += stat.attempts || 0;
      totalCorrectCount += stat.correct || 0;
      const acc = stat.attempts > 0 ? (stat.correct / stat.attempts) * 100 : 0;
      if (acc < 70.0 && stat.attempts >= 2) {
        weakDomains.push({ domain, accuracy: Math.round(acc) });
      }
    }

    const accuracyPct = totalAttemptsCount > 0 ? ((totalCorrectCount / totalAttemptsCount) * 100).toFixed(1) : "0.0";
    coverageStat.innerText = `${questionsAttempted} / ${totalAvail}`;
    accuracyStat.innerText = `${accuracyPct}%`;
    if (labStat) {
      labStat.innerText = `${(userProgress.completedLabs || []).length} / 21`;
    }

    // Welcome Card vs Weak Areas Banner
    if (questionsAttempted === 0) {
      welcomeCard.style.display = "flex";
      weakAreasBanner.style.display = "none";
      readinessDial.innerText = "0%";
      readinessStatus.innerText = "Ready to Begin";
      readinessAdvice.innerText = "Start with Exam 01 to establish your diagnostic baseline.";
    } else {
      welcomeCard.style.display = "none";
      const score = Math.min(100, Math.round((0.25 * coveragePct) + (0.50 * parseFloat(accuracyPct)) + (0.25 * (parseFloat(accuracyPct) >= 75 ? 100 : parseFloat(accuracyPct)))));
      readinessDial.innerText = `${score}%`;

      if (score >= 85 && parseFloat(accuracyPct) >= 80) {
        readinessStatus.innerHTML = "🟢 EXAM READY";
        readinessStatus.style.color = "var(--success)";
        readinessAdvice.innerText = "High margin of safety. You are fully prepared to pass the HashiCorp Associate (004) exam!";
      } else if (score >= 70 || parseFloat(accuracyPct) >= 70) {
        readinessStatus.innerHTML = "⚠️ MARGINAL PASS";
        readinessStatus.style.color = "var(--warning)";
        readinessAdvice.innerText = "You reach passing mark (70%), but weak domains require reinforcement before test day.";
      } else {
        readinessStatus.innerHTML = "🔴 NOT READY";
        readinessStatus.style.color = "var(--danger)";
        readinessAdvice.innerText = "Below passing threshold. Focus on weak domains and clear missed questions.";
      }

      // Show weak areas only if real weak areas exist
      if (weakDomains.length > 0) {
        weakAreasBanner.style.display = "flex";
        weakPillsContainer.innerHTML = weakDomains.map(w => 
          `<span class="weak-pill">${w.domain.split(":")[0]}: ${w.accuracy}%</span>`
        ).join(" ");
        const labs = weakDomains.map(w => labRecommendations[w.domain] || "Exercises 01-21").flat();
        recommendedLabsText.innerText = labs.join(" & ");
        scorecardDrillBtn.style.display = "inline-flex";
      } else {
        weakAreasBanner.style.display = "none";
        scorecardDrillBtn.style.display = "none";
      }
    }

    // Update 5-Point Readiness Checklist
    updateChecklistUI(questionsAttempted, parseFloat(accuracyPct), weakDomains);
  }

  function updateChecklistUI(qCount, acc, weakDomains) {
    let completedCount = 0;

    // 1. Coverage >= 80% (200+ questions)
    const c1Pass = qCount >= 200;
    setCheckItem(check1, c1Pass, `Coverage &ge; 80% (${qCount}/200)`);
    if (c1Pass) completedCount++;

    // 2. Accuracy >= 85%
    const c2Pass = acc >= 85.0 && qCount >= 25;
    setCheckItem(check2, c2Pass, `Accuracy &ge; 85% (${acc}%)`);
    if (c2Pass) completedCount++;

    // 3. No Domain Under 70%
    const c3Pass = weakDomains.length === 0 && qCount >= 25;
    setCheckItem(check3, c3Pass, c3Pass ? "No Domain Under 70% ✅" : `${weakDomains.length} Weak Domain(s)`);
    if (c3Pass) completedCount++;

    // 4. Missed Pool Cleared
    const missedCount = Object.values(userProgress.questionStats || {}).filter(s => s.attempts > 0 && s.correct === 0).length;
    const c4Pass = qCount > 0 && missedCount === 0;
    setCheckItem(check4, c4Pass, c4Pass ? "Missed Pool Cleared ✅" : `${missedCount} Missed Qs to Clear`);
    if (c4Pass) completedCount++;

    // 5. Passed 57Q Timed Mock
    const passedMock = (userProgress.history || []).some(h => (h.total_questions >= 50 || h.title.includes("57")) && h.score_percentage >= 80);
    setCheckItem(check5, passedMock, passedMock ? "Passed 57Q Timed Mock ✅" : "Pass 57Q Timed Mock");
    if (passedMock) completedCount++;

    checklistScore.innerText = `${completedCount} / 5 Completed`;
  }

  function setCheckItem(el, passed, text) {
    if (passed) {
      el.className = "checklist-item check-done";
      el.querySelector(".check-icon").innerText = "✅";
    } else {
      el.className = "checklist-item";
      el.querySelector(".check-icon").innerText = "⭕";
    }
    el.querySelector("span:last-child").innerHTML = text;
  }

  // ===========================================================================
  // Exam Engine (Study Mode vs Timed Exam Mode)
  // ===========================================================================
  startDiagnosticBtn.onclick = () => {
    const examQs = allQuestions.filter(q => q.id.startsWith("q1_"));
    startExam("Exam 01 - Diagnostic Baseline Assessment", examQs.length > 0 ? examQs : allQuestions.slice(0, 25), false);
  };

  function startExam(title, questions, isTimed = false) {
    if (!questions || questions.length === 0) {
      alert("No questions found for this exam mode.");
      return;
    }

    activeExam = { title, questions };
    activeExamIndex = 0;
    isTimedExam = isTimed;
    currentAnswers = questions.map(q => ({
      question_id: q.id,
      domain: q.domain,
      selected: null,
      is_correct: false,
      flagged: false
    }));

    switchView("exam");

    activeExamTitle.innerText = title;
    totalQNum.innerText = questions.length;

    // Timer setup for Timed Mock Mode
    if (isTimedExam) {
      examTimerContainer.style.display = "block";
      examSecondsRemaining = Math.min(3600, questions.length * 70); // ~60 mins
      updateTimerDisplay();
      clearInterval(examTimerInterval);
      examTimerInterval = setInterval(() => {
        examSecondsRemaining--;
        updateTimerDisplay();
        if (examSecondsRemaining <= 0) {
          clearInterval(examTimerInterval);
          alert("⏱️ Time is up! Submitting exam now.");
          finishExam();
        }
      }, 1000);
    } else {
      examTimerContainer.style.display = "none";
      clearInterval(examTimerInterval);
    }

    renderCurrentQuestion();
  }

  function updateTimerDisplay() {
    const mins = Math.floor(examSecondsRemaining / 60);
    const secs = examSecondsRemaining % 60;
    examTimer.innerText = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    if (examSecondsRemaining < 600) {
      examTimerContainer.classList.add("timer-urgent");
    } else {
      examTimerContainer.classList.remove("timer-urgent");
    }
  }

  function renderCurrentQuestion() {
    const q = activeExam.questions[activeExamIndex];
    currentQNum.innerText = activeExamIndex + 1;
    qDomain.innerText = q.domain || "General";
    qText.innerText = q.question;

    const ans = currentAnswers[activeExamIndex];
    optionsContainer.innerHTML = "";
    feedbackBox.style.display = "none";

    // Star & Flag states
    const isStarred = (userProgress.starredQuestions || []).includes(q.id);
    starQBtn.className = isStarred ? "star-btn starred" : "star-btn";
    starQBtn.innerText = isStarred ? "⭐ Starred" : "⭐ Star";

    flagQBtn.className = ans.flagged ? "flag-btn flagged" : "flag-btn";
    flagQBtn.innerText = ans.flagged ? "🚩 Flagged" : "🚩 Flag for Review";

    // Running Score
    const answeredCount = currentAnswers.filter(a => a.selected !== null).length;
    const correctCount = currentAnswers.filter(a => a.is_correct).length;
    runningScore.innerText = answeredCount > 0 ? `${Math.round((correctCount / answeredCount) * 100)}%` : "0%";

    (q.options || []).forEach(opt => {
      const letter = opt.trim().charAt(0);
      const btn = document.createElement("button");
      btn.className = "option-item";
      btn.innerHTML = `<span class="option-key">${letter}</span><span>${opt.substring(2).trim()}</span>`;

      if (ans.selected !== null) {
        btn.classList.add("locked");
        if (isTimedExam) {
          // In Timed Mock Mode, do not show correct/incorrect during test
          if (letter === ans.selected) {
            btn.classList.add("selected");
          }
        } else {
          // Study Mode: Instant Right/Wrong Feedback
          if (letter === q.answer) {
            btn.classList.add("correct");
          } else if (letter === ans.selected) {
            btn.classList.add("incorrect");
          }
        }
      } else {
        btn.onclick = () => selectAnswer(q, letter);
      }

      optionsContainer.appendChild(btn);
    });

    if (!isTimedExam && ans.selected !== null) {
      showFeedback(q, ans.is_correct);
    }

    prevQBtn.disabled = activeExamIndex === 0;
    const isLast = activeExamIndex === activeExam.questions.length - 1;
    nextQBtn.style.display = isLast ? "none" : "inline-flex";
    submitExamBtn.style.display = isLast ? "inline-flex" : "none";
  }

  function selectAnswer(q, selectedLetter) {
    const isCorrect = selectedLetter === q.answer;
    currentAnswers[activeExamIndex].selected = selectedLetter;
    currentAnswers[activeExamIndex].is_correct = isCorrect;

    const buttons = optionsContainer.querySelectorAll(".option-item");
    buttons.forEach(btn => {
      btn.classList.add("locked");
      const letter = btn.querySelector(".option-key").innerText;
      if (isTimedExam) {
        if (letter === selectedLetter) btn.classList.add("selected");
      } else {
        if (letter === q.answer) {
          btn.classList.add("correct");
        } else if (letter === selectedLetter) {
          btn.classList.add("incorrect");
        }
      }
    });

    if (!isTimedExam) {
      showFeedback(q, isCorrect);
    }

    const answeredCount = currentAnswers.filter(a => a.selected !== null).length;
    const correctCount = currentAnswers.filter(a => a.is_correct).length;
    runningScore.innerText = `${Math.round((correctCount / answeredCount) * 100)}%`;
  }

  function showFeedback(q, isCorrect) {
    feedbackBox.style.display = "block";
    feedbackBox.className = `feedback-container ${isCorrect ? "fb-correct" : "fb-incorrect"}`;
    feedbackTitle.innerHTML = isCorrect ? "✅ Correct!" : "❌ Incorrect";
    feedbackText.innerText = q.explanation || "Refer to the HashiCorp Terraform 004 documentation for details.";
    feedbackLab.innerText = q.recommended_exercise ? `🛠️ Reinforcing Exercise: exercises/${q.recommended_exercise}` : "";
  }

  // Star & Flag Handlers
  starQBtn.onclick = () => {
    const q = activeExam.questions[activeExamIndex];
    if (!userProgress.starredQuestions) userProgress.starredQuestions = [];
    const idx = userProgress.starredQuestions.indexOf(q.id);
    if (idx === -1) {
      userProgress.starredQuestions.push(q.id);
      starQBtn.className = "star-btn starred";
      starQBtn.innerText = "⭐ Starred";
    } else {
      userProgress.starredQuestions.splice(idx, 1);
      starQBtn.className = "star-btn";
      starQBtn.innerText = "⭐ Star";
    }
    saveLocalProgress();
  };

  flagQBtn.onclick = () => {
    const ans = currentAnswers[activeExamIndex];
    ans.flagged = !ans.flagged;
    flagQBtn.className = ans.flagged ? "flag-btn flagged" : "flag-btn";
    flagQBtn.innerText = ans.flagged ? "🚩 Flagged" : "🚩 Flag for Review";
  };

  // Question Navigator Grid Modal
  openNavGridBtn.onclick = () => {
    navGridBoxes.innerHTML = "";
    activeExam.questions.forEach((q, idx) => {
      const box = document.createElement("button");
      box.className = "grid-box";
      box.innerText = idx + 1;
      const ans = currentAnswers[idx];

      if (idx === activeExamIndex) box.classList.add("active");
      if (ans.selected !== null) box.classList.add("answered");
      if (ans.flagged) box.classList.add("flagged");

      box.onclick = () => {
        activeExamIndex = idx;
        navGridModal.style.display = "none";
        renderCurrentQuestion();
      };
      navGridBoxes.appendChild(box);
    });
    navGridModal.style.display = "flex";
  };

  closeNavGridModal.onclick = () => navGridModal.style.display = "none";
  doneNavGridBtn.onclick = () => navGridModal.style.display = "none";

  prevQBtn.onclick = () => {
    if (activeExamIndex > 0) {
      activeExamIndex--;
      renderCurrentQuestion();
    }
  };

  nextQBtn.onclick = () => {
    if (activeExamIndex < activeExam.questions.length - 1) {
      activeExamIndex++;
      renderCurrentQuestion();
    }
  };

  quitExamBtn.onclick = () => {
    if (confirm("Are you sure you want to exit? Your answered questions will be graded.")) {
      clearInterval(examTimerInterval);
      finishExam();
    }
  };

  submitExamBtn.onclick = () => {
    clearInterval(examTimerInterval);
    finishExam();
  };

  // ===========================================================================
  // Exam Completion & Persistence
  // ===========================================================================
  async function finishExam() {
    clearInterval(examTimerInterval);

    const totalQ = activeExam.questions.length;
    const answered = currentAnswers.filter(a => a.selected !== null);
    const correct = answered.filter(a => a.is_correct).length;
    const scorePct = totalQ > 0 ? Math.round((correct / totalQ) * 100) : 0;

    // Domain breakdown
    const domainMap = {};
    activeExam.questions.forEach((q, idx) => {
      const d = q.domain || "General";
      if (!domainMap[d]) domainMap[d] = { total: 0, correct: 0 };
      domainMap[d].total++;
      if (currentAnswers[idx] && currentAnswers[idx].is_correct) {
        domainMap[d].correct++;
      }
    });

    // Update real local state
    if (!userProgress.domainStats) userProgress.domainStats = {};
    for (const [d, s] of Object.entries(domainMap)) {
      if (!userProgress.domainStats[d]) userProgress.domainStats[d] = { attempts: 0, correct: 0 };
      userProgress.domainStats[d].attempts += s.total;
      userProgress.domainStats[d].correct += s.correct;
    }

    if (!userProgress.questionStats) userProgress.questionStats = {};
    answered.forEach(ans => {
      if (!userProgress.questionStats[ans.question_id]) {
        userProgress.questionStats[ans.question_id] = { attempts: 0, correct: 0 };
      }
      userProgress.questionStats[ans.question_id].attempts++;
      if (ans.is_correct) userProgress.questionStats[ans.question_id].correct++;
    });

    if (!userProgress.history) userProgress.history = [];
    userProgress.history.push({
      exam_id: activeExam.title,
      title: activeExam.title,
      score_percentage: scorePct,
      total_questions: totalQ,
      correct_questions: correct,
      created_at: new Date().toISOString()
    });

    saveLocalProgress();

    // Async Cloud Save via API Gateway if authenticated
    if (currentUser && currentUser.idToken && config.apiUrl) {
      syncStat.innerText = "Saving to Cloud... ⏳";
      try {
        await fetch(`${config.apiUrl}/api/sessions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${currentUser.idToken}`
          },
          body: JSON.stringify({
            exam_id: activeExam.title,
            title: activeExam.title,
            score_percentage: scorePct,
            answers: answered,
            domain_breakdown: domainMap
          })
        });
        syncStat.innerText = "Cloud Synced 🟢";
      } catch (e) {
        syncStat.innerText = "Saved Locally";
      }
    }

    // Render Scorecard
    switchView("scorecard");

    scorecardDial.innerText = `${scorePct}%`;
    if (scorePct >= 85) {
      scorecardVerdict.className = "verdict-box verdict-pass";
      scorecardVerdict.innerText = "🟢 EXAM READY (Passed with High Confidence)";
      scorecardSummary.innerText = "Outstanding performance! You are performing well above the official 70% threshold.";
    } else if (scorePct >= 70) {
      scorecardVerdict.className = "verdict-box verdict-border";
      scorecardVerdict.innerText = "⚠️ MARGINAL PASS (Review Recommended)";
      scorecardSummary.innerText = "You reached the 70% passing mark, but review weak domains to guarantee a high safety margin on test day.";
    } else {
      scorecardVerdict.className = "verdict-box verdict-fail";
      scorecardVerdict.innerText = "🔴 NOT READY (Below 70% Passing Threshold)";
      scorecardSummary.innerText = "Focus on the weak domains identified below and clear missed questions before re-testing.";
    }

    // Populate Scorecard Table
    domainBreakdownTbody.innerHTML = Object.entries(domainMap).map(([d, s]) => {
      const mastery = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
      const isPass = mastery >= 70;
      return `
        <tr>
          <td><strong>${d}</strong></td>
          <td>${s.correct} / ${s.total}</td>
          <td><strong style="color: ${isPass ? 'var(--success)' : 'var(--danger)'}">${mastery}%</strong></td>
          <td>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${mastery}%; background: ${isPass ? 'var(--success)' : 'var(--danger)'}"></div>
            </div>
          </td>
          <td><span class="weak-pill" style="background: ${isPass ? 'var(--success-bg)' : 'var(--danger-bg)'}; color: ${isPass ? 'var(--success)' : 'var(--danger)'}">${isPass ? 'PASS' : 'REVIEW'}</span></td>
        </tr>
      `;
    }).join("");

    updateDashboardUI();
  }

  scorecardReturnBtn.onclick = () => {
    switchView("dashboard");
    updateDashboardUI();
  };

  scorecardDrillBtn.onclick = drillWeakAreas;
  drillWeakBtn.onclick = drillWeakAreas;

  function drillWeakAreas() {
    const weakDomains = [];
    const dStats = userProgress.domainStats || {};
    for (const [domain, stat] of Object.entries(dStats)) {
      const acc = stat.attempts > 0 ? (stat.correct / stat.attempts) * 100 : 0;
      if (acc < 70.0 && stat.attempts >= 1) weakDomains.push(domain);
    }

    if (weakDomains.length === 0) {
      alert("No weak domains identified yet! Take a practice exam to diagnose your strengths.");
      return;
    }

    const candidates = allQuestions.filter(q => weakDomains.includes(q.domain));
    const shuffled = [...candidates].sort(() => 0.5 - Math.random());
    startExam(`⚡ Weak-Area Drill (${shuffled.slice(0, 15).length} Questions)`, shuffled.slice(0, 15), false);
  }

  // Action Buttons
  startSelectedExamBtn.onclick = () => {
    const examNum = examSelect.value;
    const title = examSelect.options[examSelect.selectedIndex].text;
    const prefix = `q${examNum}_`;
    const examQs = allQuestions.filter(q => q.id.startsWith(prefix));
    startExam(title, examQs.length > 0 ? examQs : allQuestions.slice(0, 25), false);
  };

  start57MockBtn.onclick = () => {
    // Official 57Q Timed Simulation Mode
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    startExam("⏱️ Official 57-Question Timed Mock Exam", shuffled.slice(0, 57), true);
  };

  startMissedBtn.onclick = () => {
    const missedIds = new Set(
      Object.entries(userProgress.questionStats || {})
        .filter(([_, stat]) => stat.attempts > 0 && stat.correct === 0)
        .map(([id]) => id)
    );
    const missedQs = allQuestions.filter(q => missedIds.has(q.id));
    if (missedQs.length === 0) {
      alert("🎉 You currently have 0 missed questions in your backlog!");
      return;
    }
    startExam(`🔄 Missed Questions Review (${missedQs.length} Questions)`, missedQs, false);
  };

  startStarredBtn.onclick = () => {
    const starredIds = new Set(userProgress.starredQuestions || []);
    const starredQs = allQuestions.filter(q => starredIds.has(q.id));
    if (starredQs.length === 0) {
      alert("You haven't bookmarked any questions yet. Click '⭐ Star' during exams to save questions here.");
      return;
    }
    startExam(`⭐ Bookmarked Questions Practice (${starredQs.length} Questions)`, starredQs, false);
  };

  // Reset Progress Handler
  resetAllDataBtn.onclick = () => {
    if (confirm("Are you sure you want to reset all local progress? This will clear all session and domain data.")) {
      localStorage.removeItem("tf_exam_progress");
      loadCleanProgress();
      updateDashboardUI();
      alert("✅ All local progress reset. You have a fresh clean slate!");
    }
  };

  // ===========================================================================
  // 14-Day Study Plan Modal
  // ===========================================================================
  openRoadmapBtn.onclick = () => roadmapModal.style.display = "flex";
  closeRoadmapModal.onclick = () => roadmapModal.style.display = "none";
  closeRoadmapBottomBtn.onclick = () => roadmapModal.style.display = "none";

  document.querySelectorAll(".start-roadmap-exam").forEach(btn => {
    btn.onclick = () => {
      const examNum = btn.getAttribute("data-exam");
      roadmapModal.style.display = "none";
      const prefix = `q${examNum}_`;
      const examQs = allQuestions.filter(q => q.id.startsWith(prefix));
      startExam(`Exam 0${examNum} (from 14-Day Roadmap)`, examQs.length > 0 ? examQs : allQuestions.slice(0, 25), false);
    };
  });

  // ===========================================================================
  // Interactive 50 Flashcards Modal
  // ===========================================================================
  openFlashcardsBtn.onclick = openFlashcards;
  cardLaunchBtn.onclick = openFlashcards;
  closeFlashcardModal.onclick = () => flashcardModal.style.display = "none";

  function openFlashcards() {
    activeCards = window.FLASHCARD_DATA || [];
    currentCardIndex = 0;
    cardTotal.innerText = activeCards.length;
    renderFlashcard();
    flashcardModal.style.display = "flex";
  }

  function renderFlashcard() {
    if (!activeCards || activeCards.length === 0) return;
    const card = activeCards[currentCardIndex];
    cardNum.innerText = currentCardIndex + 1;
    cardCategoryFront.innerText = card.category;
    cardQuestionText.innerText = card.question;
    cardCategoryBack.innerText = card.category;
    cardAnswerText.innerText = card.answer;
    flashcardInner.classList.remove("flipped");
  }

  flashcardWrapper.onclick = () => flashcardInner.classList.toggle("flipped");

  prevCardBtn.onclick = () => {
    if (currentCardIndex > 0) {
      currentCardIndex--;
      renderFlashcard();
    }
  };

  nextCardBtn.onclick = () => {
    if (currentCardIndex < activeCards.length - 1) {
      currentCardIndex++;
      renderFlashcard();
    }
  };

  shuffleCardsBtn.onclick = () => {
    activeCards = [...activeCards].sort(() => 0.5 - Math.random());
    currentCardIndex = 0;
    renderFlashcard();
  };

  document.querySelectorAll(".card-cat-btn").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".card-cat-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.getAttribute("data-cat");
      if (cat === "all") {
        activeCards = window.FLASHCARD_DATA;
      } else {
        activeCards = (window.FLASHCARD_DATA || []).filter(c => c.category === cat);
      }
      cardTotal.innerText = activeCards.length;
      currentCardIndex = 0;
      renderFlashcard();
    };
  });

  // ===========================================================================
  // Cheat Sheet Drawer Modal
  // ===========================================================================
  openCheatSheetBtn.onclick = () => cheatSheetModal.style.display = "flex";
  closeCheatSheetModal.onclick = () => cheatSheetModal.style.display = "none";
  closeCheatSheetBottomBtn.onclick = () => cheatSheetModal.style.display = "none";

  // ===========================================================================
  // Custom Exam Builder
  // ===========================================================================
  if (openCustomBuilderBtn) openCustomBuilderBtn.onclick = () => { if (customBuilderModal) customBuilderModal.style.display = "flex"; };
  if (closeBuilderModal) closeBuilderModal.onclick = () => { if (customBuilderModal) customBuilderModal.style.display = "none"; };
  if (cancelBuilderBtn) cancelBuilderBtn.onclick = () => { if (customBuilderModal) customBuilderModal.style.display = "none"; };
  if (qCountSlider) qCountSlider.oninput = () => { if (qCountDisplay) qCountDisplay.innerText = qCountSlider.value; };

  if (launchCustomExamBtn) {
    launchCustomExamBtn.onclick = () => {
      const count = parseInt(qCountSlider ? qCountSlider.value : 15, 10);
      const checked = Array.from(document.querySelectorAll(".domain-chk:checked")).map(cb => cb.value);
      if (checked.length === 0) {
        alert("Please select at least one domain.");
        return;
      }

      const matched = allQuestions.filter(q => checked.includes(q.domain));
      const shuffled = [...matched].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, count);

      if (customBuilderModal) customBuilderModal.style.display = "none";
      startExam(`Custom Selected Exam (${selected.length} Questions)`, selected, false);
    };
  }

  // ===========================================================================
  // Hands-On Lab Studio Engine
  // ===========================================================================
  function loadLabDrafts() {
    try {
      const raw = localStorage.getItem("tf_lab_drafts");
      if (raw) labDrafts = JSON.parse(raw);
    } catch (e) {}
  }

  function saveLabDrafts() {
    localStorage.setItem("tf_lab_drafts", JSON.stringify(labDrafts));
  }

  function populateLabDropdown() {
    if (!labSelect || !Array.isArray(allExercises)) return;
    labSelect.innerHTML = allExercises.map(ex => 
      `<option value="${ex.id}">${escapeHtml(ex.title)}</option>`
    ).join("");
  }

  function openLabStudio(exerciseId) {
    switchView("lab-studio");
    if (!allExercises || allExercises.length === 0) return;
    const target = exerciseId 
      ? (allExercises.find(e => e.id === exerciseId) || allExercises[0])
      : (activeLab || allExercises[0]);
    loadLab(target.id);
  }

  function loadLab(exerciseId) {
    if (activeLab && codeEditorArea) {
      labDrafts[`${activeLab.id}:${activeLabFile}`] = codeEditorArea.value;
      saveLabDrafts();
    }

    const ex = allExercises.find(e => e.id === exerciseId) || allExercises[0];
    if (!ex) return;
    activeLab = ex;
    if (labSelect) labSelect.value = ex.id;

    if (labTitle) labTitle.innerText = ex.title;
    if (labTierBadge) {
      labTierBadge.innerText = ex.tier;
      labTierBadge.className = "day-badge tier-" + ex.tier.toLowerCase();
    }

    if (labObjectivesList) {
      labObjectivesList.innerHTML = (ex.objectives || []).map(o => `<li>${escapeHtml(o)}</li>`).join("");
    }

    if (labRequirementsList) {
      labRequirementsList.innerHTML = (ex.validation_rules || []).map(r => `
        <div class="lab-req-item">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <strong>${escapeHtml(r.desc)}</strong>
            <span style="font-size: 0.75rem; color: #38bdf8; font-family: monospace;">[${escapeHtml(r.file || 'main.tf')}]</span>
          </div>
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 3px;">💡 ${escapeHtml(r.hint || '')}</div>
        </div>
      `).join("");
    }

    updateLabStatusBadge();
    renderFileTabs();

    if (labDiagnostics) {
      labDiagnostics.style.display = "none";
    }
  }

  function updateLabStatusBadge() {
    if (!activeLab || !labStatusBadge) return;
    const isCompleted = (userProgress.completedLabs || []).includes(activeLab.id);
    if (isCompleted) {
      labStatusBadge.innerHTML = "🟢 Completed";
      labStatusBadge.style.background = "rgba(16, 185, 129, 0.2)";
      labStatusBadge.style.color = "var(--success)";
    } else {
      labStatusBadge.innerHTML = "🟡 In Progress";
      labStatusBadge.style.background = "rgba(245, 158, 11, 0.2)";
      labStatusBadge.style.color = "var(--warning)";
    }
  }

  function renderFileTabs() {
    if (!activeLab || !fileTabBar) return;
    const files = Object.keys(activeLab.starter_files || {});
    if (files.length === 0) return;

    if (!files.includes(activeLabFile)) {
      activeLabFile = files[0];
    }

    fileTabBar.innerHTML = files.map(fname => `
      <button class="file-tab ${fname === activeLabFile ? 'active' : ''}" data-file="${escapeHtml(fname)}">
        📄 ${escapeHtml(fname)}
      </button>
    `).join("");

    fileTabBar.querySelectorAll(".file-tab").forEach(tab => {
      tab.onclick = () => {
        const nextFile = tab.getAttribute("data-file");
        if (nextFile === activeLabFile) return;

        if (codeEditorArea) {
          labDrafts[`${activeLab.id}:${activeLabFile}`] = codeEditorArea.value;
          saveLabDrafts();
        }

        activeLabFile = nextFile;
        renderFileTabs();
      };
    });

    loadCurrentFileIntoEditor();
  }

  function loadCurrentFileIntoEditor() {
    if (!activeLab || !codeEditorArea) return;
    const draftKey = `${activeLab.id}:${activeLabFile}`;
    if (labDrafts[draftKey] !== undefined) {
      codeEditorArea.value = labDrafts[draftKey];
    } else {
      codeEditorArea.value = (activeLab.starter_files && activeLab.starter_files[activeLabFile]) || "";
    }
  }

  function checkLabCode() {
    if (!activeLab) return;

    if (codeEditorArea) {
      labDrafts[`${activeLab.id}:${activeLabFile}`] = codeEditorArea.value;
      saveLabDrafts();
    }

    const currentFiles = {};
    for (const fname of Object.keys(activeLab.starter_files || {})) {
      if (fname === activeLabFile && codeEditorArea) {
        currentFiles[fname] = codeEditorArea.value;
      } else {
        const draft = labDrafts[`${activeLab.id}:${fname}`];
        currentFiles[fname] = draft !== undefined ? draft : (activeLab.starter_files[fname] || "");
      }
    }

    const rules = activeLab.validation_rules || [];
    let passedCount = 0;
    const results = [];

    for (const rule of rules) {
      const targetFile = rule.file || "main.tf";
      const code = currentFiles[targetFile] || "";
      let isMatch = false;

      try {
        const regex = new RegExp(rule.pattern, "is");
        isMatch = regex.test(code);
      } catch (e) {
        console.error("Regex validation error:", e);
      }

      if (isMatch) passedCount++;
      results.push({ rule, isMatch });
    }

    const allPassed = (passedCount === rules.length && rules.length > 0);

    if (labDiagnostics) {
      labDiagnostics.style.display = "block";
    }

    if (diagSummaryBadge) {
      diagSummaryBadge.innerText = allPassed ? "All Passed! 100% Valid 🎉" : `${passedCount} / ${rules.length} Passed`;
      diagSummaryBadge.style.background = allPassed ? "rgba(16, 185, 129, 0.25)" : "rgba(239, 68, 68, 0.25)";
      diagSummaryBadge.style.color = allPassed ? "var(--success)" : "var(--danger)";
    }

    if (diagRulesList) {
      diagRulesList.innerHTML = results.map(r => `
        <div class="diag-item ${r.isMatch ? 'diag-pass' : 'diag-fail'}">
          <span class="diag-icon">${r.isMatch ? '✅' : '❌'}</span>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <strong>${escapeHtml(r.rule.desc)}</strong>
              <span class="diag-file">[${escapeHtml(r.rule.file || 'main.tf')}]</span>
            </div>
            ${!r.isMatch ? `<div class="diag-hint">💡 Hint: ${escapeHtml(r.rule.hint || '')}</div>` : ''}
          </div>
        </div>
      `).join("");
    }

    if (allPassed) {
      if (!userProgress.completedLabs) userProgress.completedLabs = [];
      if (!userProgress.completedLabs.includes(activeLab.id)) {
        userProgress.completedLabs.push(activeLab.id);
        saveLocalProgress();
        updateDashboardUI();
        updateLabStatusBadge();
        recordLabCompletionInCloud(activeLab.id, activeLab.title);
      }
    }

    if (labDiagnostics) {
      labDiagnostics.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  async function recordLabCompletionInCloud(labId, title) {
    if (!config.apiUrl || !currentUser || !currentUser.idToken) return;
    try {
      await fetch(`${config.apiUrl}/api/labs/complete`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${currentUser.idToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ lab_id: labId, title: title })
      });
    } catch (e) {
      console.warn("Could not sync lab completion to cloud API:", e);
    }
  }

  function openSolutionModal() {
    if (!activeLab || !solutionModal) return;
    if (solutionModalTitle) solutionModalTitle.innerText = `💡 Solution: ${activeLab.title}`;
    solutionModal.style.display = "flex";

    const solFiles = Object.keys(activeLab.solution_files || {});
    if (solFiles.length === 0) {
      if (solutionCodeDisplay) solutionCodeDisplay.innerHTML = "<em>No reference solution available for this exercise.</em>";
      return;
    }

    activeSolutionFile = solFiles.includes(activeLabFile) ? activeLabFile : solFiles[0];
    renderSolutionTabs();
  }

  function renderSolutionTabs() {
    const solFiles = Object.keys(activeLab.solution_files || {});
    if (solutionFileTabs) {
      solutionFileTabs.innerHTML = solFiles.map(fname => `
        <button class="file-tab ${fname === activeSolutionFile ? 'active' : ''}" data-solfile="${escapeHtml(fname)}">
          📄 ${escapeHtml(fname)}
        </button>
      `).join("");

      solutionFileTabs.querySelectorAll(".file-tab").forEach(tab => {
        tab.onclick = () => {
          activeSolutionFile = tab.getAttribute("data-solfile");
          renderSolutionTabs();
        };
      });
    }

    const solCode = (activeLab.solution_files && activeLab.solution_files[activeSolutionFile]) || "";
    if (solutionCodeDisplay) {
      solutionCodeDisplay.innerHTML = `<pre style="margin: 0; font-family: monospace; font-size: 0.88rem; line-height: 1.5; color: #f8fafc;"><code>${escapeHtml(solCode)}</code></pre>`;
    }
  }

  // Lab Studio Event Listeners
  if (openLabStudioNavBtn) openLabStudioNavBtn.onclick = () => openLabStudio();
  if (openLabStudioCardBtn) openLabStudioCardBtn.onclick = () => openLabStudio();
  if (startLab01WelcomeBtn) startLab01WelcomeBtn.onclick = () => openLabStudio("01-first-resource");
  if (exitLabStudioBtn) exitLabStudioBtn.onclick = () => switchView("dashboard");

  if (labSelect) {
    labSelect.onchange = () => loadLab(labSelect.value);
  }

  if (checkCodeBtn) {
    checkCodeBtn.onclick = checkLabCode;
  }

  if (revealSolutionBtn) {
    revealSolutionBtn.onclick = openSolutionModal;
  }

  if (closeSolutionModal) {
    closeSolutionModal.onclick = () => solutionModal.style.display = "none";
  }

  if (closeSolutionBottomBtn) {
    closeSolutionBottomBtn.onclick = () => solutionModal.style.display = "none";
  }

  if (copySolutionToEditorBtn) {
    copySolutionToEditorBtn.onclick = () => {
      if (!activeLab || !codeEditorArea) return;
      const sol = (activeLab.solution_files && activeLab.solution_files[activeLabFile]) 
        || (activeLab.solution_files && Object.values(activeLab.solution_files)[0]) 
        || "";
      codeEditorArea.value = sol;
      labDrafts[`${activeLab.id}:${activeLabFile}`] = sol;
      saveLabDrafts();
      solutionModal.style.display = "none";
      alert(`✅ Reference solution for ${activeLabFile} copied to editor! Test it with 'Check & Validate Code'.`);
    };
  }

  if (saveDraftBtn) {
    saveDraftBtn.onclick = () => {
      if (!activeLab || !codeEditorArea) return;
      labDrafts[`${activeLab.id}:${activeLabFile}`] = codeEditorArea.value;
      saveLabDrafts();
      const prevText = saveDraftBtn.innerText;
      saveDraftBtn.innerText = "Draft Saved! ✅";
      setTimeout(() => saveDraftBtn.innerText = prevText, 1500);
    };
  }

  if (resetCodeBtn) {
    resetCodeBtn.onclick = () => {
      if (!activeLab || !codeEditorArea) return;
      if (confirm(`Reset ${activeLab.title} to its clean starter template? Any unsaved edits for this exercise will be reverted.`)) {
        for (const f of Object.keys(activeLab.starter_files || {})) {
          delete labDrafts[`${activeLab.id}:${f}`];
        }
        saveLabDrafts();
        loadCurrentFileIntoEditor();
        if (labDiagnostics) labDiagnostics.style.display = "none";
      }
    };
  }

  // Roadmap Lab Buttons
  document.querySelectorAll(".start-roadmap-lab").forEach(btn => {
    btn.onclick = () => {
      const labId = btn.getAttribute("data-lab");
      if (roadmapModal) roadmapModal.style.display = "none";
      openLabStudio(labId);
    };
  });

  // Recommended Exercise Link in Question Feedback
  if (feedbackLab) {
    feedbackLab.onclick = () => {
      const text = feedbackLab.innerText || "";
      const match = text.match(/exercises\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        openLabStudio(match[1]);
      }
    };
    feedbackLab.style.cursor = "pointer";
    feedbackLab.title = "Click to jump to this lab in Lab Studio";
  }

  // ===========================================================================
  // Cognito Authentication
  // ===========================================================================
  if (openAuthBtn) {
    openAuthBtn.onclick = () => {
      if (authModal) authModal.style.display = "flex";
      showTab("signIn");
    };
  }

  if (closeAuthModal) closeAuthModal.onclick = () => { if (authModal) authModal.style.display = "none"; };
  if (tabSignIn) tabSignIn.onclick = () => showTab("signIn");
  if (tabSignUp) tabSignUp.onclick = () => showTab("signUp");
  if (tabConfirm) tabConfirm.onclick = () => showTab("confirm");

  function showTab(tab) {
    [tabSignIn, tabSignUp, tabConfirm].forEach(b => { if (b) b.classList.remove("active"); });
    [signInForm, signUpForm, confirmForm].forEach(f => { if (f) f.style.display = "none"; });
    if (authMsg) authMsg.style.display = "none";
    const title = document.getElementById("authModalTitle");

    if (tab === "signIn") {
      if (tabSignIn) tabSignIn.classList.add("active");
      if (signInForm) signInForm.style.display = "block";
      if (title) title.innerText = "Sign In to Your Account";
    } else if (tab === "signUp") {
      if (tabSignUp) tabSignUp.classList.add("active");
      if (signUpForm) signUpForm.style.display = "block";
      if (title) title.innerText = "Create Your Account";
    } else if (tab === "confirm") {
      if (tabConfirm) tabConfirm.classList.add("active");
      if (confirmForm) confirmForm.style.display = "block";
      if (title) title.innerText = "Verify Email Address";
    }
  }

  function showAuthMessage(msg, isError) {
    authMsg.style.display = "block";
    authMsg.style.background = isError ? "var(--danger-bg)" : "var(--success-bg)";
    authMsg.style.color = isError ? "var(--danger)" : "var(--success)";
    authMsg.innerText = msg;
  }

  async function cognitoApiCall(target, body) {
    if (!config.cognitoClientId) return { success: true };
    const resp = await fetch(`https://cognito-idp.${config.awsRegion}.amazonaws.com/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-amz-json-1.1",
        "X-Amz-Target": `AWSCognitoIdentityProviderService.${target}`
      },
      body: JSON.stringify(body)
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.message || data.__type || "Cognito error");
    return data;
  }

  signInForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("signInEmail").value.trim();
    const password = document.getElementById("signInPassword").value;

    try {
      showAuthMessage("Authenticating with AWS Cognito...", false);
      if (config.cognitoClientId) {
        const result = await cognitoApiCall("InitiateAuth", {
          AuthFlow: "USER_PASSWORD_AUTH",
          ClientId: config.cognitoClientId,
          AuthParameters: { USERNAME: email, PASSWORD: password }
        });
        currentUser = {
          email,
          idToken: result.AuthenticationResult.IdToken,
          accessToken: result.AuthenticationResult.AccessToken
        };
      } else {
        currentUser = { email, idToken: "dev-jwt" };
      }

      localStorage.setItem("tf_auth_user", JSON.stringify(currentUser));
      updateAuthUI();
      authModal.style.display = "none";
      await syncWithCloud();
    } catch (err) {
      showAuthMessage(err.message, true);
    }
  };

  signUpForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("signUpEmail").value.trim();
    const password = document.getElementById("signUpPassword").value;

    try {
      showAuthMessage("Creating your account on AWS...", false);
      if (config.cognitoClientId) {
        await cognitoApiCall("SignUp", {
          ClientId: config.cognitoClientId,
          Username: email,
          Password: password,
          UserAttributes: [{ Name: "email", Value: email }]
        });
      }
      showAuthMessage("Account created! Check your email for your 6-digit verification code.", false);
      document.getElementById("confirmEmail").value = email;
      showTab("confirm");
    } catch (err) {
      showAuthMessage(err.message, true);
    }
  };

  confirmForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("confirmEmail").value.trim();
    const code = document.getElementById("confirmCode").value.trim();

    try {
      showAuthMessage("Verifying code...", false);
      if (config.cognitoClientId) {
        await cognitoApiCall("ConfirmSignUp", {
          ClientId: config.cognitoClientId,
          Username: email,
          ConfirmationCode: code
        });
      }
      showAuthMessage("Account verified! You can now sign in.", false);
      document.getElementById("signInEmail").value = email;
      showTab("signIn");
    } catch (err) {
      showAuthMessage(err.message, true);
    }
  };

  if (signOutBtn) {
    signOutBtn.onclick = () => {
      currentUser = null;
      localStorage.removeItem("tf_auth_user");
      updateAuthUI();
      if (syncStat) syncStat.innerText = "Clean Slate 🟢";
    };
  }

  function restoreAuthSession() {
    const raw = localStorage.getItem("tf_auth_user");
    if (raw) {
      try { currentUser = JSON.parse(raw); } catch (e) {}
    }
    updateAuthUI();
  }

  function updateAuthUI() {
    if (currentUser) {
      unauthControls.style.display = "none";
      authControls.style.display = "flex";
      userEmailBadge.innerText = currentUser.email;
    } else {
      unauthControls.style.display = "flex";
      authControls.style.display = "none";
    }
  }

  // Launch!
  window.addEventListener("DOMContentLoaded", init);
})();
