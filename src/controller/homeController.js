import pool from '../configs/connectDB';
import MyModel from '../models/Course';


let updateMongo = async (req,res) => {
    const updateMonggo =await MyModel.updateOne({name:"nhamvanhien"},{name:"nhamhien123"})
    .then(data => res.json(data))
    .catch(err => res.json(err))
}

let getDataMongo = (req, res) => {
    console.log("check mymodel",MyModel)
    MyModel.create({
        name:"nami",
        class: "ga35hahah",
    })
    .then(data => res.json(data))
    .catch(err => res.json(err))
}

let getHomepage = async(req, res ,next) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');

    return res.render('index.ejs', { dataUser: rows, test: 'abc string test' })
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
    getUploadFilePage, handleUploadFile, handleUploadMultipleFiles,updateMongo,getDataMongo
}