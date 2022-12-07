const express = require('express');
// const volleyball = require('volleyball');
const cors = require('cors');
var path = require("path");

require('dotenv').config();



const app = express();

const middleware = require('./auth/middlewares');
const auth = require('./auth');


// app.use(volleyball);

app.use(cors({
  // origin : 'http://localhost:8081'
  origin : '*'
}));
app.use(express.json());

app.use(middleware.checkTokenSeetUser);


app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨Hello Konsel, Anda mengunjugi alamat yg salah... mungkin maksud anda http://konaweselatankab.go.id ! 🌈✨🦄',
    user : req.user
  });
});


app.use('/auth', auth);
app.use('/uploads', express.static(path.join(__dirname, './uploads')))

const checkAuth = require('./apiMysql/coba');
app.use('/checkAuth', middleware.isLoggedIn, checkAuth);

    const check_connections = require('./auth/check_connections');
    app.use('/check_connections', middleware.isLoggedIn, check_connections);

    // ================================== BATAS =====================================================



// ============================================= ADMIN ===========================================

    const menuList = require('./apiMysql/dataMaster/authorization/menuList');
    app.use('/api/v1/menuList', middleware.isLoggedIn, menuList);


    const kelompokUsers = require('./apiMysql/dataMaster/authorization/kelompokUsers');
    app.use('/api/v1/kelompokUsers', middleware.isLoggedIn, kelompokUsers);

    const registrasi = require('./apiMysql/dataMaster/authentication/registrasi');
    app.use('/api/v1/registrasi', middleware.isLoggedIn, registrasi);

    const regis = require('./apiMysql/dataMaster/authentication/registrasi');
    app.use('/api/v1/regis', regis);

    const m_bidangPariwisata = require('./apiMysql/dataMaster/pariwisata/bidangPariwisata');
    app.use('/api/v1/m_bidangPariwisata', middleware.isLoggedIn, m_bidangPariwisata);
    const m_kategoriPariwisata = require('./apiMysql/dataMaster/pariwisata/kategoriPariwisata');
    app.use('/api/v1/m_kategoriPariwisata', middleware.isLoggedIn, m_kategoriPariwisata);
    const m_jenisPariwisata = require('./apiMysql/dataMaster/pariwisata/jenisPariwisata');
    app.use('/api/v1/m_jenisPariwisata', middleware.isLoggedIn, m_jenisPariwisata);
    const m_jenisTataKelola = require('./apiMysql/dataMaster/pariwisata/jenisTataKelola');
    app.use('/api/v1/m_jenisTataKelola', middleware.isLoggedIn, m_jenisTataKelola);

    const m_des_kel = require('./apiMysql/dataMaster/wilayah/des_kel');
    app.use('/api/v1/m_des_kel', middleware.isLoggedIn, m_des_kel);

    const ekokrafObservasi = require('./apiMysql/admin/ekokraf/ekokrafObservasi');
    app.use('/api/v1/ekokrafObservasi', middleware.isLoggedIn, ekokrafObservasi);

    const ekokrafObservasiBobot = require('./apiMysql/admin/ekokraf/ekokrafObservasiBobot');
    app.use('/api/v1/ekokrafObservasiBobot', middleware.isLoggedIn, ekokrafObservasiBobot);

    const ekokrafKelompok = require('./apiMysql/admin/ekokraf/ekokrafKelompok');
    app.use('/api/v1/ekokrafKelompok', middleware.isLoggedIn, ekokrafKelompok);
    const ekokrafAnggota = require('./apiMysql/admin/ekokraf/ekokrafAnggota');
    app.use('/api/v1/ekokrafAnggota', middleware.isLoggedIn, ekokrafAnggota);
    const ekokrafPelaku = require('./apiMysql/admin/ekokraf/ekokrafPelaku');
    app.use('/api/v1/ekokrafPelaku', middleware.isLoggedIn, ekokrafPelaku);
    const ekokrafKuisioner = require('./apiMysql/dataMaster/kuisioner/ekokrafKuisioner');
    app.use('/api/v1/ekokrafKuisioner', middleware.isLoggedIn, ekokrafKuisioner);
    const ekokrafPelakuProduk = require('./apiMysql/admin/ekokraf/ekokrafPelakuProduk');
    app.use('/api/v1/ekokrafPelakuProduk', middleware.isLoggedIn, ekokrafPelakuProduk);
    const ekokrafIndikator = require('./apiMysql/dataMaster/kuisioner/ekokrafIndikator');
    app.use('/api/v1/ekokrafIndikator', middleware.isLoggedIn, ekokrafIndikator);
    const ekokrafKuisionerBobot = require('./apiMysql/dataMaster/kuisioner/ekokrafKuisionerBobot');
    app.use('/api/v1/ekokrafKuisionerBobot', middleware.isLoggedIn, ekokrafKuisionerBobot);

    const ekokrafPotensi = require('./apiMysql/dataMaster/observasi/ekokrafPotensi');
    app.use('/api/v1/ekokrafPotensi', middleware.isLoggedIn, ekokrafPotensi);
    const ekokrafPotensiBobot = require('./apiMysql/dataMaster/observasi/ekokrafPotensiBobot');
    app.use('/api/v1/ekokrafPotensiBobot', middleware.isLoggedIn, ekokrafPotensiBobot);

    const wisataobjek = require('./apiMysql/admin/pariwisata/wisataobjek');
    app.use('/api/v1/wisataobjek', middleware.isLoggedIn, wisataobjek);

    const wisataobjekfasilitas = require('./apiMysql/admin/pariwisata/wisataobjekfasilitas');
    app.use('/api/v1/wisataobjekfasilitas', middleware.isLoggedIn, wisataobjekfasilitas);

    const kegiatan = require('./apiMysql/admin/umum/kegiatan');
    app.use('/api/v1/kegiatan', middleware.isLoggedIn, kegiatan);

    const foto = require('./apiMysql/admin/gallery/foto');
    app.use('/api/v1/foto', middleware.isLoggedIn, foto);

    const video = require('./apiMysql/admin/gallery/video');
    app.use('/api/v1/video', middleware.isLoggedIn, video);

    const contact = require('./apiMysql/admin/profil/contact');
    app.use('/api/v1/contact', middleware.isLoggedIn, contact);

