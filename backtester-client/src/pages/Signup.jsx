import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Signup.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup form submitted:", { username, email, password });

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.title}>Create Your Account</h2>
        <form onSubmit={handleSignup} className={styles.form}>
          <input
            type="text"
            placeholder="Username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
            Sign Up
          </button>
        </form>
          <Link to="/login" className={styles.linkWithIcon}>
            Already have an account?
            <ArrowForwardIcon className={styles.icon} />
          </Link>
      </div>
    </div>
  );
};

export default Signup;
