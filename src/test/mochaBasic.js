
// const MyModel = require('../models/Course');
// const assert = require('assert');

// // // notes
// // // thư mục chứa file này bắt buộc phải tên là test, 
// // // thay đổi trong package json ---->> "test":"mocha"
// // //câu lệnh chạy npm run test or npm 
// // // nếu đổi test thành 1 tên khác code sẽ ko chạy
// // phải kết nối nodejs đến môngdb trong file test  ,nếu kết nối bên ngoài file test sẽ gặp lỗi timeout 2000ms

// describe('Creating documents in MongoDB', () => {

//   it('Creates a New User', (done) => {
//     console.log("6")
//       const mymodel = new MyModel.MyModel({ 
//         name: 'nami' ,
//         address: 'thai binh',
//       });
//       mymodel.save().then(() => {
//         assert(mymodel.isNew === false);
//         done()
//       })
//   })

//   it('Creates a New User', (done) => {
//     console.log("7")

//     const mymodel = new MyModel.MyModel({ 
//       name: 'abc' ,
//       address: 'thai binh',
//     });
//     mymodel.save().then(() => {
//       assert(mymodel.isNew === false);
//       done()
//     })
// })
// });