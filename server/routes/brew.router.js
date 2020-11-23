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

router.post('/', (req, res) => {
    const newBrew = req.body;
    const queryText =  `INSERT INTO "brews" ("origin", "roast", "grind", "coffee_amount", "water_amount" , "brew_method", "taste", "aroma", "body", "mouth_feel", "user_id")
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;
    const queryValues = [
        newBrew.specs.origin,
        newBrew.specs.roast,
        newBrew.specs.grind,
        newBrew.specs.amount_coffee,
        newBrew.specs.amount_water,
        newBrew.specs.method,
        newBrew.tasting.taste,
        newBrew.tasting.aroma,
        newBrew.tasting.body,
        newBrew.tasting.mouth_feel,
        req.user.id
    ];
    pool.query(queryText, queryValues)
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
            console.log('Error in brew POST', error)
        })
});

router.post('/times', (req, res) => {
    const queryText = `INSERT INTO "times" ("centiseconds", "seconds", "minutes", "brew_id") 
                        VALUES ($1, $2, $3, $4);`;
    const time = req.body.times;
    for (let i = 0; i < time.length; i++) {
        pool.query(queryText, [time[i].centiseconds, time[i].seconds, time[i].minutes, req.body.specs.brew_id])
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
            console.log('Error in brew POST', error)
        })
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
    const queryText = `UPDATE "brews" SET "origin" = $1, "roast" = $2, "grind" = $3, "coffee_amount" = $4, "water_amount" = $5, "brew_method" = $6, "taste" = $7, "aroma" = $8, "body" = $9, "mouth_feel" = $10 WHERE "id" = $11;`
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
    console.log(req.body);
    const queryText = `UPDATE "times" SET "seconds" = $1, "minutes" = $2 WHERE "id" = $3`
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