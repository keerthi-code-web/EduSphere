import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/KnowledgeVault.css";
import { applyStoredTheme } from "../utils/theme";

/* ── Subject Folders (semester → subject hierarchy) ── */
const INITIAL_FOLDERS = [
  { id: 1, name: "Machine Learning", semester: "Semester 5", icon: "🤖", color: "cat-purple" },
  { id: 2, name: "Database Systems", semester: "Semester 5", icon: "🗄️", color: "cat-blue" },
  { id: 3, name: "Operating Systems", semester: "Semester 5", icon: "⚙️", color: "cat-teal" },
  { id: 4, name: "Computer Networks", semester: "Semester 4", icon: "🌐", color: "cat-amber" },
  { id: 5, name: "Mathematics III", semester: "Semester 4", icon: "🧮", color: "cat-green" },
];

const RESOURCE_TYPES = ["Notes", "PDF", "Video Link", "Bookmark"];

const INITIAL_RESOURCES = [
  {
    id: 1,
    title: "Database Management Notes",
    type: "Notes",
    folderId: 2,
    uploaded: "2 days ago",
    isImportantQuestion: false,
    isPYQ: false,
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    type: "PDF",
    folderId: 1,
    uploaded: "Today",
    isImportantQuestion: false,
    isPYQ: false,
  },
  {
    id: 3,
    title: "DBMS Important Questions 2025",
    type: "PDF",
    folderId: 2,
    uploaded: "1 week ago",
    isImportantQuestion: true,
    isPYQ: false,
  },
  {
    id: 4,
    title: "OS Previous Year Paper – 2024",
    type: "PDF",
    folderId: 3,
    uploaded: "Yesterday",
    isImportantQuestion: false,
    isPYQ: true,
  },
  {
    id: 5,
    title: "Computer Networks Lecture",
    type: "Video Link",
    folderId: 4,
    uploaded: "3 days ago",
    isImportantQuestion: false,
    isPYQ: false,
  },
  {
    id: 6,
    title: "ML Model Evaluation Cheatsheet",
    type: "Bookmark",
    folderId: 1,
    uploaded: "5 days ago",
    isImportantQuestion: false,
    isPYQ: false,
  },
  {
    id: 7,
    title: "Linear Algebra Previous Year Paper",
    type: "PDF",
    folderId: 5,
    uploaded: "1 week ago",
    isImportantQuestion: false,
    isPYQ: true,
  },
];

const filters = ["All", "Notes", "PDFs", "Video Links", "Bookmarks"];

const typeToFilter = (type) => {
  if (type === "PDF") return "PDFs";
  if (type === "Video Link") return "Video Links";
  if (type === "Bookmark") return "Bookmarks";
  return type; // "Notes"
};

const typeIcon = (type) => {
  if (type === "Notes") return "📝";
  if (type === "PDF") return "📄";
  if (type === "Video Link") return "🎬";
  if (type === "Bookmark") return "🔖";
  return "📎";
};

const typeBadgeClass = (type) => {
  if (type === "Notes") return "badge-notes";
  if (type === "PDF") return "badge-pdf";
  if (type === "Video Link") return "badge-video";
  return "badge-other";
};

