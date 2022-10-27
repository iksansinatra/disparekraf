const express = require('express');
const fs = require('fs');
var db = require('../../../db/MySql/dbutama');
var upload = require('../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();






router.post('/view', (req, res) => {

    var filter_pelaku = '';

    if (req.body.ekokrafPelaku == null || req.body.ekokrafPelaku == undefined || req.body.ekokrafPelaku == '') {
        filter_pelaku = '';
    } else {
        filter_pelaku = `ekokrafpelakuproduk.ekokrafPelaku = `+req.body.ekokrafPelaku +` AND`;
    }


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
        ekokrafpelakuproduk.*
        FROM ekokrafpelakuproduk 
        WHERE
        `+filter_pelaku+`
        ekokrafpelakuproduk.brand LIKE '%`+cari+`%'
    `

    let view = `
        SELECT 
        ekokrafpelakuproduk.*,
        m_jenispariwisata.uraian as m_jenispariwisata_uraian,
        ekokrafpelaku.pelaku as ekokrafpelaku_pelaku,
        ekokrafpelaku.badan_usaha as ekokrafpelaku_badan_usaha,
        ekokrafpelaku.alamat as ekokrafpelaku_alamat,
        ekokrafpelaku.email as ekokrafpelaku_email,
        ekokrafpelaku.hp as ekokrafpelaku_hp


        FROM ekokrafpelakuproduk
        
        LEFT JOIN ekokrafpelaku
        ON ekokrafpelaku.id = ekokrafpelakuproduk.ekokrafPelaku

        LEFT JOIN m_jenispariwisata
        ON m_jenispariwisata.id = ekokrafpelakuproduk.m_jenisPariwisata 


        WHERE 
        `+filter_pelaku+`
        ekokrafpelakuproduk.brand LIKE '%`+cari+`%'
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