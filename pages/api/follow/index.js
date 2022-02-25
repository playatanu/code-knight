import dbConnect from '../../../server/services/db';
import User from '../../../server/models/userModel';

import isAdmin from '../../../server/services/isAdmin';
dbConnect();

const followFunc = async (req, res) => {
  const { username, fusername, follow } = req.body;

  if (!follow) {
    //follow request

    try {
      await User.findOneAndUpdate(
        { username: username },
        {
          $addToSet: { following: fusername },
        }
      );
      await User.findOneAndUpdate(
        { username: fusername },
        {
          $addToSet: { followers: username },
        }
      );

      res.status(200).json({ status: 'follow ' + fusername });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    //unfollow request

    try {
      await User.findOneAndUpdate(
        { username: username },
        {
          $pull: { following: fusername },
        }
      );
      await User.findOneAndUpdate(
        { username: fusername },
        {
          $pull: { followers: username },
        }
      );

      res.status(200).json({ status: 'unfollow ' + fusername });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

const followByUsername = async (req, res) => {
  if (req.method == 'POST') {
    if (await isAdmin(req, res)) {
      followFunc(req, res);
    }
  }
};

export default followByUsername;
