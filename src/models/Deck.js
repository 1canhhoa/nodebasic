const mongoose = require ("mongoose");
const mocha = require("mocha");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const deckSchema = new Schema({
  name:{
    type:String,
  }  ,
  description: {
    type:String,
  }  ,
  total:{
    type:Number,
    default:0
  } ,
  owner:{
    type:Schema.Types.ObjectId,
    ref:"Courses"
  }
},{ collection :"deck" });
const MyDeck = mongoose.model('decks', deckSchema);
module.exports ={MyDeck}
