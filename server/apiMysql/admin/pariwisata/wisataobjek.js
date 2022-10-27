const express = require('express');
const fs = require('fs');
var db = require('../../../db/MySql/dbutama');
var upload = require('../../../db/multer/pdf');
var IMAGE = require('../../../library/image');
var uniqid = require('uniqid');
const router = express.Router();






router.post('/view', (req, res) => {
    var data_batas = 0;
    if (req.body.page_limit == null || req.body.page_limit == undefined || req.body.page_limit == '') {
        data_batas = 8;
    } else {
        data_batas = parseInt(req.body.page_limit);
    }
    var data_star = (req.body.data_ke - 1) * data_batas;
    var cari = req.body.cari_value;
    var halaman = 1;


    let jml_data = `
        SELECT 
        wisataobjek.*
        FROM pariwisata_sisfo.wisataobjek wisataobjek 
        WHERE 
        wisataobjek.uraian LIKE '%`+ cari + `%'
    `

    let view = `
        SELECT 
        wisataobjek.*,
        master_des_kel.nama_des_kel as nama_des_kel,
        m_jenispariwisata.uraian as m_jenispariwisata_uraian,
        m_jenistatakelola.uraian as m_jenistatakelola_uraian,

        (SELECT COUNT(wisataobjekfasilitas.id) FROM wisataobjekfasilitas
        WHERE wisataobjekfasilitas.wisataObjek = wisataobjek.id) AS jmlFasilitas
        

        FROM pariwisata_sisfo.wisataobjek wisataobjek

        LEFT JOIN pariwisata_sisfo.m_jenistatakelola m_jenistatakelola
        ON m_jenistatakelola.id  = wisataobjek.m_jenisTataKelola  

        LEFT JOIN pariwisata_sisfo.m_jenispariwisata m_jenispariwisata
        ON m_jenispariwisata.id  = wisataobjek.m_jenispariwisata 

        LEFT JOIN egov.master_des_kel master_des_kel
        ON master_des_kel.des_kel_id  = wisataobjek.des_kel_id

        WHERE 
        wisataobjek.uraian LIKE '%`+ cari + `%'
        LIMIT `+ data_star + `,` + data_batas + `
    `
    db.query(jml_data, (err, row) => {
        if (err) {
            console.log(err)
            res.json(err)
        } else {
            halaman = Math.ceil(row.length / data_batas);
            if (halaman < 1) { halaman = 1 }
            // ========================
            db.query(view, (err1, result) => {
                if (err1) { console.log(err1); res.json(err1) }
                else {
                    halaman = Math.ceil(row.length / data_batas);
                    if (halaman < 1) { halaman = 1 }
                    res.json({
                        data: result,
                        jml_data: halaman
                    })
                }
            })
            // ========================

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
            INSERT INTO wisataobjek (m_jenisTataKelola, m_jenispariwisata, des_kel_id, uraian, latLong, keterangan, file, fileThumb, createdBy, createdAt, keyx) VALUES (
                `+ req.body.m_jenisTataKelola + `,
                `+ req.body.m_jenispariwisata + `,
                `+ req.body.des_kel_id + `,
                '`+ req.body.uraian + `',
                '`+ req.body.latLong + `',
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
            UPDATE wisataobjek SET
            m_jenisTataKelola  = `+req.body.m_jenisTataKelola +`,
            m_jenisPariwisata  = `+req.body.m_jenispariwisata +`,
            des_kel_id  = `+req.body.des_kel_id +`,
            uraian = '`+req.body.uraian+`',
            latLong = '`+req.body.latLong+`',
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
            UPDATE wisataobjek SET
            m_jenisTataKelola  = `+req.body.m_jenisTataKelola +`,
            m_jenisPariwisata  = `+req.body.m_jenispariwisata +`,
            des_kel_id  = `+req.body.des_kel_id +`,

            latLong = '`+req.body.latLong+`',
            keterangan = '`+escape(req.body.keterangan)+`',
            file = '`+file+`',
            fileThumb = '`+ fileThumb + `',
            editedBy = '`+req.user._id+`',
            editedAt = NOW()

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
        DELETE FROM wisataobjek WHERE id = `+ req.body.id + `; 
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