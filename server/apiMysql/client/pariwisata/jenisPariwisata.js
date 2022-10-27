const express = require('express');
var db = require('../../../db/MySql/dbutama');

var uniqid = require('uniqid');
const router = express.Router();


router.post('/list', (req, res)=> {

    

    var query = `
        SELECT 
        m_jenispariwisata.*
        
        FROM m_jenispariwisata

        LEFT JOIN m_kategoripariwisata
        ON m_jenispariwisata.m_kategoriPariwisata = m_kategoripariwisata.id


        WHERE m_kategoripariwisata.m_bidangPariwisata = 2
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})



module.exports = router;