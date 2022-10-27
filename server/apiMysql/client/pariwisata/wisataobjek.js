const express = require('express');
var db = require('../../../db/MySql/dbutama');
const router = express.Router();






router.post('/view', (req, res) => {
    var data_batas = 0;

    var m_jenisPariwisata = ''

    if (req.body.m_jenisPariwisata == null || req.body.m_jenisPariwisata == undefined || req.body.m_jenisPariwisata == '') {
        m_jenisPariwisata = ``
    } else {
        m_jenisPariwisata = `wisataobjek.m_jenisPariwisata = `+req.body.m_jenisPariwisata+` AND`
    }



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
        `+m_jenisPariwisata+`
        wisataobjek.uraian LIKE '%`+ cari + `%'
    `

    let view = `
        SELECT 
        wisataobjek.*,
        master_des_kel.nama_des_kel as nama_des_kel,
        m_jenispariwisata.uraian as m_jenispariwisata_uraian,
        m_jenistatakelola.uraian as m_jenistatakelola_uraian

        FROM pariwisata_sisfo.wisataobjek wisataobjek

        LEFT JOIN pariwisata_sisfo.m_jenistatakelola m_jenistatakelola
        ON m_jenistatakelola.id  = wisataobjek.m_jenisTataKelola  

        LEFT JOIN pariwisata_sisfo.m_jenispariwisata m_jenispariwisata
        ON m_jenispariwisata.id  = wisataobjek.m_jenispariwisata 

        LEFT JOIN egov.master_des_kel master_des_kel
        ON master_des_kel.des_kel_id  = wisataobjek.des_kel_id

        WHERE 
        `+m_jenisPariwisata+`
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


router.post('/home_view', (req, res) => {

    var query = `
        SELECT 
        wisataobjek.*,
        master_des_kel.nama_des_kel as nama_des_kel,
        m_jenispariwisata.uraian as m_jenispariwisata_uraian,
        m_jenistatakelola.uraian as m_jenistatakelola_uraian

        FROM pariwisata_sisfo.wisataobjek wisataobjek

        LEFT JOIN pariwisata_sisfo.m_jenistatakelola m_jenistatakelola
        ON m_jenistatakelola.id  = wisataobjek.m_jenisTataKelola  

        LEFT JOIN pariwisata_sisfo.m_jenispariwisata m_jenispariwisata
        ON m_jenispariwisata.id  = wisataobjek.m_jenispariwisata 

        LEFT JOIN egov.master_des_kel master_des_kel
        ON master_des_kel.des_kel_id  = wisataobjek.des_kel_id

        LIMIT 6

    ;
    `;
    db.query(query, (err, row) => {
        if (err) {
            res.send(err);
        } else {
            res.send(row);
        }
    });
})

router.post('/getOne', (req, res) => {

    var query = `
        SELECT 
        wisataobjek.*,

        master_des_kel.nama_des_kel as nama_des_kel,
        master_kecamatan.nama_kecamatan as nama_kecamatan,
        master_kabupaten.nama_kabupaten as nama_kabupaten,

        m_jenispariwisata.uraian as m_jenispariwisata_uraian,
        m_jenistatakelola.uraian as m_jenistatakelola_uraian

        FROM pariwisata_sisfo.wisataobjek wisataobjek

        LEFT JOIN pariwisata_sisfo.m_jenistatakelola m_jenistatakelola
        ON m_jenistatakelola.id  = wisataobjek.m_jenisTataKelola  

        LEFT JOIN pariwisata_sisfo.m_jenispariwisata m_jenispariwisata
        ON m_jenispariwisata.id  = wisataobjek.m_jenispariwisata 

        LEFT JOIN egov.master_des_kel master_des_kel
        ON master_des_kel.des_kel_id  = wisataobjek.des_kel_id

        LEFT JOIN egov.master_kecamatan master_kecamatan
        ON master_des_kel.kecamatan_id  = master_kecamatan.kecamatan_id

        LEFT JOIN egov.master_kabupaten master_kabupaten
        ON master_kecamatan.kabupaten_id  = master_kabupaten.kabupaten_id

        WHERE 
        wisataobjek.keyx = '`+req.body.keyx+`'

    `;
    db.query(query, (err, row) => {
        if (err) {
            res.send(err);
        } else {
            res.send(row);
        }
    });
})



module.exports = router;