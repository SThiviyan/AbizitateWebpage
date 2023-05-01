const express = require('express');
const router = express.Router();
const db = require('../Database/database.js');
const evercookie = require('evercookie');


router.get('/', (req, res) => {


    const likes = req.evercookie.get('likes') || [];

    let allquoteentries = db.getallapprovedfromDB()
    .then((allquoteentries) => {
        res.render(__dirname + '/MainPage/index', { allquoteentries : allquoteentries, likes : likes});
    })
    .catch((err) => {
        console.log(err);

    });

});

router.post("/like", (req, res, next) => {
    console.log(req.body);
    let id = req.body.like;
    console.log(id);

    if(req.body.like)
    {
        console.log("like");
    }

    var array = req.body.like;
    req.evercookie.set('likes', array);
    res.send("likes stored");
});





router.get('/submit', (req, res, next) => {
    res.render(__dirname + '/MainPage/thankyou');
});

router.post('/submit', (req, res, next) => {
    console.log(req.body);
    input = req.body.Zitat;
    console.log(input);
    whitespacestr = input.replace(/\s/g, '').length;

    if(input != null && whitespacestr > 0 && input.length != "")
    {
        let highestid = db.gethighestidfromDB()
                        .then((highestid) => {
                            //console.log(highestid + 1);
                            db.addtoDB(highestid + 1, input, 0);
                        })
                        .catch((err) => {
                            console.log(err);
                        });

        res.redirect('/submit');
    }
    else
    {
        res.redirect('/');
    }

});


module.exports = router;