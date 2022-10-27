
const notifDelete = async ()=>{

  return new Promise(resolve=>{

    Swal.fire({
      title: 'Apakah anda yakin utk menghapus?',
      text: "Pilih button hapus untuk menghapus data ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hapus!'
    }).then((result) => {
      if (result.isConfirmed) {
       resolve('');
      }
    })
  })
}



const replaceStr = (data) =>{
  var res = data.toString().replace(/\/|-| |@/g,'_X_');
    return res
}


const replaceEscapeString = (text) =>{
  var datax = unescape(text)
  // console.log(datax)
  return datax
}

const ArrToObj = (data) =>{
  var obj = data.reduce(function(acc, cur, i) {
    acc[replaceStr(cur.route)] = {
      readx : cur.readx,
      updatex : cur.updatex,
      deletex : cur.deletex,
      addx : cur.addx,
    };
    return acc;
  }, {});

  return obj
}



const checkZero = (data)=>{
  if (data == 0) {
    return ''
  } else {
    return 'light-green'
  }
}

formatMoney = (num)=>{

  if (num== undefined || num== null || num== '' || num== 0) {
    return 0
  } else {
    var p = num.toFixed(2).split(".");
      return "" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
          return  num=="-" ? acc : num + (i && !(i % 3) ? "." : "") + acc;
      }, "") + "," + p[1];

  }

}



module.exports = {

  notifDelete : notifDelete,
  replaceStr : replaceStr,
  ArrToObj : ArrToObj,
  replaceEscapeString : replaceEscapeString,
  checkZero : checkZero,
  formatMoney : formatMoney,

}
