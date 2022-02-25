import styles from '../styles/HomeScreen.module.css';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Tab from '../components/Tab';
import Post from '../components/Post';

import Head from 'next/head';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const username = useSelector((state) => state.userReducer);

  const fatchownspost = async () => {
    try {
      console.log('code');
      const res = await axios.get('/api/code');
      if (res.status == 200) {
        console.log(res.data);
        setPosts(res.data);
      }
      if (res.status == 204) {
        setPosts([]);
      }
    } catch (error) {
      setPosts([]);
    }
  };

  const fatchFriendspost = async () => {
    try {
      console.log('friends');
      const res = await axios.get('/api/code/friends/' + username);
      if (res.status == 200) {
        console.log(res.data);
        setPosts(res.data);
      }
      if (res.status == 204) {
        setPosts([]);
      }
    } catch (error) {
      setPosts([]);
    }
  };
  const fatchLikeposts = async () => {
    try {
      console.log('likes');
      const res = await axios.get('/api/code/likes/' + username);
      if (res.status == 200) {
        console.log(res.data);
        setPosts(res.data);
      }
      if (res.status == 204) {
        setPosts([]);
      }
    } catch (error) {
      setPosts([]);
    }
  };

  useEffect(() => {
    fatchownspost();
  }, []);

  return (
    <>
      <Head>
        <title>CODING KNIGHTS</title>
      </Head>

      <Hero />

      <div className={styles.postBox}>
        <Tab
          codes={fatchownspost}
          friends={fatchFriendspost}
          likes={fatchLikeposts}
        />
        {posts
          .sort((b, a) =>
            a.createdAt
              .split('/')
              .reverse()
              .join()
              .localeCompare(b.createdAt.split('/').reverse().join())
          )
          .map((val) => {
            return <Post key={val._id} post={val} />;
          })}
      </div>
      <Footer />
    </>
  );
};

export default HomeScreen;
