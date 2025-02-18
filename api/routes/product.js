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
router.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 12; // Default limit is 8 products per page
    const skip = (page - 1) * limit; 

    const totalProducts = await Product.countDocuments(); // Get total product count
    const products = await Product.find().skip(skip).limit(limit);
    res.status(200).json({
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      totalProducts,
      products
    });
    console.log(totalProducts,products,skip,limit,"totalProducts,products,skip,limit")
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }

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
        code:req.body.code,
        category:req.body.category,
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



module.exports = router;