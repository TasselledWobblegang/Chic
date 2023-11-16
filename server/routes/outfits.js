const express = require('express');
const router = express.Router();

const db = require('../models/ChicModel');

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
router.get('/uploads/:key', (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

router.post('/alloutfits', async(req, res) => {
  const userid = req.body.SSID;
  const query = 'SELECT aws_image, description FROM outfits WHERE user_id = $1';
  const result = await db.query(query, [userid])
  console.log('result from alloutfits in router', result)
  res.status(200).json(result)
})

router.post('/filteredoutfits', async(req, res) => {
  const userid = req.body.SSID;
  const catagories = req.body.catagories;
  let query = 'SELECT aws_image, description FROM outfits WHERE user_id = $1';
  if (catagories.includes('casual')){
    query = query.concat(' AND casual = true')
  }
  if (catagories.includes('smartCasual')){
    query = query.concat(' AND smart_casual = true')
  }
  if (catagories.includes('businessAttire')){
    query = query.concat(' AND business_attire = true')
  }
  if (catagories.includes('formal')){
    query = query.concat(' AND formal = true')
  }
  if (catagories.includes('athleisure')){
    query = query.concat(' AND athleisure = true')
  }
  const result = await db.query(query, [userid])
  console.log('result from filteredoutfits in router', result)
  res.status(200).json(result)
})

// UPLOAD OUTFIT
router.post('/upload', upload.single('image'), async (req, res) => {
  const file = req.file; // data of image file
  let [casual, smart_casual, business_attire, formal, athleisure] = [req.body.casual, req.body.smartCasual, req.body.businessAttire, req.body.formal, req.body.athleisure];
  console.log('file info: ', file);

  // send image file from client to s3
  const result = await uploadFile(file);
  console.log('result of sending file to s3: ', result);
  await unlinkFile(file.path);

  // We get an object with a property Location whick is a link, that we can use as the src to render the image to the client
  const description = req.body.description; // description data of form input
  console.log('image description: ', description);

  const SSID = req.body.SSID;
  console.log('THIS IS USER ID: ', SSID);

  // SAVE IN SQL
  const values = [description, result.Key, SSID, casual, smart_casual, business_attire, formal, athleisure];
  let saveImageQuery =
    'INSERT INTO outfits (description, aws_image, user_id, casual, smart_casual, business_attire, formal, athleisure) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
  console.log(values)
  // const resultQuery = await db.query(saveImageQuery, values);

  res.send({ imagePath: `outfits/uploads/${result.Key}`, description });
});

module.exports = router;
