const express = require('express');
var db = require('../../../db/MySql/dbutama');
const router = express.Router();






router.post('/view', (req, res) => {
    var data_batas = 8;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1; 


    let jml_data = `
        SELECT 
        kegiatan.*
        FROM kegiatan 

        WHERE 
        kegiatan.nama LIKE '%`+cari+`%' 
        OR kegiatan.deskripsi LIKE '%`+cari+`%'
    `

    let view = `
        SELECT 
        kegiatan.*,
        users.nama as postBy
        FROM kegiatan 
      
        LEFT JOIN users
        ON users.id = kegiatan.userId


        WHERE 
        kegiatan.nama LIKE '%`+cari+`%' 
        OR kegiatan.deskripsi LIKE '%`+cari+`%'
        ORDER BY kegiatan.createAt DESC
        LIMIT `+data_star+`,`+data_batas+`
    `
    db.query(jml_data, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            halaman = Math.ceil(row.length/data_batas);
            if(halaman<1){halaman = 1}
            // ========================
            db.query(view, (err, result)=>{
                if (err) {res.json(err)}
                else{
                    halaman = Math.ceil(row.length/data_batas);
                    if(halaman<1){halaman = 1}
                    res.json({
                        data : result,
                        jml_data : halaman
                    })
                }
            })
            // ========================

        }
    })
});


router.post('/home_view', (req, res) => {

    var limit = 0
    if (req.body.limit == undefined || req.body.limit == null || req.body.limit == '') {
        limit = 2
    } else {
        limit = req.body.limit
    }

    var query = `
       SELECT 
        kegiatan.*,
        users.nama as postBy
        FROM kegiatan 
      
        LEFT JOIN users
        ON users.id = kegiatan.userId


        LIMIT `+limit+`
    ;
    `;
    db.query(query, (err, row) => {
        if (err) {
            res.send(err);
        } else {
            res.send(row);
        }
    });
})


router.post('/getOne', (req, res) => {

    console.log(req.body)

    var query = `
       SELECT 
        kegiatan.*,
        users.nama as postBy
        FROM kegiatan 
      
        LEFT JOIN users
        ON users.id = kegiatan.userId

        WHERE kegiatan.keyx = '`+req.body.keyx+`'


        LIMIT 1
    ;
    `;
    db.query(query, (err, row) => {
        if (err) {
            res.send(err);
        } else {
            res.send(row);
        }
    });
})




module.exports = router;