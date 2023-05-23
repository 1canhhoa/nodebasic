import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
  name:  { type:String,maxlength:255 },
  class: { type: String,maxlength:255  },
  image: { type: String,maxlength:300  },
  // date:  { type: Date,default:date.now }
});
const MyModel = mongoose.model('courses', Course);
module.exports ={MyModel}
