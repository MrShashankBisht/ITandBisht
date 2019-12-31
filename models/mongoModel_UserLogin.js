const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema;

//  creating the Shema of the user login system

const UserData = new Schema({
    Name : {
        FirstName : {
            type : String,
            required : false,
        },
        MiddleName : {
            type: String,
            required: true
        },
        LastName : {
            type: String,
            required: true
        }
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        validate(value){
            if(!this.validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    PhoneNumber : {
        type : Number,
        required : true,
        maxlength : 10
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

UserData.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = bcryptjs.hash(user.password,10);
    }
    next();
});

module.exports = User = mongoose.model("userLogin",UserData);
