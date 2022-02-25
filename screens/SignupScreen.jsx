import axios from 'axios';

import { useState } from 'react';
import Router from 'next/router';
import Head from 'next/head';

import Hero from '../components/Hero';
import styles from '../styles/Auth.module.css';

import {
  Snackbar,
  snack,
  infosnack,
  warnsnack,
  successsnak,
  errorsnak,
} from '../components/ui/Tost';

const Signup = () => {
  const [user, setuser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const creactAcount = async () => {
    try {
      const res = await axios.post('/api/auth/signup', user);

      if (res.status == 200) {
        Router.push('/auth/login');
      } else {
        warnsnack(res.data.error, { time: 5000 });
      }
    } catch (error) {
      console.log(error.message);
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

        <h2>SignUp 😁</h2>

        <div className={styles.container}>
          <input
            className={styles.inputBox}
            placeholder="Name"
            onChange={(e) =>
              setuser((user) => ({ ...user, name: e.target.value }))
            }
          />

          <input
            className={styles.inputBox}
            placeholder="Username"
            onChange={(e) =>
              setuser((user) => ({ ...user, username: e.target.value }))
            }
          />

          <input
            className={styles.inputBox}
            placeholder="Email"
            onChange={(e) =>
              setuser((user) => ({ ...user, email: e.target.value }))
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
            SignUp
          </button>
        </div>

        <span
          className={styles.link}
          onClick={() => Router.push('/auth/login')}
        >
          Alredy have account? Login
        </span>
      </div>
    </>
  );
};

export default Signup;
