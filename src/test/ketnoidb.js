// đây chỉ là connect môngdb trong file test , muốn connect đến server sẽ phải export đến server

const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/database1')
db=mongoose.connection
db.once('open',() => {
    console.log("ket noi da dc thuc hien")
})
db.on("error",(err) => {
    console.log("ketnoi bi loi ",err)
})