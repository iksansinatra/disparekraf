<template>
  <div>
    <v-container>
      <v-row class="paddingContent">
        <v-col md="5" class="pa-2">
          <v-carousel :show-arrows="true">
            <v-carousel-item
              class="ImgResponsive"
              :src="$store.state.URLX+'uploads/'+form.file"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col md="7" class="pa-2">
          <div style="padding: 10px 0px 10px 10px" class="pink lighten-5">
            <span class="h_detilNamaProduk">{{form.brand}}</span>
          </div>

          <v-row align="center" class="mx-0" style="padding-top:3%">
            <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"/>
            <div class="grey--text ml-4 h_stock_list">
              4.5 (413)
            </div>
          </v-row>
          <br>
          <hr class="hrku">

          <div class="h_detilHargaProduk">Rp. {{UMUM.formatMoney(form.harga)}}</div>
          <div class="h_detilStockProduk">Stock : {{form.stock}}</div>

          <hr class="hrku">
          <br>

          <div style="display: table;">

            <div align-center style="float: left; padding-top:5px">
              <!-- <v-btn outlined color="indigo" style="height:40px">V</v-btn> -->
              <span align-center class="h_detilKuantitas">Kuantitas : </span>
            </div>
            <div style="float: left; padding-left:10px">
              <v-text-field class="centered-input" style="height:30px; width:60px;" outlined dense/>

              <!-- <div style="padding-top:10px">
                <span class="h_detilSubKuantitas">Min. pembelian 1 pcs</span>
              </div> -->
              <br>
            </div>
            <div style="float: left;">
              <!-- <v-btn outlined color="indigo" style="height:40px">V</v-btn> -->
            </div>

          </div>

          <hr class="hrku">


          <div>
            <a href="javascript:void(0)" class="h_detilLokasi">
              <!-- <v-icon style="font-size:22px">mdi-map-marker</v-icon> -->
              <span>{{form.keterangan}}</span>
            </a>

            <a href="javascript:void(0)" class="h_detilKurir">
              <div style="margin-top:5px">
                <div style="float: left;">
                  <v-icon style="font-size:22px">mdi-account-badge</v-icon>
                  <span>{{form.ekokrafpelaku_pelaku}}</span>
                </div>
                <!-- <div style="float: left; padding-left :2%">
                  <img style="height:24px; margin-top:-5px" src="img/icon.png" alt="">
                </div>
                <div style="float: left; padding-left :5px">
                  Vuuvy Kurir
                </div> -->
                </div>

            </a>

          </div>
          <br>
          <hr class="hrku">

          <div style="padding-top:5%">
            <v-row>
              <v-col cols="12" md="6" sm="12" class="pa-1" style="padding-right:5% !important">
                <v-btn color="orange darken-3" block class="ma-2 white--text" outlined>
                  <v-icon left style="font-size:28px">mdi-cart-arrow-down</v-icon>
                  <span style="font-size:12px">Tambah ke Keranjang</span>
                </v-btn>
              </v-col>
              <v-col cols="12" md="6" sm="12" class="pa-1" style="padding-right:5% !important">
                <v-btn color="pink lighten-2 " block class="ma-2 white--text" outlined>
                  <v-icon left style="font-size:28px">mdi-cash-check</v-icon>
                  <span style="font-size:12px">Transaksi Sekarang</span>
                </v-btn>
              </v-col>
            </v-row>

          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import UMUM from "../library/umum";

export default {
  components: {
    Logo,
    VuetifyLogo,
    // agile: VueAgile
  },
  data() {
    return {
      myData: '',

      id : this.$route.query.id,

      form : {
          id : '',
          m_jenisPariwisata  : '',
          ekokrafPelaku  : '',
          brand : '',
          harga : '',
          stock : '',
          keterangan : '',
          file : '',

          ekokrafpelaku_pelaku : '',
        },

        UMUM : UMUM,

    }
  },

  methods: {
    getView: function() {
              this.cek_load_data = true;
              fetch(this.$store.state.url.URL_PRODUK + "detailProduk", {
                  method: "POST",
                  headers: {
                  "content-type": "application/json",
                  },
                  body: JSON.stringify({
                      id: this.$route.query.id,
                  })
              })
                  .then(res => res.json())
                  .then(res_data => {
                  var produk = res_data[0];
                  this.form.m_jenisPariwisata = produk.m_jenisPariwisata;
                  this.form.ekokrafPelaku = produk.ekokrafPelaku;
                  this.form.brand = produk.brand;
                  this.form.harga = produk.harga;
                  this.form.stock = produk.stock;
                  this.form.keterangan = produk.keterangan;
                  this.form.file = produk.file;
                  this.form.ekokrafpelaku_pelaku = produk.ekokrafpelaku_pelaku;    

                  // this.myData = produk.judul;
                  this.getAsyncData();
              });
          },

          getAsyncData: function () {
            var self = this;
            var keterangan = this.form.brand;
            window.setTimeout(function () {
              self.myData = keterangan
              self.$emit('updateHead')
            }, 3000)
          },
    
  },
  mounted () {
    this.getView();






  },
}
</script>
