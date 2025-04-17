
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const response = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       localStorage.setItem("token", data.token);

//       if (data.role === "admin") {
//         navigate("/admin-dashboard");
//       } else if (data.role === "user") {
//         navigate("/user-dashboard");
//       } else {
//         setError("Unknown role");
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="mt-5">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Username</label>
//           <input
//             type="text"
//             className="form-control"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary mt-3">
//           Login
//         </button>
//         {error && <div className="alert alert-danger mt-3">{error}</div>}
//       </form>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from "react";

// Dummy Admin Dashboard
const AdminDashboard = ({ user }) => (
  <div className="mt-5">
    <h2>Admin Dashboard</h2>
    <p>Welcome, {user.username || "Admin"}!</p>
    <p>Here's your user management panel.</p>
  </div>
);

// Dummy User Dashboard
const UserDashboard = ({ user }) => (
  <div className="mt-5">
    <h2>User Dashboard</h2>
    <p>Welcome, {user.username || "User"}!</p>
    <p>You are logged in as a user.</p>
  </div>
);

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      setRole(data.role);
      setIsLoggedIn(true);
      setUserData({ username }); // you can expand this based on backend
    } catch (err) {
      setError(err.message);
    }
  };

  // Show dashboard if logged in
  if (isLoggedIn) {
    return role === "admin" ? (
      <AdminDashboard user={userData} />
    ) : (
      <UserDashboard user={userData} />
    );
  }

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
