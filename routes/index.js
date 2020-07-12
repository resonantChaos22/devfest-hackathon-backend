const express = require('express');
const router = express.Router();
const upload = require('../config/mutler');

// @desc       Login/Landing Page 
// @route      GET / 
router.get('/', (req, res) => {
    res.render('login', {
        layout: 'login',
    });
});

// @desc       Dashboard Page 
// @route      GET /dashboard 
router.get('/dashboard', (req, res) => {
    console.log(req.user);
    res.render('dashboard');
});

router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            console.error(err);
        } else {
            console.log(req.file.filename);
            res.redirect('/dashboard');
        }
    })
})

module.exports = router;