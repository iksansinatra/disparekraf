const express = require('express');
var db = require('../../../db/MySql/egov');

var uniqid = require('uniqid');
const router = express.Router();

router.get('/', (req, res)=> {

    var cari = ''

    var query = `
        SELECT 
        master_kabupaten.nama_kabupaten,
        master_kabupaten.kabupaten_id,

        master_kecamatan.nama_kecamatan,
        master_kecamatan.kecamatan_id,

        master_des_kel.nama_des_kel,
        master_des_kel.des_kel_id
        
        FROM master_kabupaten

        LEFT JOIN master_kecamatan
        ON master_kabupaten.kabupaten_id = master_kecamatan.kabupaten_id

        LEFT JOIN master_des_kel
        ON master_kecamatan.kecamatan_id = master_des_kel.kecamatan_id

        WHERE master_kabupaten.kabupaten_id = 7405 AND
        master_des_kel.nama_des_kel LIKE '%`+cari+`%'
        limit 8
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})

router.post('/list', (req, res)=> {

    var cari = ''
    if (req.body.data == undefined || req.body.data == null || req.body.data == '') {
        cari = ''
    } else {
        cari = req.body.data
    }
    

    var query = `
        SELECT 
        master_kabupaten.nama_kabupaten,
        master_kabupaten.kabupaten_id,

        master_kecamatan.nama_kecamatan,
        master_kecamatan.kecamatan_id,

        master_des_kel.nama_des_kel,
        master_des_kel.des_kel_id
        
        FROM master_kabupaten

        LEFT JOIN master_kecamatan
        ON master_kabupaten.kabupaten_id = master_kecamatan.kabupaten_id

        LEFT JOIN master_des_kel
        ON master_kecamatan.kecamatan_id = master_des_kel.kecamatan_id

        WHERE master_kabupaten.kabupaten_id = 7405 AND
        master_des_kel.nama_des_kel LIKE '%`+cari+`%'
        limit 8
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})


router.post('/provinsi', (req, res)=> {

    var cari = ''
    if (req.body.data == undefined || req.body.data == null || req.body.data == '') {
        cari = ''
    } else {
        cari = req.body.data
    }
    

    var query = `
        SELECT 
        
        master_kabupaten.nama_kabupaten,
        master_kabupaten.kabupaten_id,

        master_kecamatan.nama_kecamatan,
        master_kecamatan.kecamatan_id,

        master_des_kel.nama_des_kel,
        master_des_kel.des_kel_id
        
        FROM master_kabupaten

        LEFT JOIN master_kecamatan
        ON master_kabupaten.kabupaten_id = master_kecamatan.kabupaten_id

        LEFT JOIN master_des_kel
        ON master_kecamatan.kecamatan_id = master_des_kel.kecamatan_id

        WHERE master_kabupaten.provinsi_id = 74 AND
        master_des_kel.nama_des_kel LIKE '%`+cari+`%'
        limit 8
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