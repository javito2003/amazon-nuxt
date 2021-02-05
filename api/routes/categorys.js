const express = require('express')
const router = express.Router()


//import Model
import Category from '../models/category'


//POST
router.post('/new-category', async (req, res) => {
    try {
        const category = new Category()

        category.type = req.body.type

        await category.save()
        
        console.log(category);
        res.json({
            status: 'success',
            message: 'Successfuly create a category'
        })

    } catch (error) {
        return res.status(500).json({
            status: 'Error to create a category',
            message: error.message
        })
    }
})


//POST request
router.post('/categories', async (req, res) => {
    try {
        let categories = await Category.find()
        res.json({
            status: 'success',
            answer: categories
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            error: error.message
        })
    }
})

module.exports = router