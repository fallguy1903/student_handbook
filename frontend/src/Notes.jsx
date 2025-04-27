import React, { useState } from "react";

export default function NotesDashboard() {
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [viewPdf, setViewPdf] = useState(null);
  const [newAssignment, setNewAssignment] = useState({
    subject: "",
    task: "",
    due: "",
  });

  const subjects = ["All", "Math", "Physics", "CS", "History", "Biology"];

  const assignments = [
    { id: 1, subject: "Math", task: "Complete chapter 3 exercises", due: "2025-04-15", done: false },
    { id: 2, subject: "CS", task: "Finish React project", due: "2025-04-17", done: false },
    { id: 3, subject: "History", task: "Write summary of WW2", due: "2025-04-20", done: false },
  ];

  const [assignmentList, setAssignmentList] = useState(assignments);

  const notes = [
    {
      id: 1,
      uploader: "John Doe",
      subject: "Math",
      date: "2025-04-12",
      fileUrl: "https://example.com/sample.pdf",
      title: "Algebra Basics",
    },
    {
      id: 2,
      uploader: "Jane Smith",
      subject: "CS",
      date: "2025-04-11",
      fileUrl: "https://example.com/sample2.pdf",
      title: "JS Functions Explained",
    },
  ];

  const filteredAssignments =
    subjectFilter === "All"
      ? assignmentList
      : assignmentList.filter((a) => a.subject === subjectFilter);

  const filteredNotes =
    subjectFilter === "All"
      ? notes
      : notes.filter((n) => n.subject === subjectFilter);

  const toggleAssignmentDone = (id) => {
    setAssignmentList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setTitle("");
    setSubject("");
    setFile(null);
  };

  const openAssignmentModal = () => setShowAssignmentModal(true);
  const closeAssignmentModal = () => setShowAssignmentModal(false);

  const handleAddAssignment = () => {
    const { subject, task, due } = newAssignment;
    if (!subject || !task || !due) {
      alert("Please fill all fields.");
      return;
    }
    setAssignmentList([
      ...assignmentList,
      {
        id: assignmentList.length + 1,
        subject,
        task,
        due,
        done: false,
      },
    ]);
    setNewAssignment({ subject: "", task: "", due: "" });
    closeAssignmentModal();
  };

  return (
    <div style={styles.container}>
      {/* Filter Row */}
      <div style={styles.filterRow}>
        <label htmlFor="filter" style={{ marginRight: "10px" }}>
          Filter by Subject:
        </label>
        <select
          id="filter"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          style={styles.select}
        >
          {subjects.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Main Columns */}
      <div style={styles.columns}>
        {/* Assignment Tracker */}
        <div style={styles.leftColumn}>
          <h3 style={styles.sectionTitle}>Assignments</h3>
          <button
            onClick={openAssignmentModal}
            style={styles.uploadBtn}
          >
            + Add Assignment
          </button>
          {filteredAssignments.length === 0 ? (
            <p style={{ color: "#aaa" }}>No assignments for this subject.</p>
          ) : (
            filteredAssignments.map((a) => (
              <div
                key={a.id}
                style={{
                  ...styles.assignmentCard,
                  opacity: a.done ? 0.5 : 1, // Faded effect when done
                  pointerEvents: a.done ? "none" : "auto", // Disable interactions when done
                }}
              >
                <div>
                  <strong>{a.subject}</strong>
                  <p>{a.task}</p>
                  <small>Deadline: {a.due}</small>
                </div>
                <input
                  type="checkbox"
                  checked={a.done}
                  onChange={() => toggleAssignmentDone(a.id)}
                  style={{ cursor: a.done ? "not-allowed" : "pointer" }} // Disable checkbox when checked
                />
              </div>
            ))
          )}
        </div>

        {/* Notes Feed */}
        <div style={styles.rightColumn}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={styles.sectionTitle}>Notes Feed</h3>
            <button onClick={openModal} style={styles.uploadBtn}>+ Upload</button>
          </div>
          {filteredNotes.length === 0 ? (
            <p style={{ color: "#aaa" }}>No notes for this subject.</p>
          ) : (
            filteredNotes.map((note) => (
              <div key={note.id} style={styles.noteCard}>
                <div style={styles.noteHeader}>
                  <strong>{note.title}</strong>
                  <span style={{ fontSize: "0.85em", color: "#ccc" }}>
                    {note.subject}
                  </span>
                  <span style={{ fontSize: "0.75em", color: "#999" }}>
                    {note.date}
                  </span>
                </div>
                <p style={{ marginTop: "5px" }}>
                  Uploaded by <em>{note.uploader}</em>
                </p>
                <button onClick={() => setViewPdf(note.fileUrl)} style={styles.viewBtn}>
                  View PDF
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* PDF Viewer */}
      {viewPdf && (
        <div style={styles.viewerOverlay}>
          <div style={styles.viewerContainer}>
            <button onClick={() => setViewPdf(null)} style={styles.closeButton}>
              ✖
            </button>
            <a
              href={viewPdf}
              download
              style={styles.downloadButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              ⬇ Download
            </a>
            <iframe
              src={viewPdf}
              width="100%"
              height="500px"
              style={{ border: "none", marginTop: "10px", borderRadius: "8px" }}
              title="PDF Viewer"
            />
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>Upload a Note</h3>
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">Select Subject</option>
              {subjects.slice(1).map((subj, i) => (
                <option key={i} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div>
              <button onClick={closeModal}>Cancel</button>
              <button
                onClick={async () => {
                  if (!file || !subject || !title) {
                    alert("Please fill all fields and select a file.");
                    return;
                  }
                  const formData = new FormData();
                  formData.append("file", file);
                  try {
                    const res = await fetch("http://localhost:3000/api/notes/upload", {
                      method: "POST",
                      body: formData,
                    });
                    const data = await res.json();
                    console.log("Upload response:", data);
                    alert("Uploaded successfully!");
                    setFile(null);
                    setTitle("");
                    setSubject("");
                    setShowModal(false);
                  } catch (err) {
                    console.error("Upload failed", err);
                  }
                }}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Modal */}
      {showAssignmentModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>Add Assignment</h3>
            <input
              type="text"
              placeholder="Assignment Task"
              value={newAssignment.task}
              onChange={(e) => setNewAssignment({ ...newAssignment, task: e.target.value })}
            />
            <select
              value={newAssignment.subject}
              onChange={(e) => setNewAssignment({ ...newAssignment, subject: e.target.value })}
            >
              <option value="">Select Subject</option>
              {subjects.slice(1).map((subj, i) => (
                <option key={i} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={newAssignment.due}
              onChange={(e) => setNewAssignment({ ...newAssignment, due: e.target.value })}
            />
            <div>
              <button onClick={closeAssignmentModal}>Cancel</button>
              <button onClick={handleAddAssignment}>Add Assignment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#1f1f1f",
    color: "#fff",
    minHeight: "100vh",
    minWidth: "900px",
    fontFamily: "sans-serif",
  },
  filterRow: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
  },
  select: {
    padding: "6px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#2a2a2a",
    color: "#fff",
  },
  columns: {
    display: "flex",
    gap: "20px",
  },
  leftColumn: {
    flex: 2.5, // Increased width
    backgroundColor: "#2a2a2a",
    padding: "15px",
    borderRadius: "10px",
  },
  rightColumn: {
    flex: 1.5,
    backgroundColor: "#2a2a2a",
    padding: "15px",
    borderRadius: "10px",
  },
  sectionTitle: {
    marginBottom: "10px",
  },
  assignmentCard: {
    backgroundColor: "#3a3a3a",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noteCard: {
    backgroundColor: "#3a3a3a",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  noteHeader: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  viewBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  uploadBtn: {
    padding: "8px 12px",
    backgroundColor: "#2980b9",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    backgroundColor: "#000000cc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#2a2a2a",
    padding: "30px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  viewerOverlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    backgroundColor: "#000000cc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  viewerContainer: {
    backgroundColor: "#2a2a2a",
    padding: "30px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "700px",
    boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  closeButton: {
    background: "none",
    color: "white",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  downloadButton: {
    display: "inline-block",
    backgroundColor: "#2980b9",
    color: "white",
    padding: "8px 16px",
    textDecoration: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
};
