import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
// import connection from './configs/connectDB';
const app = express();

require('dotenv').config();
const port = process.env.PORT || 8080;

var morgan = require('morgan')
app.use(morgan('combined'))


// app.use((req, res, next) => {
//     //check => return res.send()
//     console.log('>>> run into my middleware')
//     console.log(req.method)
//     // next();
// })


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);

// init api route
initAPIRoute(app);

//handle 404 not found
app.use((req, res) => {
    return res.send('nhamvanhien')
})


app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
})