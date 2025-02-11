const mongoose = require('mongoose');

const BrandsSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:String,
    description:String,
    image:String
})

module.exports = mongoose.model("Brands",BrandsSchema)