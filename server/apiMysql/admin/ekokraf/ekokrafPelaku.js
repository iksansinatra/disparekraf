const express = require('express');
var db = require('../../../db/MySql/dbutama');

var uniqid = require('uniqid');
const router = express.Router();






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
        ekokrafpelaku.*
        FROM ekokrafpelaku 
        WHERE 
        ekokrafpelaku.pelaku LIKE '%`+cari+`%'
    `

    let view = `
        SELECT 
        ekokrafpelaku.*,
        ekokrafkelompok.uraian as ekokrafkelompok_uraian,
        master_des_kel.nama_des_kel as nama_des_kel,

        (SELECT COUNT(ekokrafpelakuproduk.id) FROM ekokrafpelakuproduk
        WHERE ekokrafpelakuproduk.ekokrafPelaku = ekokrafpelaku.id) AS jmlProduk

        FROM ekokraf.ekokrafpelaku ekokrafpelaku

        LEFT JOIN ekokraf.ekokrafkelompok ekokrafkelompok
        ON ekokrafkelompok.id = ekokrafpelaku.ekokrafKelompok

        LEFT JOIN ekokraf.master_des_kel master_des_kel
        ON master_des_kel.des_kel_id  = ekokrafpelaku.des_kel_id


        WHERE 
        ekokrafpelaku.pelaku LIKE '%`+cari+`%'
        ORDER BY ekokrafpelaku.createdAt DESC
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


// router.post('/addData', (req,res)=>{

router.post('/addData', (req,res)=>{
    let insert = `
        INSERT INTO ekokrafpelaku (ekokrafKelompok, des_kel_id, pelaku, nik, badan_usaha, alamat, email, hp, profil, createdBy, createdAt) VALUES (
            `+req.body.ekokrafKelompok+`,
            `+req.body.des_kel_id+`,
            '`+req.body.pelaku+`',
            '`+req.body.nik+`',
            '`+req.body.badan_usaha+`',
            '`+req.body.alamat+`',
            '`+req.body.email+`',
            '`+req.body.hp+`',
            '`+req.body.profil+`',
            '`+req.user._id+`', 
            NOW()
        )
    `

    db.query(insert, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            res.send(row);
        }
    })
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    // console.log(req.body);
    // res.send("OK")
});

router.post('/editData', (req,res)=>{
    console.log(req.body)
    query = `
        UPDATE ekokrafpelaku SET
        ekokrafKelompok = `+req.body.ekokrafKelompok+`,
        des_kel_id = `+req.body.des_kel_id+`,
        pelaku = '`+req.body.pelaku+`',
        nik = '`+req.body.nik+`',
        badan_usaha = '`+req.body.badan_usaha+`',
        alamat = '`+req.body.alamat+`',
        email = '`+req.body.email+`',
        hp = '`+req.body.hp+`',
        profil = '`+req.body.profil+`',
        editedBy = '`+req.user._id+`',
        editedAt = NOW()

        WHERE id = `+req.body.id+`
    `;
    
    db.query(query, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            res.send(row);
        }
    })


    // console.log(req.body);
    

    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
})


router.post('/removeData', (req, res)=> {

    var query = `
        DELETE FROM ekokrafpelaku WHERE id = `+req.body.id+`; 
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
        ekokrafpelaku.*,
        master_des_kel.nama_des_kel

        FROM ekokraf.ekokrafpelaku ekokrafpelaku

        LEFT JOIN ekokraf.master_des_kel master_des_kel
        ON ekokrafpelaku.des_kel_id = master_des_kel.des_kel_id 


        WHERE ekokrafpelaku.pelaku LIKE '%`+cari+`%'
        LIMIT 8 
    `;
    db.query(query, (err, row)=>{
        if(err){
            console.log(err)
            res.send(err);
        }else{
            res.send(row);
        }
    });
})







module.exports = router;