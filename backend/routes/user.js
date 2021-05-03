const router = require('express').Router();

let User = require('../models/user.model');

router.route('/all').get((req, res) => {
    console.log("get request /user");
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/signup').post((req, res) => {
    console.log("post request /user");

    const name = req.body.name;
    const username = req.body.name;
    const password = req.body.name;

    const newUser = new User({
        name,
        username,
        password
    });

    newUser.save()
        .then(() => res.json({ "id": newUser._id }))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;