import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
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
        title: "Creating Account...",
        text: "Setting up your Netflix profile",
        allowOutsideClick: false,
        background: "#141414",
        color: "#fff",
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await axios.post("http://localhost:5001/api/auth/register", {
        name,
        email,
        password,
      });

      Swal.close();

      await Swal.fire({
        title: "🎉 Account Created!",
        html: `
          <h3 style="color:#E50914;">Welcome to Netflix</h3>
          <p>Your account has been created successfully.</p>
        `,
        icon: "success",
        background: "#141414",
        color: "#fff",
        confirmButtonColor: "#E50914",
        width: "500px",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      Swal.close();

      Swal.fire({
        title: "Registration Failed",
        text: err.response?.data?.message || "Something went wrong",
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

        <h2 style={styles.title}>Sign Up</h2>

        <input
          style={styles.input}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p style={styles.text}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            style={styles.link}
          >
            Sign in
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
    color: "#E50914",
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
    background: "#E50914",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  text: {
    color: "gray",
    textAlign: "center",
    fontSize: "14px",
  },

  link: {
    color: "white",
    cursor: "pointer",
  },
};