const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const User = require('../models/user.model');

router.route('/all').get((req, res) => {
    console.log("get request /user");
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post( async (req, res) => {
    console.log("post request /user Register");
    try{
        const name = req.body.name;
        const username = req.body.username;
        const password = req.body.password;
        const rPassword = req.body.rpassword;

        if(!name || !username || !password)
        return res.status(400).json({msg: "Fill all the fields."});

        if (password !== rPassword)
            return res.status(400).json({ msg: "Password and Repeat Password field value different." });


        if(password.length < 8) 
        return res.status(400).json({msg: "Password length should be more than 8 characters"});


        const existingUser = await User.findOne({username: username});
        if(existingUser)
        return res.status(400).json({
            msg:"Username Already in Use."
        });
        
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            username,
            password : passwordHash,
        });

        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch(err) {
        res.status(400).json('Error: ' + err);
    } 
});

router.route('/login').post(async (req, res) => {
    console.log("post request /user Login");

    try{
        const username = req.body.username;
        const password = req.body.password;

        if(!username || !password) 
        return res.status(400).json({
            msg:"Insufficent Credentials."
        });

        const user = await User.findOne({
            username: username
        });
        
        if(!user) 
        return res.status(400).json({
            msg: "Account does not exist."
        });

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch)
        return res.status(400).json({
            msg:"Invalid Credentials."
        });

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
            },
        });
        
    } catch(err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// //Check if token is Valid

// router.post("/tokenIsValid", async (req,res) => {
//     try{
//         const token = req.header("x-auth-token");
//         if(!token) return res.json(false);

//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         if(!verified) return res.json(false);

//         const user = await User.findById(verified.id);
//         if(!user) return res.json(false);
//         return res.json(true);
    
//     } catch (err) {
//         res.status(500).json({ error: err.message});
//     }
// });

router.get("/user", auth, async(req,res) =>{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
});

module.exports = router;