const mongoose = require( "mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/database1',{useNewUrlParser : true,useUnifiedTopology:true})

const Schema = mongoose.Schema
const accoutSchema = new Schema({
    name: String,
    class: String,
    image: String,

},{
    collection:'courses'
})
const accoutModel = mongoose.model('accout',accoutSchema)

accoutModel.find({})
.then(data => {
    console.log("data",data)
})
.catch(err => {
    console.log("err",err)
})