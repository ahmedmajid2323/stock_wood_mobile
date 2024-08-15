const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true , "name required"]
        },
        email:{
            type: String,
            required: [true , "email required"],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'],
        },
        password:{
            type: String,
            required: [true , "password required"]
        }
    }
)

const Admin = mongoose.model('Admin', AdminSchema)
module.exports = Admin