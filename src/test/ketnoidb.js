// đây chỉ là connect môngdb trong file test , muốn connect đến server sẽ phải export đến server

const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/database1');
const db = mongoose.connection
// before((done) => {
    db
    .once('open' ,()  => {
        console.log("ket noi da dc thuc hien")
        // done()
    })
    .on  ("error",err => console.log("ket noi bi loi ",err    ))
// })


beforeEach ( (done) => {
    console.log("dropEach")
    db.collections.courses.drop( () => done() )
})