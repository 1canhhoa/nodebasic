
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
module.exports = connection