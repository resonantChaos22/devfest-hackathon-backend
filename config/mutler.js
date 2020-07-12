const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Defining Storage
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Upload object 
const upload = multer({
    storage: storage
}).single('avatar');

router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            console.error(err);
        } else {
            console.log(req.file);
            res.redirect('/dashboard');
        }
    })
})

module.exports = router;