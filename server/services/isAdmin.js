import jwt from 'jsonwebtoken';

const isAdmin = async (req, res) => {
  const token = req.headers.token;
  const { username } = req.body;

  try {
    const decode = jwt.verify(token, process.env.JWT);
    if (decode.username == username) return true;
    else res.status(400).json({ error: 'you are not an admin' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default isAdmin;
