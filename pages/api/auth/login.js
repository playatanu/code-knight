import dbConnect from '../../../server/services/db';
import User from '../../../server/models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dbConnect();

const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ username: user.username }, process.env.JWT, {
        // expiresIn: "1h",
      });

      res.status(200).json({ user: user.username, token: token });
    } else {
      res.status(201).json({ error: 'login failed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const Login = async (req, res) => {
  if (req.method == 'GET') res.status(404).json({ error: 'api not found' });
  if (req.method == 'POST') {
    userLogin(req, res);
  }
};

export default Login;
