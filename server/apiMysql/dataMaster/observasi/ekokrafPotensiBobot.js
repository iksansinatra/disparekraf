const express = require('express');
const fs = require('fs');
var db = require('../../../db/MySql/dbutama');
var upload = require('../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();






router.post('/view', (req, res) => {

    var filter_indikator = '';

    if (req.body.ekokrafIndikator == null || req.body.ekokrafIndikator == undefined || req.body.ekokrafIndikator == '') {
        filter_indikator = '';
    } else {
        filter_indikator = `ekokrafpotensi.ekokrafIndikator = `+req.body.ekokrafIndikator +` AND`;
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
        ekokrafpotensi.*
        FROM ekokrafpotensi
        WHERE
        `+filter_indikator+`
        ekokrafpotensi.tolak_ukur LIKE '%`+cari+`%'
    `

    let view = `
        SELECT
        ekokrafpotensi.*,
        ekokrafindikator.indikator as ekokrafindikator_indikator

        FROM ekokrafpotensi

        LEFT JOIN ekokrafindikator
        ON ekokrafindikator.id = ekokrafpotensi.ekokrafIndikator

        WHERE
        `+filter_indikator+`
        ekokrafpotensi.tolak_ukur LIKE '%`+cari+`%'
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
    console.log(req.body);

    let insert = `
        INSERT INTO ekokrafpotensi (uniq, ekokrafIndikator, tolak_ukur, nilai, createdBy, createdAt) VALUES (
            '`+uniqid()+ `',
            `+req.body.ekokrafIndikator +`,
            '`+req.body.tolak_ukur+`',
            `+req.body.nilai+`,
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
    // res.send("ok")
});

router.post('/editData', (req,res)=>{

    var query = '';

        query = `
            UPDATE ekokrafpotensi SET
            ekokrafIndikator  = `+req.body.ekokrafIndikator +`,
            tolak_ukur = '`+req.body.tolak_ukur+`',
            nilai = `+req.body.nilai+`,
            editedBy = '`+req.user._id+`',
            editedAt = NOW()
            WHERE id = `+req.body.id+`
        `;

    console.log(req.body)

    db.query(query, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            res.send(row);
        }
    })
})


router.post('/removeData', (req, res)=> {

    var query = `
        DELETE FROM ekokrafpotensi WHERE id = `+req.body.id+`;
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


    var query = `
        SELECT ekokrafpotensi.*,
        ekokrafindikator.indikator as ekokraf_indikator,
        ekokrafindikator.bobot as ekokraf_bobot,
        ekokrafindikator.id as ekokraf_id

        FROM ekokrafpotensi

        LEFT JOIN ekokrafindikator
        ON ekokrafindikator.id = ekokrafpotensi.ekokrafIndikator

        WHERE ekokrafindikator.id = ekokrafpotensi.ekokrafIndikator
        GROUP BY ekokrafpotensi.id
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})

router.post('/list1', (req, res)=> {
    console.log(req.body);

    var query = `
    SELECT ekokrafpotensi.*, ekokrafindikator.id


    FROM ekokrafpotensi

    LEFT JOIN ekokrafindikator
    ON ekokrafindikator.id = ekokrafpotensi.ekokrafIndikator

    WHERE ekokrafindikator.id =  `+req.body.data+`
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
