const mongoose = require('mongoose');
const Shema = mongoose.Schema;

//  creating the Shema of the user login system

const UserData = new Shema({
    Name : {
        FirstName : {
            type : String,
            required : true
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
        required : true
    },
    PhoneNumber : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

module.exports = User = mongoose.model("userLogin",UserData);
