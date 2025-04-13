import React, { useEffect, useState } from "react";

export default function Notes(){
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [file, setFile] = useState(null);
    const [viewPdf, setViewPdf] = useState(null); // stores PDF URL or null


    const subjects = ["Math", "Physics", "CS", "History", "Biology"];

    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        setTitle("");
        setSubject("");
        setFile(null);
    };

    return(
        <div>
            <h2>Notes Feed</h2>
            <div>
                <p>No notes yet.</p>
            </div>
            <button onClick={openModal}>
                + Upload
            </button>

            <div>
                <div>
                    <span>John Doe</span>
                    <span>Maths</span>
                    <span>2025-04-12</span>
                </div>
                <div onClick={() => setViewPdf("https://example.com/sample.pdf")}>
                    <p>Click here to view the PDF</p>
                </div>
            </div>

            {viewPdf && (
              <div style={styles.viewerOverlay}>
                <div style={styles.viewerContainer}>
                  <button
                    onClick={() => setViewPdf(null)}
                    style={styles.closeButton}
                  >
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
                          {subjects.map((subj, i) => (
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
                              
                                // OPTIONAL: setViewPdf(data.fileUrl); // To view right after upload
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
        </div>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        backgroundColor: "#242424",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
      modal: {
        backgroundColor: "#242424",
        padding: "30px",
        borderRadius: "12px",
        width: "90%",
        maxWidth: "400px",
        boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
        textAlign: "center",
      },
      viewerOverlay: {
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        backgroundColor: "#242424",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      },
      
      viewerContainer: {
        backgroundColor: "#242424",
        padding: "20px",
        borderRadius: "10px",
        width: "90%",
        maxWidth: "800px",
        position: "relative",
        boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
      },
      
      closeButton: {
        position: "absolute",
        top: "10px",
        left: "10px", // moved to left
        backgroundColor: "black",
        border: "none",
        fontSize: "20px",
        cursor: "pointer",
        zIndex: 10,
      },
      
      downloadButton: {
        position: "absolute",
        top: "10px",
        right: "10px",
        backgroundColor: "#27ae60",
        color: "white",
        padding: "6px 10px",
        borderRadius: "6px",
        fontWeight: "bold",
        textDecoration: "none",
        zIndex: 10,
      },
      
};