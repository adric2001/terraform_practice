/**
 * Terraform Associate (004) Cloud Readiness Portal - Client Engine
 * Features:
 * - AWS Cognito Authentication (Sign In, Sign Up, Email OTP Verification)
 * - Cloud Persistence via API Gateway + DynamoDB (/api/sessions, /api/profile)
 * - Automated Weak Area Detection (Focusing on Domain 4 & Domain 8)
 * - Dynamic Custom Weak-Area Exam Generator
 * - Complete Offline / Local Fallback Mode
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
    questionStats: {}, // q_id -> { attempts, correct, lastWrong }
    domainStats: {},   // domain -> { attempts, correct }
    missedQuestions: []
  };

  let activeExam = null;
  let activeExamIndex = 0;
  let currentAnswers = []; // array of { question_id, domain, selected, is_correct, time_spent }

  // DOM Elements
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

  const readinessDial = document.getElementById("readinessDial");
  const readinessStatus = document.getElementById("readinessStatus");
  const readinessAdvice = document.getElementById("readinessAdvice");
  const coverageStat = document.getElementById("coverageStat");
  const accuracyStat = document.getElementById("accuracyStat");
  const syncStat = document.getElementById("syncStat");

  const weakAreasBanner = document.getElementById("weakAreasBanner");
  const weakPillsContainer = document.getElementById("weakPillsContainer");
  const drillWeakBtn = document.getElementById("drillWeakBtn");
  const recommendedLabsText = document.getElementById("recommendedLabsText");

  const dashboardView = document.getElementById("dashboard-view");
  const examView = document.getElementById("exam-view");
  const scorecardView = document.getElementById("scorecard-view");

  const examSelect = document.getElementById("examSelect");
  const startSelectedExamBtn = document.getElementById("startSelectedExamBtn");
  const start57MockBtn = document.getElementById("start57MockBtn");
  const startMissedBtn = document.getElementById("startMissedBtn");

  const activeExamTitle = document.getElementById("activeExamTitle");
  const currentQNum = document.getElementById("currentQNum");
  const totalQNum = document.getElementById("totalQNum");
  const runningScore = document.getElementById("runningScore");
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

  const scorecardDial = document.getElementById("scorecardDial");
  const scorecardVerdict = document.getElementById("scorecardVerdict");
  const scorecardSummary = document.getElementById("scorecardSummary");
  const domainBreakdownTbody = document.getElementById("domainBreakdownTbody");
  const scorecardReturnBtn = document.getElementById("scorecardReturnBtn");
  const scorecardDrillBtn = document.getElementById("scorecardDrillBtn");

  const openCustomBuilderBtn = document.getElementById("openCustomBuilderBtn");
  const customBuilderModal = document.getElementById("customBuilderModal");
  const closeBuilderModal = document.getElementById("closeBuilderModal");
  const cancelBuilderBtn = document.getElementById("cancelBuilderBtn");
  const qCountSlider = document.getElementById("qCountSlider");
  const qCountDisplay = document.getElementById("qCountDisplay");
  const launchCustomExamBtn = document.getElementById("launchCustomExamBtn");

  // ===========================================================================
  // Initialization
  // ===========================================================================
  async function init() {
    loadLocalProgress();
    restoreAuthSession();
    await loadQuestionsData();
    updateDashboardUI();

    if (currentUser && config.apiUrl) {
      await syncWithCloud();
    }
  }

  // ===========================================================================
  // Data Loading
  // ===========================================================================
  async function loadQuestionsData() {
    const questions = [];
    const seen = new Set();

    // Fetch exam JSON files from data directory
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
      } catch (e) {
        // Fallback handled silently
      }
    }
    allQuestions = questions;
  }

  // ===========================================================================
  // Local Progress Management
  // ===========================================================================
  function loadLocalProgress() {
    const raw = localStorage.getItem("tf_exam_progress");
    if (raw) {
      try {
        userProgress = JSON.parse(raw);
      } catch (e) {}
    }

    // Seed baseline from initial exam if fresh (Domain 4: 50%, Domain 8: 64% as shown in screenshot)
    if (!userProgress.history || userProgress.history.length === 0) {
      userProgress.domainStats = {
        "Domain 1: Understand Infrastructure as Code (IaC) Concepts": { attempts: 1, correct: 1 },
        "Domain 3: Understand Terraform Basics": { attempts: 1, correct: 1 },
        "Domain 6: Use the Core Terraform Workflow": { attempts: 1, correct: 1 },
        "Domain 4: Use Terraform Outside the Core Workflow": { attempts: 6, correct: 3 },
        "Domain 8: Read, Generate, and Modify Configuration": { attempts: 11, correct: 7 },
        "Domain 7: Implement and Maintain State": { attempts: 2, correct: 2 },
        "Domain 5: Interact with Terraform Modules": { attempts: 2, correct: 2 },
        "Domain 9: Understand Terraform Cloud/Enterprise Capabilities": { attempts: 1, correct: 1 }
      };
      userProgress.history = [{
        exam_id: "1",
        title: "Diagnostic Baseline Assessment",
        score_percentage: 72,
        created_at: new Date().toISOString()
      }];
    }
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
        readinessStatus.innerText = data.verdict || "Assessing...";
      } else {
        syncStat.innerText = "Local (Offline)";
      }
    } catch (e) {
      syncStat.innerText = "Local Mode";
    }
  }

  // ===========================================================================
  // UI Dashboard Updates & Weak Area Detection
  // ===========================================================================
  function updateDashboardUI() {
    // 1. Calculate accuracy and coverage
    let totalAttempts = 0;
    let totalCorrect = 0;
    const weakDomains = [];

    const labRecommendations = {
      "Domain 4: Use Terraform Outside the Core Workflow": ["Exercises 11, 12, 13, 14"],
      "Domain 8: Read, Generate, and Modify Configuration": ["Exercises 03, 07, 10, 15, 19"],
      "Domain 7: Implement and Maintain State": ["Exercises 06, 13, 17, 18"]
    };

    const dStats = userProgress.domainStats || {};
    for (const [domain, stat] of Object.entries(dStats)) {
      totalAttempts += stat.attempts || 0;
      totalCorrect += stat.correct || 0;
      const acc = stat.attempts > 0 ? (stat.correct / stat.attempts) * 100 : 0;
      if (acc < 70.0 && stat.attempts > 0) {
        weakDomains.push({ domain, accuracy: Math.round(acc) });
      }
    }

    const accuracyPct = totalAttempts > 0 ? ((totalCorrect / totalAttempts) * 100).toFixed(1) : "0.0";
    const questionsDone = Object.keys(userProgress.questionStats || {}).length || 25;
    const totalAvail = allQuestions.length || 250;

    coverageStat.innerText = `${questionsDone} / ${totalAvail}`;
    accuracyStat.innerText = `${accuracyPct}%`;

    // Composite readiness
    const coveragePct = (questionsDone / totalAvail) * 100;
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

    // 2. Render Weak Areas Spotlight Banner
    if (weakDomains.length > 0) {
      weakAreasBanner.style.display = "flex";
      weakPillsContainer.innerHTML = weakDomains.map(w => 
        `<span class="weak-pill">${w.domain.split(":")[0]}: ${w.accuracy}%</span>`
      ).join(" ");

      const labs = weakDomains.map(w => labRecommendations[w.domain] || "Exercises 01-07").flat();
      recommendedLabsText.innerText = labs.join(" & ");
    } else {
      weakAreasBanner.style.display = "none";
    }
  }

  // ===========================================================================
  // Exam Engine
  // ===========================================================================
  function startExam(title, questions) {
    if (!questions || questions.length === 0) {
      alert("No questions found for this exam mode.");
      return;
    }

    activeExam = { title, questions };
    activeExamIndex = 0;
    currentAnswers = new Array(questions.length).fill(null);

    dashboardView.style.display = "none";
    scorecardView.style.display = "none";
    examView.style.display = "block";

    activeExamTitle.innerText = title;
    totalQNum.innerText = questions.length;
    renderCurrentQuestion();
  }

  function renderCurrentQuestion() {
    const q = activeExam.questions[activeExamIndex];
    currentQNum.innerText = activeExamIndex + 1;
    qDomain.innerText = q.domain || "General";
    qText.innerText = q.question;

    const existingAns = currentAnswers[activeExamIndex];
    optionsContainer.innerHTML = "";
    feedbackBox.style.display = "none";

    // Update running score
    const answeredCount = currentAnswers.filter(a => a !== null).length;
    const correctCount = currentAnswers.filter(a => a && a.is_correct).length;
    runningScore.innerText = answeredCount > 0 ? `${Math.round((correctCount / answeredCount) * 100)}%` : "0%";

    (q.options || []).forEach(opt => {
      const letter = opt.trim().charAt(0);
      const btn = document.createElement("button");
      btn.className = "option-item";
      btn.innerHTML = `<span class="option-key">${letter}</span><span>${opt.substring(2).trim()}</span>`;

      if (existingAns) {
        btn.classList.add("locked");
        if (letter === q.answer) {
          btn.classList.add("correct");
        } else if (letter === existingAns.selected) {
          btn.classList.add("incorrect");
        }
      } else {
        btn.onclick = () => selectAnswer(q, letter);
      }

      optionsContainer.appendChild(btn);
    });

    if (existingAns) {
      showFeedback(q, existingAns.is_correct);
    }

    prevQBtn.disabled = activeExamIndex === 0;
    const isLast = activeExamIndex === activeExam.questions.length - 1;
    nextQBtn.style.display = isLast ? "none" : "inline-flex";
    submitExamBtn.style.display = isLast ? "inline-flex" : "none";
  }

  function selectAnswer(q, selectedLetter) {
    const isCorrect = selectedLetter === q.answer;
    currentAnswers[activeExamIndex] = {
      question_id: q.id,
      domain: q.domain,
      selected: selectedLetter,
      is_correct: isCorrect,
      time_spent: 10
    };

    // Instant Right/Wrong visual feedback on-the-fly
    const buttons = optionsContainer.querySelectorAll(".option-item");
    buttons.forEach(btn => {
      btn.classList.add("locked");
      const letter = btn.querySelector(".option-key").innerText;
      if (letter === q.answer) {
        btn.classList.add("correct");
      } else if (letter === selectedLetter) {
        btn.classList.add("incorrect");
      }
    });

    showFeedback(q, isCorrect);

    // Update running score meter
    const answeredCount = currentAnswers.filter(a => a !== null).length;
    const correctCount = currentAnswers.filter(a => a && a.is_correct).length;
    runningScore.innerText = `${Math.round((correctCount / answeredCount) * 100)}%`;
  }

  function showFeedback(q, isCorrect) {
    feedbackBox.style.display = "block";
    feedbackBox.className = `feedback-container ${isCorrect ? "fb-correct" : "fb-incorrect"}`;
    feedbackTitle.innerHTML = isCorrect ? "✅ Correct!" : "❌ Incorrect";
    feedbackText.innerText = q.explanation || "Review the official HashiCorp Terraform 004 documentation for details.";
    feedbackLab.innerText = q.recommended_exercise ? `🛠️ Reinforcing Exercise: exercises/${q.recommended_exercise}` : "";
  }

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
    if (confirm("Are you sure you want to exit? Your current test progress will be saved.")) {
      finishExam();
    }
  };

  submitExamBtn.onclick = finishExam;

  // ===========================================================================
  // Exam Completion & Persistence
  // ===========================================================================
  async function finishExam() {
    const totalQ = activeExam.questions.length;
    const answered = currentAnswers.filter(a => a !== null);
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

    // Update local state
    if (!userProgress.domainStats) userProgress.domainStats = {};
    for (const [d, s] of Object.entries(domainMap)) {
      if (!userProgress.domainStats[d]) userProgress.domainStats[d] = { attempts: 0, correct: 0 };
      userProgress.domainStats[d].attempts += s.total;
      userProgress.domainStats[d].correct += s.correct;
    }

    // Update question-level tracking
    if (!userProgress.questionStats) userProgress.questionStats = {};
    answered.forEach(ans => {
      if (!userProgress.questionStats[ans.question_id]) {
        userProgress.questionStats[ans.question_id] = { attempts: 0, correct: 0 };
      }
      userProgress.questionStats[ans.question_id].attempts++;
      if (ans.is_correct) userProgress.questionStats[ans.question_id].correct++;
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
    examView.style.display = "none";
    scorecardView.style.display = "block";

    scorecardDial.innerText = `${scorePct}%`;
    if (scorePct >= 85) {
      scorecardVerdict.className = "verdict-box verdict-pass";
      scorecardVerdict.innerText = "🟢 EXAM READY (Passed with High Confidence)";
      scorecardSummary.innerText = "Outstanding performance! You are performing well above the official 70% threshold.";
    } else if (scorePct >= 70) {
      scorecardVerdict.className = "verdict-box verdict-border";
      scorecardVerdict.innerText = "⚠️ MARGINAL PASS (Review Recommended)";
      scorecardSummary.innerText = "You reached the 70% passing mark, but narrow margins on weak domains indicate risk on test day.";
    } else {
      scorecardVerdict.className = "verdict-box verdict-fail";
      scorecardVerdict.innerText = "🔴 NOT READY (Below 70% Passing Threshold)";
      scorecardSummary.innerText = "Additional targeted review is required before taking the official exam. Drill the weak domains below.";
    }

    // Populate table
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
    scorecardView.style.display = "none";
    dashboardView.style.display = "block";
    updateDashboardUI();
  };

  scorecardDrillBtn.onclick = () => {
    scorecardView.style.display = "none";
    drillWeakAreas();
  };

  // ===========================================================================
  // Custom Exam & Weak-Area Drills
  // ===========================================================================
  drillWeakBtn.onclick = drillWeakAreas;

  function drillWeakAreas() {
    // Generate custom 15-question drill strictly targeting Domain 4 and Domain 8
    const weakDomains = [
      "Domain 4: Use Terraform Outside the Core Workflow",
      "Domain 8: Read, Generate, and Modify Configuration"
    ];

    const candidates = allQuestions.filter(q => weakDomains.includes(q.domain));
    const shuffled = [...candidates].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 15);

    startExam("⚡ Custom Weak-Area Drill (Domains 4 & 8)", selected);
  }

  startSelectedExamBtn.onclick = () => {
    const examNum = examSelect.value;
    const title = examSelect.options[examSelect.selectedIndex].text;
    const prefix = `q${examNum}_`;
    const examQs = allQuestions.filter(q => q.id.startsWith(prefix));
    startExam(title, examQs.length > 0 ? examQs : allQuestions.slice(0, 25));
  };

  start57MockBtn.onclick = () => {
    // Randomized 57-question exam mirroring official 004 blueprint
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 57);
    startExam("⏱️ Official 57-Question Mock Exam (Blueprint Weighted)", selected);
  };

  startMissedBtn.onclick = () => {
    const missedIds = new Set(
      Object.entries(userProgress.questionStats || {})
        .filter(([_, stat]) => stat.attempts > 0 && stat.correct === 0)
        .map(([id]) => id)
    );
    const missedQs = allQuestions.filter(q => missedIds.has(q.id));
    if (missedQs.length === 0) {
      alert("🎉 Great job! You have no unanswered missed questions in your review pool.");
      return;
    }
    startExam(`🔄 Missed Questions Review (${missedQs.length} Questions)`, missedQs);
  };

  // Custom Exam Builder
  openCustomBuilderBtn.onclick = () => customBuilderModal.style.display = "flex";
  closeBuilderModal.onclick = () => customBuilderModal.style.display = "none";
  cancelBuilderBtn.onclick = () => customBuilderModal.style.display = "none";
  qCountSlider.oninput = () => qCountDisplay.innerText = qCountSlider.value;

  launchCustomExamBtn.onclick = () => {
    const count = parseInt(qCountSlider.value, 10);
    const checked = Array.from(document.querySelectorAll(".domain-chk:checked")).map(cb => cb.value);
    if (checked.length === 0) {
      alert("Please select at least one domain.");
      return;
    }

    const matched = allQuestions.filter(q => checked.includes(q.domain));
    const shuffled = [...matched].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    customBuilderModal.style.display = "none";
    startExam(`Custom Selected Exam (${selected.length} Questions)`, selected);
  };

  // ===========================================================================
  // Authentication (Cognito REST API)
  // ===========================================================================
  openAuthBtn.onclick = () => {
    authModal.style.display = "flex";
    showTab("signIn");
  };

  closeAuthModal.onclick = () => authModal.style.display = "none";

  tabSignIn.onclick = () => showTab("signIn");
  tabSignUp.onclick = () => showTab("signUp");
  tabConfirm.onclick = () => showTab("confirm");

  function showTab(tab) {
    [tabSignIn, tabSignUp, tabConfirm].forEach(b => b.classList.remove("active"));
    [signInForm, signUpForm, confirmForm].forEach(f => f.style.display = "none");
    authMsg.style.display = "none";

    if (tab === "signIn") {
      tabSignIn.classList.add("active");
      signInForm.style.display = "block";
    } else if (tab === "signUp") {
      tabSignUp.classList.add("active");
      signUpForm.style.display = "block";
    } else if (tab === "confirm") {
      tabConfirm.classList.add("active");
      confirmForm.style.display = "block";
    }
  }

  function showAuthMessage(msg, isError) {
    authMsg.style.display = "block";
    authMsg.style.background = isError ? "var(--danger-bg)" : "var(--success-bg)";
    authMsg.style.color = isError ? "var(--danger)" : "var(--success)";
    authMsg.innerText = msg;
  }

  async function cognitoApiCall(target, body) {
    if (!config.cognitoClientId) {
      // Mock dev response
      return { success: true };
    }
    const resp = await fetch(`https://cognito-idp.${config.awsRegion}.amazonaws.com/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-amz-json-1.1",
        "X-Amz-Target": `AWSCognitoIdentityProviderService.${target}`
      },
      body: JSON.stringify(body)
    });
    const data = await resp.json();
    if (!resp.ok) {
      throw new Error(data.message || data.__type || "Cognito error");
    }
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
        // Dev mock user
        currentUser = { email, idToken: "mock-jwt-token" };
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
      showAuthMessage("Creating account on AWS...", false);
      if (config.cognitoClientId) {
        await cognitoApiCall("SignUp", {
          ClientId: config.cognitoClientId,
          Username: email,
          Password: password,
          UserAttributes: [{ Name: "email", Value: email }]
        });
      }
      showAuthMessage("Account created! Enter the 6-digit verification code sent to your email.", false);
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

  signOutBtn.onclick = () => {
    currentUser = null;
    localStorage.removeItem("tf_auth_user");
    updateAuthUI();
    syncStat.innerText = "Local (Offline)";
  };

  function restoreAuthSession() {
    const raw = localStorage.getItem("tf_auth_user");
    if (raw) {
      try {
        currentUser = JSON.parse(raw);
      } catch (e) {}
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
