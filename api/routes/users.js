const express = require('express')
const router = express.Router()



//Model imports
import User from '../models/user'

//Register
router.post('/register', async (req, res) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

        const newUser = {
            name: name,
            email: email,
            password: password
        }

        var userData = await User.create(newUser)

        console.log(userData);

        const toSend = {
            message: 'success'
        }

        return res.json(toSend)



        
    } catch (error) {
        console.log('ERROR - REGISTER ENDPOINT');
        console.log(error);

        const toSend = { 
            status: 'error',
            error: error
        }
        console.log(toSend);

        return res.status(500).json(toSend)
    }
})

module.exports = router