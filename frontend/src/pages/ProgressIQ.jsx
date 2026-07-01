import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProgressIQ.css";

// ── Data (derived from student activity across EduSphere modules) ────────────
// ProgressIQ measures EduSphere activity only — there is no AI involved and
// no academic marks/grades are used. All scores are calculated purely from
// platform activity:
//  • Mission Control task completion → Consistency Score
//  • StudyPath plan completion       → Productivity Score
//  • Average of the two above        → Overall Score

const consistencyScore = 91;   // Mission Control task completion consistency
const productivityScore = 82;  // StudyPath plan completion
const overallScore = Math.round((consistencyScore + productivityScore) / 2);

const scoreCards = [
  {
    label: "Consistency Score",
    value: consistencyScore,
    icon: "📆",
    accent: "purple",
  },
  {
    label: "Productivity Score",
    value: productivityScore,
    icon: "⚡",
    accent: "teal",
  },
  {
    label: "Overall Score",
    value: overallScore,
    icon: "📊",
    accent: "orange",
  },
];

function explainScore(label, value) {
  const high = value >= 85;
  const mid = value >= 70 && value < 85;

  switch (label) {
    case "Consistency Score":
      if (high) return "Calculated using completed tasks in Mission Control. You're completing tasks very consistently.";
      if (mid) return "Calculated using completed tasks in Mission Control. A few tasks were missed this week.";
      return "Calculated using completed tasks in Mission Control. Try completing more tasks consistently.";
    case "Productivity Score":
      if (high) return "Calculated using completed study plans in StudyPath. Great plan completion this week.";
      if (mid) return "Calculated using completed study plans in StudyPath. A few plans are still in progress.";
      return "Calculated using completed study plans in StudyPath. Try finishing more of your active plans.";
    case "Overall Score":
      return "Average of the Consistency and Productivity scores above.";
    default:
      return "";
  }
}

const performanceBreakdown = scoreCards.map((c) => ({
  label: c.label,
  value: c.value,
  color: c.accent,
  explanation: explainScore(c.label, c.value),
}));

function buildStrengths() {
  const items = [];
  if (consistencyScore >= 85) items.push("Excellent task completion consistency in Mission Control.");
  if (productivityScore >= 85) items.push("Strong study plan completion in StudyPath.");
  if (items.length === 0) items.push("Keep engaging with EduSphere modules to build strengths.");
  return items;
}

function buildImprovements() {
  const items = [];
  if (consistencyScore < 85) items.push("Stay on top of pending Mission Control tasks.");
  if (productivityScore < 85) items.push("Complete more of your active StudyPath plans.");
  if (items.length === 0) items.push("You're doing well across both areas — keep it up!");
  return items;
}

const strengths = buildStrengths();
const improvements = buildImprovements();

// Demo weekly activity data (derived from combined module activity)
const weeklyProgress = [
  { week: "Week 1", value: 58 },
  { week: "Week 2", value: 67 },
  { week: "Week 3", value: 74 },
  { week: "Week 4", value: 83 },
];

const weeklyChangePct = Math.round(
  ((weeklyProgress[3].value - weeklyProgress[2].value) / weeklyProgress[2].value) * 100
);

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ title }) {
  return (
    <div className="piq-sec-hdr">
      <h2 className="piq-sec-title">{title}</h2>
      <div className="piq-sec-line" />
    </div>
  );
}

function ScoreCard({ label, value, icon, accent }) {
  return (
    <div className={`piq-score-card piq-accent-${accent}`}>
      <div className="piq-score-top">
        <span className="piq-score-icon">{icon}</span>
        <span className="piq-score-value">{value}%</span>
      </div>
      <div className="piq-score-label">{label}</div>
    </div>
  );
}

function PerformanceItem({ label, value, color, explanation }) {
  return (
    <div className="piq-bar-row">
      <div className="piq-bar-label-row">
        <span className="piq-bar-label">{label}</span>
        <span className="piq-bar-pct">{value}%</span>
      </div>
      <div className="piq-bar-bg">
        <div
          className={`piq-bar-fill piq-fill-${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="piq-bar-explain">{explanation}</p>
    </div>
  );
}

function StrengthCard({ text }) {
  return (
    <div className="piq-strength-card">
      <span className="piq-strength-icon">✔</span>
      <span className="piq-strength-text">{text}</span>
    </div>
  );
}

function WeaknessCard({ text }) {
  return (
    <div className="piq-weakness-card">
      <span className="piq-weakness-dot">•</span>
      <span className="piq-weakness-text">{text}</span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ProgressIQ() {
  const navigate = useNavigate();
  const maxWeekly = Math.max(...weeklyProgress.map((w) => w.value));

  // Always open this page from the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="piq-root">

      {/* ── Page Header ── */}
<header className="piq-header">
      <div className="piq-page-header">
        <button className="piq-back-btn" onClick={() => navigate("/command-center")}>
        ← Back to Dashboard
      </button>
        <h1 className="piq-page-title">
          <span className="piq-title-icon">📊</span> ProgressIQ
        </h1>
        <p className="piq-page-subtitle">
          Track your activity-based consistency and productivity across EduSphere.
        </p>
      </div>
</header>
      {/* ── Score Cards ── */}
      <div className="piq-score-grid">
        {scoreCards.map((c) => (
          <ScoreCard key={c.label} {...c} />
        ))}
      </div>

      {/* ── Performance Breakdown ── */}
      <section className="piq-section">
        <div className="piq-card">
          <h2 className="piq-card-title">Performance Breakdown</h2>
          <div className="piq-bars-list">
            {performanceBreakdown.map((b) => (
              <PerformanceItem key={b.label} {...b} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Strengths & Weaknesses ── */}
      <section className="piq-section">
        <div className="piq-sw-row">

          <div className="piq-card piq-card-sw">
            <SectionHeader title="Strengths" />
            <div className="piq-sw-list">
              {strengths.map((s) => (
                <StrengthCard key={s} text={s} />
              ))}
            </div>
          </div>

          <div className="piq-card piq-card-sw">
            <SectionHeader title="Needs Improvement" />
            <div className="piq-sw-list">
              {improvements.map((w) => (
                <WeaknessCard key={w} text={w} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Weekly Progress (full width) ── */}
      <section className="piq-section">
        <div className="piq-card piq-card-chart piq-card-chart--full">
          <h2 className="piq-card-title">Weekly Progress</h2>
          <div className="piq-chart-placeholder">
            <div className="piq-chart-bars-demo" aria-hidden="true">
              {weeklyProgress.map((w) => (
                <div
                  key={w.week}
                  className="piq-demo-bar"
                  style={{ height: `${(w.value / maxWeekly) * 100}%` }}
                />
              ))}
            </div>
            <div className="piq-chart-months" aria-hidden="true">
              {weeklyProgress.map((w) => (
                <span key={w.week} className="piq-chart-month">{w.week}</span>
              ))}
            </div>
          </div>
          <p className="piq-chart-note">
            📈 You improved by <strong>{weeklyChangePct}%</strong> compared to last week.
          </p>
        </div>
      </section>

      {/* ── Motivational Quote ── */}
      <section className="piq-section piq-section--last">
        <div className="piq-card piq-card-grow">
          <div className="piq-grow-eyebrow">🌱 Keep Growing</div>
          <blockquote className="piq-grow-quote">
            "Progress is achieved one consistent step at a time."
          </blockquote>
        </div>
      </section>

    </div>
  );
}