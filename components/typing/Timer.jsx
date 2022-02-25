import { useEffect, useState } from "react";
import styles from "../../styles/TypingScreen.module.css";
const Timer = ({ startCounting, correctWords, restart }) => {
  const [timeElapesed, seTtimeElapesed] = useState(0);
  useEffect(() => {
    if (restart) {
      seTtimeElapesed(0);
      return;
    }

    let id;
    if (startCounting) {
      id = setInterval(() => {
        seTtimeElapesed((oldTime) => oldTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(id);
    };
  }, [startCounting]);

  const minutes = timeElapesed / 60;
  return (
    <div className={styles.timerBox}>
      <p className={styles.timeItem}>Time: {timeElapesed} Sec</p>
      <p className={styles.timeItem}>Correct Word: {correctWords}</p>
      <p className={styles.timeItem}>
        Speed: {(correctWords / minutes || 0).toFixed(1)} WPM
      </p>
    </div>
  );
};

export default Timer;
