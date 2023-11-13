const express = require ('express')
const router = express.Router()
const authControllers = require('../controllers/authContollers')

router.post('/signup', authControllers.signup, (req,res) => {
    res.status(200).json(res.locals.userId)
});

router.post('/login', authControllers.signin, (req, res) => {
    res.status(200).json(res.locals.userId)
});

module.exports = router;


