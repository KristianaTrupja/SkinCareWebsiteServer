const mongoose = require("mongoose")

const AboutUsSchema = new mongoose.Schema({
    title: String,
    description: String,
    button: String,
    image: String
})

const AboutUs = mongoose.model("AboutUs", AboutUsSchema)
module.exports = AboutUs;