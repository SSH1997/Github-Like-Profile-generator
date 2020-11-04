const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/', (req, res) => {
  res.send({ imgDataUrl: req.body.imgDataUrl });
});

router.post('/save', (req, res) => {
  const dataBuffer = fs.readFileSync(path.join(__dirname, 'db/db.json'));
  const dataJson = dataBuffer.toString();
  const data = JSON.parse(dataJson);

  const saveData = {
    name: req.body.imgName,
    path: req.body.imgDataUrl,
  };

  data.img.push(saveData);
  const bookJson = JSON.stringify(data);
  fs.writeFileSync(path.join(__dirname, 'db/db.json'), bookJson);
  res.send({ imgDataUrl: req.body.imgDataUrl });
});

router.get('/get:name', (req, res) => {
  const dataBuffer = fs.readFileSync(path.join(__dirname, 'db/db.json'));
  const dataJson = dataBuffer.toString();
  const data = JSON.parse(dataJson).img;

  let imgDataUrl;

  for (let i = 0; i < data.length; i += 1) {
    if (data[i].name === req.params.name.slice(1)) {
      imgDataUrl = data[i].path;
      break;
    }
  }

  res.send({ imgDataUrl });
});

module.exports = router;
