const db = require('../models/ChicModel')

const authControllers = {}


authControllers.signup = async(req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    let signupQuery = 'INSERT INTO users (username, password) VALUES ($1, $2)'
    const values = [username, password]
    const result = await db.query(signupQuery, values)
  

    const userQuery = 'SELECT _id FROM users WHERE username = $1 AND password = $2'
    const result1 = await db.query(userQuery, values)
    console.log('this is result1', result1)
    const userId = result1.rows[0]['_id'];
    console.log('this is result1.rows:', userId)
    res.locals.userId = userId
    next()
};

authControllers.signin = async (req, res, next) => {

    const username = req.body.username
    const password = req.body.password
    const values = [username, password]

    const userQuery = 'SELECT _id FROM users WHERE username = $1 AND password = $2'
    const result1 = await db.query(userQuery, values)
    console.log('this is result1', result1)
    const userId = result1.rows[0]['_id'];
    console.log('this is result1.rows:', userId)
    res.locals.userId = userId
    next()
};

module.exports = authControllers