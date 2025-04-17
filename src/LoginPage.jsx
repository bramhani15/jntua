
import { useState, useEffect } from "react";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [protectedData, setProtectedData] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        alert("Login Successful");
      } else {
        alert("Login Failed: " + data.message);
      }
    } catch (err) {
      alert("Login Failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setProtectedData("");
    alert("Logged Out");
  };

  const getProtectedData = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/protected", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setProtectedData(data.message); // you can also use data.user if needed
      } else {
        alert("Access Denied: " + data.message);
        if (res.status === 403 || res.status === 401) {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
        }
      }
    } catch (err) {
      alert("Error accessing protected route");
    }
  };

  return (
    <div>
    <h2>{isLoggedIn ? "Welcome" : "Login"}</h2>
    {!isLoggedIn ? (
      <>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </>
    ) : (
      <>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={getProtectedData}>Get Protected Data</button>
        <p>{protectedData}</p>
      </>
    )}
  </div>
  );
}

export default Login;
