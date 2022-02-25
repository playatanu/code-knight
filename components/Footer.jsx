import styles from "../styles/Footer.module.css";

import Router from "next/router";

const Footer = () => {
  return (
    <div className={styles.main}>
      <span className={styles.text} onClick={() => Router.push("/")}>
        © 2022 CODEING KNIGHTS, Inc.
      </span>
    </div>
  );
};

export default Footer;
