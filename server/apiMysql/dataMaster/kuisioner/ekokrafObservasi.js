const express = require('express');
var db = require('../../../db/MySql/dbutama');

var uniqid = require('uniqid');
const router = express.Router();

router.post('/cek_tolak_ukur', (req, res)=> {

    var query = `
    SELECT ekokrafkuisioner.* 
    FROM ekokrafkuisioner
    LEFT JOIN ekokrafkuisionerindikator
    ON ekokrafkuisionerindikator.id = ekokrafkuisioner.ekokrafIndikator
    WHERE 
    ekokrafkuisioner.ekokrafIndikator = `+req.body.id+`
    `;


        // ========================
        db.query(query, (err, result)=>{
            if (err) {res.json(err)}
            else{

                res.json({
                    data : result,
                })
            }
        })
        // ========================


})


router.post('/cek_bobot', (req, res)=> {

    var query = `
    SELECT ekokrafkuisionerbobot.* 
    FROM ekokrafkuisionerbobot
    LEFT JOIN ekokrafkuisioner
    ON ekokrafkuisionerbobot.ekokrafKuisioner = ekokrafkuisioner.id
    WHERE 
    ekokrafkuisioner.id = `+req.body.id+`
    `;


        // ========================
        db.query(query, (err, result)=>{
            if (err) {res.json(err)}
            else{

                res.json({
                    data : result,
                })
            }
        })
        // ========================


})

router.post('/getID', (req, res)=> {
    var query = `
    SELECT id 
    FROM ekokrafpelaku

    WHERE 
    ekokrafpelaku.createdBy = '`+req.user._id+`'
    `;


        // ========================
        db.query(query, (err, result)=>{
            if (err) {res.json(err)}
            else{

                res.json({
                    data : result,
                })
            }
        })
        // ========================


})

router.post('/view', (req, res) => {

    var data_batas = 0;
    if (req.body.page_limit == null || req.body.page_limit == undefined || req.body.page_limit == '') {
        data_batas = 8;
    } else {
        data_batas = parseInt(req.body.page_limit);
    }
    var data_star = (req.body.data_ke - 1)* data_batas;
    var kabupaten = req.body.kabupaten_id;
    var subSektor = req.body.ekokrafJenis;
    var halaman = 1; 


    let jml_data = `
    SELECT 
    ekokrafobservasi.id as id_observasi,
    ekokrafobservasi.jenisEkokraf as id_jenis,
    ekokrafobservasi.ekokrafIndikator as id_indikator,
    ekokrafobservasi.ekokrafPotensi as id_potensi,
    ekokrafindikator.indikator as indikator, ekokrafpotensi.tolak_ukur as tolak_ukur, 
    ekokrafpotensi.nilai as nilai,
    master_kabupaten.nama_kabupaten as kabupaten, m_jenispariwisata.uraian as jenisekokraf

        FROM ekokrafobservasi

        LEFT JOIN ekokrafindikator
        ON ekokrafobservasi.ekokrafIndikator = ekokrafindikator.id

        LEFT JOIN ekokrafpotensi
        ON ekokrafobservasi.ekokrafPotensi = ekokrafpotensi.id

        LEFT JOIN master_kabupaten
        ON ekokrafobservasi.kabupaten_id = master_kabupaten.kabupaten_id

        LEFT JOIN m_jenispariwisata
        ON ekokrafobservasi.jenisEkokraf = m_jenispariwisata.id

        WHERE 
        ekokrafobservasi.kabupaten_id = '`+kabupaten+`' AND
        ekokrafobservasi.jenisEkokraf = '`+subSektor+`'
    `

    let view = `
         SELECT 
         ekokrafobservasi.id as id_observasi,
         ekokrafobservasi.jenisEkokraf as id_jenis,
         ekokrafobservasi.ekokrafIndikator as id_indikator,
         ekokrafobservasi.ekokrafPotensi as id_potensi,
         ekokrafindikator.indikator as indikator, ekokrafpotensi.tolak_ukur as tolak_ukur, 
         ekokrafpotensi.nilai as nilai,
         master_kabupaten.nama_kabupaten as kabupaten, m_jenispariwisata.uraian as jenisekokraf

        FROM ekokrafobservasi

        LEFT JOIN ekokrafindikator
        ON ekokrafobservasi.ekokrafIndikator = ekokrafindikator.id

        LEFT JOIN ekokrafpotensi
        ON ekokrafobservasi.ekokrafPotensi = ekokrafpotensi.id

        LEFT JOIN master_kabupaten
        ON ekokrafobservasi.kabupaten_id = master_kabupaten.kabupaten_id

        LEFT JOIN m_jenispariwisata
        ON ekokrafobservasi.jenisEkokraf = m_jenispariwisata.id

        WHERE 
        ekokrafobservasi.kabupaten_id = '`+kabupaten+`' AND
        ekokrafobservasi.jenisEkokraf = '`+subSektor+`'

        ORDER BY ekokrafobservasi.createdAt ASC
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

router.post('/addData', (req,res)=>{
    let insert = `
        INSERT INTO ekokrafobservasi (uniq, kabupaten_id, jenisEkokraf, ekokrafIndikator, ekokrafPotensi, createdBy, createdAt) VALUES (
            '`+uniqid()+ `',
            `+req.body.kabupaten_id+`,
            `+req.body.ekokrafJenis+`,
            `+req.body.ekokrafIndikator+`,
            `+req.body.ekokrafPotensi+`,
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

router.post('/editData', (req,res)=>{
    console.log(req.body);
    query = `
        UPDATE ekokrafobservasi SET
        ekokrafPotensi = `+req.body.ekokrafPotensi+`,
        editedBy = '`+req.user._id+`',
        editedAt = NOW()

        WHERE id = '`+req.body.id+`'
    `;
    
    db.query(query, (err, row)=>{
        if(err) {
            console.log(err);
            console.log("gagal");
            res.send(err);
        }else{
            res.send(row);
            console.log("sukses");
        }
    })

})

router.post('/removeData', (req, res)=> {
    console.log(req.body);

    var query = `
        DELETE FROM ekokrafobservasi WHERE id = '`+req.body.id+`'; 
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            res.send(row);
            console.log("sukses");
        }
    });
})




router.post('/list', (req, res)=> {

    var query = `
        SELECT * FROM ekokrafkuisioner
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