import React, { useState, useEffect } from "react";
import "../styles/AdminDashboard.css";

// ── Icons (inline SVG helpers) ──────────────────────────────────────────────
const Icon = ({ d, size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const icons = {
  students:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  bell:        "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  server:      "M20 3H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM20 11H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z",
  database:    "M12 2a9 3 0 1 0 0 6 9 3 0 0 0 0-6zM3 5v6c0 1.657 4.03 3 9 3s9-1.343 9-3V5M3 11v6c0 1.657 4.03 3 9 3s9-1.343 9-3v-6",
  wifi:        "M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01",
  performance: "M22 12h-4l-3 9L9 3l-3 9H2",
  announce:    "M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0",
  chevRight:   "M9 18l6-6-6-6",
  activity:    "M22 12h-4l-3 9L9 3l-3 9H2",
  clock:       "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 6v6l4 2",
  message:     "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  settings:    "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  plus:        "M12 5v14M5 12h14",
  edit:        "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:       "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z",
  check:       "M20 6 9 17l-5-5",
  storage:     "M22 12H2M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
  layers:      "M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
};

// ── Initial Data ─────────────────────────────────────────────────────────────

const initialAnnouncements = [
  {
    id: 1,
    title: "Platform Maintenance",
    message: "EduSphere will undergo scheduled maintenance this weekend.",
    date: "Today, 9:00 AM",
    tag: "Maintenance",
  },
  {
    id: 2,
    title: "New Feature Released",
    message: "A redesigned ProgressIQ dashboard is now live for all students.",
    date: "Yesterday, 3:45 PM",
    tag: "Feature",
  },
  {
    id: 3,
    title: "Scheduled Downtime",
    message: "Brief downtime expected tonight between 1:00 AM and 2:00 AM.",
    date: "Jun 24, 11:00 AM",
    tag: "Downtime",
  },
  {
    id: 4,
    title: "General Platform Update",
    message: "Performance improvements and minor bug fixes have been deployed.",
    date: "Jun 22, 8:30 AM",
    tag: "Update",
  },
];

const initialFeedback = [
  {
    id: 1,
    student: "Keerthibabu",
    message: "I faced a brief delay while logging into Mission Control this morning.",
    date: "Jun 28, 2026",
    reviewed: false,
  },
  {
    id: 2,
    student: "Ananya",
    message: "It would help to have dark mode on the Knowledge Vault page.",
    date: "Jun 27, 2026",
    reviewed: false,
  },
  {
    id: 3,
    student: "Rahul",
    message: "The weekly chart on ProgressIQ didn't update after I finished a study plan.",
    date: "Jun 26, 2026",
    reviewed: true,
  },
  {
    id: 4,
    student: "Priya",
    message: "Really enjoying the new RapidPrep module — very helpful before exams.",
    date: "Jun 24, 2026",
    reviewed: true,
  },
];

const recentActivity = [
  { action: "Announcement Published", detail: "\"Platform Maintenance\" sent to all students", time: "10 min ago", icon: "announce" },
  { action: "Feedback Reviewed",      detail: "Marked feedback from Rahul as reviewed",        time: "1 hr ago",   icon: "check"    },
  { action: "Settings Updated",       detail: "Maintenance mode toggled off",                  time: "3 hr ago",   icon: "settings" },
  { action: "Announcement Published", detail: "\"New Feature Released\" sent to all students",  time: "Yesterday",  icon: "announce" },
  { action: "Feedback Reviewed",      detail: "Marked feedback from Priya as reviewed",         time: "2 days ago", icon: "check"    },
];

const tagColors = {
  Maintenance: "tag-exams",
  Feature:     "tag-resources",
  Downtime:    "tag-facility",
  Update:      "tag-general",
};

const emptyDraft = { title: "", message: "", tag: "Update" };

const sidebarLinks = [
  { id: "overview",            label: "Overview",            icon: "activity" },
  { id: "announcements",       label: "Announcements",       icon: "announce" },
  { id: "feedback",            label: "Feedback",            icon: "message"  },
  { id: "platform-statistics", label: "Platform Statistics", icon: "layers"   },
  { id: "platform-settings",   label: "Platform Settings",   icon: "settings" },
];

// ── Component ────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);

  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [feedback, setFeedback] = useState(initialFeedback);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(emptyDraft);

  const [settings, setSettings] = useState({
    platformName: "EduSphere",
    maintenanceMode: false,
    theme: "Light",
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Always open this page from the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ── Derived stats ──
  const totalStudents = 1248;
  const totalFeedback = feedback.length;
  const activeAnnouncements = announcements.length;
  const platformStatus = settings.maintenanceMode ? "Maintenance" : "Online";

  // ── Sidebar smooth-scroll navigation ──
  function goToSection(id) {
    setActiveNav(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ── Announcement handlers ──
  function openCreateModal() {
    setEditingId(null);
    setDraft(emptyDraft);
    setShowModal(true);
  }

  function openEditModal(ann) {
    setEditingId(ann.id);
    setDraft({ title: ann.title, message: ann.message, tag: ann.tag });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingId(null);
    setDraft(emptyDraft);
  }

  function saveAnnouncement(e) {
    e.preventDefault();
    if (!draft.title.trim() || !draft.message.trim()) return;

    if (editingId) {
      setAnnouncements((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...draft } : a))
      );
    } else {
      // NOTE: Announcements created here are structured so that, once a
      // backend is connected, the same list can be fetched and rendered
      // inside Command Center's Platform Announcements section.
      setAnnouncements((prev) => [
        {
          id: Date.now(),
          title: draft.title,
          message: draft.message,
          tag: draft.tag,
          date: "Just now",
        },
        ...prev,
      ]);
    }
    closeModal();
  }

  function deleteAnnouncement(id) {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  }

  // ── Feedback handlers ──
  // NOTE: Feedback is view + mark-reviewed only — no reply functionality.
  // Once a backend is connected, this list can be populated directly from
  // submissions made through Command Center's Send Feedback section.
  function toggleReviewed(id) {
    setFeedback((prev) =>
      prev.map((f) => (f.id === id ? { ...f, reviewed: !f.reviewed } : f))
    );
  }

  // ── Settings handlers ──
  function handleSettingsSave(e) {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  }

  const isDark = settings.theme === "Dark";

  return (
    <div className={`ad-root ${isDark ? "ad-root--dark" : ""}`}>
      {/* ── Sidebar ── */}
      <aside className={`ad-sidebar ${menuOpen ? "ad-sidebar--open" : ""}`}>
        <div className="ad-sidebar__brand">
          <div className="ad-sidebar__logo">
            <span>E</span>
          </div>
          <span className="ad-sidebar__name">EduSphere</span>
        </div>

        <nav className="ad-sidebar__nav">
          {sidebarLinks.map(item => (
            <button
              key={item.id}
              className={`ad-nav-item ${activeNav === item.id ? "ad-nav-item--active" : ""}`}
              onClick={() => goToSection(item.id)}
            >
              <Icon d={icons[item.icon]} size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* ── Main ── */}
      <main className="ad-main">

        {/* Top Bar — title + subtitle merged into the navbar, no sticky behaviour */}
        <header className="ad-topbar">
          <button className="ad-hamburger" onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu">
            <span /><span /><span />
          </button>
          <div className="ad-topbar__title">
            <h1 className="ad-page-title">EduSphere Admin Dashboard</h1>
            <p className="ad-page-subtitle">Platform Monitoring &amp; Management</p>
          </div>
        </header>

        <div className="ad-content">

          {/* ── Overview Cards ── */}
          <section className="ad-section" id="overview">
            <div className="ad-stats-grid">
              <div className="ad-stat-card ad-stat-card--blue">
                <div className="ad-stat-card__icon"><Icon d={icons.students} size={22} /></div>
                <div className="ad-stat-card__body">
                  <span className="ad-stat-card__value">{totalStudents.toLocaleString()}</span>
                  <span className="ad-stat-card__label">Registered Students</span>
                </div>
              </div>
              <div className="ad-stat-card ad-stat-card--indigo">
                <div className="ad-stat-card__icon"><Icon d={icons.message} size={22} /></div>
                <div className="ad-stat-card__body">
                  <span className="ad-stat-card__value">{totalFeedback}</span>
                  <span className="ad-stat-card__label">Feedback Received</span>
                </div>
              </div>
              <div className="ad-stat-card ad-stat-card--cyan">
                <div className="ad-stat-card__icon"><Icon d={icons.announce} size={22} /></div>
                <div className="ad-stat-card__body">
                  <span className="ad-stat-card__value">{activeAnnouncements}</span>
                  <span className="ad-stat-card__label">Announcements</span>
                </div>
              </div>
              <div className="ad-stat-card ad-stat-card--teal">
                <div className="ad-stat-card__icon"><Icon d={icons.server} size={22} /></div>
                <div className="ad-stat-card__body">
                  <span className="ad-stat-card__value">{platformStatus}</span>
                  <span className="ad-stat-card__label">Platform Status</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── Recent Admin Activity ── */}
          <section className="ad-section">
            <div className="ad-section-header">
              <h2 className="ad-section-title">Recent Admin Activity</h2>
              <p className="ad-section-desc">Latest platform management actions taken by the admin.</p>
            </div>
            <div className="ad-card ad-activity-card">
              <ul className="ad-activity-list">
                {recentActivity.map((entry, i) => (
                  <li key={i} className="ad-activity-item">
                    <div className="ad-activity-avatar">
                      <Icon d={icons[entry.icon]} size={14} />
                    </div>
                    <div className="ad-activity-text">
                      <p>
                        <strong>{entry.action}</strong>
                      </p>
                      <p className="ad-activity-detail">{entry.detail}</p>
                      <span className="ad-activity-time">
                        <Icon d={icons.clock} size={11} />
                        {entry.time}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── Announcements ── */}
          <section className="ad-section" id="announcements">
            <div className="ad-section-header">
              <h2 className="ad-section-title">Announcements</h2>
              <p className="ad-section-desc">
                Create, edit, or remove platform announcements. Published announcements are
                structured to later appear inside Command Center.
              </p>
            </div>
            <div className="ad-card ad-announce-card">
              <div className="ad-card__header">
                <h3 className="ad-card__title">
                  <Icon d={icons.bell} size={16} />
                  Manage Announcements
                </h3>
                <button className="ad-link-btn ad-link-btn--solid" onClick={openCreateModal}>
                  <Icon d={icons.plus} size={14} /> New
                </button>
              </div>
              <ul className="ad-announce-list">
                {announcements.map((ann) => (
                  <li key={ann.id} className="ad-announce-item">
                    <div className="ad-announce-dot" />
                    <div className="ad-announce-body">
                      <p className="ad-announce-title">{ann.title}</p>
                      <p className="ad-announce-message">{ann.message}</p>
                      <div className="ad-announce-meta">
                        <span className="ad-announce-time">{ann.date}</span>
                        <span className={`ad-tag ${tagColors[ann.tag] || "tag-general"}`}>{ann.tag}</span>
                      </div>
                    </div>
                    <div className="ad-announce-actions">
                      <button className="ad-chevron-btn" aria-label="Edit" onClick={() => openEditModal(ann)}>
                        <Icon d={icons.edit} size={14} />
                      </button>
                      <button className="ad-chevron-btn ad-chevron-btn--danger" aria-label="Delete" onClick={() => deleteAnnouncement(ann.id)}>
                        <Icon d={icons.trash} size={14} />
                      </button>
                    </div>
                  </li>
                ))}
                {announcements.length === 0 && (
                  <li className="ad-empty-state">No announcements yet.</li>
                )}
              </ul>
            </div>
          </section>

          {/* ── Feedback Management ── */}
          <section className="ad-section" id="feedback">
            <div className="ad-section-header" id="feedback-header">
              <h2 className="ad-section-title">Feedback</h2>
              <p className="ad-section-desc">
                View feedback messages submitted by students and mark them as reviewed.
              </p>
            </div>
            <div className="ad-feedback-grid">
              {feedback.map((f) => (
                <div key={f.id} className={`ad-feedback-card ${f.reviewed ? "ad-feedback-card--reviewed" : ""}`}>
                  <div className="ad-feedback-card__top">
                    <p className="ad-feedback-card__student">{f.student}</p>
                    <span className={`ad-tag ${f.reviewed ? "tag-resources" : "tag-exams"}`}>
                      {f.reviewed ? "Reviewed" : "Pending"}
                    </span>
                  </div>
                  <p className="ad-feedback-card__message">{f.message}</p>
                  <div className="ad-feedback-card__bottom">
                    <span className="ad-feedback-card__date">{f.date}</span>
                    <button
                      className="ad-link-btn"
                      onClick={() => toggleReviewed(f.id)}
                    >
                      {f.reviewed ? "Mark as Pending" : "Mark as Reviewed"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Platform Statistics ── */}
          <section className="ad-section" id="platform-statistics">
            <div className="ad-section-header">
              <h2 className="ad-section-title">Platform Statistics</h2>
              <p className="ad-section-desc">Demo statistics reflecting overall platform health and usage.</p>
            </div>
            <div className="ad-card ad-stats-card">
              <div className="ad-system-grid">
                <div className="ad-system-item">
                  <div className="ad-system-icon ad-system-icon--good">
                    <Icon d={icons.server} size={18} />
                  </div>
                  <div className="ad-system-text">
                    <span className="ad-system-label">Server Status</span>
                    <span className="ad-system-value ad-system-value--good">Healthy</span>
                  </div>
                  <div className="ad-status-dot ad-status-dot--good" />
                </div>
                <div className="ad-system-item">
                  <div className="ad-system-icon ad-system-icon--good">
                    <Icon d={icons.database} size={18} />
                  </div>
                  <div className="ad-system-text">
                    <span className="ad-system-label">Database</span>
                    <span className="ad-system-value ad-system-value--good">Connected</span>
                  </div>
                  <div className="ad-status-dot ad-status-dot--good" />
                </div>
              </div>
              <ul className="ad-platform-stats-list">
                <li>
                  <span>Total Students</span>
                  <strong>{totalStudents.toLocaleString()}</strong>
                </li>
                <li>
                  <span>Announcements Created</span>
                  <strong>{announcements.length}</strong>
                </li>
                <li>
                  <span>Feedback Received</span>
                  <strong>{feedback.length}</strong>
                </li>
                <li>
                  <span>Storage Usage (Demo)</span>
                  <strong>62%</strong>
                </li>
              </ul>
            </div>
          </section>

          {/* ── Settings ── */}
          <section className="ad-section" id="platform-settings">
            <div className="ad-section-header">
              <h2 className="ad-section-title">Platform Settings</h2>
              <p className="ad-section-desc">
                Demo configuration options for the EduSphere platform. Maintenance mode and
                theme changes are frontend-only and ready for future backend integration.
              </p>
            </div>
            <form className="ad-card ad-settings-card" onSubmit={handleSettingsSave}>
              <div className="ad-settings-row">
                <label className="ad-settings-label" htmlFor="platformName">Platform Name</label>
                <input
                  id="platformName"
                  className="ad-settings-input"
                  type="text"
                  value={settings.platformName}
                  onChange={(e) => setSettings((s) => ({ ...s, platformName: e.target.value }))}
                />
              </div>

              <div className="ad-settings-row ad-settings-row--toggle">
                <div>
                  <label className="ad-settings-label" htmlFor="maintenanceMode">Maintenance Mode</label>
                  <p className="ad-settings-hint">Temporarily restrict student access during updates (demo only).</p>
                </div>
                <button
                  type="button"
                  id="maintenanceMode"
                  className={`ad-toggle ${settings.maintenanceMode ? "ad-toggle--on" : ""}`}
                  onClick={() => setSettings((s) => ({ ...s, maintenanceMode: !s.maintenanceMode }))}
                  aria-pressed={settings.maintenanceMode}
                >
                  <span className="ad-toggle__knob" />
                </button>
              </div>

              <div className="ad-settings-row">
                <label className="ad-settings-label" htmlFor="theme">Theme Selection</label>
                <select
                  id="theme"
                  className="ad-settings-input"
                  value={settings.theme}
                  onChange={(e) => setSettings((s) => ({ ...s, theme: e.target.value }))}
                >
                  <option>Light</option>
                  <option>Dark</option>
                  <option>System Default</option>
                </select>
                <p className="ad-settings-hint">Theme changes apply immediately to this dashboard.</p>
              </div>

              <div className="ad-settings-footer">
                {settingsSaved && <span className="ad-settings-saved">Changes saved.</span>}
                <button type="submit" className="ad-link-btn ad-link-btn--solid">Save Changes</button>
              </div>
            </form>
          </section>

          {/* ── Motivational Banner ── */}
          <section className="ad-section ad-section--last">
            <div className="ad-banner">
              <div className="ad-banner__glow" />
              <div className="ad-banner__content">
                <p className="ad-banner__eyebrow">Lead with Impact</p>
                <blockquote className="ad-banner__quote">
                  "A well-maintained platform empowers every learner who depends on it."
                </blockquote>
                <p className="ad-banner__sub">
                  Keep the platform reliable, informed, and running smoothly for all students.
                </p>
              </div>
              <div className="ad-banner__shapes" aria-hidden="true">
                <div className="ad-banner__circle ad-banner__circle--1" />
                <div className="ad-banner__circle ad-banner__circle--2" />
                <div className="ad-banner__circle ad-banner__circle--3" />
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* ── Announcement Modal ── */}
      {showModal && (
        <div className="ad-modal-overlay" onClick={closeModal}>
          <div className="ad-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="ad-modal__title">
              {editingId ? "Edit Announcement" : "Create Announcement"}
            </h3>
            <form onSubmit={saveAnnouncement} className="ad-modal__form">
              <label className="ad-settings-label" htmlFor="annTitle">Title</label>
              <input
                id="annTitle"
                className="ad-settings-input"
                type="text"
                value={draft.title}
                onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                required
              />

              <label className="ad-settings-label" htmlFor="annMessage">Message</label>
              <textarea
                id="annMessage"
                className="ad-settings-input ad-settings-textarea"
                rows={3}
                value={draft.message}
                onChange={(e) => setDraft((d) => ({ ...d, message: e.target.value }))}
                required
              />

              <label className="ad-settings-label" htmlFor="annTag">Category</label>
              <select
                id="annTag"
                className="ad-settings-input"
                value={draft.tag}
                onChange={(e) => setDraft((d) => ({ ...d, tag: e.target.value }))}
              >
                <option>Maintenance</option>
                <option>Feature</option>
                <option>Downtime</option>
                <option>Update</option>
              </select>

              <div className="ad-modal__actions">
                <button type="button" className="ad-link-btn" onClick={closeModal}>Cancel</button>
                <button type="submit" className="ad-link-btn ad-link-btn--solid">
                  {editingId ? "Save Changes" : "Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Overlay for mobile sidebar */}
      {menuOpen && (
        <div className="ad-overlay" onClick={() => setMenuOpen(false)} />
      )}
    </div>
  );
}