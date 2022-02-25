import dbConnect from '../../../server/services/db';
import User from '../../../server/models/userModel';
import isAdmin from '../../../server/services/isAdmin';
//import jwt from "jsonwebtoken";

dbConnect();

const getUserByName = async (req, res) => {
  const { username } = req.query;

  try {
    const users = await User.findOne({ username: username });

    if (users != null) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ error: 'user not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserByName = async (req, res) => {
  const { username } = req.query;

  try {
    if (await User.findOneAndDelete({ username: username })) {
      res.status(200).json({ status: 'user deleted' });
    } else {
      res.status(404).json({ error: 'user not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const patchUserByName = async (req, res) => {
  const { username } = req.query;

  try {
    if (await User.findOneAndUpdate({ username: username }, req.body)) {
      res.status(200).json({ status: 'user update done' });
    } else {
      res.status(404).json({ error: 'user not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userByUserName = async (req, res) => {
  if (req.method == 'GET') {
    getUserByName(req, res);
  }
  if (req.method == 'DELETE')
    if (await isAdmin(req, res)) {
      deleteUserByName(req, res);
    }
  if (req.method == 'PATCH')
    if (await isAdmin(req, res)) {
      patchUserByName(req, res);
    }
};

export default userByUserName;
