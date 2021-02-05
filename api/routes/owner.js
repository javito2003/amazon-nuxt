const express = require('express')
const router = express.Router()

//model import 
import Owner from '../models/owner'


//POST api
router.post('/new-owner', async (req, res) => {
    try {
        const name = req.body.name
        const about = req.body.about

        const newOwner = {
            name: name,
            about: about
        }

        const ownerDB = await Owner.create(newOwner)

        res.json({
            status: 'successs',
            message: 'Successfully create a new owner'
        })


    } catch (error) {
        
        return res.status(500).json({
            status: 'Failed',
            message: error.message
        })

    }
})

//GET api
router.post('/owners', async (req, res) => {
    try {
        
        let owners = await Owner.find()

        return res.json({
            stauts: 'success',
            answer: owners
        })

    } catch (error) {
        
        return res.status(500).json({
            status: 'Failed',
            message: error.message
        })
    }
})

module.exports = router