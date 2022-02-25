import dbConnect from "../../../server/services/db";
import Code from "../../../server/models/codeModel";

dbConnect();

const getAllCode = async (res) => {
  try {
    const codes = await Code.find();

    if (codes.length != 0) {
      res.status(200).json(codes);
    } else {
      res.status(200).json({ error: "code not found" });
    }
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

const createCode = async (req, res) => {
  try {
    const token = req.headers.token;

    const newcode = new Code(req.body);

    await newcode.save();

    if (newcode.length != 0) {
      res.status(200).json(newcode);
    } else {
      res.status(200).json({ error: "user not found" });
    }
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

const Codes = async (req, res) => {
  if (req.method == "GET") {
    getAllCode(res);
  }
  if (req.method == "POST") {
    createCode(req, res);
  }
};

export default Codes;
