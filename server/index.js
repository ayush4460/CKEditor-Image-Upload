import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server successfully connected at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World !");
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/ckeditor", express.static(join(__dirname, "ckeditor")));

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "ckeditor");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage: multerStorage });

app.post("/api/upload", upload.single("uploadImg"), async (req, res) => {
  console.log(req.file.filename);
  res.json({ url: req.file.filename });
});
