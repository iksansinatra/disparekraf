const express = require('express');
var db = require('../../../db/MySql/dbutama');

var uniqid = require('uniqid');
const router = express.Router();






router.post('/view', (req, res) => {
    var data_batas = 8;
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1; 


    let jml_data = `
        SELECT 
        m_jenispariwisata.*,
        m_kategoriPariwisata.uraian as m_kategoriPariwisata_uraian

        FROM m_jenispariwisata

        LEFT JOIN m_kategoriPariwisata 
        ON m_kategoriPariwisata.id = m_jenispariwisata.m_kategoriPariwisata

        LEFT JOIN m_bidangpariwisata
        ON m_bidangpariwisata.id = m_kategoriPariwisata.m_bidangpariwisata

        WHERE 
        m_jenispariwisata.uraian LIKE '%`+cari+`%'
    `

    let view = `
        SELECT 
        m_jenispariwisata.*,
        m_kategoriPariwisata.kode as m_kategoriPariwisata_kode,
        m_kategoriPariwisata.uraian as m_kategoriPariwisata_uraian,
        m_bidangpariwisata.kode as m_bidangpariwisata_kode,
        m_bidangpariwisata.uraian as m_bidangpariwisata_uraian

        FROM m_jenispariwisata

        LEFT JOIN m_kategoriPariwisata 
        ON m_kategoriPariwisata.id = m_jenispariwisata.m_kategoriPariwisata

        LEFT JOIN m_bidangpariwisata
        ON m_bidangpariwisata.id = m_kategoriPariwisata.m_bidangpariwisata

        WHERE 
        m_jenispariwisata.uraian LIKE '%`+cari+`%'
        LIMIT `+data_star+`,`+data_batas+`
    `
    db.query(jml_data, (err, row)=>{
        if (err) {
            console.log(err)
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
        INSERT INTO m_jenispariwisata (m_kategoriPariwisata , uraian, keterangan,kode) VALUES (
            `+req.body.m_kategoriPariwisata +`, '`+req.body.uraian+`', '`+req.body.keterangan+`', '`+req.body.kode+`'
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
});

router.post('/editData', (req,res)=>{
    query = `
        UPDATE m_jenispariwisata SET
        m_kategoriPariwisata = `+req.body.m_kategoriPariwisata+`,
        uraian = '`+req.body.uraian+`',
        keterangan = '`+req.body.keterangan+`',
        kode = '`+req.body.kode+`'

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
        DELETE FROM m_jenispariwisata WHERE id = `+req.body.id+`; 
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
        SELECT * FROM m_jenispariwisata
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