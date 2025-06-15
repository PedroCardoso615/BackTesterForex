import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Login.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login form submitted:", { email, password });

    // Simulate successful login
    setTimeout(() => {
      navigate("/profile"); // Will set up this page soon
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.title}>Welcome Back to NFTrade</h2>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>

          <Link
            to="/forgot-password"
            className={styles.link}
          >
            Forgot Password?
          </Link>

          <Link
            to="/signup"
            className={styles.linkWithIcon}
          >
            Create an Account
            <ArrowForwardIcon className={styles.icon} />
          </Link>
      </div>
    </div>
  );
};

export default Login;
