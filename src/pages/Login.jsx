import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      Swal.fire({
        title: "Missing Information",
        text: "Please fill all fields",
        icon: "warning",
        background: "#141414",
        color: "#fff",
        confirmButtonColor: "#E50914",
      });
      return;
    }

    try {
      setLoading(true);

      Swal.fire({
        title: "Signing In...",
        text: "Checking your credentials",
        allowOutsideClick: false,
        background: "#141414",
        color: "#fff",
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await axios.post(
        "http://localhost:5001/api/auth/login",
        {
          email,
          password,
        }
      );

      // Store JWT + user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name || "");

      Swal.close();

      await Swal.fire({
        title: "🎬 Welcome Back!",
        html: `
          <h3 style="color:#E50914;">${res.data.name || "User"}</h3>
          <p>Login successful. Enjoy streaming!</p>
        `,
        icon: "success",
        background: "#141414",
        color: "#fff",
        confirmButtonColor: "#E50914",
        width: "500px",
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      navigate("/home");
    } catch (err) {
      Swal.close();

      Swal.fire({
        title: "Login Failed",
        text: err.response?.data?.message || "Invalid credentials",
        icon: "error",
        background: "#141414",
        color: "#fff",
        confirmButtonColor: "#E50914",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.logo}>NETFLIX</h1>

        <h2 style={styles.title}>Sign In</h2>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p style={styles.text}>
          New user?{" "}
          <span
            onClick={() => navigate("/register")}
            style={styles.link}
          >
            Sign up now
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4') center/cover",
  },

  card: {
    background: "rgba(0,0,0,0.85)",
    padding: "40px",
    borderRadius: "10px",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  logo: {
    color: "red",
    textAlign: "center",
    letterSpacing: "3px",
    marginBottom: "10px",
  },

  title: {
    color: "white",
    marginBottom: "10px",
  },

  input: {
    padding: "12px",
    borderRadius: "5px",
    border: "none",
    outline: "none",
  },

  button: {
    padding: "12px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  text: {
    color: "gray",
    fontSize: "14px",
    textAlign: "center",
  },

  link: {
    color: "white",
    cursor: "pointer",
  },
};