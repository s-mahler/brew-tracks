const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// const {
//     rejectUnauthenticated,
//   } = require("../modules/authentication-middleware");

router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "brews"';
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            res.sendStatus(500);
            console.log('error in GET', error);
        });
});  