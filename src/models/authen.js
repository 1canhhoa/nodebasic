const mongoose = require ("mongoose");
const mocha = require("mocha");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const authentication = new Schema({
    firstName:{
      type:String,
    },
    lastName: {
      type:String,
    },
    email:{
      type:String,
      required:true,//bắt buộc nhập
      unique:true, // ko đc trùng nhau,nếu để unique thì mặc định sẽ tạo index cho email trong mongodb
      //unique chỉ có tác khi bạn LƯU CÁI MỚI trùng với dữ liệu có sẵn
      lowercase:true
    },
    password:{
      type:String,
      required: true,
      lowercase:true
    }
},{ collection :"authentication" });
const MyAuthen = mongoose.model('authens', authentication);
module.exports ={MyAuthen}
