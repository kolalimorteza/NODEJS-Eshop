const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PageSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  content:{
    type: String,
    required: true
  },
  slug:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  sorting:{
    type: Number
  },
  avalability:{
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Page', PageSchema);