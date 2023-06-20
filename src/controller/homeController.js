import pool from '../configs/connectDB';
import mymodel from '../models/Course';



// MONGO ======================================================================================================================
// DELETE MONGO 
let deleteUserMongo = async (req,res) => {
    const abc =await mymodel.MyModel.findOneAndDelete({name:"tohien"})
    .then(data => res.json(data))
    .catch(err => res.json(err))
}

// CREATE MONGO
let createMongo = async (req, res) => {
    await mymodel.MyModel.insertMany([
        {
        firstName:"trajan",
        lastName: "ga35hahah",
        email: "nham1rfss@gmail.com",
        password:"abcd"
        },
        {
        firstName:"yasuo",
        lastName: "ga35hahah",
        email: "nham123@gmail.com",
        password:"abcdf"
        }
    ])

    .then(data => res.json(data))
    .catch(err => res.json(err))
}



// UPDATE MONGO
let updateMongo =(req,res) => {
    mymodel.MyModel.updateMany({name:"Shriyam"},{name:"tohien"})
    .then(data => res.json(data))
    .catch(err => res.json(err))
}

// READ MONGO
let getDataMongo = async (req, res,next) => {
    const find = await mymodel.MyModel.find({})
    // return res.render("indexMongo.ejs",{dataUser:find})
    .then(data => res.json(data))
    .catch(err => res.json(err))
}
// let getDataMongo = async (req, res,next) => {
//     let find = await mymodel.MyModel.find({})
//     //test lỗi : cố tình bắt lỗi ,nó sẽ chạy vào catch --> next--> đến code bắt lỗi ở file server 
//     return Promise.reject(new Error('get data mongo ERROR!'))
//     .then(data => res.json(data))
//     // .catch(err =>next(err))
//     .catch(next)
// }



// CONTROLLER MYSQL ==========================================================================================
let getHomepage = async(req, res ,next) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    console.log("row",rows)
    
    return res.render('index.ejs', { dataUser:rows, test: 'abc string test' })
}

let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute(`select * from users where id = ?`, [userId]);
    return res.send(JSON.stringify(user))
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;

    await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)',
        [firstName, lastName, email, address]);

    return res.redirect('/')
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('delete from users where id = ?', [userId])
    return res.redirect('/');
}

let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('Select * from users where id = ?', [id]);
    return res.render('update.ejs', { dataUser: user[0] }); // x <- y
}

let postUpdateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;

    await pool.execute('update users set firstName= ?, lastName = ? , email = ? , address= ? where id = ?',
        [firstName, lastName, email, address, id]);

    return res.redirect('/');
}


// UPLOAD FILE ================================================================================================
let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs')
}


let handleUploadFile = async (req, res) => {

    if (req.fileValidationError) {

        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/img/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    // });
}


let handleUploadMultipleFiles = async (req, res) => {
    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/img/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);

}


module.exports = {
    getHomepage,getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser,
    getUploadFilePage, handleUploadFile, handleUploadMultipleFiles,
    updateMongo,getDataMongo,createMongo,deleteUserMongo
}