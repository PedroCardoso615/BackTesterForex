import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import logo from "../images/CandleLab.png";

function Navbar() {
  const location = useLocation();
  const hideNav =
    location.pathname === "/login" || location.pathname === "/signup";

  if (hideNav) return null;

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navbar__logo}>
        <img src={logo} alt="logo"></img>
      </Link>
      <ul className={styles.navbar__links}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
