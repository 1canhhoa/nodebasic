import pool from '../configs/connectDB';
import mymodel from '../models/Course';
import myauthen from '../models/authen';
import JWT from 'jsonwebtoken'
import {JWT_SECRET} from '../configs/jwt'

 const encodedToken = (userID) => {
    return JWT.sign({
        iss:"tohien",
        sub:"userID",
        iat:new Date().getTime(),
        exp:new Date().setDate(new Date().getDate()+3) 
    },JWT_SECRET)
 }
//============================================================================================================
let  signin = async(req,res) => {
    console.log("signin")
    }
let  signup = async(req,res,next) => {
    const {firstName,lastName,email,password} = req.body
    const foundUserExist =await myauthen.MyAuthen.findOne({email:email})
    if(foundUserExist) return res.status(403).json({error:"tồn tại user"})
    let newUser = new myauthen.MyAuthen({firstName,lastName,email,password})
    newUser.save()
    const token = encodedToken(newUser._id)
    res.setHeader("authorization",token)
    res.status(201).json({succes:true})
}
let  secret = async(req,res) => {
    console.log("secret")
}
// API(CRUD) CONTROLLER MONGODB ==============================================================================================
let getDataMongo = async(req,res) => {
    const {userID} = req.params
    await mymodel.MyModel.findOne({"_id":userID})
    .then(data => res.status(200).json(data))
    .catch(next)
}
let updateMongo = async (req,res,next) => {
    const {userID}= req.params
    const body = req.body
    const docDeleted =await mymodel.MyModel.findOneAndUpdate({"_id":userID},{$set:body})
    .then(data=>res.status(200).json({
                        docOrigin:data,//doc cần sửa đổi
                        docUpdated:body,//doc đã sửa đổi
                        massage:"ok"
        }))
    .catch(next)
}
let deleteUserMongo = async (req,res,next) => {
    const {userID}= req.params
    console.log(userID)
    const docDeleted =await mymodel.MyModel.findOneAndDelete({"_id":userID})
    .then(data=>res.status(200).json({
                        deleted:data,//doc đã xóa
                        massage:"ok"
        }))
    .catch(next)
}

let createbypostMan =async (req,res) => {
    const newUser = await mymodel.MyModel.insertMany(req.body)
    .then((data)=>{res.json(data)})
    .catch(err => res.status(200).json(err))
}
// API(CRUD) CONTROLLER MYSQL =====================================================================================================
let getAllUsers = async (req, res) => {
    //http
    // 404 501
    // json/xml => object
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;

    if (!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)',
        [firstName, lastName, email, address]);

    return res.status(200).json({
        message: 'ok'
    })
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    if (!firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('update users set firstName= ?, lastName = ? , email = ? , address= ? where id = ?',
        [firstName, lastName, email, address, id]);

    return res.status(200).json({
        message: 'ok'
    })
}

let deleteUser = async (req, res) => {
    let userId = req.params.id;
    if (!userId) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('delete from users where id = ?', [userId])
    return res.status(200).json({
        message: 'ok',
        userid: userId
    })
}






module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser,
    signin,signup,secret,
    createbypostMan,deleteUserMongo,updateMongo,getDataMongo,
}
