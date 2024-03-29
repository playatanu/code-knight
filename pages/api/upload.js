import nc from "next-connect";
import multer from "multer";
import path from "path";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

const handler = nc(onError);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

let upload = multer({
  storage: storage,
});

let uploadFile = upload.single("file");
handler.use(uploadFile);
handler.post(async (req, res) => {
  console.log("req.file", req.file);
  console.log("req.body", req.body);
  let url = "http://" + req.headers.host;
  let filename = req.file.filename;

  res.status(200).send({
    result: result,
    url: url + "/public/" + req.file.filename,
  });
});

export default handler;
