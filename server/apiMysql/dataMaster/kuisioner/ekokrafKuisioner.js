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
        ekokrafkuisioner.*
        FROM ekokrafkuisioner 
        WHERE 
        ekokrafkuisioner.uraian LIKE '%`+cari+`%'
    `

    let view = `
        SELECT 
        ekokrafkuisioner.*,
        ekokrafkuisionerindikator.uraian as ekokrafindikator_uraian,

        (SELECT COUNT(ekokrafkuisionerbobot.id) FROM ekokrafkuisionerbobot
        WHERE ekokrafkuisionerbobot.ekokrafKuisioner = ekokrafkuisioner.id) AS jmlPertanyaan

        FROM ekokraf.ekokrafkuisioner ekokrafkuisioner

        LEFT JOIN ekokraf.ekokrafkuisionerindikator ekokrafkuisionerindikator
        ON ekokrafkuisionerindikator.id = ekokrafkuisioner.ekokrafIndikator


        WHERE 
        ekokrafkuisioner.uraian LIKE '%`+cari+`%'
        ORDER BY ekokrafkuisioner.createdAt DESC
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
        INSERT INTO ekokrafkuisioner (uniq, ekokrafIndikator, uraian, keterangan, createdBy, createdAt) VALUES (
            '`+uniqid()+ `',
            `+req.body.ekokrafIndikator+`,
            '`+req.body.uraian+`',
            '`+req.body.keterangan+`',
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
        UPDATE ekokrafkuisioner SET
        ekokrafIndikator = `+req.body.ekokrafIndikator+`,
        uraian = '`+req.body.uraian+`',
        keterangan = '`+req.body.keterangan+`',
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
        DELETE FROM ekokrafkuisioner WHERE id = `+req.body.id+`; 
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
        SELECT * FROM ekokrafkuisioner
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