const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema;

//  creating the Shema of the user login system

const UserData = new Schema({
    Name : {
        type : String,
        minlength : 3,
        required : false,
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        unique : true
    },
    PhoneNumber : {
        type : Number,
        required : false,
        trim: true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 8,
    },
    date : {
        type : Date,
        default : Date.now,
        required : true
    }
});

module.exports = User = mongoose.model("userLogin",UserData);