export default function KnowledgeVault() {
  const navigate = useNavigate();

  // Always open this module from the top of the page; restore saved theme
  useEffect(() => {
    window.scrollTo(0, 0);
    applyStoredTheme();
  }, []);

  const [folders, setFolders] = useState(INITIAL_FOLDERS);
  const [resources, setResources] = useState(INITIAL_RESOURCES);

  const [activeFolderId, setActiveFolderId] = useState(null); // null = all resources
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);

  const [uploadForm, setUploadForm] = useState({
    fileName: "",
    type: "Notes",
    folderId: folders[0]?.id || "",
    isImportantQuestion: false,
    isPYQ: false,
  });
  const [uploadErrors, setUploadErrors] = useState({});

  const [folderForm, setFolderForm] = useState({ name: "", semester: "" });
  const [folderErrors, setFolderErrors] = useState({});

  /* ── Summary metrics ── */
  const totalResources = resources.length;
  const importantQuestionCount = resources.filter((r) => r.isImportantQuestion).length;
  const pyqCount = resources.filter((r) => r.isPYQ).length;
  const subjectFolderCount = folders.length;

  const folderById = (id) => folders.find((f) => f.id === id);

  /* ── Filtering ── */
  const filtered = resources.filter((r) => {
    const folder = folderById(r.folderId);
    const matchSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (folder && folder.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchFilter = activeFilter === "All" || typeToFilter(r.type) === activeFilter;
    const matchFolder = activeFolderId === null || r.folderId === activeFolderId;
    return matchSearch && matchFilter && matchFolder;
  });

  /* ── Upload flow ── */
  const validateUpload = () => {
    const e = {};
    if (!uploadForm.fileName.trim()) e.fileName = "File name is required.";
    if (!uploadForm.folderId) e.folderId = "Please select a subject folder.";
    return e;
  };

  const handleUploadSubmit = () => {
    const e = validateUpload();
    if (Object.keys(e).length) {
      setUploadErrors(e);
      return;
    }
    setResources((prev) => [
      {
        id: Date.now(),
        title: uploadForm.fileName.trim(),
        type: uploadForm.type,
        folderId: Number(uploadForm.folderId),
        uploaded: "Just now",
        isImportantQuestion: uploadForm.isImportantQuestion,
        isPYQ: uploadForm.isPYQ,
      },
      ...prev,
    ]);
    closeUploadModal();
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    setUploadForm({
      fileName: "",
      type: "Notes",
      folderId: folders[0]?.id || "",
      isImportantQuestion: false,
      isPYQ: false,
    });
    setUploadErrors({});
  };

  /* ── Folder creation flow ── */
  const validateFolder = () => {
    const e = {};
    if (!folderForm.name.trim()) e.name = "Subject name is required.";
    if (!folderForm.semester.trim()) e.semester = "Semester is required.";
    return e;
  };

  const handleFolderSubmit = () => {
    const e = validateFolder();
    if (Object.keys(e).length) {
      setFolderErrors(e);
      return;
    }
    const palette = ["cat-blue", "cat-purple", "cat-teal", "cat-amber", "cat-green"];
    const newFolder = {
      id: Date.now(),
      name: folderForm.name.trim(),
      semester: folderForm.semester.trim(),
      icon: "📁",
      color: palette[folders.length % palette.length],
    };
    setFolders((prev) => [...prev, newFolder]);
    closeFolderModal();
  };

  const closeFolderModal = () => {
    setShowFolderModal(false);
    setFolderForm({ name: "", semester: "" });
    setFolderErrors({});
  };

  /* ── Group folders by semester for sidebar/section display ── */
  const semesters = [...new Set(folders.map((f) => f.semester))];

  return (
    <div className="kv-root">
      {/* ── Header ── */}
      <header className="kv-header">
        <div className="kv-header-text">
          <button className="kv-back-btn" onClick={() => navigate('/command-center')}>← Back to Dashboard</button>
          <h1 className="kv-title">
            <span className="kv-title-icon">🏛️</span>
            Knowledge Vault
          </h1>
          <p className="kv-subtitle">
            Organize, manage, and access your academic resources.
          </p>
        </div>
      </header>

      {/* ── Summary Cards ── */}
      <section className="kv-summary-grid">
        <div className="kv-summary-card accent-blue">
          <div className="kv-summary-icon">🗂️</div>
          <div className="kv-summary-body">
            <span className="kv-summary-value">{totalResources}</span>
            <span className="kv-summary-label">Total Resources</span>
          </div>
        </div>
        <div className="kv-summary-card accent-amber">
          <div className="kv-summary-icon">❓</div>
          <div className="kv-summary-body">
            <span className="kv-summary-value">{importantQuestionCount}</span>
            <span className="kv-summary-label">Important Questions</span>
          </div>
        </div>
        <div className="kv-summary-card accent-red">
          <div className="kv-summary-icon">🗞️</div>
          <div className="kv-summary-body">
            <span className="kv-summary-value">{pyqCount}</span>
            <span className="kv-summary-label">Previous Year Papers</span>
          </div>
        </div>
        <div className="kv-summary-card accent-green">
          <div className="kv-summary-icon">📁</div>
          <div className="kv-summary-body">
            <span className="kv-summary-value">{subjectFolderCount}</span>
            <span className="kv-summary-label">Subject Folders</span>
          </div>
        </div>
      </section>

      {/* ── Toolbar ── */}
      <section className="kv-toolbar">
        <div className="kv-search-wrap">
          <span className="kv-search-icon">🔍</span>
          <input
            className="kv-search"
            type="text"
            placeholder="Search by subject or file name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="kv-search-clear" onClick={() => setSearchQuery("")}>
              ✕
            </button>
          )}
        </div>
        <div className="kv-filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`kv-filter-btn ${activeFilter === f ? "kv-filter-active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <button className="kv-folder-btn" onClick={() => setShowFolderModal(true)}>
          <span>📁</span> New Folder
        </button>
        <button className="kv-upload-btn" onClick={() => setShowUploadModal(true)}>
          <span>⬆</span> Upload Resource
        </button>
      </section>

      {/* ── Resources ── */}
      <section className="kv-section">
        <div className="kv-section-header">
          <h2 className="kv-section-title">
            {activeFolderId
              ? `Resources — ${folderById(activeFolderId)?.name}`
              : "Resources"}
          </h2>
          <div className="kv-section-header-actions">
            {activeFolderId && (
              <button className="kv-clear-folder" onClick={() => setActiveFolderId(null)}>
                ✕ Clear folder filter
              </button>
            )}
            <span className="kv-result-count">{filtered.length} found</span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="kv-empty">
            <div className="kv-empty-icon">📭</div>
            <p className="kv-empty-text">No resources match your search.</p>
            <button
              className="kv-empty-reset"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
                setActiveFolderId(null);
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="kv-resource-grid">
            {filtered.map((res) => {
              const folder = folderById(res.folderId);
              return (
                <div key={res.id} className="kv-resource-card">
                  <div className="kv-resource-top">
                    <div className="kv-resource-file-icon">{typeIcon(res.type)}</div>
                    <div className="kv-resource-tags">
                      {res.isImportantQuestion && (
                        <span className="kv-tag kv-tag-iq">❓ IQ</span>
                      )}
                      {res.isPYQ && <span className="kv-tag kv-tag-pyq">🗞️ PYQ</span>}
                    </div>
                  </div>
                  <div className="kv-resource-body">
                    <h3 className="kv-resource-title">{res.title}</h3>
                    <div className="kv-resource-meta">
                      <span className={`kv-badge ${typeBadgeClass(res.type)}`}>
                        {res.type}
                      </span>
                      {folder && (
                        <span className="kv-resource-subject">📚 {folder.name}</span>
                      )}
                    </div>
                    <p className="kv-resource-uploaded">Uploaded: {res.uploaded}</p>
                  </div>
                  <div className="kv-resource-footer">
                    <button className="kv-view-btn">View</button>
                    <button className="kv-download-btn" title="Download">⬇</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Subject Folders ── */}
      <section className="kv-section">
        <div className="kv-section-header">
          <h2 className="kv-section-title">Subject Folders</h2>
        </div>

        {semesters.map((sem) => (
          <div key={sem} className="kv-semester-block">
            <p className="kv-semester-label">{sem}</p>
            <div className="kv-category-grid">
              {folders
                .filter((f) => f.semester === sem)
                .map((folder) => {
                  const count = resources.filter((r) => r.folderId === folder.id).length;
                  return (
                    <button
                      key={folder.id}
                      className={`kv-category-card ${folder.color} ${
                        activeFolderId === folder.id ? "kv-category-active" : ""
                      }`}
                      onClick={() =>
                        setActiveFolderId((prev) => (prev === folder.id ? null : folder.id))
                      }
                    >
                      <span className="kv-cat-icon">{folder.icon}</span>
                      <div className="kv-cat-body">
                        <span className="kv-cat-name">{folder.name}</span>
                        <span className="kv-cat-count">{count} resource{count !== 1 ? "s" : ""}</span>
                      </div>
                      <span className="kv-cat-arrow">›</span>
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </section>

      {/* ── Guide Card ── */}
      <section className="kv-section">
        <div className="kv-panel kv-tip-panel">
          <div className="kv-tip-icon">💡</div>
          <h3 className="kv-tip-title">Stay Organized</h3>
          <p className="kv-tip-body">
            Create a folder for each subject before uploading. Group folders
            by semester so your resources stay easy to find as your course
            load grows.
          </p>
        </div>
      </section>

      {/* ── Upload Modal ── */}
      {showUploadModal && (
        <div className="kv-modal-overlay" onClick={closeUploadModal}>
          <div className="kv-modal" onClick={(e) => e.stopPropagation()}>
            <div className="kv-modal-header">
              <h2 className="kv-modal-title">Upload Resource</h2>
              <button className="kv-modal-close" onClick={closeUploadModal}>✕</button>
            </div>

            <div className="kv-modal-body">
              <div className="kv-form-group">
                <label className="kv-form-label">
                  File Name <span className="kv-required">*</span>
                </label>
                <input
                  className={`kv-form-input ${uploadErrors.fileName ? "kv-input-error" : ""}`}
                  type="text"
                  placeholder="e.g. DBMS Unit 3 Notes"
                  value={uploadForm.fileName}
                  onChange={(e) => {
                    setUploadForm((p) => ({ ...p, fileName: e.target.value }));
                    setUploadErrors((p) => ({ ...p, fileName: undefined }));
                  }}
                />
                {uploadErrors.fileName && (
                  <span className="kv-error-msg">{uploadErrors.fileName}</span>
                )}
              </div>

              <div className="kv-form-group">
                <label className="kv-form-label">Resource Type</label>
                <select
                  className="kv-form-input kv-form-select"
                  value={uploadForm.type}
                  onChange={(e) => setUploadForm((p) => ({ ...p, type: e.target.value }))}
                >
                  {RESOURCE_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="kv-form-group">
                <label className="kv-form-label">
                  Subject Folder <span className="kv-required">*</span>
                </label>
                <select
                  className={`kv-form-input kv-form-select ${uploadErrors.folderId ? "kv-input-error" : ""}`}
                  value={uploadForm.folderId}
                  onChange={(e) => {
                    setUploadForm((p) => ({ ...p, folderId: e.target.value }));
                    setUploadErrors((p) => ({ ...p, folderId: undefined }));
                  }}
                >
                  <option value="">Select a folder</option>
                  {folders.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.semester} → {f.name}
                    </option>
                  ))}
                </select>
                {uploadErrors.folderId && (
                  <span className="kv-error-msg">{uploadErrors.folderId}</span>
                )}
                {folders.length === 0 && (
                  <span className="kv-hint-msg">
                    No folders yet — create one first using "New Folder".
                  </span>
                )}
              </div>

              <div className="kv-toggle-row">
                <label className="kv-toggle-label">
                  <input
                    type="checkbox"
                    className="kv-toggle-input"
                    checked={uploadForm.isImportantQuestion}
                    onChange={(e) =>
                      setUploadForm((p) => ({ ...p, isImportantQuestion: e.target.checked }))
                    }
                  />
                  <span className="kv-toggle-track"><span className="kv-toggle-thumb" /></span>
                  <span className="kv-toggle-text">Mark as Important Question</span>
                </label>
              </div>

              <div className="kv-toggle-row">
                <label className="kv-toggle-label">
                  <input
                    type="checkbox"
                    className="kv-toggle-input"
                    checked={uploadForm.isPYQ}
                    onChange={(e) => setUploadForm((p) => ({ ...p, isPYQ: e.target.checked }))}
                  />
                  <span className="kv-toggle-track"><span className="kv-toggle-thumb" /></span>
                  <span className="kv-toggle-text">Mark as Previous Year Paper</span>
                </label>
              </div>
            </div>

            <div className="kv-modal-footer">
              <button className="kv-modal-cancel" onClick={closeUploadModal}>Cancel</button>
              <button className="kv-modal-submit" onClick={handleUploadSubmit}>Upload</button>
            </div>
          </div>
        </div>
      )}

      {/* ── New Folder Modal ── */}
      {showFolderModal && (
        <div className="kv-modal-overlay" onClick={closeFolderModal}>
          <div className="kv-modal" onClick={(e) => e.stopPropagation()}>
            <div className="kv-modal-header">
              <h2 className="kv-modal-title">Create Subject Folder</h2>
              <button className="kv-modal-close" onClick={closeFolderModal}>✕</button>
            </div>

            <div className="kv-modal-body">
              <div className="kv-form-group">
                <label className="kv-form-label">
                  Semester <span className="kv-required">*</span>
                </label>
                <input
                  className={`kv-form-input ${folderErrors.semester ? "kv-input-error" : ""}`}
                  type="text"
                  placeholder="e.g. Semester 5"
                  value={folderForm.semester}
                  onChange={(e) => {
                    setFolderForm((p) => ({ ...p, semester: e.target.value }));
                    setFolderErrors((p) => ({ ...p, semester: undefined }));
                  }}
                />
                {folderErrors.semester && (
                  <span className="kv-error-msg">{folderErrors.semester}</span>
                )}
              </div>

              <div className="kv-form-group">
                <label className="kv-form-label">
                  Subject Name <span className="kv-required">*</span>
                </label>
                <input
                  className={`kv-form-input ${folderErrors.name ? "kv-input-error" : ""}`}
                  type="text"
                  placeholder="e.g. Machine Learning"
                  value={folderForm.name}
                  onChange={(e) => {
                    setFolderForm((p) => ({ ...p, name: e.target.value }));
                    setFolderErrors((p) => ({ ...p, name: undefined }));
                  }}
                />
                {folderErrors.name && (
                  <span className="kv-error-msg">{folderErrors.name}</span>
                )}
              </div>
            </div>

            <div className="kv-modal-footer">
              <button className="kv-modal-cancel" onClick={closeFolderModal}>Cancel</button>
              <button className="kv-modal-submit" onClick={handleFolderSubmit}>Create Folder</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}