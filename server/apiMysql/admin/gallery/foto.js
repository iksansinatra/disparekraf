const express = require('express');
var db = require('../../../db/MySql/dbutama');
const fs = require('fs');

var multer=require("multer");
var upload = require('../../../db/multer/pdf');
var IMAGE = require('../../../library/image');
var uniqid = require('uniqid');
const router = express.Router();




router.post('/view', (req, res) => {
    var data_batas = 8;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1; 


    let jml_data = `
        SELECT 
        foto.*
        FROM foto 

        WHERE 
        foto.uraian LIKE '%`+cari+`%' 
    `

    let view = `
        SELECT 
        foto.*,
        users.nama as postBy
        FROM foto 
      
        LEFT JOIN users
        ON users.id = foto.createdBy


        WHERE 
        foto.uraian LIKE '%`+cari+`%' 
        ORDER BY foto.createdAt DESC
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

router.post('/addData',upload.array("file", 12), (req,res)=>{

    console.log(req.body)
    console.log(req.files)


    var filex = req.files




    filex.forEach(element => {

        var fileThumb = 'thumbnail' + element.filename
        IMAGE.resizeImg(element.filename)
        let insert = `INSERT foto (file, fileThumb, uraian, createdBy, createdAt) 
        VALUES ('`+element.filename+`','`+fileThumb+`' , '`+req.body.uraian+`' ,'`+req.user._id+`' , NOW() )
        `
    
        db.query(insert, (err, row)=>{
            if(err) {
                console.log(err);
                res.send(err);
            }else{
                console.log("sukses")
            }
        })
        
        
        
        
    });
    
    res.send(row);
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
});

router.post('/editData',upload.single("file"), (req,res)=>{
    var query = '';
    if (req.file == undefined) {
        query = `
        UPDATE kegiatan SET
        nama = '`+req.body.nama+`',
        sumber = '`+req.body.sumber+`',
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

    console.log("FUNGSI DELETE DI PANGGIL")
    var file = req.body.file
    hapus_file(file);
    hapus_file('thumbnail' + file);

    var query = `
        DELETE FROM foto WHERE id = '`+req.body.id+`'; 
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