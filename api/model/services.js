const mongoose = require('mongoose');

const ServicesSchema = new mongoose.Schema({
    title: String,
    description: String
})

const Services = mongoose.model("Services",ServicesSchema);

module.exports = Services