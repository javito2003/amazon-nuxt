const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    owner: { type: Schema.Types.ObjectId, ref: 'Owner' },
    title: { type: String },
    description: { type: String },
    photo: { type: String },
    price: { type: Number },
    stockQuantity: Number,
    rating: [Number]
})


const Product = mongoose.model('Product', productSchema)

export default Product