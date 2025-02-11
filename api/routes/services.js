const express = require("express");
const Services = require("../model/services");
const router = express.Router();

router.post("/create-services", async (req, res) => {
  try {
    const newService = new Services({
      title: req.body.title,
      description: req.body.description,
    });

    await newService.save();
    res.status(200).json({
      message: "Service created successfully",
      content: newService,
    });
  } catch (err) {
    res.status(500).json({
      err: "Failed to create service",
      err,
    });
  }
});

router.get("/get-services", async (req, res) => {
  try {

    const content = await Services.find()
    res.status(200).json({
      content: content,
    });
  } catch (err) {
    res.status(500).json({err});
  }
});

module.exports = router;
