import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <h1>Welcome to CAT Inspect</h1>
      <nav className={styles.nav}>
        <Link to="/inspection/new" className={styles.link}>Start New Inspection</Link>
        <Link to="/inspection/list" className={styles.link}>View Inspections</Link>
      </nav>
    </div>
  );
};

export default Home;
