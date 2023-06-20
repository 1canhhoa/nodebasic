const mongoose = require ("mongoose");
const mocha = require("mocha");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
// tạo bộ khung cho dữ liệu muố mun thêm vào db
const Course = new Schema({
  firstName:{
    type:String,
  }  ,
  lastName: {
    type:String,
  },
  email:{
    type:String,
    required:true,//bắt buộc nhập
    unique:true, // ko đc trùng nhau
    lowercase:true
  },
  password:{
    type:String,
    required: true,
    unique:true,
    lowercase:true
  },
  deck:[{
    type:Schema.Types.ObjectId,
    ref:"decks"
  }]
},{ collection :"courses" });
const MyModel = mongoose.model('Courses', Course);
module.exports ={ MyModel}
