import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
import mongodb from './configs/mongodb'
// import connection from './configs/connectDB';
const app = express();

// connect đến mongodb
mongodb.connection()

require('dotenv').config();
const port = process.env.PORT || 8080;



// app.use((req,res,next) => {
//     // check => res.send("") nếu ko hợp lệ
//     console.log(">>>>run into my middleware")
//     // console.log(">>>>req header",req.method)
//     // next()// nếu hợp lệ sẽ  chạy tiếp code bên duới
//   })
  
  
var morgan = require('morgan')
// app.use(morgan('combined'))
  
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);

// init api route
initAPIRoute(app);

//handle 404 not found
app.use((req,res) => {
   res.render('404.ejs')
})

app.listen(3000, () => {
  console.log(`http://localhost:3000`)
})