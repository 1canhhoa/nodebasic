import express from 'express'

const configViewEngine = (app) => {
    app.use(express.static('./src/public'))//thiết lập quyền truy cập vào public
    app.set("view engine","ejs")
    app.set("views","./src/views")
}

export default configViewEngine