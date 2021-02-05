const mongoose = require('mongoose');
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')



const userSchema = new Schema({
    name: {type:String, required:[true, 'Name is required']},
    email: { type: String, unique: true, required: [true, 'Email is required'] },
    password: { type: String, required: [true, 'Password is required'] },
    adress: {type: Schema.Types.ObjectId, ref: 'Address'}
})

userSchema.plugin(uniqueValidator, { message: 'Error, already email exist' })
userSchema.methods.toJSON = function () {
    var obj = this.toObject()
    delete obj.password
    return obj
}


const User = mongoose.model('User', userSchema)

export default User