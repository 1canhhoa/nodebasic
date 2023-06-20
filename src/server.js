import express from 'express';
import configViewEngine from './configs/ViewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
import initWebDeck from './route/deck';
import mongodb from './configs/mongodb'
import secureApp from 'helmet'
const app = express();

// connect đến mongodb
mongodb()


require('dotenv').config();
const port = process.env.PORT || 8080;
  
var morgan = require('morgan')
// app.use(morgan('combined'))
  

// middleware chuyển dữ liệu sang kiểu json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//secure
app.use(secureApp())

// setup view engine
configViewEngine(app);
//init web route
initWebRoute(app);
// init api route
initAPIRoute(app);
// init api route
initWebDeck(app)
//handle 404 not found
//bình thường khi vào 1 đường link tồn tại thì sẽ --> route --> controller(return ở đây)
//trường hợp đường link ko tồn tại --> sẽ vào thẳng middleware app.use ở file server.js
app.use(async(req, res, next) => {
  try {
    return await Promise.reject(new Error('404 not found!'));
  } catch (err) {
    return next(err);
  }
})
app.use((err,req,res,next) => {
  const error = app.get('env') === "development" ? err: {}
  const status = err.status || 500
  
  return res.status(status).json({
    error:{
      messagess: error.message
    }
  })
})
app.listen(port, () => {
  console.log(`http://localhost:3000`)
})
