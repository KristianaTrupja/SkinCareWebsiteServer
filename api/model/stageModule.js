const mongoose = require('mongoose');

const stageModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const StageModule = mongoose.model('StageModule', stageModuleSchema);

module.exports = StageModule;
