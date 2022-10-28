const express = require('express');
const fs = require('fs');
var db = require('../../../db/MySql/dbutama');
var upload = require('../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();






router.post('/view', (req, res) => {

    var filter_kelompok = '';

    if (req.body.ekokrafKelompok == null || req.body.ekokrafKelompok == undefined || req.body.ekokrafKelompok == '') {
        filter_kolompok = '';
    } else {
        filter_kelompok = `ekokrafanggota.ekokrafKelompok = `+req.body.ekokrafKelompok +` AND`;
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
        ekokrafanggota.*
        FROM ekokrafanggota 
        WHERE
        `+filter_kelompok+`
        ekokrafanggota.nama LIKE '%`+cari+`%'
    `

    let view = `
        SELECT 
        ekokrafanggota.*,
        ekokrafkelompok.uraian as ekokrafuraian

        FROM ekokrafanggota
        
        LEFT JOIN ekokrafkelompok
        ON ekokrafkelompok.id = ekokrafanggota.ekokrafKelompok

        WHERE 
        `+filter_kelompok+`
        ekokrafanggota.nama LIKE '%`+cari+`%'
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
        INSERT INTO ekokrafanggota (ekokrafKelompok, nama, jabatan, email, hp, alamat, file, createdBy, createdAt) VALUES (
            `+req.body.ekokrafKelompok +`,
            '`+req.body.nama+`',
            '`+req.body.jabatan+`',
            '`+req.body.email+`',
            '`+req.body.hp+`',
            '`+escape(req.body.alamat)+`',
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

});

router.post('/editData',upload.single("file"), (req,res)=>{    

    var file = '';
    var query = '';

    if (req.file == null || req.file == undefined) {
        query = `
            UPDATE ekokrafanggota SET
            ekokrafKelompok  = `+req.body.ekokrafKelompok +`,
            nama = '`+req.body.nama+`',
            jabatan = '`+req.body.jabatan+`',
            email = '`+req.body.email+`',
            hp = '`+req.body.hp+`',
            alamat = '`+escape(req.body.alamat)+`',
            editedBy = '`+req.user._id+`',
            editedAt = NOW()
            WHERE id = `+req.body.id+`
        `;
    } else {
        file = req.file.filename
        query = `
            UPDATE ekokrafanggota SET
            ekokrafKelompok  = `+req.body.ekokrafKelompok +`,
            nama = '`+req.body.nama+`',
            jabatan = '`+req.body.jabatan+`',
            email = '`+req.body.email+`',
            hp = '`+req.body.hp+`',
            alamat = '`+escape(req.body.alamat)+`',
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
        DELETE FROM ekokrafanggota WHERE id = `+req.body.id+`; 
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