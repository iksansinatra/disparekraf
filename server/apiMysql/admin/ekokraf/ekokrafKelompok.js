const express = require('express');
var db = require('../../../db/MySql/dbutama');
var func = require('node-mysql-nesting');


const router = express.Router();


var LIB = require('./lib_ekokrafKelompokJenis');
const { promises } = require('stream');
// import LIB from "./lib_ekokrafKelompokJenis";


router.get('/', async (req, res)=> {
    var xx = await main(req, res)
    console.log(xx)
    res.send(xx)
    
})


const main = async(req, res) =>{
    var datac = await getMain(req, res)
    var data = datac.data
    var datax = [];
    for (let i = 0; i < data.length; i++) {
        data[i].xxxx = await getRelasi(data[i].id);
        datax.push(data[i])
    }

    return {
        data : datax, jml_data : datac.jml_data
    }
}

const getMain = async (req, res) =>{
    return new Promise(resolve =>{
        var query = `
            SELECT * FROM ekokrafkelompok
        `;
    
        db.query (query, (err, rows)=>{
            var ccc = {data : rows, jml_data : 4}
            resolve(ccc)
        });
    })
}

async function getRelasi(id){
    return new Promise((resolve) =>{

        var query = `
            SELECT ekokrafkelompokjenis.*,
            m_jenisPariwisata.uraian as m_jenisPariwisata_uraian
            
            FROM ekokrafkelompokjenis
            LEFT JOIN m_jenisPariwisata
            ON m_jenisPariwisata.id = ekokrafkelompokjenis.m_jenisPariwisata 



            WHERE ekokrafkelompokjenis.ekokrafKelompok = `+id+`
        `;
        db.query(query, (err, rows)=>{
            if(err){
                console.log(err)
                res.send(err);
            }else{
                resolve(rows)
            }
        });

    })
}



router.get('/1', (req, res)=> {

    var query = `
        SELECT * FROM ekokrafkelompok
        LEFT JOIN ekokrafkelompokjenis
        ON ekokrafkelompokjenis.ekokrafKelompok = ekokrafkelompok.id 
    `;

    var options = { sql: query, nestTables: true };
    var nestingOptions = [
        { tableName : 'ekokrafkelompok', pkey: 'id'},
        { tableName : 'ekokrafkelompokjenis', pkey: 'id', fkeys:[{table:'ekokrafkelompok',col:'ekokrafKelompok'}]},
    ];

    db.query(options, (err, rows)=>{
        if(err){
            res.send(err);
        }else{
            var nestedRows = func.convertToNested(rows, nestingOptions);
            
            res.send(nestedRows);
        }
    });
})



router.post('/view', (req, res) => {
    var data_batas = 0;
    if (req.body.page_limit == null || req.body.page_limit == undefined || req.body.page_limit == '') {
        data_batas = 8;
    } else {
        data_batas = parseInt(req.body.page_limit);
    }
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1; 


    let jml_data = `
        SELECT * FROM ekokrafkelompok
        LEFT JOIN ekokrafkelompokjenis
        ON ekokrafkelompokjenis.ekokrafKelompok = ekokrafkelompok.id 
        WHERE 
        ekokrafkelompok.uraian LIKE '%`+cari+`%'
    `

    let view = `
        SELECT * FROM ekokrafkelompok
        LEFT JOIN ekokrafkelompokjenis
        ON ekokrafkelompokjenis.ekokrafKelompok = ekokrafkelompok.id 
        WHERE 
        ekokrafkelompok.uraian LIKE '%`+cari+`%'
        ORDER BY ekokrafkelompok.createdAt ASC
        LIMIT `+data_star+`,`+data_batas+`
    `


    var options1 = { sql: jml_data, nestTables: true };
    var options2 = { sql: view, nestTables: true };
    var nestingOptions = [
        { tableName : 'ekokrafkelompok', pkey: 'id'},
        { tableName : 'ekokrafkelompokjenis', pkey: 'id', fkeys:[{table:'ekokrafkelompok',col:'ekokrafKelompok'}]},
    ];



    db.query(options1, (err, row)=>{
        if (err) {
            res.json(err)
        }else{
            var nestedRows1 = func.convertToNested(row, nestingOptions);
            halaman = Math.ceil(nestedRows1.length/data_batas);
            if(halaman<1){halaman = 1}
            // ========================
            db.query(options2, (err, result)=>{
                if (err) {res.json(err)}
                else{
                    var nestedRows2 = func.convertToNested(result, nestingOptions);
                    if(halaman<1){halaman = 1}
                    res.json({
                        data : nestedRows2,
                        jml_data : halaman
                    })
                }
            })
            // ========================

        }
    })
});



