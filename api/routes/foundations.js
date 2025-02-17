const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const checkAuth = require('../middleware/check-auth')
const mongoose = require("mongoose");

router.get("/products", async (req, res) => {
  const { search } = req.query;
  let products = await Product.find({ title: new RegExp(search, "i") }); // Case-insensitive search
  res.json({ products });
});
router.get("/",(req, res, next) => {
  Product.find({category: "Foundation"})
    .then((result) => {
      res.status(200).json({
        productData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:id", (req, res, next) => {
  console.log(req.params.id);
  Product.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        product: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id:new mongoose.Types.ObjectId(),
    category:req.body.category,
    code:req.body.code,
    title:req.body.title,
    shortdescription:req.body.shortdescription,
    ingredients:req.body.ingredients,
    benefits:req.body.benefits,
    mrp:req.body.mrp,
    sp:req.body.sp,
    discountPercent:req.body.discountPercent,
    imagePath:req.body.imagePath
  });

  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        newProduct: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "product deleted",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.put("/:id", (req, res, next) => {
  console.log(req.params.id);
  Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        category:req.body.category,
        code:req.body.code,
        title:req.body.title,
        description:req.body.description,
        mrp:req.body.mrp,
        sp:req.body.sp,
        discountPercent:req.body.discountPercent,
        imagePath:req.body.imagePath
      },
    },
    { new: true }
  )
  .then((result) => { 
    res.status(200).json({
      updatedProduct: result
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});
module.exports = router