import jwt from "jsonwebtoken";

const tokenAuth = async (req, res) => {
  if (req.method == "POST") {
    try {
      var decoded = jwt.verify(req.headers.token, process.env.JWT);
      res.status(200).json({ username: decoded.username });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else res.status(404).json({ error: "bad request" });
};

export default tokenAuth;
