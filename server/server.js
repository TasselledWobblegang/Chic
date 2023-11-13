const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();
app.use(express.json());

const authRouter = require('./routes/auth.js');

// statically serve everything in the build folder on the route '/build'
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.use('/auth', authRouter);

// TEST: POSTING IMAGES
app.post('/images', (req, res) => {
  res.send('sent an image! 🔥');
});

app.get('/*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../dist', '../index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
