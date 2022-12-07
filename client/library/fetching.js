

var dstore  = require("../store");
var store = dstore.default
this.$store = dstore;


var DataStore  = require("../store/state");
var storex = DataStore.default


// ini buat ambil menu pada saat tambah data
const getMasterMenu = async ()=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_DM_KLP_USERS + "listAdd", {
        method: "GET",
        headers: {
        "content-type": "application/json",
        authorization: "kikensbatara " + localStorage.token
        }
      })
        .then(res => res.json())
        .then(res_data => {
          // console.log(res_data)
          resolve(res_data)

    });
  })
}

// ini buat ambil menu pada saat edit data
const postMasterMenu = async (id)=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_DM_KLP_USERS + "listEdit", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          menu_klp_id: id,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          console.log(res_data)
          resolve(res_data)

    });
  })
}

// Ini buat ambil data di sidebar
const postMasterMenuGetSideBar = async (id)=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_DM_KLP_USERS + "listSidebar", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          side_bar : true,
          menu_klp_id: id,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          // console.log(res_data)
          resolve(res_data)

    });
  })
}
const getKlpUsers = async ()=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_DM_KLP_USERS + "list", {
        method: "GET",
        headers: {
        "content-type": "application/json",
        authorization: "kikensbatara " + localStorage.token
        }
      })
        .then(res => res.json())
        .then(res_data => {
          // console.log(res_data)
          resolve(res_data)

    });
  })
}



const getBidangPariwisata = async ()=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_DM_BIDANG_PARIWISATA + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          data: '',
        })
      })
        .then(res => res.json())
        .then(res_data => {
          resolve(res_data)

    });
  })
}


const getKategoriPariwisata = async ()=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_DM_KATEGORI_PARIWISATA + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          data: '',
        })
      })
        .then(res => res.json())
        .then(res_data => {
          resolve(res_data)

    });
  })
}



const getJenisPariwisata = async ()=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_DM_JENIS_PARIWISATA + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          data: '',
        })
      })
        .then(res => res.json())
        .then(res_data => {
          resolve(res_data)

    });
  })
}

const getIndikator = async ()=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_EKO_KUISIONER + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          data: '',
        })
      })
        .then(res => res.json())
        .then(res_data => {
          resolve(res_data)

    });
  })
}

const postDesKel = async (data)=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_DM_DES_KEL + "provinsi", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          data: data,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          resolve(res_data)

    });
  })
}

const postKab = async (data)=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_DM_DES_KEL + "kabupaten", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          data: data,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          resolve(res_data)

    });
  })
}


const postKlpEko = async (data)=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_EKO_KELOMPOK + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          data: data,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          resolve(res_data)

    });
  })
}


const getKuisioner = async ()=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_EKO_INDIKATOR + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          data: '',
        })
      })
        .then(res => res.json())
        .then(res_data => {
          resolve(res_data)

    });
  })
}

const getKuisionerBobot = async ()=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_EKO_KUISIONER_BOBOT + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          data: '',
        })
      })
        .then(res => res.json())
        .then(res_data => {
          resolve(res_data)

    });
  })
}



const postPelakuEko = async (data)=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_EKO_PELAKU + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          data: data,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          resolve(res_data)

    });
  })
}




const postJenisTataKelola = async ()=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_DM_JENIS_TATA_KELOLA + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          data: '',
        })
      })
        .then(res => res.json())
        .then(res_data => {
          resolve(res_data)

    });
  })
}

const getPotensi = async ()=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_EKO_POTENSI + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          data: '',
        })
      })
        .then(res => res.json())
        .then(res_data => {
          resolve(res_data)

    });
  })
}

const getPotensiBobot = async ()=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_EKO_POTENSI_BOBOT + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          data: '',
        })
      })
        .then(res => res.json())
        .then(res_data => {
          resolve(res_data)
          console.log(res_data);

    });
  })
}

const getPotensiBobot1 = async ()=>{
  return new Promise(resolve=>{
    fetch(storex.url.URL_EKO_POTENSI_BOBOT + "list1", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          data: '',
        })
      })
        .then(res => res.json())
        .then(res_data => {
          resolve(res_data)

    });
  })
}


const barChart = store





module.exports = {
    barChart : barChart,
    getMasterMenu : getMasterMenu,
    postMasterMenu : postMasterMenu,
    getKlpUsers : getKlpUsers,
    postMasterMenuGetSideBar : postMasterMenuGetSideBar,
    getBidangPariwisata : getBidangPariwisata,
    getKategoriPariwisata : getKategoriPariwisata,
    getJenisPariwisata : getJenisPariwisata,
    getKuisioner : getKuisioner,
    getIndikator : getIndikator,
    getKuisionerBobot : getKuisionerBobot,
    postJenisTataKelola : postJenisTataKelola,
    getPotensi : getPotensi,
    getPotensiBobot : getPotensiBobot,
    getPotensiBobot1 : getPotensiBobot1,

    postDesKel: postDesKel,
    postKab: postKab,
    postKlpEko : postKlpEko,
    postPelakuEko : postPelakuEko,

}
