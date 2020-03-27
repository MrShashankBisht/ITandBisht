const express = require('express');
const bcryptjs = require('bcryptjs');
const router = express.Router();

// Importing MongoDB Module 
const LoginShema = require('../../models/mongoModel_UserLogin');


// @routs   /api / userDelete
//@desc     This is a delete Request
//@access   public   
router.delete('delete/:id', (req, res) => {
    LoginShema.findById(req.params.id)
        .then(user => {
            user.remove({ "_id": req.param.id })
                .then(() => res.json({ "Status": true }))
                .catch(() => res.json({ "Status": false }));
        })
        .catch(err => {
            res.json({ "findStatus": false });
            console.log("data Not found \n\n " + err);
        });
});

module.exports = router;