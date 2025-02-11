const express = require('express')
const router = express.Router();
const Brands = require("../model/brands");
const mongoose = require("mongoose");


router.post('/',async(req,res)=>{
const {title,description,image}= req.body;
try{
  const newBrands = new Brands({
    _id: new mongoose.Types.ObjectId,
    title,
    description,
    image
  })
  await newBrands.save()
  res.status(200).json({
    content:newBrands
  })

}catch(error){
    res.status(500).json({
        error:error
    })
}
})
router.get('/',async(req,res)=>{
    try{
        const content = await Brands.find()
        res.status(200).json({content})
    }catch(err){
        res.status(500).json({
            error:err
        })
    }

})
module.exports = router