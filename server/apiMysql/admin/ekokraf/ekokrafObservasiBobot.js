const express = require('express');
const fs = require('fs');
var db = require('../../../db/MySql/dbutama');
var upload = require('../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();






router.post('/view', (req, res) => {

    var filter_observasi = '';

    if (req.body.ekokrafObservasi == null || req.body.ekokrafObservasi == undefined || req.body.ekokrafObservasi == '') {
        filter_observasi = '';
    } else {
        filter_observasi = `ekokrafobservasibobot.ekokrafObservasi = `+req.body.ekokrafObservasi +` AND`;
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
        ekokrafobservasibobot.*
        FROM ekokrafobservasibobot 
        WHERE
        `+filter_observasi+`
        ekokrafobservasibobot.ekokrafObservasi LIKE '%`+cari+`%'
    `

    let view = `
        SELECT 
        ekokrafobservasibobot.*,
        ekokrafindikator.indikator as ekorkafindikator_indikator,
        ekokrafindikator.bobot as ekorkafindikator_bobot,
        ekokrafpotensi.tolak_ukur as ekorkafpotensi_potensi,
        ekokrafpotensi.nilai as ekorkafpotensi_nilai


        FROM ekokrafobservasibobot
        
        LEFT JOIN ekokrafobservasi
        ON ekokrafobservasi.uniq = ekokrafobservasibobot.ekokrafObservasi

        LEFT JOIN ekokrafindikator
        ON ekokrafindikator.id = ekokrafobservasibobot.ekokrafIndikator
        
        LEFT JOIN ekokrafpotensi
        ON ekokrafpotensi.id = ekokrafobservasibobot.ekokrafPotensi


        WHERE 
        `+filter_observasi+`
        ekokrafobservasibobot.ekokrafObservasi LIKE '%`+cari+`%'
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

router.post('/addData',upload.single("file"), (req,res)=>{
    console.log(req.body)
    var file = req.file.filename



    let insert = `
        INSERT INTO ekokrafobservasibobot (uniq, ekokrafObservasi, brand, harga, stock, keterangan, file, createdBy, createdAt) VALUES (
            '`+uniqid()+ `',
            `+req.body.m_jenisPariwisata +`,
            `+req.body.ekokrafobservasi +`,
            '`+req.body.brand+`',
            `+req.body.harga+`,
            `+req.body.stock+`,
            '`+escape(req.body.keterangan)+`',
            '`+file+`',
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

router.post('/editData',upload.single("file"), (req,res)=>{

    

    var file = '';
    var query = '';

    if (req.file == null || req.file == undefined) {
        query = `
            UPDATE ekokrafobservasibobot SET
            m_jenisPariwisata  = `+req.body.m_jenisPariwisata +`,
            ekokrafobservasi  = `+req.body.ekokrafobservasi +`,
            brand = '`+req.body.brand+`',
            harga = `+req.body.harga+`,
            stock = `+req.body.stock+`,
            keterangan = '`+escape(req.body.keterangan)+`',
            editedBy = '`+req.user._id+`',
            editedAt = NOW()
            WHERE id = `+req.body.id+`
        `;
    } else {
        file = req.file.filename
        query = `
            UPDATE ekokrafobservasibobot SET
            m_jenisPariwisata  = `+req.body.m_jenisPariwisata +`,
            ekokrafobservasi  = `+req.body.ekokrafobservasi +`,
            brand = '`+req.body.brand+`',
            harga = `+req.body.harga+`,
            stock = `+req.body.stock+`,
            keterangan = '`+escape(req.body.keterangan)+`',
            file = '`+file+`',
            editedBy = '`+req.user._id+`',
            editedAt = NOW()
            WHERE id = `+req.body.id+`
        `;
        hapus_file(req.body.fileOld)
    }

    console.log(req.body)


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
        DELETE FROM ekokrafobservasibobot WHERE id = `+req.body.id+`; 
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