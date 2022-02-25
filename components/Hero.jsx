import { FiPlus } from 'react-icons/fi';

import styles from '../styles/Hero.module.css';
import Router from 'next/router';

import { useEffect, useState } from 'react';
import { removeUser } from '../store/actions/userAction';
import { useDispatch } from 'react-redux';

const Hero = () => {
  const [user, setUser] = useState('');
  const dis = useDispatch();

  const profileHandeler = () => {
    if (user != null) {
      Router.push(`/${user}`);
    } else {
      Router.push('/auth/login');
    }
  };

  const logoutHandeler = () => {
    localStorage.clear('token');
    localStorage.clear('user');
    dis(removeUser());

    Router.push('/auth/login');
  };

  useEffect(() => {
    setUser(localStorage.getItem('user'));
  }, [user]);

  return (
    <div className={styles.main}>
      <p className={styles.title} onClick={() => Router.push('/')}>
        CODING KNIGHTS
      </p>
      <div className={styles.rightside}>
        <p className={styles.plusicon} onClick={() => Router.push('/speed')}>
          Speed
        </p>
        <FiPlus
          className={styles.plusicon}
          onClick={() => Router.push('/code')}
        />
        {/* <img
          className={styles.profilepic}
          src={profileimage}
          onClick={() => router.push(`/${user.username}`)}
          alt="profileimage"
          width={30}
          height={30}
        />*/}
        <p className={styles.plusicon} onClick={profileHandeler}>
          {user != null ? user : 'Login'}
        </p>
        <p className={styles.plusicon} onClick={logoutHandeler}>
          {user != null ? 'Logout' : null}
        </p>
      </div>
    </div>
  );
};

export default Hero;
