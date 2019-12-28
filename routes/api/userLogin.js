const express = require('express');
const router = express.Router();

// Importing MongoDB Module 
const LoginShema = require('../../models/UserLogin');

// @routs   /api/userlogin
//@desc     This is a get Request which will send all user data 
//@access   public   
router.get('/',(req,res)=>{
    LoginShema.find()
    .then(data => res.json(data));
});

//@routs    /api/userlogin
//@desc     This is a post Request
//@access   public   
router.post('/', (req, res) => {
    const NewUser = new LoginShema({
        'Name.FirstName': req.body.name.FirstName,
        'Name.MiddleName': req.body.name.MiddleName,
       'Name.LastName': req.body.name.LastName,
        email: req.body.email,
        PhoneNumber: req.body.phone,
        password : req.body.password,
    
    });
    NewUser.save().then(item => res.json(item));
});


// @routs   /api/userlogin
//@desc     This is a user authentication request 
//@access   public   
router.get('/:id', (req, res) => {
    console.log(req.params.id);
    LoginShema.findById(req.params.id)
        .then(user => {
            console.log(user);
            // password Authentication 
            const useremail = req.body.email;
            const userpassword = req.body.password;
            if(user.email == useremail){
                if(user.password == userpassword){
                    res.json(user);
                }
                else{
                    res.send("Password not match");
                }
            }else{
                res.send("eamil Not match");
            }

        })
        .catch(err => {
            res.json({ "findStatus": false });
            console.log("data Not found \n\n " + err);
        });
});


// @routs   /api/userlogin
//@desc     This is a delete Request
//@access   public   
router.delete('/:id', (req, res) => {
    LoginShema.findById(req.params.id)
        .then(user => {
            user.remove({"_id":req.param.id})
            .then(() => res.json({"Status":true}))
            .catch(()=> res.json({"Status" :false}));
        })
        .catch(err=> {
            res.json({"findStatus": false});
            console.log("data Not found \n\n "+err);
        });
});

module.exports = router;
