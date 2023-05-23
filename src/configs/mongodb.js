// import { mongoClient } from 'mongodb';
// let link= "mongodb+srv://1canhhoa:@Hien2002@1canhhoa.hqgnvdp.mongodb.net/ "

// let mongo = new mongoClient(url , {useNewUrlParser : true})
// mongo.connect((err,db)=> {
//     if(err) throw err

//     console.log("ket noi thanh cong")
// })


// import mongoose from 'mongoose'
// const dbname = "user1"
// const connectString = "mongodb://127.0.0.1/"+ dbname
// mongoose.connect(connectString,{useNewUrlParser : true,useUnifiedTopology:true})
// const mongoDB = mongoose.connection;
// mongoDB.on("error",console.error.bind(console,"mongodb connection error"))

// module.exports = mongoDB

import mongoose from 'mongoose'

let connection = async () =>  {
    try {
        await mongoose.connect('mongodb://127.0.0.1/database1'
        ,{useNewUrlParser : true,useUnifiedTopology:true}); 
        console.log("successfully")
    } catch (error) {
        console.log('failure')
    }
}
module.exports = {
    connection
}