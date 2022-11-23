var URL = 'http://localhost:5014/';

// var URL = 'https://server.visit-konsel.konaweselatankab.go.id/';



const lolow = {
  counter: 'xxxx',

  viax : 'treeeeeet',
  URLX : URL,
    url: {
      URL_APP: URL,
      URL_DASHBOARD : URL + 'api/v1/dashboard/',
      URL_DM_MENU : URL + 'api/v1/menuList/',
      URL_DM_KLP_USERS : URL + 'api/v1/kelompokUsers/',
      URL_DM_REGISTRASI : URL + 'api/v1/registrasi/',

      URL_DM_DES_KEL : URL + 'api/v1/m_des_kel/',

      URL_DM_BIDANG_PARIWISATA : URL + 'api/v1/m_bidangPariwisata/',
      URL_DM_KATEGORI_PARIWISATA : URL + 'api/v1/m_kategoriPariwisata/',
      URL_DM_JENIS_PARIWISATA : URL + 'api/v1/m_jenisPariwisata/',
      URL_DM_JENIS_TATA_KELOLA : URL + 'api/v1/m_jenisTataKelola/',

      URL_EKO_KELOMPOK : URL + 'api/v1/ekokrafKelompok/',
      URL_EKO_ANGGOTA : URL + 'api/v1/ekokrafAnggota/',
      URL_EKO_PELAKU : URL + 'api/v1/ekokrafPelaku/',
      URL_EKO_KUISIONER : URL + 'api/v1/ekokrafKuisioner/',
      URL_EKO_PELAKU_PRODUK : URL + 'api/v1/ekokrafPelakuProduk/',
      URL_EKO_INDIKATOR : URL + 'api/v1/ekokrafIndikator/',
      URL_EKO_KUISIONER_BOBOT : URL + 'api/v1/ekokrafKuisionerBobot/',

      URL_EKO_POTENSI : URL + 'api/v1/ekokrafPotensi/',
      URL_EKO_POTENSI_BOBOT : URL + 'api/v1/ekokrafPotensiBobot/',

      URL_OBSERVASI : URL + 'api/v1/ekokrafObservasi/',

      URL_WISATA_OBJEK : URL + 'api/v1/wisataobjek/',
      URL_WISATA_OBJEK_FASILITAS : URL + 'api/v1/wisataobjekfasilitas/',

      URL_KEGIATAN : URL + 'api/v1/kegiatan/',
      URL_FOTO : URL + 'api/v1/foto/',
      URL_VIDEO : URL + 'api/v1/video/',

      URL_CONTACT : URL + 'api/v1/contact/',
    },

    type : [
      {id : 0, uraian : 'Single Menu'},
      {id : 1, uraian : 'Multy Menu'}
    ],

    list_menu : null,
    aksesMenu : {},

    toolbarOptions : [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [ 'link', 'image', 'video', 'formula' ],          // add's image support
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ]


}



export default lolow



// export default () => (lolow)
