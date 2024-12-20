const mongoose = require('mongoose');
const { Schema } = mongoose;

const stuffSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  videoSrc: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    required: true
  },
});

const stuff = mongoose.model('stuff', stuffSchema);

module.exports = stuff;
