const express = require('express');
const db = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/search/:string', rejectUnauthenticated, (req, res) => {

    const statement = `
        SELECT "id", "username" 
        FROM "user"
        WHERE "id" 
            NOT IN (SELECT "userIdB" FROM "contact" 
                    WHERE "userIdA" = $1) 
        AND "id"
            NOT IN (SELECT "userIdA" FROM "contact" 
                    WHERE "userIdB" = $1) 
        AND "id" != $1
        AND "username" LIKE $2
        ORDER BY id ASC;`;

    db.query(statement, [ req.user.id, '%'+req.params.string+'%'])
      .then( result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get all movies', err);
        res.sendStatus(500)
      })
});

router.get('/current', rejectUnauthenticated, (req, res) => {

    const statement = `
    SELECT "id", "username"
    FROM 
    (
        SELECT "c"."userIdB" "id", "u2"."username" "username"
        FROM "contact" "c"
        JOIN "user" "u1"
            ON ( "u1"."id" = "c"."userIdA")
        JOIN "user" "u2"
            ON ( "u2"."id" = "c"."userIdB")
        WHERE "c"."userIdA" = $1
        UNION
        SELECT "c"."userIdA" "id", "u1"."username" "username"
        FROM "contact" "c"
        JOIN "user" "u1"
            ON ( "u1"."id" = "c"."userIdA")
        JOIN "user" "u2"
            ON ( "u2"."id" = "c"."userIdB")
        WHERE "c"."userIdB" = $1
    ) 
    AS "test"
    ORDER BY "test"."id";`;

    db.query(statement, [ req.user.id ])
      .then( result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get all movies', err);
        res.sendStatus(500)
      })
});



module.exports = router;
