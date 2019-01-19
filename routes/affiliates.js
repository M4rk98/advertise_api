const express = require('express');
const router = express.Router();
const request = require('request-promise');
const users = require('../users');

router.post('/', (req, res, next) => {

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

    request(options)
        .then(function (response) {

            res.send("success");
        })
        .catch(function (err) {
            // Crawling failed...
            res.send(err);
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
                res.send({"failed": err.message});
            })

    } else {
        res.send({"user": "No user"});
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