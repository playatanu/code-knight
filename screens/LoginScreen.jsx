import axios from 'axios';

import { useState } from 'react';
import Router from 'next/router';
import Head from 'next/head';

import styles from '../styles/Auth.module.css';
import { useDispatch } from 'react-redux';

import Hero from '../components/Hero';

import { setUsername } from '../store/actions/userAction';
import { settoken } from '../store/actions/tokenAction';

import {
  Snackbar,
  snack,
  infosnack,
  warnsnack,
  successsnak,
  errorsnak,
} from '../components/ui/Tost';
const LoginScreen = () => {
  const dis = useDispatch();
  const [user, setuser] = useState({
    username: '',
    password: '',
  });

  const creactAcount = async () => {
    try {
      const res = await axios.post('/api/auth/login', user);

      if (res.status == 200) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', res.data.user);
        dis(setUsername(res.data.user));
        dis(settoken(res.data.token));
        Router.push('/');
        console.log(res.data);
      } else {
        errorsnak(res.data.error, { time: 5000 });
      }
    } catch (error) {
      console.log(error);
      errorsnak(error.message, { time: 5000 });
    }
  };

  return (
    <>
      <Head>
        <title>Login !</title>
      </Head>
      <Hero />
      <div className={styles.main}>
        <Snackbar />

        <h2>Login 🤪</h2>

        <div className={styles.container}>
          <input
            className={styles.inputBox}
            placeholder="Username"
            onChange={(e) =>
              setuser((user) => ({ ...user, username: e.target.value }))
            }
          />

          <input
            className={styles.inputBox}
            placeholder="Password"
            onChange={(e) =>
              setuser((user) => ({ ...user, password: e.target.value }))
            }
          />

          <button className={styles.button} onClick={creactAcount}>
            Login
          </button>
        </div>

        <span
          className={styles.link}
          onClick={() => Router.push('/auth/signup')}
        >
          Create a new account? SignUp
        </span>
      </div>
    </>
  );
};

export default LoginScreen;
