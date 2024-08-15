const jwt = require('jsonwebtoken')
const Admin = require('../models/admins.model')

const adminAuth = async (req , res, next) =>{
    console.log(req.cookies.token); 
    const token = req.cookies.token // token ==> key for the cookie
    if(!token){
        return res.status(401).json({message : "token doesn't exist !!"})
    }
    try{
        const decoded_token = jwt.verify(token , process.env.SECRET_ACCESS_TOKEN)
        req.user = await Admin.findById(decoded_token.id)
        next()
    }catch(error){
        res.status(401).json({error: 'token invalid !'})
    }
}

module.exports = adminAuth;