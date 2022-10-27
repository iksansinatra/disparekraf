const express = require('express');
var db = require('../../../db/MySql/dbutama');
const router = express.Router();






router.post('/view', (req, res) => {


    var data_batas = 8;

    if (req.body.page_limit == null || req.body.page_limit == undefined || req.body.page_limit == '') {
        data_batas = 8
    } else {
        data_batas = req.body.page_limit
    }


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




module.exports = router;