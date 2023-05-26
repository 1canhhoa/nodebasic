const mongoose = require ("mongoose");
const mocha = require("mocha")

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
  name:  String,
  class: String,
  image: String,
  // date:  { type: Date,default:date.now }
},{
  collection : 'courses'
}
);
const MyModel = mongoose.model('MyModel', Course);
module.exports = MyModel
