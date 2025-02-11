const express = require("express");
const AboutUs = require('../model/AboutUs');
const router = express.Router();

router.post("/create-about-us",async(req,res)=>{
    const {title,description,button,image} = req.body;
    
    try{
        const NewAboutUs = new AboutUs({
            title,
            description,
            button,
            image
        })

        await NewAboutUs.save();

        res.status(200).json({
            message: "About U s created succesfully",
            content: NewAboutUs
        })
    }catch(err){
        res.status(500).json({
            error: "Error creating content",
            error: err
        })
    }
})

router.get('/get-about-us', async(req,res)=>{
    try{
        const content = await AboutUs.find();
        res.status(200).json({content})
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
    
})
module.exports = router;