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
    var createdBy = req.user._id;
    var data_batas = 0;
    if (req.body.page_limit == null || req.body.page_limit == undefined || req.body.page_limit == '') {
        data_batas = 8;
    } else {
        data_batas = parseInt(req.body.page_limit);
    }
    var data_star = (req.body.data_ke - 1)* data_batas;
    var id_indikator = req.body.id_indikator;
    var halaman = 1; 


    let jml_data = `
        SELECT 
        form_ekosistem.id as id_ekosistem,
        form_ekosistem.id_kuisioner as id_kuisioner,


        ekokrafkuisioner.uraian as nama_indikator,
        ekokrafkuisionerbobot.pertanyaan as nama_tolak_ukur


        FROM form_ekosistem

        LEFT JOIN ekokrafkuisionerindikator
        ON form_ekosistem.id_indikator = ekokrafkuisionerindikator.id

        LEFT JOIN ekokrafkuisioner
        ON form_ekosistem.id_kuisioner = ekokrafkuisioner.id

        LEFT JOIN ekokrafkuisionerbobot
        ON form_ekosistem.id_bobot = ekokrafkuisionerbobot.id

        WHERE 
        form_ekosistem.id_indikator = '`+id_indikator+`'
    `

    let view = `
        SELECT 
        form_ekosistem.id as id_ekosistem,
        form_ekosistem.id_kuisioner as id_kuisioner,


        ekokrafkuisioner.uraian as nama_indikator,
        ekokrafkuisionerbobot.pertanyaan as nama_tolak_ukur


        FROM form_ekosistem

        LEFT JOIN ekokrafkuisionerindikator
        ON form_ekosistem.id_indikator = ekokrafkuisionerindikator.id

        LEFT JOIN ekokrafkuisioner
        ON form_ekosistem.id_kuisioner = ekokrafkuisioner.id

        LEFT JOIN ekokrafkuisionerbobot
        ON form_ekosistem.id_bobot = ekokrafkuisionerbobot.id

        WHERE 
        form_ekosistem.id_indikator = '`+id_indikator+`' AND
        form_ekosistem.createdBy = '`+createdBy+`'

        ORDER BY ekokrafkuisionerbobot.createdAt DESC
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
    let insert = `
        INSERT INTO form_ekosistem (id, id_pelakuEkoraf, id_indikator, id_kuisioner, id_bobot, createdBy, createdAt) VALUES (
            '`+uniqid()+ `',
        `+req.body.id_pelakuEkoraf+`,
        '`+req.body.id_indikator+`',
        '`+req.body.id_kuisioner+`',
        '`+req.body.id_bobot+`',
        
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
    // console.log(req.body);
    // res.send("OK")
});

router.post('/editData', (req,res)=>{
    query = `
        UPDATE form_ekosistem SET
        id_bobot = `+req.body.id_bobot+`,
        editedBy = '`+req.user._id+`',
        editedAt = NOW()

        WHERE uniq = '`+req.body.id+`'
    `;
    
    db.query(query, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            res.send(row);
        }
    })

})


router.post('/removeData', (req, res)=> {

    var query = `
        DELETE FROM form_ekosistem WHERE id = '`+req.body.id+`'; 
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