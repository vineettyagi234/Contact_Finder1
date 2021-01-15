const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require('express-validator/check'); 
const User = require('../models/User');
const auth = require('../middleware/auth');





// @route     POST api/users

// @desc      Regiter a user

// @access    Public

router.get( '/', auth, async (req, res) => {
    try {
        
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }  
})



router.post( '/', [check('email' , 'Enter a valid email').isEmail(),
check('password' , 'Please enter a valid password').exists()], async (req, res) => {

    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });

    }

    const { email, password }  = req.body;
    try {
        
        let user = await User.findOne({ email });
         
        if(!user){
            return res.status(400).json({ msg: "Invalid crediantials " })
        }

        const isMatch = await bcrypt.compare(password , user.password);

        if(!isMatch){
            return res.status(400).json({ msg: "Password doesn't match" });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload , config.get('jwtSecret'), { 
            expiresIn: 3600000
        }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        } );

    } catch (err) {
        
        console.error(err.msg);
        res.status(500).send('Server error');
    }
    
        
})


module.exports = router;