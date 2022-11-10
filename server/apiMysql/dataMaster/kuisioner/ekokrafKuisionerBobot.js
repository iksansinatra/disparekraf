const express = require('express');
const fs = require('fs');
var db = require('../../../db/MySql/dbutama');
var upload = require('../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();






router.post('/view', (req, res) => {

    var filter_kuisioner = '';

    if (req.body.ekokrafKuisioner == null || req.body.ekokrafKuisioner == undefined || req.body.ekokrafKuisioner == '') {
        filter_kuisioner = '';
    } else {
        filter_kuisioner = `ekokrafkuisionerbobot.ekokrafKuisioner = `+req.body.ekokrafKuisioner +` AND`;
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
        ekokrafkuisionerbobot.*
        FROM ekokrafkuisionerbobot 
        WHERE
        `+filter_kuisioner+`
        ekokrafkuisionerbobot.pertanyaan LIKE '%`+cari+`%'
    `

    let view = `
        SELECT 
        ekokrafkuisionerbobot.*,
        ekokrafkuisioner.uraian as ekokrafkuisioner_uraian


        FROM ekokrafkuisionerbobot
        
        LEFT JOIN ekokrafkuisioner
        ON ekokrafkuisioner.id = ekokrafkuisionerbobot.ekokrafKuisioner


        WHERE 
        `+filter_kuisioner+`
        ekokrafkuisionerbobot.pertanyaan LIKE '%`+cari+`%'
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
        INSERT INTO ekokrafkuisionerbobot (uniq, ekokrafKuisioner, pertanyaan, bobot, createdBy, createdAt) VALUES (
            '`+uniqid()+ `',
            `+req.body.ekokrafKuisioner +`,
            '`+req.body.pertanyaan+`',
            `+req.body.bobot+`,
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
            UPDATE ekokrafkuisionerbobot SET
            ekokrafKuisioner  = `+req.body.ekokrafKuisioner +`,
            pertanyaan = '`+req.body.pertanyaan+`',
            bobot = `+req.body.bobot+`,
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
        DELETE FROM ekokrafpelakuproduk WHERE id = `+req.body.id+`; 
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            hapus_file(req.body.file)
            res.send(row);
        }
    });

})


function hapus_file(file){
    const path = './uploads/'+file;

    fs.unlink(path, (err) => {
        if (err) {
          console.error(err)
          return
        }
    })

}



module.exports = router;