const mongoose = require('mongoose')

const ClientSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true , "name required"]
    },
    address:{
        type: String ,
        required: [true]
    },
    num:{
        type: Number,
        required:[true],
        unique: true
    },
    email:{
        type: String,
        required: [true , "email required"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'],
    }
})

const Client = mongoose.model("Client" , ClientSchema)
module.exports = Client