import dbConnect from '../../../server/services/db';
import User from '../../../server/models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dbConnect();

const userNameFound = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user != null && user.username == req.body.username) return false;
    else return true;
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  if (await userNameFound(req, res)) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);

      const user = new User(req.body);

      user.password = password;

      if (await user.save()) {
        res.status(200).json(user);
      } else {
        res.status(201).json({ error: 'user not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else res.status(201).json({ error: 'username already taken' });
};

const Signup = async (req, res) => {
  if (req.method == 'GET') res.status(404).json({ error: 'api not found' });
  if (req.method == 'POST') {
    createUser(req, res);
  }
};

export default Signup;
