import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} CAT Inspect. All rights reserved.</p>
    </footer>
  );
};

export default Footer;