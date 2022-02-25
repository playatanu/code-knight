import styles from '../styles/Profile.module.css';

import { FiMapPin, FiCheckCircle, FiUser } from 'react-icons/fi';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Snackbar,
  snack,
  infosnack,
  warnsnack,
  successsnak,
  errorsnak,
} from '../components/ui/Tost';

import axios from 'axios';

const Profile = ({ user, following, refresh }) => {
  const username = useSelector((state) => state.userReducer);
  const token = useSelector((state) => state.tokenReducer);
  const [isEdit, setIsEdit] = useState(false);
  const [newuser, setNewuser] = useState({});

  const handelFollow = async () => {
    const headers = { token: token };
    const data = {
      username: username,
      fusername: user.username,
      follow: following,
    };

    try {
      const res = await axios.post('/api/follow/', data, { headers });

      if (res.status == 200) {
        successsnak(res.data.status, {});
        refresh();
      } else {
        errorsnak(res.data.error, {});
      }
    } catch (error) {
      errorsnak(error.message, {});
    }
  };

  const updateUserProfile = async () => {
    const headers = { token };
    const data = { ...newuser, username: username };
    try {
      const res = await axios.patch('/api/user/' + username, data, {
        headers,
      });

      if (res.status == 200) {
        successsnak(res.data.status, {});
        setIsEdit(false);
        refresh();
      } else {
        errorsnak(res.data.error, {});
      }
    } catch (error) {
      errorsnak(error.message, {});
    }
  };

  useEffect(() => {}, [user]);

  return (
    <>
      <Snackbar />
      {isEdit ? (
        <div className={styles.main}>
          <input
            placeholder="name"
            onChange={(e) =>
              setNewuser((newuser) => ({ ...newuser, name: e.target.value }))
            }
          />
          <input
            placeholder="bio"
            onChange={(e) =>
              setNewuser((newuser) => ({ ...newuser, bio: e.target.value }))
            }
          />
          <input
            placeholder="address"
            onChange={(e) =>
              setNewuser((newuser) => ({ ...newuser, address: e.target.value }))
            }
          />
          <div onClick={updateUserProfile} className={styles.followbutton}>
            Update
          </div>
          <div onClick={() => setIsEdit(false)} className={styles.followbutton}>
            Cancel
          </div>
        </div>
      ) : (
        <div className={styles.main}>
          <div>
            <span className={styles.username}>{user.name}</span>
          </div>

          <div className={styles.list}>
            <div className={styles.list}>
              <span className={styles.s}>{user.username}</span>
              {user.varified ? <FiCheckCircle /> : null}
            </div>
          </div>

          <div className={styles.list}>
            <span className={styles.s}>{user.email}</span>
          </div>

          <div className={styles.list}>
            <span className={styles.bio}>{user.bio}</span>
          </div>

          {username == user.username ? (
            <div
              onClick={() => setIsEdit(true)}
              className={styles.followbutton}
            >
              {username == user.username ? <>Edit</> : <></>}
            </div>
          ) : (
            <div onClick={handelFollow} className={styles.followbutton}>
              {following ? <>Unfollow</> : <>Follow</>}
            </div>
          )}

          <div className={styles.list}>
            <div className={styles.list}>
              <FiUser />
              <span>{0}</span>
              <span className={styles.s}>Followers</span>
            </div>

            <div className={styles.list}>
              <span>{0}</span>
              <span className={styles.s}>Following</span>
            </div>
          </div>

          {user.address == null ? (
            <div className={styles.list}>
              <FiMapPin />
              <span className={styles.s}>{user.address}</span>
            </div>
          ) : null}
          {/* <div className={styles.list}>
            <FiInstagram />
            <span className={styles.s}>{user.address}</span>
          </div> */}
        </div>
      )}
    </>
  );
};

export default Profile;
