const express = require('express');
const fs = require('fs');
var db = require('../../../db/MySql/dbutama');
var upload = require('../../../db/multer/pdf');
var IMAGE = require('../../../library/image');
var uniqid = require('uniqid');
const router = express.Router();






router.post('/view', (req, res) => {

    let view = `
        SELECT 
        wisataobjekfasilitas.*
        FROM wisataobjekfasilitas

        WHERE wisataobjekfasilitas.wisataObjek = `+req.body.wisataObjek+`
    `
    db.query(view, (err, rows) => {
        if (err) { console.log(err); res.json(err) }
        else {
           res.send(rows)
        }
    })
});


// router.post('/addData', (req,res)=>{

router.post('/addData', upload.single("file"), (req, res) => {

    console.log(req.body)
    IMAGE.resizeImg(req.file.filename)

    var file = req.file.filename
    var fileThumb = 'thumbnail' + req.file.filename
    let insert = `
            INSERT INTO wisataobjekfasilitas (wisataObjek, uraian, thn, sumberDana, anggaran, jumlah, satuan, keterangan, file, fileThumb, createdBy, createdAt, keyx) VALUES (
                `+ req.body.wisataObjek + `,
                '`+ req.body.uraian + `',
                `+ req.body.thn + `,
                '`+ req.body.sumberDana + `',
                `+ req.body.anggaran + `,
                `+ req.body.jumlah + `,
                '`+ req.body.satuan + `',
                '`+ escape(req.body.keterangan) + `',
                '`+ file + `',
                '`+ fileThumb + `',
                '`+ req.user._id + `',
                NOW(),
                '`+uniqid()+ `'
            )
        `

    db.query(insert, (err, row) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(row);
        }
    })


});
router.post('/editData',upload.single("file"), (req,res)=>{

    

    var file = '';
    var query = '';

    // console.log(req.body)

    if (req.file == null || req.file == undefined) {

        console.log("TIDAK ADA FILE")

        query = `
            UPDATE wisataobjekfasilitas SET
            uraian  = '`+req.body.uraian +`',
            thn  = `+req.body.thn +`,
            sumberDana  = '`+req.body.sumberDana +`',
            anggaran = `+req.body.anggaran+`,
            jumlah = `+req.body.jumlah+`,
            satuan  = '`+req.body.satuan +`',
            keterangan = '`+escape(req.body.keterangan)+`',
            editedBy = '`+req.user._id+`',
            editedAt = NOW()
            
            WHERE id = `+req.body.id+`
        `;
    } else {
        console.log("ADA FILE")
        IMAGE.resizeImg(req.file.filename)
        file = req.file.filename
        var fileThumb = 'thumbnail' + req.file.filename

        query = `
            UPDATE wisataobjekfasilitas SET
            uraian  = '`+req.body.uraian +`',
            thn  = `+req.body.thn +`,
            sumberDana  = '`+req.body.sumberDana +`',
            anggaran = `+req.body.anggaran+`,
            jumlah = `+req.body.jumlah+`,
            satuan  = '`+req.body.satuan +`',
            keterangan = '`+escape(req.body.keterangan)+`',
            editedBy = '`+req.user._id+`',
            editedAt = NOW(),
            file = '`+file+`',
            fileThumb = '`+ fileThumb + `'

            WHERE id = `+req.body.id+`
        `;
        hapus_file(req.body.fileOld);
        hapus_file('thumbnail'+req.body.fileOld)
    }

    // console.log(req.body)


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


router.post('/removeData', (req, res) => {

    var query = `
        DELETE FROM wisataobjekfasilitas WHERE id = `+ req.body.id + `; 
    `;
    db.query(query, (err, row) => {
        if (err) {
            res.send(err);
        } else {
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