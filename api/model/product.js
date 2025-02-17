const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    category: String,
    code:String,
    title:String,
    shortdescription:String,
    ingredients:String,
    benefits:String,
    mrp:Number,
    sp:Number,
    discountPercent:Number,
    imagePath:String
})

module.exports = mongoose.model('Product',productSchema)