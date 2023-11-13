const express = require('express');
const path = require('path');
const PORT = 3000;

// TESTING MULTER:
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// UNLINK FILES TO SERVER /UPLOADS
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

// S3 FUNCTIONS: UPLOAD FILE & GET FILE
const { uploadFile, getFileStream } = require('./s3.js');

const app = express();
app.use(express.json());

const authRouter = require('./routes/auth.js');

// statically serve everything in the build folder on the route '/build'
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/auth', authRouter);

// TEST: GET IMAGE
app.get('/images/:key', (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

// TEST: POSTING IMAGES
app.post('/images', upload.single('image'), async (req, res) => {
  const file = req.file; // data of image file
  console.log('file info: ', file);

  // send image file from client to s3
  const result = await uploadFile(file);
  console.log('result of sending file to s3: ', result);
  await unlinkFile(file.path);

  // We get an object with a property Location whick is a link, that we can use as the src to render the image to the client

  const description = req.body.description; // description data of form input
  console.log('image description: ', description);

  res.send({ imagePath: `images/${result.Key}` });
});

app.get('/*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../dist', '../index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
