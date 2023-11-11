const express = require ('express')
const router = express.Router()

router.post('/signup', (req,res) => {
    //req
    res.status(200).json('signed up, authentically, YAR!')
});

router.post('/login', (req, res) => {
    res.status(200).json('logged in, authentically, YAR!')
});

module.exports = router;


