import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SharedNotes() {

  const [notes, setNotes] = useState([]);
  const [notification, setNotification] = useState("");

  const navigate = useNavigate();

  //  Load notes
  useEffect(() => {
    loadSharedNotes();
  }, []);

  const loadSharedNotes = () => {

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("user");

    fetch(`${process.env.REACT_APP_API_URL}/notes/shared?email=${email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setNotes(data);
      });
  };


  // GLOBAL EVENT LISTENER
  useEffect(() => {

    const handler = (event) => {

      console.log("📩 RECEIVED (GLOBAL):", event.detail);

      setNotification(event.detail);

      loadSharedNotes();

      //  Auto hide after 3 sec
      setTimeout(() => {
        setNotification("");
      }, 3000);
    };

    window.addEventListener("note-update", handler);

    return () => {
      window.removeEventListener("note-update", handler);
    };

  }, []);



  return (
    <div style={{ padding: "30px" }}>

      <h1 style={{ textAlign: "center", color: "white" }}>
        🤝 Shared Notes
      </h1>

      {/* 🔔 Notification Box */}
      {notification && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "#333",
          color: "white",
          padding: "12px 20px",
          borderRadius: "10px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
          zIndex: 999
        }}>
          🔔 {notification}
        </div>
      )}

      {
        notes.length === 0 ?

          <h2 style={{ color: "white", textAlign: "center" }}>
            No shared notes yet
          </h2>

          :

          notes.map(item => (

            <div
              key={item.id}
              onClick={() => navigate(`/view/${item.note.id}`)}
              style={{
                background: "white",
                padding: "20px",
                margin: "20px",
                borderRadius: "15px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                cursor: "pointer"
              }}
            >

              <h3>{item.note.title}</h3>

              <p>
                Shared by:
                <b> {item.owner.email}</b>
              </p>

              <div style={{
                display: "flex",
                gap: "12px",
                marginTop: "15px"
              }}>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/view/${item.note.id}`);
                  }}
                  style={{
                    background: "#00b894",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "8px"
                  }}
                >
                  👁 View Note
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit/${item.note.id}`);
                  }}
                  style={{
                    background: "#667eea",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "8px"
                  }}
                >
                  ✏ Edit Shared
                </button>

              </div>

            </div>

          ))
      }

    </div>
  );
}

export default SharedNotes;