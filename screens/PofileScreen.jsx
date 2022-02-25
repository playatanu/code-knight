import styles from '../styles/ProfileScreen.module.css';

import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Tab from '../components/Tab';
import Post from '../components/Post';
import Profile from '../components/Profile';

import Head from 'next/head';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ProfileScreen = ({ query }) => {
  const username = useSelector((state) => state.userReducer);
  const [posts, setPosts] = useState([]); //Post data
  const [isposts, setisposts] = useState(false); //post status
  const [user, setUser] = useState({}); //user
  const [isuser, setisuser] = useState(false); // user status
  const [following, setFollowing] = useState(false); // following ststus

  const fatchownspost = async () => {
    try {
      console.log('code');
      const res = await axios.get('/api/code/u/' + query);
      if (res.status == 200) {
        setPosts(res.data);
        setisposts(true);
      }
      if (res.status == 204) {
        setPosts([]);
        setisposts(false);
      }
    } catch (error) {
      setPosts([]);
      setisposts(false);
    }
  };

  const fatchFriendspost = async () => {
    try {
      console.log('friends');
      const res = await axios.get('/api/code/friends/' + query);
      if (res.status == 200) {
        setPosts(res.data);
        setisposts(true);
      }
      if (res.status == 204) {
        setPosts([]);
        setisposts(false);
      }
    } catch (error) {
      setPosts([]);
      setisposts(false);
    }
  };
  const fatchLikeposts = async () => {
    try {
      console.log('likes');
      const res = await axios.get('/api/code/likes/' + query);
      if (res.status == 200) {
        setPosts(res.data);
        setisposts(true);
      }
      if (res.status == 204) {
        setPosts([]);
        setisposts(false);
      }
    } catch (error) {
      setPosts([]);
      setisposts(false);
    }
  };

  const fatchuser = async () => {
    try {
      const res = await axios.get('/api/user/' + query);
      if (res.status == 200) {
        setisuser(true);
        setUser(res.data);
        setFollowing(res.data.followers.includes(username));
        fatchownspost(); //fatch user post
      }
    } catch (error) {}
  };

  useEffect(() => {
    fatchuser();
  }, [query]);

  return (
    <>
      <Head>
        <title>{query}</title>
      </Head>

      <Hero />

      {isuser == true ? (
        <div className={styles.main}>
          <div className={styles.profileblock}>
            <Profile user={user} following={following} refresh={fatchuser} />
          </div>

          <div className={styles.postblock}>
            <Tab
              codes={fatchownspost}
              friends={fatchFriendspost}
              likes={fatchLikeposts}
            />

            <div className={styles.postBox}>
              {isposts
                ? posts
                    .sort((b, a) =>
                      a.createdAt
                        .split('/')
                        .reverse()
                        .join()
                        .localeCompare(b.createdAt.split('/').reverse().join())
                    )
                    .map((val) => {
                      return <Post key={val._id} post={val} />;
                    })
                : 'NO CODE FOUND'}
            </div>
          </div>
        </div>
      ) : (
        <p>No User Found</p>
      )}

      <Footer />
    </>
  );
};

export default ProfileScreen;
