import express from "express";
import homeController from '../controller/homeController';
import multer from 'multer';
import path from 'path';
import appRoot from 'app-root-path';
let router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/img/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        cb(null, false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile_pic');
let uploadMultipleFiles = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 3);

let middleMultiple = (req, res, next) => {
    uploadMultipleFiles(req, res, (err) => {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (req.files.length==0) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
            // handle multer file limit error here
            res.send('LIMIT_UNEXPECTED_FILE')
        } 
        // else if (err) {
        //     res.send(err)
        // }

        else {
            // make sure to call next() if all was well
            next();
        }
    })
}
const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);
    router.get('/detail/user/:id', homeController.getDetailPage);
    router.post('/create-new-user', homeController.createNewUser);

    router.post('/delete-user', homeController.deleteUser);
    router.get('/edit-user/:id', homeController.getEditPage);
    router.post('/update-user', homeController.postUpdateUser);

    router.get('/upload', homeController.getUploadFilePage);
    router.post('/upload-profile-pic', upload, homeController.handleUploadFile)
    router.post('/upload-multiple-images', middleMultiple , homeController.handleUploadMultipleFiles)

    router.get('/about', (req, res) => {
        res.send(`nhamvanhien!`)
    })

    return app.use('/', router)
}
export default initWebRoute;