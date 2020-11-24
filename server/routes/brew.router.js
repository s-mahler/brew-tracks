const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// const {
//     rejectUnauthenticated,
//   } = require("../modules/authentication-middleware");

router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "brews";';
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            res.sendStatus(500);
            console.log('error in GET', error);
        });
}); 


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

router.get('/times/:id', (req, res) => {
    const queryText = 'SELECT * FROM "times" WHERE "brew_id" = $1';
    pool.query(queryText, [req.params.id])
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            res.sendStatus(500);
            console.log('error in GET', error);
        });
}); 

router.post('/', async (req, res) => {

    const newSpecs = req.body.specs;
    const newTasting = req.body.tasting;
    const newTimes = req.body.times;

    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        const brewQueryText =  `INSERT INTO "brews" ("origin", "roast", "grind", "coffee_amount", "water_amount" , "brew_method", "taste", "aroma", "body", "mouth_feel", "user_id")
                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING "id";`;
        const brewQueryValues = [
            newSpecs.origin,
            newSpecs.roast,
            newSpecs.grind,
            newSpecs.amount_coffee,
            newSpecs.amount_water,
            newSpecs.method,
            newTasting.taste,
            newTasting.aroma,
            newTasting.body,
            newTasting.mouth_feel,
            newSpecs.user_id
        ];
        const result = await connection.query(brewQueryText, brewQueryValues);
        const brew_id = result.rows[0].id;
        const timesQueryText = `INSERT INTO "times" ("centiseconds", "seconds", "minutes", "brew_id") 
                                VALUES ($1, $2, $3, $4);`
        for (let i = 0; i < newTimes.length; i++) {
            await connection.query(timesQueryText, [newTimes[i].centiseconds, newTimes[i].seconds, newTimes[i].minutes, brew_id]);
        }
        await connection.query('COMMIT');
        res.sendStatus(200);
    } catch (error) {
        await connection.query('ROLLBACK');
        console.log('Add brew error - rolling back new brew', error);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});

router.delete('/:id', (req,res) => {
    const queryText = `DELETE FROM "brews" WHERE "id" = $1`
    pool.query(queryText, [req.params.id])
        .then(() => {
            res.sendStatus(200);
        }).catch(error => {
            res.sendStatus(500);
            console.log('error in DELETE brew', error);
        });
});

router.delete('/times/:id', (req,res) => {
    const queryText = `DELETE FROM "times" WHERE "brew_id" = $1`
    pool.query(queryText, [req.params.id])
        .then(() => {
            res.sendStatus(200);
        }).catch(error => {
            res.sendStatus(500);
            console.log('error in DELETE times', error);
        });
});

router.put('/', (req, res) => {
    const brewEdit = req.body;
    const queryText = `UPDATE "brews" SET "origin" = $1, "roast" = $2, "grind" = $3, "coffee_amount" = $4, "water_amount" = $5, "brew_method" = $6, "taste" = $7, "aroma" = $8, "body" = $9, "mouth_feel" = $10 WHERE "id" = $11;`;
    const queryValues = [
        brewEdit.origin,
        brewEdit.roast,
        brewEdit.grind,
        brewEdit.amount_coffee,
        brewEdit.amount_water,
        brewEdit.method,
        brewEdit.taste,
        brewEdit.aroma,
        brewEdit.body,
        brewEdit.mouth_feel,
        brewEdit.id
    ]
    pool.query(queryText, queryValues)
        .then(() => {
            res.sendStatus(200);
        }).catch(error => {
            res.sendStatus(500);
            console.log('error in PUT brew', error);
        });
});

router.put('/times', (req, res) => {
    const queryText = `UPDATE "times" SET "seconds" = $1, "minutes" = $2 WHERE "id" = $3;`;
    for (let i = 0; i < req.body.length; i++) {
        pool.query(queryText, [req.body[i].seconds, req.body[i].minutes, req.body[i].id])
            .then(() => {
                res.sendStatus(200);
            }).catch((error) => {
                res.sendStatus(500);
                console.log('error in PUT times', error);
            });
    }
});

module.exports = router;