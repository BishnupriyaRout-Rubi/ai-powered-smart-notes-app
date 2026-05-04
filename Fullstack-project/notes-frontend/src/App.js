import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

import Home from "./pages/Home";
import AddNote from "./pages/AddNote";
import EditNote from "./pages/EditNote";
import Trash from "./pages/Trash";
import Navbar from "./components/Navbar";
import AIPage from "./pages/AIPage";
import ViewNote from "./pages/ViewNote";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import SharedNotes from "./pages/SharedNotes";

function App() {

  /*  GLOBAL REALTIME NOTIFICATIONS */
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) return;

    const socket = new SockJS(`${process.env.REACT_APP_API_URL}/ws`);

    const client = new Client({
      webSocketFactory: () => socket,

      onConnect: () => {
        console.log("🌍 Global websocket connected");

        // SINGLE CORRECT TOPIC
        client.subscribe("/topic/notes", (message) => {

          console.log("📩 GLOBAL RECEIVED:", message.body);

          //  global event (best practice)
          window.dispatchEvent(
            new CustomEvent("note-update", {
              detail: message.body
            })
          );

        });
      },

      onStompError: (frame) => {
        console.error("❌ WebSocket error:", frame);
      }
    });

    client.activate();

    return () => client.deactivate();

  }, []);




  return (
    <Router>

      <Navbar />

      <div style={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}>

        <Routes>

          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

          <Route path="/add" element={
            <ProtectedRoute>
              <AddNote />
            </ProtectedRoute>
          } />

          <Route path="/edit/:id" element={
            <ProtectedRoute>
              <EditNote />
            </ProtectedRoute>
          } />

          <Route path="/trash" element={
            <ProtectedRoute>
              <Trash />
            </ProtectedRoute>
          } />

          <Route path="/ai" element={
            <ProtectedRoute>
              <AIPage />
            </ProtectedRoute>
          } />

          <Route path="/shared" element={
            <ProtectedRoute>
              <SharedNotes />
            </ProtectedRoute>
          } />

          <Route path="/view/:id" element={
            <ProtectedRoute>
              <ViewNote />
            </ProtectedRoute>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<ForgotPassword />} />

        </Routes>

      </div>

      <footer style={{
        position: "fixed",
        bottom: "0",
        width: "100%",
        textAlign: "center",
        padding: "10px",
        fontSize: "13px",
        color: "#aaa",
        background: "rgba(0,0,0,0.2)"
      }}>
        © 2026 Bishnupriya • All Rights Reserved
      </footer>

    </Router>
  );
}

export default App;