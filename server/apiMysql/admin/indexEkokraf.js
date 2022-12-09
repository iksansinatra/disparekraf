const express = require('express');
var db = require('../../db/MySql/dbutama');

var uniqid = require('uniqid');
const router = express.Router();




router.post('/pelaku', (req, res)=> {

    var query = `
    SELECT COUNT(id) as jumlah_pelaku FROM ekokrafPelaku
    `;


        // ========================
        db.query(query, (err, result)=>{
            if (err) {res.json(err)}
            else{
                console.log(result);

                res.json({
                    data : result,
                })
            }
        })
        // ========================
})

router.post('/produk', (req, res)=> {

    var query = `
    SELECT COUNT(id) as jumlah_produk FROM ekokrafPelakuProduk
    `;


        // ========================
        db.query(query, (err, result)=>{
            if (err) {res.json(err)}
            else{
                console.log(result);

                res.json({
                    data : result,
                })
            }
        })
        // ========================
})

router.post('/komunitas', (req, res)=> {

    var query = `
    SELECT COUNT(id) as jumlah_komunitas FROM ekokrafkelompok
    `;


        // ========================
        db.query(query, (err, result)=>{
            if (err) {res.json(err)}
            else{
                console.log(result);

                res.json({
                    data : result,
                })
            }
        })
        // ========================
})

router.post('/tenaga', (req, res) => {
    var subSektor = req.body.ekokrafJenis;


    let query = `
            
                SELECT IFNULL(SUM(tenaga),0) as jumlah_tenaga FROM ekokrafpelaku
        `


    db.query(query, (err, result)=>{
        if (err) {res.json(err)}
        else{
            res.json({
                data : result,

            })
        }
    })
});

router.post('/pelakuJenis', (req, res) => {
    var jenis = req.body.kecamatan;


    let query = `
    SELECT COUNT(id) as pelaku_jenis

    FROM ekokrafPelaku

    WHERE
    ekokrafpelaku.jenisEkokraf = '`+subSektor+`'
    `


    db.query(query, (err, result)=>{
        if (err) {res.json(err)}
        else{
            res.json({
                data : result,

            })
        }
    })
});

router.post('/view', (req, res) => {
    var data_batas = 0;
    if (req.body.page_limit == null || req.body.page_limit == undefined || req.body.page_limit == '') {
        data_batas = 8;
    } else {
        data_batas = parseInt(req.body.page_limit);
    }
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1; 


    let jml_data = `
        SELECT 
        ekokrafobservasi.*
        FROM ekokrafobservasi
    `

    let view = `
        SELECT 
        ekokrafobservasi.*,
        master_kabupaten.nama_kabupaten as nama_kabupaten

        FROM ekokraf.ekokrafobservasi ekokrafobservasi

        LEFT JOIN ekokraf.master_kabupaten master_kabupaten
        ON master_kabupaten.kabupaten_id  = ekokrafobservasi.kabupaten_id

        WHERE 
        ekokrafobservasi.tahun LIKE '%`+cari+`%'
        ORDER BY ekokrafobservasi.createdAt DESC
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

module.exports = router;