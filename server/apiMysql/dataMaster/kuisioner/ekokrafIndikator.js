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
        ekokrafkuisionerindikator.*
        FROM ekokrafkuisionerindikator 
        WHERE 
        ekokrafkuisionerindikator.uraian LIKE '%`+cari+`%'
    `

    let view = `
        SELECT 
        ekokrafkuisionerindikator.*

        FROM siekraf.ekokrafkuisionerindikator ekokrafkuisionerindikator

        WHERE 
        ekokrafkuisionerindikator.uraian LIKE '%`+cari+`%'
        ORDER BY ekokrafkuisionerindikator.createdAt DESC
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
        INSERT INTO ekokrafkuisionerindikator (uniq, uraian, keterangan, createdBy, createdAt) VALUES (
            '`+uniqid()+ `',
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
        UPDATE ekokrafkuisionerindikator SET
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
        DELETE FROM ekokrafkuisionerindikator WHERE id = `+req.body.id+`; 
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
        SELECT * FROM ekokrafkuisionerindikator
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