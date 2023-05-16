const express = require('express');
const router = express.Router();
const db = require('../Database/database.js');


router.get('/', (req, res) => {


    //const likes = req.evercookie.get('likes') || [];

    let allquoteentries = db.getallapprovedfromDB()
    .then((allquoteentries) => {
        res.render(__dirname + '/MainPage/index', { allquoteentries : allquoteentries});
    })
    .catch((err) => {
        console.log(err);

    });

});

router.post("/like", (req, res, next) => {
    //console.log(req.body);

    var array = req.body.Likes;
    var fingerprint = req.body.Fingerprint;
    
    if(array != null && fingerprint != null)
    {
        console.log(array);
        console.log(fingerprint);

        let secondarray  = db.getLikesfromDB(fingerprint)
                            .then((secondarray) => {
                            if(db.getLikesfromDB(fingerprint).length > array.length)
                            {
                                db.addLikesToDB(fingerprint, array);
                            }
                            else
                            {
                                db.removeLikesfromDB(fingerprint, array);
                            }
                        });
        
        console.log(db.getLikesfromDB());
    }
    //req.evercookie.set('likes', array);
    res.redirect('/');
});





router.get('/submit', (req, res, next) => {
    res.render(__dirname + '/MainPage/thankyou');
});

router.post('/submit', (req, res, next) => {
    input = req.body.Zitat;
    console.log(req.body);
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