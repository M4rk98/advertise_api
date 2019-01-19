const express = require('express');
const router = express.Router();
const request = require('request-promise');

let users = require('../users');

router.post('/', (req, res, next) => {
    let random = '_' + Math.random().toString(36).substr(2, 9);

    users.push({id: random, key: req.body.key});

    console.log(users);

    res.send({key: random});

});

module.exports = router;