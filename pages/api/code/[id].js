//import jwt from "jsonwebtoken";
import dbConnect from "../../../server/services/db";
import Code from "../../../server/models/codeModel";

import isAdmin from "../../../server/services/isAdmin";

dbConnect();

const getCodeByID = async (req, res) => {
  const { id } = req.query;

  try {
    const codes = await Code.findById(id);

    if (codes.length != 0) {
      res.status(200).json(codes);
    } else {
      res.status(404).json({ error: "code not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCodeByID = async (req, res) => {
  const { id } = req.query;

  try {
    if (await Code.findOneAndDelete({ _id: id })) {
      res.status(200).json({ status: "code deleted" });
    } else {
      res.status(404).json({ error: "code not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const patchCodeByID = async (req, res) => {
  const { id } = req.query;
  try {
    if (await Code.findOneAndUpdate({ _id: id }, req.body)) {
      res.status(200).json({ status: "code update done" });
    } else {
      res.status(404).json({ error: "code not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const codeBycodeID = async (req, res) => {
  if (req.method == "GET") {
    getCodeByID(req, res);
  }
  if (req.method == "DELETE")
    if (isAdmin(req, res)) {
      deleteCodeByID(req, res);
    }
  if (req.method == "PATCH")
    if (isAdmin(req, res)) {
      patchCodeByID(req, res);
    }
};

export default codeBycodeID;
