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
        ekokrafindikator.*
        FROM ekokrafindikator 
        WHERE 
        ekokrafindikator.indikator LIKE '%`+cari+`%'
    `

    let view = `
        SELECT 
        ekokrafindikator.*,

        (SELECT COUNT(ekokrafpotensi.id) FROM ekokrafpotensi
        WHERE ekokrafpotensi.ekokrafIndikator = ekokrafindikator.id) AS jmlPilihan

        FROM ekokraf.ekokrafindikator ekokrafindikator

        WHERE 
        ekokrafindikator.indikator LIKE '%`+cari+`%'
        ORDER BY ekokrafindikator.createdAt DESC
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
        INSERT INTO ekokrafindikator (uniq, indikator, bobot, createdBy, createdAt) VALUES (
            '`+uniqid()+ `',
            '`+req.body.indikator+`',
            '`+req.body.bobot+`',
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
        UPDATE ekokrafindikator SET
        indikator = '`+req.body.indikator+`',
        bobot = '`+req.body.bobot+`',
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
        DELETE FROM ekokrafindikator WHERE id = `+req.body.id+`; 
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
        SELECT * FROM ekokrafindikator
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})

router.post('/potensi', (req, res)=> {

    var query = `
    SELECT ekokrafpotensi.* 
    FROM ekokrafpotensi
    LEFT JOIN ekokrafindikator
    ON ekokrafpotensi.ekokrafIndikator = ekokrafindikator.id
    WHERE 
    ekokrafpotensi.ekokrafIndikator = `+req.body.id+`
    `;


        // ========================
        db.query(query, (err, result)=>{
            if (err) {res.json(err)}
            else{

                res.json({
                    data : result,
                })
            }
        })
        // ========================


})


// router.post('/list', (req, res)=> {

//     var cari = ''
//     if (req.body.data == undefined || req.body.data == null || req.body.data == '') {
//         cari = ''
//     } else {
//         cari = req.body.data
//     }

//     var query = `
//         SELECT 
//         ekokrafindikator.*

//         FROM ekokraf.ekokrafindikator ekokrafindikator
                
//         WHERE ekokrafindikator.indikator LIKE '%`+cari+`%'
//         LIMIT 8 
//     `;
//     db.query(query, (err, row)=>{
//         if(err){
//             console.log(err)
//             res.send(err);
//         }else{
//             res.send(row);
//         }
//     });
// })







module.exports = router;