router.post('/view1', async (req, res) => {
    var xx = await main1(req, res)
    // console.log(xx)
    res.send(xx)
    
});



const main1 = async(req, res) =>{
    var datac = await getMain1(req, res)
    var data = datac.data
    var datax = [];
    for (let i = 0; i < data.length; i++) {
        data[i].subData = await getRelasi(data[i].id);
        datax.push(data[i])
    }

    return {
        data : datax, jml_data : datac.jml_data
    }
}

const getMain1 = async (req, res) =>{


    var data_batas = 0;
    if (req.body.page_limit == null || req.body.page_limit == undefined || req.body.page_limit == '') {
        data_batas = 8;
    } else {
        data_batas = parseInt(req.body.page_limit);
    }
    var data_star = (req.body.data_ke - 1)* data_batas;
    var cari = req.body.cari_value;
    var halaman = 1; 

    return new Promise(resolve =>{
        var jml_data = `
            SELECT * FROM ekokrafkelompok
            WHERE
            ekokrafkelompok.uraian LIKE '%`+cari+`%'
        `;

        var view = `
            SELECT * FROM ekokrafkelompok
            WHERE
            ekokrafkelompok.uraian LIKE '%`+cari+`%'
            ORDER BY ekokrafkelompok.createdAt DESC
            LIMIT `+data_star+`,`+data_batas+`
        `;


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
                        if(halaman<1){halaman = 1}

                        var dataxx = {
                            data : result,
                            jml_data : halaman
                        }
                        resolve(dataxx)
                    }
                })
                // ========================
    
            }
        })

    })
}




// router.post('/addData', (req,res)=>{

router.post('/addData', (req,res)=>{
    let insert = `
        INSERT INTO ekokrafkelompok (uraian, alamat, createdBy, createdAt) VALUES (
            '`+req.body.uraian+`', '`+req.body.alamat+`','`+req.user._id+`', NOW()
        )
    `

    db.query(insert, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
        console.log(row.insertId)
            // console.log(row.insertId)
            LIB.addData(req.body.jenisPariwisata, row.insertId)
            res.send(row);
        }
    })
});

router.post('/editData', (req,res)=>{

    LIB.removeData(req.body.id)
    query = `
        UPDATE ekokrafkelompok SET
        uraian = '`+req.body.uraian+`',
        alamat = '`+req.body.alamat+`',
        editedBy = '`+req.user._id+`',
        editedAt = NOW()

        WHERE id = `+req.body.id+`
    `;
    
    db.query(query, (err, row)=>{
        if(err) {
            console.log(err);
            res.send(err);
        }else{
            LIB.addData(req.body.jenisPariwisata, req.body.id)
            res.send(row);
        }
    })


    // console.log(req.body);
    // res.send("OK")
    

    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
})


router.post('/removeData', (req, res)=> {

    var query = `
        DELETE FROM ekokrafkelompok WHERE id = `+req.body.id+`; 
    `;
    db.query(query, (err, row)=>{
        if(err){
            res.send(err);
        }else{
            LIB.removeData(req.body.id)
            res.send(row);
        }
    });
})


router.post('/list', (req, res)=> {
    var cari = ''

    if (req.body.data == undefined || req.body.data == null || req.body.data == '') {
        cari = ''
    } else {
        cari = req.body.data
    }


    var query = `
        SELECT * 
        FROM ekokrafkelompok
        WHERE 
        ekokrafkelompok.uraian LIKE '%`+cari+`%'
        limit 8
    `;
    db.query(query, (err, row)=>{
        if(err){
            console.log(err)
            res.send(err);
        }else{
            res.send(row);
        }
    });
})



module.exports = router;