
const MyModel = require('../models/Course');
const assert = require('assert');

// // notes
// // thư mục chứa file này bắt buộc phải tên là test, 
// // thay đổi trong package json ---->> "test":"mocha"
// //câu lệnh chạy npm run test or npm 
// // nếu đổi test thành 1 tên khác code sẽ ko chạy

describe('Creating documents in MongoDB', () => {
  it('Creates a New User', (done) => {
      const mymodel = new MyModel({ 
        name: 'Shriyam' ,
      });
      mymodel.save().then(() => {
        assert(mymodel.isNew === false);
        done()
      })

    //if the newUser is saved in db and it is not new
  })
});