const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
       
    },
    password:{
        type: String,
        required: true,
        minlength: 4,

    },
    role:{
        type: String,
        enum: ['student', 'admin'],
        default: "student"
    }
},{ timestamps: true});

module.exports = mongoose.model("User", userSchema);