
var db = require('../../../db/MySql/dbutama');




const addData = (data, id)=>{
    
    data.forEach((element, index) => {

        let insert = `
            INSERT INTO ekokrafkelompokjenis (m_jenisPariwisata , ekokrafKelompok) VALUES (
                `+element+`, `+id+`
            )
        `

        db.query(insert, (err, row)=>{
            if(err) {
                console.log("GAGAL MENAMBAHKAN DATA EKOKRAF KELOMPOK JENIS KE : -"+index+" ....!!!!!!")
                console.log(err);
            }else{
                console.log("SUKSES MENAMBAHKAN DATA EKOKRAF KELOMPOK JENIS KE : -"+index)
            }
        })
        
    });



}

const removeData = (id)=>{


        var query = `
            DELETE FROM ekokrafkelompokjenis WHERE ekokrafKelompok = `+id+`; 
        `;
        db.query(query, (err, row)=>{
            if(err){
                console.log(err);
            }else{
                console.log("SUKSES MENGHAPUS RELASI KELOMPOK JENIS")
            }
        });
        
 
}


const coba = "XXXXXXXXXXXXXXXXXXXXXXX"

module.exports = {
    coba : coba,
    addData : addData,
    removeData : removeData
}
