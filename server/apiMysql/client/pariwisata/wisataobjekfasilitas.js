const express = require('express');
var db = require('../../../db/MySql/dbutama');
const router = express.Router();




router.post('/getOne', (req, res) => {

    console.log(req.body)
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")

    let view = `
        SELECT 
        wisataobjekfasilitas.*
        FROM wisataobjekfasilitas

        WHERE wisataobjekfasilitas.wisataObjek = `+req.body.keyx+`
    `
    db.query(view, (err, rows) => {
        if (err) { console.log(err); res.json(err) }
        else {
           res.send(rows)
        }
    })
});





module.exports = router;