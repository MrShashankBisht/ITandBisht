const express = require('express');
const bcryptjs = require('bcryptjs');
const router = express.Router();

// Importing MongoDB Module 
const nb  = require('../../models/mongoModel_UserLogin');

//@routs    /api/userSignUp
//@desc     This is a post Request
//@access   public   
router.post('/signUp', async (req, res) => {
    const NewUser = new LoginShema({
        // 'Name.FirstName': req.body.Name.FirstName,
        // 'Name.MiddleName': req.body.Name.MiddleName,
        // 'Name.LastName': req.body.Name.LastName,
        name: req.body.NAME,
        email: req.body.EMAIL,
        PhoneNumber: req.body.PHONE_NUMBER,
        password: req.body.PASSWORD
    });
    LoginShema.UserData.pre('save', function (next) {
        const user = this;
        if (user.isModified('password')) {
            bcryptjs.hash(user.password, 8, function (err, hash) {
                if (err) {
                    console.log(err);
                    next();
                }
                NewUser.password = hash;
                console.log(user.password);
            });
        }
        next();
    });
    await NewUser.save().then(item => res.json(item));
});

module.exports = router;
