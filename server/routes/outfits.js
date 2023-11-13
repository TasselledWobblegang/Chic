const express = require('express');
const router = express.Router();

// MULTER:
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// UNLINK FILES TO SERVER /UPLOADS
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

// S3 FUNCTIONS: UPLOAD FILE & GET FILE
const { uploadFile, getFileStream } = require('../s3.js');

// GET OUTFIT
router.get('/:key', (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

// UPLOAD OUTFIT
router.post('/upload', upload.single('image'), async (req, res) => {
  const file = req.file; // data of image file
  console.log('file info: ', file);

  // send image file from client to s3
  const result = await uploadFile(file);
  console.log('result of sending file to s3: ', result);
  await unlinkFile(file.path);

  // We get an object with a property Location whick is a link, that we can use as the src to render the image to the client

  const description = req.body.description; // description data of form input
  console.log('image description: ', description);

  res.send({ imagePath: `uploads/${result.Key}`, description });
});

module.exports = router;