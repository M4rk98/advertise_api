const express = require('express');
const router = express.Router();
const request = require('request-promise');
const users = require('../users');

router.post('/', (req, res, next) => {

    const content = req.body.email;
    const user = users.find( user => user.id == req.headers["id"] );

    const options = {
        method: "POST",
        uri: 'https://api.tapfiliate.com/1.6/affiliates/',
        body: JSON.stringify(req.body),
        headers: {
            'Api-Key': user["key"],
            'content-type': 'application/json'
        },

    };

    console.log(req.body);
    //es.send(content);
    //res.end()
//res.send(req.body);


    request(options)
        .then(function (response) {

            res.send("ok");
            res.end()
        })
        .catch(function (err) {
            // Crawling failed...
            res.send(err);
            res.end()
        });


});


router.get('/', (req, res, next) => {

    const user = users.find( user => user.id == req.headers["id"] );

    if(user != null) {
        const options = {
            uri: 'https://api.tapfiliate.com/1.6/affiliates',
            headers: {
                'Api-Key': user["key"]
            },
            json: 'true'
        };


        request(options)
            .then(function (response) {
                res.send(response);
            })
            .catch(function (err) {
                // Crawling failed...
                res.send({"failed": 0});
            })

    } else {
        res.send({"user": "no"});
    }




});


router.get('/:id', (req, res, next) => {

    const user = users.find( user => user.id == req.headers["id"] );


    const options = {
        method: "DELETE",
        uri: 'https://api.tapfiliate.com/1.6/affiliates/' + req.params.id + "/",
        headers: {
            'Api-Key': user["key"]
        },
        json: 'true'
    };

    console.log(options);

    request(options)
        .then(function (response) {
            res.send(response);
        })
        .catch(function (err) {
            // Crawling failed...
            res.send("failed");
        });

});


module.exports = router;