const express = require('express');
const bcryptjs = require('bcryptjs');
const router = express.Router();

// Importing MongoDB Module 
const LoginShema = require('../../models/mongoModel_UserLogin');

// @routs   /api/userlogin
//@desc     This is a user authentication request 
//@access   public   
// router.post('/login/:id', (req, res) => {
//     console.log(req.params.id);
//     LoginShema.findOneById(req.params.id)
//         .then(user => {
//             console.log(user);
//             // password Authentication 
//             const useremail = req.body.email;
//             const userpassword = req.body.password;
//             if(user.email == useremail){
//                 if(bcryptjs.compare(userpassword,user.password)){
//                     res.json(user);
//                 }
//                 else{
//                     res.send("Password not match");
//                 }
//             }else{
//                 res.send("eamil Not match");
//             }

//         })
//         .catch(err => {
//             res.json({ "findStatus": false });
//             console.log("user Not found \n\n " + err);
//         });
// });

router.post('/login', (req, res) => {
    console.log(req.params.id);
    const useremail = req.body.EMAIL;
    const userpassword = req.body.PASSWORD;
    LoginShema.findOneById(req.params.id)
        .then(user => {
            console.log(user);
            // password Authentication 
            // const useremail = req.body.email;
            // const userpassword = req.body.password;
            if (user.email == useremail) {
                if (bcryptjs.compare(userpassword, user.password)) {
                    res.json(user);
                } else {
                    res.send("Password not match");
                }
            } else {
                res.send("eamil Not match");
            }

        })
        .catch(err => {
            res.json({
                "Status": "Fail",
                "Message" : "user Not found"
            });
            console.log("user Not found \n\n " + err);
        });
});

module.exports = router;
