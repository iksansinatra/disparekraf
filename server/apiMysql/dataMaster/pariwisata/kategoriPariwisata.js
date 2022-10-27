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
        m_kategoripariwisata.*,
        m_bidangpariwisata.uraian as m_bidangpariwisata_uraian

        FROM m_kategoripariwisata

        LEFT JOIN m_bidangpariwisata
        ON m_bidangpariwisata.id = m_kategoripariwisata.m_bidangpariwisata
        WHERE 
        m_kategoripariwisata.uraian LIKE '%`+cari+`%'
    `

    let view = `
        SELECT 
        m_kategoripariwisata.*,
        m_bidangpariwisata.kode as m_bidangpariwisata_kode,
        m_bidangpariwisata.uraian as m_bidangpariwisata_uraian

        FROM m_kategoripariwisata

        LEFT JOIN m_bidangpariwisata
        ON m_bidangpariwisata.id = m_kategoripariwisata.m_bidangpariwisata

        WHERE 
        m_kategoripariwisata.uraian LIKE '%`+cari+`%'
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
    console.log(req.body.m_bidangPariwisata)
    let insert = `
        INSERT INTO m_kategoripariwisata (m_bidangpariwisata, uraian, keterangan,kode) VALUES (
            `+req.body.m_bidangPariwisata+`, '`+req.body.uraian+`', '`+req.body.keterangan+`', '`+req.body.kode+`'
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
        UPDATE m_kategoripariwisata SET
        m_bidangPariwisata = `+req.body.m_bidangPariwisata+`,
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
        DELETE FROM m_kategoripariwisata WHERE id = `+req.body.id+`; 
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
        SELECT * FROM m_kategoripariwisata
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