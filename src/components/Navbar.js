// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>CAT Inspect</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/" className={styles.navLink}>Home</Link>
        </li>
        <li>
          <Link to="/inspection/new" className={styles.navLink}>New Inspection</Link>
        </li>
        <li>
          <Link to="/inspection/list" className={styles.navLink}>View Inspections</Link>
        </li>
        <li>
          <Link to="/inspection/report" className={styles.navLink}>Inspection Reports</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;