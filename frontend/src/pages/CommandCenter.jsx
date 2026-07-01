import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CommandCenter.css';

const DEFAULT_NAME = 'Student';

const DEFAULT_SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology',
  'History', 'Geography', 'English', 'Computer Science',
  'Economics', 'Political Science', 'Psychology', 'Philosophy',
];
const DAILY_HOURS = ['Less than 1 hour', '1–2 hours', '2–4 hours', '4+ hours'];
const STUDY_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const DEFAULT_PROFILE = {
  displayName: DEFAULT_NAME,
  avatarUrl: null,
  bio: '',
  subjects: [],
  dailyHours: '',
  studyDays: [],
};

const MODULES = [
  { icon: '🚀', title: 'Mission Control', desc: 'Tasks, reminders & deadlines', route: '/mission-control', accent: 'mod-blue' },
  { icon: '🧠', title: 'Knowledge Vault', desc: 'Organise academic resources', route: '/knowledge-vault', accent: 'mod-purple' },
  { icon: '🗺️', title: 'StudyPath', desc: 'Personal weekly study planner', route: '/study-path', accent: 'mod-teal' },
  { icon: '⚡', title: 'RapidPrep', desc: 'Exam prep with past papers', route: '/rapid-prep', accent: 'mod-amber' },
  { icon: '📊', title: 'ProgressIQ', desc: 'Activity-based progress tracking', route: '/progress-iq', accent: 'mod-green' },
];

const UPCOMING_TASKS = [
  { name: 'Mathematics Assignment – Chapter 4', subject: 'Mathematics', due: 'Jun 25, 2026' },
  { name: 'English Essay Submission', subject: 'English', due: 'Jun 27, 2026' },
  { name: 'Physics Lab Report', subject: 'Physics', due: 'Jun 28, 2026' },
  { name: 'DBMS Assignment', subject: 'Database Systems', due: 'Jun 30, 2026' },
];

const RECENT_ACTIVITY = [
  { text: 'Completed assignment for Advanced Mathematics', time: '2 hours ago', icon: '✅' },
  { text: 'Added notes for Computer Networks', time: '1 day ago', icon: '📝' },
  { text: 'Scored 90% on Physics Quiz', time: '2 days ago', icon: '🏆' },
  { text: 'Downloaded Chemistry lab practical guide', time: '3 days ago', icon: '📄' },
];

const STUDY_REMINDER = {
  icon: '📅',
  heading: "Today's Study Reminder",
  message: "You have 2 pending tasks due this week. Review your Physics lab report and complete the Mathematics assignment to stay on track.",
};

// Platform Announcements — will later be loaded from the backend, where
// Admins create and manage these announcements via the Admin Dashboard.
const PLATFORM_ANNOUNCEMENTS = [
  { icon: '📢', title: 'Platform Maintenance', message: 'Scheduled maintenance this weekend. Some features may be briefly unavailable.' },
  { icon: '📢', title: 'New Feature Released', message: 'You can now track your study streaks from the ProgressIQ module.' },
  { icon: '📢', title: 'Welcome to EduSphere', message: 'Glad to have you here — explore your modules and set up your study plan.' },
];

