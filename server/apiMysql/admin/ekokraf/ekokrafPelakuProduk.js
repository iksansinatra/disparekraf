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


// router.post('/addData', (req,res)=>{

router.post('/addData',upload.single("file"), (req,res)=>{
    // console.log(req.body)
    var file = req.file.filename



    let insert = `
        INSERT INTO ekokrafpelakuproduk (m_jenisPariwisata , ekokrafPelaku , brand, harga, stock, keterangan, file, createdBy, createdAt) VALUES (
            `+req.body.m_jenisPariwisata +`,
            `+req.body.ekokrafPelaku +`,
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
            UPDATE ekokrafpelakuproduk SET
            m_jenisPariwisata  = `+req.body.m_jenisPariwisata +`,
            ekokrafPelaku  = `+req.body.ekokrafPelaku +`,
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
            UPDATE ekokrafpelakuproduk SET
            m_jenisPariwisata  = `+req.body.m_jenisPariwisata +`,
            ekokrafPelaku  = `+req.body.ekokrafPelaku +`,
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