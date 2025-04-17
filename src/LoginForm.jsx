import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hardcoded email and password
  const correctEmail = "krishnasakhi@gmail.com";
  const correctPassword = "krishna";

  const handleSubmit = (e) => {
    e.preventDefault();
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch("http://localhost:5000/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
              localStorage.setItem("user", JSON.stringify({ email }));
              navigate("/dashboard"); // Redirect to dashboard
          } else {
              setError(data.message);
          }
      } catch (error) {
          setError("Server error. Please try again later.");
      }
  };
  

    if (email === correctEmail && password === correctPassword) {
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="button-container">
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Login
          </button >
          {error && <p className="text-red-500">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
