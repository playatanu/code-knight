//import jwt from "jsonwebtoken";
import dbConnect from "../../../../server/services/db";
import Code from "../../../../server/models/codeModel";
import User from "../../../../server/models/userModel";

dbConnect();

const codeByUserLike = async (req, res) => {
  const { username } = req.query;

  try {
    const currentUser = await User.findOne({ username: username });
    //const userCodes = await Code.find({ username: currentUser.username });
    const userCodes = [];
    const friendCodes = await Promise.all(
      currentUser.likes.map((value) => {
        return Code.find({ _id: value });
      })
    );

    return res.status(200).json(userCodes.concat(...friendCodes));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  ///// Friens + MY Code

  //   try {
  //     const currentUser = await User.findOne({ username: username });
  //     const userCodes = await Code.find({ username: currentUser.username });

  //     const friendCodes = await Promise.all(
  //       currentUser.following.map((value) => {
  //         return Code.find({ username: value });
  //       })
  //     );

  //     return res.status(200).json(userCodes.concat(...friendCodes));
  //   } catch (error) {
  //     return res.status(500).json({ error: error.message });
  //   }

  //   try {
  //     const codes = await Code.find({ username: username });

  //     if (codes.length != 0) {
  //       res.status(200).json(codes);
  //     } else {
  //       res.status(404).json({ error: "code not found" });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
};

export default codeByUserLike;
