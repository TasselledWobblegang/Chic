const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();
app.use(express.json());

// statically serve everything in the build folder on the route '/build'
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/login', (req, res) => {
  return res.sendFile(path.join(__dirname, '../dist', '../index.html'));
});

app.get('/*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../dist', '../index.html'));
});



app.listen(PORT, () => { console.log(`listening on port ${PORT}`) });

module.exports = app;