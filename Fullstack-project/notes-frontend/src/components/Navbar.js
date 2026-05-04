
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const menuRef = useRef();
  const bellRef = useRef();

  // 🌙 THEME
  const toggleTheme = () => {
    setDark(!dark);
    document.body.style.background =
      !dark
        ? "#121212"
        : "linear-gradient(135deg,#667eea,#764ba2)";
  };

  // 🔔 NOTIFICATIONS
  useEffect(() => {
    const handler = (event) => {
      setNotifications(prev => [
        { text: event.detail, read: false },
        ...prev
      ]);
    };

    window.addEventListener("note-update", handler);
    return () => window.removeEventListener("note-update", handler);
  }, []);

  // 🔥 CLICK OUTSIDE CLOSE (important)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        bellRef.current &&
        !bellRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItem = {
    padding: "12px",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    cursor: "pointer"
  };

  return (
    <div>

      {/* NAVBAR */}
      <div style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 9999,
        background: "rgba(20,20,40,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}>

        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          color: "white"
        }}>

          {/* LOGO */}
          <h2 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            🚀 NotesApp
          </h2>

          {/* RIGHT SIDE */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "14px"
          }}>

            {/* 🌙 */}
            <div
              onClick={toggleTheme}
              style={{
                cursor: "pointer",
                padding: "6px",
                borderRadius: "50%",
                transition: "0.2s"
              }}
              onMouseEnter={(e)=> e.currentTarget.style.background="rgba(255,255,255,0.15)"}
              onMouseLeave={(e)=> e.currentTarget.style.background="transparent"}
            >
              🌙
            </div>

            {/* 🔔 */}
            <div
              ref={bellRef}
              onClick={() => setOpen(!open)}
              style={{
                cursor: "pointer",
                padding: "6px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)"
              }}
            >
              🔔
            </div>

            {/* ☰ */}
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                fontSize: "22px",
                cursor: "pointer",
                padding: "6px 10px",
                borderRadius: "6px",
                background: "rgba(255,255,255,0.1)"
              }}
            >
              ☰
            </div>

          </div>
        </div>
      </div>

      {/* 🔔 NOTIFICATION */}
      {open && (
        <div
          ref={bellRef}
          style={{
            position: "fixed",
            top: "75px",
            right: "100px",  // 👈 proper spacing
            width: "240px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            zIndex: 10000
          }}
        >
          {notifications.length === 0 ? (
            <div style={{ padding: "12px" }}>No notifications</div>
          ) : (
            notifications.map((n, i) => (
              <div key={i} style={menuItem}>{n.text}</div>
            ))
          )}
        </div>
      )}

      {/* 📂 MENU */}
      {menuOpen && (
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            top: "75px",
            right: "20px",
            width: "220px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            zIndex: 10000
          }}
        >
          <div onClick={()=>navigate("/")} style={menuItem}>🏠 Home</div>
          <div onClick={()=>navigate("/add")} style={menuItem}>➕ Add Note</div>
          <div onClick={()=>navigate("/ai")} style={menuItem}>🤖 AI</div>
          <div onClick={()=>navigate("/trash")} style={menuItem}>🗑 Trash</div>
          <div onClick={()=>navigate("/shared")} style={menuItem}>🤝 Shared</div>
          <div onClick={logout} style={menuItem}>🚪 Logout</div>
        </div>
      )}

    </div>
  );
}

export default Navbar;

