const express = require('express')
const router = express.Router()

//Import MOdel
import Product from '../models/product'

//import upload
import upload from '../middleware/upload-photo'

//Create a new product
router.post('/new-product',upload.single('photo'), async (req, res) => {
    try {
        const title = req.body.title
        const description = req.body.description
        const photo = req.file.location
        const price = req.body.price
        const stockQuantity = req.body.stockQuantity

        const newProduct = {
            title: title,
            description: description,
            photo: photo,
            price: price,
            stockQuantity: stockQuantity
        }


        var productDB = await Product.create(newProduct)
        res.json({
            status: 'success',
        })
        

    } catch (error) {
        res.status(500).json({
            error: error
        })
        
    }
})




//Get all products
router.post('/products', async(req, res) => {
    try {
        
        let products = await Product.find()

        res.json({
            status: 'success',
            data: products
        })


    } catch (error) {
        
        return res.status(500).json({
            status: 'Failed',
            message: error.message
        })


    }
})


//Get a single product
router.post('/product/:id', async (req, res) => {
    const _id = req.params.id
    try {
        
        let product = await Product.findById({_id})

        res.json({
            status: 'success',
            data: product
        })


    } catch (error) {
        
        return res.status(500).json({
            status: 'Failed',
            message: error.message
        })


    }
})


//Edit a product
router.post('/edit-product/:id',upload.single('photo'), async (req, res) => {
    try {
        
        let product = await Product.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    title: req.body.title,
                    price: req.body.price,
                    category: req.body.category,
                    photo: req.file.location,
                    description: req.body.description,
                    owner: req.body.ownerID,
                    category: req.body.categoryID
                }
            },
            { upsert: true }
        );

        return res.json({
            success: true,
            updateProduct: product
        })

    } catch (error) {
        
        return res.status(400).json({
            status: 'Failed',
            error: error.message
        })


    }
})



//Delete a product
router.post('/delete-product/:id', async (req, res) => {
    const _id = req.params.id
    try {
        let deleteProduct = await Product.findByIdAndDelete({ _id })
        
        if(deleteProduct){

        return res.json({
            status: 'Success',
            message: deleteProduct
        })
        } else {
            res.json({
                status: 'Failed',
                message: "The product doesn't exist"
            })
        }

    } catch (error) {
        
        return res.status(400).json({
            status: 'Failed',
            message: error.message
        })


    }
})



module.exports = router