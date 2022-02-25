import styles from "../styles/Popup.module.css";

const Popup = (props) => {
  return (
    <div className={styles.popup}>
      <div className={styles.text}>{props.content}</div>
    </div>
  );
};

export default Popup;
