import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/OnboardingPage.css";

/*
 * NOTE (future backend/database integration):
 * The values collected on this page — Display Name, Profile Photo, Bio,
 * Subjects, Study Days, and Study Hours — are currently held only in local
 * component state and are not persisted anywhere permanent. Once backend
 * and database integration is complete, these same fields should be saved
 * to the student's profile record and then loaded/reused throughout the
 * rest of the platform (Command Center welcome section, navbar avatar,
 * StudyPath, Profile Settings, etc.) instead of relying on local state.
 * No frontend redesign is required for this — only the data source for
 * these fields needs to change from local state to the backend/database.
 */

const STEPS = [
  { id: 1, label: "Profile" },
  { id: 2, label: "Subjects" },
  { id: 3, label: "Goals" },
  { id: 4, label: "Schedule" },
];

const DEFAULT_SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology",
  "History", "Geography", "English", "Computer Science",
  "Economics", "Political Science", "Psychology", "Philosophy",
];

const GOAL_OPTIONS = [
  { id: "exam", label: "Ace an Upcoming Exam", icon: "🎯" },
  { id: "university", label: "University Entrance", icon: "🎓" },
  { id: "career", label: "Career Development", icon: "💼" },
  { id: "hobby", label: "Personal Enrichment", icon: "🌱" },
];

