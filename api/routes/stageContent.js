const express = require('express');
const StageModule = require('../model/stageModule');
const router = express.Router();

// Create Stage Module Content
router.post('/create-stage', async (req, res) => {
  const { title, description, image } = req.body;

  try {
    const newStageModule = new StageModule({
      title,
      description,
      image,
    });

    await newStageModule.save();

    res.status(201).json({ message: 'Content created successfully', content: newStageModule });
  } catch (error) {
    res.status(500).json({ message: 'Error creating content', error });
  }
});
router.get('/get-stage', async (req, res) => {
    try {
      const content = await StageModule.find();
      res.status(200).json({ content });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching content', error });
    }
  });
  

module.exports = router;
