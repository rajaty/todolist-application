const express = require('express');
const router = express.Router();
const SHA256 = require("crypto-js/sha256");

const { User } = require('../models/user');
const { Bookmark } = require('../models/bookmark');

// User Get and Add.
router.get('/user', (req, res) => {
    User.find({}, (err, data) => {
        if(err) {
          res.send({ status: "error" });
          console.log(err);
        } else {
            res.send({data, ...{status: "ok"}});
        }
    })
});
 
router.get('/user/:userId',(req,res) => {
    User.find({_id: req.params.userId},(err,data) => {
        if(err) {
            res.send({ status: "error" });
            return false;
        } else {
            res.send({data, ...{status: "ok"}});
        }
    });
});

router.post('/user/add', (req, res) => {
    const password = SHA256(req.body.pass).toString();
    let user = new User({
        name: req.body.name,
        pass: password
    });
    user.save().then((data) => {
        res.send({data, ...{status: "ok"}})
    }, (e) => {
        if(e.code === 11000)
                res.send({ status : "error",msg : "Name alredy taken"});
        else
            res.send({ status : "error", msg: "Something went wrong"});
        return false;
    });
});

router.put('/user/:userId', (req, res) => {
    let update =  {};
    if(req.body.name) {
        update['name'] = req.body.name;
    }
    if(req.body.pass) {
        update['pass'] = SHA256(req.body.pass).toString()
    }
    User.findOneAndUpdate({_id: req.params.userId},{$set:update}, {new: true},(err, data) => {
        if(err) {
            console.log(err);
            res.send({ status: "error" });
            return false;
        } else {
            res.send({data, ...{status: "ok"}})
        }
    });
});

router.delete('/user/:userId', (req, res) => {
    User.findOneAndRemove({_id: req.params.userId}, (err, data) => {
        if(err) {
            console.log(err);
            res.send({ status: "error" });
            return false;
        } else {
            res.send({data, ...{status: "ok"}})
        }
    });
});


// Bookmark Get and Add.
router.get('/bookmark', (req, res) => {
    Bookmark.find({}, (err, data) => {
        if(err) {
          res.send({ status: "error" });
          console.log(err);
        } else {
            res.send({data, ...{status: "ok"}});
        }
    })
});
 
router.get('/bookmark/:bookmarkId',(req,res) => {
    Bookmark.find({_id: req.params.bookmarkId},(err,data) => {
        if(err) {
            res.send({ status: "error" });
            return false;
        } else {
            res.send({data, ...{status: "ok"}});
        }
        
    });
});

router.get('/bookmark/user/:userId',(req,res) => {
    Bookmark.find({userId: req.params.userId},(err,data) => {
        if(err) {
            res.send({ status: "error" });
            return false;
        } else {
            res.send({data, ...{status: "ok"}});
        }
    });
});

router.post('/bookmark/add', (req, res) => {
    let bookmark = new Bookmark({
        userId: req.body.userId,
        name: req.body.name,
        
    });
    bookmark.save().then((data) => {
        res.send({data, ...{status: "ok"}})
    }, (e) => {
        if(e.code === 11000)
                res.send({ status : "error",msg : "Name alredy taken"});
        else
            res.send({ status : "error", msg: "Something went wrong"});
        return false;
    });
});

router.put('/bookmark/:bookmarkId', (req, res) => {
    let update =  {};
    if(req.body.name) {
        update['name'] = req.body.name;
    }
   
    Bookmark.findOneAndUpdate({_id: req.params.bookmarkId},{$set:update}, {new: true},(err, data) => {
        if(err) {
            console.log(err);
            res.send({ status: "error" });
            return false;
        } else {
            res.send({data, ...{status: "ok"}})
        }
    });
});

router.delete('/bookmark/:bookmarkId', (req, res) => {
    Bookmark.findOneAndRemove({_id: req.params.bookmarkId}, (err, data) => {
        if(err) {
            console.log(err);
            res.send({ status: "error" });
            return false;
        } else {
            console.log("done");
            res.send({data, ...{status: "ok"}})
        }
    });
});

router.post('/login', (req, res) => {
    console.log(req.body);
    const password = SHA256(req.body.pass).toString();
    User.find({ $and: [
        {name: req.body.name},
        {pass: password}
    ]}, (err, data) => {
        if(err) {
            console.log(err);
            res.send({ status : "error" });
            return false;
        } else {
            if(data.length === 0) {
                // Failed Login
                res.json({login: false,status: "ok"});
                return;
            } else {
                res.send({data, ...{status: "ok"}});
            }
        }
    });
});


module.exports = router;
 