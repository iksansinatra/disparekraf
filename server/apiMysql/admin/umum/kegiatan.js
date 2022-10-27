const express = require('express');
var db = require('../../../db/MySql/dbutama');
const fs = require('fs');

var multer=require("multer");
var upload = require('../../../db/multer/pdf');

var uniqid = require('uniqid');
const router = express.Router();




router.post('/view', (req, res) => {
    var data_batas = 8;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1; 


    let jml_data = `
        SELECT 
        kegiatan.*
        FROM kegiatan 

        WHERE 
        kegiatan.nama LIKE '%`+cari+`%' 
        OR kegiatan.deskripsi LIKE '%`+cari+`%'
    `

    let view = `
        SELECT 
        kegiatan.*,
        users.nama as postBy
        FROM kegiatan 
      
        LEFT JOIN users
        ON users.id = kegiatan.userId


        WHERE 
        kegiatan.nama LIKE '%`+cari+`%' 
        OR kegiatan.deskripsi LIKE '%`+cari+`%'
        ORDER BY kegiatan.createAt DESC
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

    console.log("TERPANGGGIIIIIIIIIIIIIIIIIIIIIILLLLLLLLLLLLLLL")
     let insert = `INSERT INTO kegiatan (id, nama, sumber, tgl, foto, deskripsi, rangkuman, keyx, userId, createAt) 
    VALUES ('`+uniqid()+`' ,'`+req.body.nama+`','`+req.body.sumber+`' , NOW() ,"`+req.file.filename+`",'`+req.body.deskripsi+`','`+req.body.rangkuman+`', '`+uniqid()+`' ,'`+req.user._id+`' , NOW() )
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
});

router.post('/editData',upload.single("file"), (req,res)=>{
    var query = '';
    if (req.file == undefined) {
        query = `
        UPDATE kegiatan SET
        nama = '`+req.body.nama+`',
        sumber = '`+req.body.sumber+`',
        rangkuman = '`+req.body.rangkuman+`',
        deskripsi = '`+req.body.deskripsi+`',
        editeAt =  NOW()
        WHERE id = '`+req.body.id+`'
        `;
    } else {
        query = `
        UPDATE kegiatan SET
        nama = '`+req.body.nama+`',
        sumber = '`+req.body.sumber+`',
        deskripsi = '`+req.body.deskripsi+`',
        rangkuman = '`+req.body.rangkuman+`',
        foto = '`+req.file.filename+`',
        editeAt =  NOW()
        WHERE id = '`+req.body.id+`'
        `;
        
        hapus_file(req.body.file_old);
        console.log(req.body.file_old);
    }
    
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
    var file = req.body.file
    hapus_file(file);

    var query = `
        DELETE FROM kegiatan WHERE id = '`+req.body.id+`'; 
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
        }
    });
})


function hapus_file(file){
    const path = 'uploads/'+file;

    fs.unlink(path, (err) => {
        if (err) {
          console.error(err)
          return
        }
    })

}




module.exports = router;