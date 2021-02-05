const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    type: {type: String, unique: true, required: [true, 'Category is required']}
})


const Category = mongoose.model('Category', categorySchema)

export default Category