const DAILY_HOURS = ["Less than 1 hour", "1–2 hours", "2–4 hours", "4+ hours"];
const STUDY_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const OnboardingPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const [step, setStep] = useState(1);
  // Display Name, Bio, and Profile Photo (avatarUrl) — will be persisted to
  // the backend/database and reused across the platform once integrated.
  const [profileData, setProfileData] = useState({
    displayName: "",
    bio: "",
    avatarUrl: null,
  });
  const [subjectOptions, setSubjectOptions] = useState(DEFAULT_SUBJECTS);
  // Subjects selection — will be loaded from/saved to the backend/database.
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [customSubjectInput, setCustomSubjectInput] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  // Study Hours and Study Days — will be loaded from/saved to the backend/database.
  const [dailyHours, setDailyHours] = useState("");
  const [studyDays, setStudyDays] = useState([]);
  const [errors, setErrors] = useState({});

  // Always begin this page from the top when navigated to from another page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ------- navigation ------- */
  const validateStep = () => {
    const e = {};
    if (step === 1 && !profileData.displayName.trim()) {
      e.displayName = "Display name is required.";
    }
    if (step === 2 && selectedSubjects.length === 0) {
      e.subjects = "Please select at least one subject.";
    }
    if (step === 3 && !selectedGoal) {
      e.goal = "Please select a learning goal.";
    }
    if (step === 4) {
      if (!dailyHours) e.dailyHours = "Please select your daily study time.";
      if (studyDays.length === 0) e.studyDays = "Please select at least one day.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (!validateStep()) return;
    if (step < STEPS.length) {
      setStep((s) => s + 1);
    } else {
      goToCommandCenter();
    }
  };

  const handleSkip = () => {
    if (step < STEPS.length) {
      setStep((s) => s + 1);
    } else {
      goToCommandCenter();
    }
  };

  const handleBack = () => setStep((s) => s - 1);

  /* ------- persistence -------
     Stores the collected profile data (Display Name, Profile Photo, Bio,
     Subjects, Study Days, Study Hours) to localStorage under the same key
     Command Center reads from, so the Display Name (and other fields) are
     available there. Frontend/local-storage persistence only — no backend
     integration yet. */
  const persistProfile = () => {
    try {
      const existingRaw = localStorage.getItem('edusphere_profile');
      const existing = existingRaw ? JSON.parse(existingRaw) : {};
      const updated = {
        ...existing,
        ...(profileData.displayName.trim() ? { displayName: profileData.displayName.trim() } : {}),
        ...(profileData.avatarUrl ? { avatarUrl: profileData.avatarUrl } : {}),
        bio: profileData.bio || existing.bio || '',
        subjects: selectedSubjects.length ? selectedSubjects : (existing.subjects || []),
        dailyHours: dailyHours || existing.dailyHours || '',
        studyDays: studyDays.length ? studyDays : (existing.studyDays || []),
      };
      localStorage.setItem('edusphere_profile', JSON.stringify(updated));
    } catch (e) {
      // localStorage unavailable — Display Name will fall back to default in Command Center
    }
  };

  const goToCommandCenter = () => {
    persistProfile();
    navigate("/command-center");
  };

  /* ------- avatar ------- */
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileData((p) => ({ ...p, avatarUrl: url }));
    }
  };

  /* ------- subjects ------- */
  const toggleSubject = (s) => {
    setSelectedSubjects((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
    if (errors.subjects) setErrors((e) => ({ ...e, subjects: undefined }));
  };

  const handleAddCustomSubject = () => {
    const trimmed = customSubjectInput.trim();
    if (!trimmed) return;
    // Avoid duplicates (case-insensitive check)
    const alreadyExists = subjectOptions.some(
      (s) => s.toLowerCase() === trimmed.toLowerCase()
    );
    if (!alreadyExists) {
      setSubjectOptions((prev) => [...prev, trimmed]);
    }
    // Auto-select it
    if (!selectedSubjects.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setSelectedSubjects((prev) => [...prev, alreadyExists ? subjectOptions.find(s => s.toLowerCase() === trimmed.toLowerCase()) : trimmed]);
    }
    setCustomSubjectInput("");
    if (errors.subjects) setErrors((e) => ({ ...e, subjects: undefined }));
  };

  const handleCustomSubjectKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustomSubject();
    }
  };

  /* ------- study days ------- */
  const toggleDay = (d) => {
    setStudyDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
    if (errors.studyDays) setErrors((e) => ({ ...e, studyDays: undefined }));
  };

  const progressPct = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="ob-root">
      {/* Header */}
      <div className="ob-header">
        <div className="ob-header-inner">
          <button className="ob-logo" onClick={() => navigate("/")}>
            <span className="logo-mark">E</span>
            <span className="logo-text">EduSphere</span>
          </button>
          <button className="ob-skip-top" onClick={goToCommandCenter}>
            Skip setup
          </button>
        </div>
      </div>

      <div className="ob-body">
        {/* Progress Panel */}
        <div className="ob-progress-panel">
          <div className="ob-progress-title">Setup Progress</div>

          {/* Linear bar */}
          <div className="ob-bar-track">
            <div className="ob-bar-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="ob-bar-label">{step} of {STEPS.length} steps</div>

          {/* Step pills */}
          <div className="ob-steps-list">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className={`ob-step-item ${
                  s.id < step
                    ? "step-done"
                    : s.id === step
                    ? "step-active"
                    : "step-pending"
                }`}
              >
                <div className="step-bubble">
                  {s.id < step ? "✓" : s.id}
                </div>
                <span className="step-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="ob-tip-box">
            <span className="ob-tip-icon">💡</span>
            <p className="ob-tip-text">
              You can update all your settings later from Command Center.
            </p>
          </div>
        </div>

        {/* Step Content */}
        <div className="ob-content">
          <div className="ob-card">
            {/* Step 1: Profile */}
            {step === 1 && (
              <div className="ob-step-body">
                <div className="ob-step-header">
                  <span className="ob-step-eyebrow">Step 1 of 4</span>
                  <h2 className="ob-step-title">Set up your profile</h2>
                  <p className="ob-step-sub">
                    Your display name will appear throughout the platform.
                    Add a photo to personalise your dashboard.
                  </p>
                </div>

                {/* Avatar Upload */}
                <div className="avatar-upload-area">
                  <div
                    className="avatar-preview"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {profileData.avatarUrl ? (
                      <img src={profileData.avatarUrl} alt="Avatar" className="avatar-img" />
                    ) : (
                      <div className="avatar-placeholder">
                        <span className="avatar-placeholder-icon">📷</span>
                        <span className="avatar-placeholder-text">Upload Photo</span>
                      </div>
                    )}
                    <div className="avatar-overlay">
                      <span>Change</span>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleAvatarChange}
                  />
                  <p className="avatar-hint">JPG, PNG or GIF · Max 5 MB</p>
                </div>

                {/* Display Name */}
                <div className="form-group">
                  <label className="form-label">Display Name <span className="required-star">*</span></label>
                  <input
                    className={`form-input ${errors.displayName ? "input-error" : ""}`}
                    type="text"
                    placeholder="How should we call you?"
                    value={profileData.displayName}
                    onChange={(e) => {
                      setProfileData((p) => ({ ...p, displayName: e.target.value }));
                      if (errors.displayName) setErrors((er) => ({ ...er, displayName: undefined }));
                    }}
                  />
                  {errors.displayName && (
                    <span className="error-msg">{errors.displayName}</span>
                  )}
                </div>

                {/* Bio */}
                <div className="form-group">
                  <label className="form-label">
                    Short Bio <span className="form-optional">(optional)</span>
                  </label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    placeholder="Tell us a little about yourself and your learning goals..."
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData((p) => ({ ...p, bio: e.target.value }))
                    }
                  />
                </div>
              </div>
            )}

            {/* Step 2: Subjects */}
            {step === 2 && (
              <div className="ob-step-body">
                <div className="ob-step-header">
                  <span className="ob-step-eyebrow">Step 2 of 4</span>
                  <h2 className="ob-step-title">Choose your subjects</h2>
                  <p className="ob-step-sub">
                    Select the subjects you are studying. Can't find yours?
                    Add a custom subject below.
                  </p>
                </div>

                {errors.subjects && (
                  <div className="ob-alert">{errors.subjects}</div>
                )}

                <div className="subject-grid">
                  {subjectOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`subject-chip ${selectedSubjects.includes(s) ? "chip-active" : ""}`}
                      onClick={() => toggleSubject(s)}
                    >
                      <span className="chip-check">{selectedSubjects.includes(s) ? "✓" : ""}</span>
                      {s}
                    </button>
                  ))}
                </div>

                {/* Custom subject input */}
                <div className="custom-subject-row">
                  <input
                    className="form-input custom-subject-input"
                    type="text"
                    placeholder="Add your own subject..."
                    value={customSubjectInput}
                    onChange={(e) => setCustomSubjectInput(e.target.value)}
                    onKeyDown={handleCustomSubjectKeyDown}
                  />
                  <button
                    type="button"
                    className="btn-add-subject"
                    onClick={handleAddCustomSubject}
                    disabled={!customSubjectInput.trim()}
                  >
                    + Add
                  </button>
                </div>

                {selectedSubjects.length > 0 && (
                  <p className="ob-selection-note">
                    {selectedSubjects.length} subject{selectedSubjects.length > 1 ? "s" : ""} selected
                  </p>
                )}
              </div>
            )}

            {/* Step 3: Goals */}
            {step === 3 && (
              <div className="ob-step-body">
                <div className="ob-step-header">
                  <span className="ob-step-eyebrow">Step 3 of 4</span>
                  <h2 className="ob-step-title">What's your main goal?</h2>
                  <p className="ob-step-sub">
                    This helps us tailor your StudyPath and recommended resources.
                  </p>
                </div>

                {errors.goal && <div className="ob-alert">{errors.goal}</div>}

                <div className="goal-grid">
                  {GOAL_OPTIONS.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      className={`goal-card ${selectedGoal === g.id ? "goal-active" : ""}`}
                      onClick={() => {
                        setSelectedGoal(g.id);
                        if (errors.goal) setErrors((e) => ({ ...e, goal: undefined }));
                      }}
                    >
                      <span className="goal-icon">{g.icon}</span>
                      <span className="goal-label">{g.label}</span>
                      {selectedGoal === g.id && (
                        <span className="goal-check">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Schedule */}
            {step === 4 && (
              <div className="ob-step-body">
                <div className="ob-step-header">
                  <span className="ob-step-eyebrow">Step 4 of 4</span>
                  <h2 className="ob-step-title">Plan your study schedule</h2>
                  <p className="ob-step-sub">
                    Tell us how much time you have and which days you study.
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-label">Daily Study Time</label>
                  <div className="hours-grid">
                    {DAILY_HOURS.map((h) => (
                      <button
                        key={h}
                        type="button"
                        className={`hours-chip ${dailyHours === h ? "chip-active" : ""}`}
                        onClick={() => {
                          setDailyHours(h);
                          if (errors.dailyHours)
                            setErrors((e) => ({ ...e, dailyHours: undefined }));
                        }}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                  {errors.dailyHours && (
                    <span className="error-msg">{errors.dailyHours}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Study Days</label>
                  <div className="days-row">
                    {STUDY_DAYS.map((d) => (
                      <button
                        key={d}
                        type="button"
                        className={`day-chip ${studyDays.includes(d) ? "day-active" : ""}`}
                        onClick={() => toggleDay(d)}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                  {errors.studyDays && (
                    <span className="error-msg">{errors.studyDays}</span>
                  )}
                </div>

                <div className="ob-summary-box">
                  <div className="summary-icon">🎉</div>
                  <div>
                    <div className="summary-title">Almost there!</div>
                    <p className="summary-text">
                      Click <strong>Finish Setup</strong> to open your
                      EduSphere dashboard and start your academic journey.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="ob-actions">
              <div className="ob-actions-left">
                {step > 1 && (
                  <button className="btn-back" onClick={handleBack}>
                    ← Back
                  </button>
                )}
              </div>
              <div className="ob-actions-right">
                <button className="btn-skip" onClick={handleSkip}>
                  Skip this step
                </button>
                <button className="btn-continue" onClick={handleContinue}>
                  {step === STEPS.length ? "Finish Setup 🚀" : "Continue →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;