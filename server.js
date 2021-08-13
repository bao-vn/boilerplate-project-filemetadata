const express = require('express');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');
let mongoose;
try {
  mongoose = require("mongoose");
} catch (e) {
  console.log(e);
}
dotenv.config();
const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.use(express.json());
app.use(cors());
app.disable('x-powered-by');
// app.use(express.static('public'));
app.use('/public', express.static(process.cwd() + '/public'));
// app.use(upload.single('files'));
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  const uploadFile = req.file;

  res.send({
    name: uploadFile.originalname
    , type: uploadFile.mimetype
    , size: uploadFile.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
