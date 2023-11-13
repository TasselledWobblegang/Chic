const express = require('express');
const path = require('path');
const PORT = 3000;

// TESTING MULTER:
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(express.json());

const authRouter = require('./routes/auth.js');

// statically serve everything in the build folder on the route '/build'
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.use('/auth', authRouter);

// TEST: POSTING IMAGES
app.post('/images', upload.single('image'), (req, res) => {
  // data of image file
  const file = req.file;
  console.log('file info: ', file);
  // description data of form input
  const description = req.body.description;
  console.log('image description: ', description);

  res.send('sent an image! 🔥');
});

app.get('/*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../dist', '../index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
