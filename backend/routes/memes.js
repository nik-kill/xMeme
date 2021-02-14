const router = require('express').Router();
let Meme = require('../models/memes.model');

router.route('/').get((req, res) => {
    console.log("get request /meme");
    Meme.find()
        .then(memes => res.json(memes))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/').post((req, res) => {
    console.log("post request /meme");
    
    const name = req.body.name;
    const caption = req.body.caption;
    const url = req.body.url;

    const newMeme = new Meme({ 
        name,
        caption,
        url, 
    });

    newMeme.save()
        .then(() => res.json({ "id": newMeme._id }))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Meme.findById(req.params.id)
        .then(memes => res.json(memes))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
    Meme.findByIdAndDelete(req.params.id)
        .then(() => res.json('Meme deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
    Meme.findById(req.params.id)
        .then(memes => {
            memes.caption = req.body.caption;
            memes.url = req.body.url;

            memes.save()
                .then(() => res.json('Meme updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;