// ============================================= ADMIN ===========================================

   


    // PUBLISH
    const c_wisataobjek = require('./apiMysql/client/pariwisata/wisataobjek');
    app.use('/api/v1/c_wisataobjek', c_wisataobjek);

    const c_wisataobjekfasilitas = require('./apiMysql/client/pariwisata/wisataobjekfasilitas');
    app.use('/api/v1/c_wisataobjekfasilitas', c_wisataobjekfasilitas);

    const c_jenisPariwisata = require('./apiMysql/client/pariwisata/jenisPariwisata');
    app.use('/api/v1/c_jenisPariwisata', c_jenisPariwisata);

    const c_ekokrafPelakuProduk = require('./apiMysql/client/ekokraf/ekokrafPelakuProduk');
    app.use('/api/v1/c_ekokrafPelakuProduk', c_ekokrafPelakuProduk);


    const ekokrafProduk = require('./apiMysql/client/ekokraf/ekokrafProduk');
    app.use('/api/v1/ekokrafProduk', ekokrafProduk);


    const c_foto = require('./apiMysql/client/gallery/foto');
    app.use('/api/v1/c_foto', c_foto);

    const c_video = require('./apiMysql/client/gallery/video');
    app.use('/api/v1/c_video', c_video);

    const c_kegiatan = require('./apiMysql/client/umum/kegiatan');
    app.use('/api/v1/c_kegiatan', c_kegiatan);
    // PUBLISH

    // ================================== BATAS =====================================================

// >>>>>>> d3108e8369f9f0f379270f0f6f53f5b9ef7abde6


function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found data - ' + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5014;
const server = app.listen(port, () => {
  console.log('Listening on port', port);
});