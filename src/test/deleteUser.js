
const MyModel = require('../models/Course');
const assert = require('assert');
  
describe('Deleting a User', () => {
  
    let user;
    beforeEach((done) => {
        console.log("1")
        // user is an instance of User Model
        user = new MyModel.MyModel({ name: 'Shriyam',class:'abcbcbc',address: 'thai binh' });
        user.save()
            .then(() => done());
    });
    it('Removes a User using its instance', (done) => {
        console.log("2")
        console.log(user.name)
        MyModel.MyModel.findOne({ name:'Shriyam'})
        
        // )
        .then((users) => {
            console.log(user.name)
            console.log( users.name)
            console.log(typeof null)
            assert(users.name == 'Shriyam' );
            // console.log(users.name)
            done();
        })
    });


    // it('Removes a user', (done) => {
    //     console.log("3")

    //     MyModel.MyModel.findOneAndDelete({ name: 'Shriyam' })
    //     .then(() =>MyModel.MyModel.findOne({ name: 'Shriyam' }))
    //     .then((user) => {
    //         assert(user === null);
    //         done();
    //     });
    // });

    // it('Removes a user using its id', (done) => {
    //     console.log("4")

    //     MyModel.MyModel.findId('6472346817f977e46d658049')
    //     .then(() => MyModel.MyModel.findOne({ name: 'Shriyam' }))
    //     .then((user) => {
    //         assert(user === null);
    //         done();
    //     });
    // })
})