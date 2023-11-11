const express = require ('express')
const router = express.Router()

router.post('/signup', (req,res) => {
    res.status(200).send('signup in YAR!')
})

router.post('/login', (req, res) => {
    res.status(200).send('login in YAR!')
})

router.post('/logout', (req, res) => {
    res.status(200).send('returned to port with BOOTY!')
})



