import { useNavigate } from "react-router-dom";
import React from "react";
import './App.css'

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user info
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-3xl font-bold">Welcome to Dashboard 🎉</h1>
      <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}

