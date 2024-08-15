const Admin = require('../models/admins.model') 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (id)=>{
    return jwt.sign({id} , process.env.SECRET_ACCESS_TOKEN )
}

module.exports.register = async (req , res)=>{
    try {
        const { email , password , name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({ email, password: hashedPassword , name });
        await admin.save();
        res.status(201).json({ message: 'registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }   
}

module.exports.login = async (req , res)=>{
    const {email , password} = req.body ;
    const admin = await Admin.findOne({email})
    if(admin){
        const auth = await bcrypt.compare( password , admin.password ) //bool
        if(auth){
            const token = createToken(admin._id)
            res.cookie("token", token , {httpOnly : true})
            res.status(200).json({admin : admin})
        }
        else{
            res.status(500).json({message : 'incorrect password'})
        }
    }
    else{
        res.status(500).json({message: 'incorrect email'})
    }
}

module.exports.get_user = async (req , res) => {
    try {
        const adminId = req.params.admin_id;
        const admin = await Admin.findById(adminId)
        if(admin){
            res.status(200).json({admin: admin})
        }
        else{
            res.status(404).json({msg : 'user not found !'})
        }
    } catch (error) {
        console.error('error fetching data',error)
        res.status(500).json({msg : 'server error'})
    }
  
}