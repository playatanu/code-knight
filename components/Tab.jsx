import { FiCode, FiUsers, FiThumbsUp } from 'react-icons/fi';

import styles from '../styles/Tab.module.css';

import { useSelector } from 'react-redux';
const Tab = ({ codes, friends, likes }) => {
  const username = useSelector((state) => state.userReducer);

  return (
    <div className={styles.main}>
      {username == '' ? (
        ''
      ) : (
        <div className={styles.list} onClick={codes}>
          <FiCode />
          <span>Codes</span>
        </div>
      )}

      {username == '' ? (
        ''
      ) : (
        <div className={styles.list} onClick={friends}>
          <FiUsers />
          <span>Friends</span>
        </div>
      )}

      {username == '' ? (
        ''
      ) : (
        <div className={styles.list} onClick={likes}>
          <FiThumbsUp />
          <span>Likes</span>
        </div>
      )}
    </div>
  );
};

export default Tab;
