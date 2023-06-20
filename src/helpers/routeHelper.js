import Joi from "@hapi/joi";
import { Schema } from "mongoose";



// VALIDATE PARAM ==================================================================================
const validateParams = (schema,name1,name2) => {
    return (req,res,next) => {
        // console.log("name",name)--->"userID"
        // console.log("param...",req.params[name]) valua của userID
        const validateResult = 
        schema.validate({paramssss:req.params[name1]}) 
        && 
        schema.validate({param2:req.params[name2]})
        console.log("validateResult",validateResult)
        if(validateResult.error){
            return res.status(400).json(validateResult.error)
        }else{
            next()
        }
    }
}
const validateParam2 = (schema,name1) => {
    return (req,res,next) => {
        // console.log("name",name)--->"userID"
        // console.log("param...",req.params[name]) valua của userID
        const validateResult = schema.validate({paramssss:req.params[name1]}) 
        console.log("validateResult",validateResult)
        if(validateResult.error){
            return res.status(400).json(validateResult.error)
        }else{
            next()
        }
    }
}
//VALIDATE BODY ================================================================================================= 
const validateBody = (schema) => {
    return (req,res,next) => {
        console.log("req.body",req.body)
        const validateResult = schema.validate(req.body) 
        console.log("validateResult",validateResult)
        if(validateResult.error){
            return res.status(400).json(validateResult.error)
        }else{
            next()
        }
    }
}

const schemas = {
    //idSchema or idSchemaGetdata chỉ validate trên 1 đường link , có thể chứa 1 hay nhiều param
    idSchema : Joi.object().keys({
                    paramssss:Joi.string().min(3).max(100),
                    param2:Joi.string().min(3).max(100)
                }),
    idSchemaGetdata :Joi.object().keys({
                        paramssss:Joi.string().min(3).max(100),
                    }),
    bodySchema : Joi.object().keys({
        firstName : Joi.string().max(7).required(),
        lastName: Joi.string().min(2).max(7).required(),
        email: Joi.string().email().min(7).max(50).required(),
        password: Joi.string().max(50).required()
    }),
    bodySchemaDeck :Joi.object().keys({
        name : Joi.string().max(20).required(),
        description: Joi.string().max(100).required(),
        total: Joi.string().max(20).required(),
        owner: Joi.string().max(100)
    }),
    authenSignin : Joi.object().keys({
        email: Joi.string().email().min(7).max(50).required(),
        password: Joi.string().max(50).required()
    }),
    authenSignup : Joi.object().keys({
        firstName : Joi.string().max(7).required(),
        lastName: Joi.string().min(2).max(7).required(),
        email: Joi.string().email().min(7).max(50).required(),
        password: Joi.string().max(50).required()
    })
}


const module1 = schemas.idSchema
const module2 = schemas.idSchemaGetdata
const module3 =schemas.bodySchema
const module4 =schemas.bodySchemaDeck
const module5 =schemas.authenSignin
const module6 =schemas.authenSignup

module.exports= { 
    module1,validateParams,
    module2,validateParam2,
    module3,validateBody,
    module4,
    module5,
    module6,
}

