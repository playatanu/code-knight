//import jwt from "jsonwebtoken";
import dbConnect from "../../../../server/services/db";
import Code from "../../../../server/models/codeModel";

dbConnect();

const codeByUsername = async (req, res) => {
  const { username } = req.query;

  try {
    const codes = await Code.find({ username: username });

    if (codes.length != 0) {
      res.status(200).json(codes);
    } else {
      res.status(404).json({ error: "code not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default codeByUsername;