export default function CommandCenter() {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [studentName, setStudentName] = useState(DEFAULT_NAME);
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsForm, setSettingsForm] = useState(DEFAULT_PROFILE);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const fileInputRef = useRef(null);

  // Always begin this page from the top when navigated to from another page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('edusphere_profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        const merged = { ...DEFAULT_PROFILE, ...parsed };
        setProfile(merged);
        if (merged.displayName) setStudentName(merged.displayName);
      }
    } catch (e) {
      // localStorage unavailable or malformed — keep default name
    }
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const openSettings = () => {
    setSettingsForm(profile);
    setShowUserMenu(false);
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const handleSettingsAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSettingsForm((p) => ({ ...p, avatarUrl: url }));
    }
  };

  const toggleSettingsSubject = (s) => {
    setSettingsForm((p) => ({
      ...p,
      subjects: p.subjects.includes(s)
        ? p.subjects.filter((x) => x !== s)
        : [...p.subjects, s],
    }));
  };

  const toggleSettingsDay = (d) => {
    setSettingsForm((p) => ({
      ...p,
      studyDays: p.studyDays.includes(d)
        ? p.studyDays.filter((x) => x !== d)
        : [...p.studyDays, d],
    }));
  };

  const handleSaveSettings = () => {
    const updated = {
      ...settingsForm,
      displayName: settingsForm.displayName.trim() || DEFAULT_NAME,
    };
    setProfile(updated);
    setStudentName(updated.displayName);
    try {
      localStorage.setItem('edusphere_profile', JSON.stringify(updated));
    } catch (e) {
      // localStorage unavailable — settings still applied for this session
    }
    setShowSettings(false);
  };

  // Feedback — frontend workflow only. Submitted feedback will later be
  // sent to the backend and surfaced inside the Admin Dashboard.
  const openFeedback = () => {
    setFeedbackMessage('');
    setShowFeedback(true);
  };

  const closeFeedback = () => {
    setShowFeedback(false);
  };

  const handleSubmitFeedback = () => {
    if (!feedbackMessage.trim()) return;
    // No backend implementation yet — this is where the feedback message
    // would be sent to the backend so it can appear in the Admin Dashboard.
    setShowFeedback(false);
    setFeedbackMessage('');
  };

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="command-center-page">
      {/* ── Navbar ── */}
      <nav className="top-navbar">
        <div className="navbar-left">
          <div className="navbar-logo-mark">E</div>
          <div className="navbar-branding">
            <h1 className="navbar-title">EduSphere</h1>
          </div>
        </div>

        <div className="navbar-right">
          <div className="navbar-user-wrap">
            <button
              className="navbar-user-btn"
              onClick={() => setShowUserMenu((v) => !v)}
              aria-label="User menu"
            >
              <div className="navbar-avatar">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt={studentName} className="navbar-avatar-img" />
                ) : (
                  studentName[0]
                )}
              </div>
              <span className="navbar-user-name">{studentName}</span>
              <span className="navbar-chevron">▾</span>
            </button>
            {showUserMenu && (
              <div className="navbar-dropdown">
                <button className="dropdown-item" onClick={openSettings}>
                  ⚙️ Profile Settings
                </button>
                <div className="dropdown-divider" />
                <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="main-content">

        {/* Welcome + Date */}
        {/* Display Name shown here is read from the student's profile and will
            automatically reflect the value set in Onboarding / Profile Settings
            once backend/database integration is complete. */}
        <section className="welcome-section">
          <div className="welcome-text">
            <p className="welcome-date">{today}</p>
            <h2 className="welcome-greeting">Welcome, {studentName}! 👋</h2>
            <p className="welcome-subtitle">
              You have <strong>{UPCOMING_TASKS.length} upcoming tasks</strong> this week. Keep going — consistency is what gets you there.
            </p>
          </div>
          <button
            className="welcome-button"
            onClick={() => navigate('/study-path')}
          >
            Continue Learning →
          </button>
        </section>

        {/* Quick Stats */}
        <section className="quick-stats-section">
          <h2 className="section-heading">Quick Stats</h2>
          <div className="stats-cards-container">
            <div className="stat-card stat-accent-red">
              <div className="stat-icon">📋</div>
              <div className="stat-body">
                <span className="stat-value">4</span>
                <span className="stat-label">Tasks Pending</span>
              </div>
            </div>
            <div className="stat-card stat-accent-blue">
              <div className="stat-icon">🗺️</div>
              <div className="stat-body">
                <span className="stat-value">3</span>
                <span className="stat-label">Study Plans</span>
              </div>
            </div>
            <div className="stat-card stat-accent-purple">
              <div className="stat-icon">🧠</div>
              <div className="stat-body">
                <span className="stat-value">18</span>
                <span className="stat-label">Resources</span>
              </div>
            </div>
            <div className="stat-card stat-accent-green">
              <div className="stat-icon">📊</div>
              <div className="stat-body">
                <span className="stat-value">68%</span>
                <span className="stat-label">Overall Progress</span>
              </div>
            </div>
          </div>
        </section>

        {/* Module Navigation */}
        <section className="modules-section">
          <h2 className="section-heading">Modules</h2>
          <div className="module-cards-grid">
            {MODULES.map((m) => (
              <button
                key={m.title}
                className={`module-card ${m.accent}`}
                onClick={() => navigate(m.route)}
              >
                <div className="module-icon">{m.icon}</div>
                <div className="module-info">
                  <span className="module-title">{m.title}</span>
                  <span className="module-desc">{m.desc}</span>
                </div>
                <span className="module-arrow">›</span>
              </button>
            ))}
          </div>
        </section>

        {/* Platform Announcements — will later read announcements created by Admin from the backend */}
        <section className="announcements-section">
          <h2 className="section-heading">Platform Announcements</h2>
          <div className="announcements-container">
            {PLATFORM_ANNOUNCEMENTS.map((a, i) => (
              <div className="announcement-item" key={i}>
                <span className="announcement-icon">{a.icon}</span>
                <div className="announcement-body">
                  <span className="announcement-title">{a.title}</span>
                  <p className="announcement-message">{a.message}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Today's Reminder (replaces AI recommendations) */}
        <section className="reminder-section">
          <div className="reminder-icon">{STUDY_REMINDER.icon}</div>
          <div className="reminder-body">
            <h3 className="reminder-heading">{STUDY_REMINDER.heading}</h3>
            <p className="reminder-message">{STUDY_REMINDER.message}</p>
          </div>
          <button className="reminder-action" onClick={() => navigate('/mission-control')}>
            View Tasks →
          </button>
        </section>

        {/* Upcoming Tasks — expanded to full width (Study Progress section removed) */}
        <section className="upcoming-tasks-section upcoming-tasks-full">
          <div className="section-row-header">
            <h2 className="section-heading">Upcoming Tasks</h2>
            <button className="link-action" onClick={() => navigate('/mission-control')}>
              View all →
            </button>
          </div>
          <div className="tasks-container">
            {UPCOMING_TASKS.map((t, i) => (
              <div className="task-item" key={i}>
                <div className="task-left">
                  <span className="task-name">{t.name}</span>
                  <span className="task-subject">📚 {t.subject}</span>
                </div>
                <span className="task-due-date">📅 {t.due}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="recent-activity-section">
          <h2 className="section-heading">Recent Activity</h2>
          <div className="recent-activity-content">
            {RECENT_ACTIVITY.map((a, i) => (
              <div className="activity-item" key={i}>
                <span className="activity-icon">{a.icon}</span>
                <p className="activity-description">{a.text}</p>
                <span className="activity-timestamp">{a.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Send Feedback — frontend workflow only; submissions will later appear in Admin Dashboard */}
        <section className="feedback-section">
          <h2 className="section-heading">Send Feedback</h2>
          <p className="feedback-section-sub">
            Have a suggestion or ran into an issue? Let us know.
          </p>
          <button className="feedback-open-btn" onClick={openFeedback}>
            ✉️ Send Feedback
          </button>
        </section>

      </main>

      {/* ── Settings Modal ── */}
      {showSettings && (
        <div className="cc-modal-overlay" onClick={closeSettings}>
          <div className="cc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cc-modal-header">
              <h2 className="cc-modal-title">Profile Settings</h2>
              <button className="cc-modal-close" onClick={closeSettings}>✕</button>
            </div>

            <div className="cc-modal-body">
              {/* Profile Photo */}
              <div className="cc-form-group">
                <label className="cc-form-label">Profile Photo</label>
                <div className="cc-avatar-upload-area">
                  <div
                    className="cc-avatar-preview"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {settingsForm.avatarUrl ? (
                      <img src={settingsForm.avatarUrl} alt="Avatar" className="cc-avatar-img" />
                    ) : (
                      <span className="cc-avatar-placeholder">
                        {(settingsForm.displayName || DEFAULT_NAME)[0]}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="cc-avatar-change-btn"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Change Photo
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="cc-avatar-input-hidden"
                    onChange={handleSettingsAvatarChange}
                  />
                </div>
              </div>

              {/* Display Name */}
              <div className="cc-form-group">
                <label className="cc-form-label">Display Name</label>
                <input
                  className="cc-form-input"
                  type="text"
                  placeholder="Your display name"
                  value={settingsForm.displayName}
                  onChange={(e) => setSettingsForm((p) => ({ ...p, displayName: e.target.value }))}
                />
              </div>

              {/* Short Bio */}
              <div className="cc-form-group">
                <label className="cc-form-label">
                  Short Bio <span className="cc-optional">(optional)</span>
                </label>
                <textarea
                  className="cc-form-textarea"
                  rows={3}
                  placeholder="Tell us a little about yourself and your learning goals..."
                  value={settingsForm.bio}
                  onChange={(e) => setSettingsForm((p) => ({ ...p, bio: e.target.value }))}
                />
              </div>

              {/* Preferred Subjects */}
              <div className="cc-form-group">
                <label className="cc-form-label">Preferred Subjects</label>
                <div className="cc-subject-grid">
                  {DEFAULT_SUBJECTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`cc-subject-chip ${settingsForm.subjects.includes(s) ? 'cc-chip-active' : ''}`}
                      onClick={() => toggleSettingsSubject(s)}
                    >
                      <span className="cc-chip-check">{settingsForm.subjects.includes(s) ? '✓' : ''}</span>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Daily Study Hours */}
              <div className="cc-form-group">
                <label className="cc-form-label">Daily Study Hours</label>
                <div className="cc-hours-grid">
                  {DAILY_HOURS.map((h) => (
                    <button
                      key={h}
                      type="button"
                      className={`cc-hours-chip ${settingsForm.dailyHours === h ? 'cc-chip-active' : ''}`}
                      onClick={() => setSettingsForm((p) => ({ ...p, dailyHours: h }))}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              {/* Study Days */}
              <div className="cc-form-group">
                <label className="cc-form-label">Study Days</label>
                <div className="cc-days-row">
                  {STUDY_DAYS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={`cc-day-chip ${settingsForm.studyDays.includes(d) ? 'cc-day-active' : ''}`}
                      onClick={() => toggleSettingsDay(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="cc-modal-footer">
              <button className="cc-modal-cancel" onClick={closeSettings}>Cancel</button>
              <button className="cc-modal-submit" onClick={handleSaveSettings}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Feedback Modal ── */}
      {showFeedback && (
        <div className="cc-modal-overlay" onClick={closeFeedback}>
          <div className="cc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cc-modal-header">
              <h2 className="cc-modal-title">Send Feedback</h2>
              <button className="cc-modal-close" onClick={closeFeedback}>✕</button>
            </div>

            <div className="cc-modal-body">
              <div className="cc-form-group">
                <label className="cc-form-label">Message</label>
                <textarea
                  className="cc-form-textarea"
                  rows={5}
                  placeholder="Share your suggestion or issue..."
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                />
              </div>
            </div>

            <div className="cc-modal-footer">
              <button className="cc-modal-cancel" onClick={closeFeedback}>Cancel</button>
              <button
                className="cc-modal-submit"
                onClick={handleSubmitFeedback}
                disabled={!feedbackMessage.trim()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}