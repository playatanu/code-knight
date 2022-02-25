import dbConnect from "../../../server/services/db";
import User from "../../../server/models/userModel";

dbConnect();

const getAllUser = async (res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const Users = async (req, res) => {
  if (req.method == "GET") {
    getAllUser(res);
  }
  // if (req.method == "POST") {
  //   createUser(req, res);
  // }
};

export default Users;
