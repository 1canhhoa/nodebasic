import express       from "express";
import APIController from '../controller/APIController';
import helper        from '../helpers/routeHelper'

let router = express.Router();
const initAPIRoute = (app) => {

// CRUD POSTMAN MYSQL=========================================================================================
    router.get('/users',              APIController.getAllUsers);
    router.post('/create-user',       APIController.createNewUser);
    router.put('/update-user',        APIController.updateUser);
    router.delete('/delete-user/:id', APIController.deleteUser);
//  ===========================================================================================================  
    router.post('/signin',helper.validateBody(helper.module5),APIController.signin)
    router.post('/signup',helper.validateBody(helper.module6),APIController.signup)
    router.post('/secret',APIController.secret)
// CRUD POSTMAN MONGODB========================================================================================
    //nếu chạy route này trên trình duyệt thì để hết là get
    router.get('/mongo/:userID',             helper.validateParam2(helper.module2,"userID"),     APIController.getDataMongo);
    router.put('/updateMongo/:userID/:id',   helper.validateParams(helper.module1,"userID","id"),
                                             helper.validateBody  (helper.module3),              APIController.updateMongo);
    router.post('/createbypostMan',          helper.validateBody  (helper.module3),              APIController.createbypostMan);
    router.delete('/deleteUserMongo/:userID',helper.validateParam2(helper.module2,"userID"),     APIController.deleteUserMongo);



    return app.use('/api/v1/', router)
}
export default initAPIRoute;
