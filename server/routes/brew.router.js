const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// const {
//     rejectUnauthenticated,
//   } = require("../modules/authentication-middleware");

router.get('/:id', (req, res) => {
    const queryText = 'SELECT * FROM "brews" WHERE "user_id" = $1';
    pool.query(queryText, [req.params.id])
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            res.sendStatus(500);
            console.log('error in GET', error);
        });
});  

router.get('/details/:id', (req, res) => {
    const queryText = 'SELECT * FROM "brews" WHERE "id" = $1';
    pool.query(queryText, [req.params.id])
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            res.sendStatus(500);
            console.log('error in GET', error);
        });
});  

module.exports = router;