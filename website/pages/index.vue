<template>
  <div>

    <img class="ImgResponsive" src="/img/carousel/banner.png" />




    <div style="background-color:#fafafa" class="bg_repeat">
      <br>
      <div class="text-center">
        <span class="h_pemisah">Produk Terbaru</span>
      </div>
      <v-container>





        <v-row class="paddingContent">
          <v-col  cols="6" md="3" sm="4" xs="6" v-for="data in list_data" :key="data.id" class="pa-2" >
            <div class="white" style="box-shadow: 0.1px 0.1px 3px #bcbcbc;">
              <div>
                <a class="h_nav" @click="detail_produk(data.id)" href="javascript:void(0);">
                  <v-img height="250" :src="$store.state.URLX+'uploads/'+data.file" />
                </a>
              </div>

              <div class="pa-2">
                <div>
                  <a class="judulProduct" @click="detail_produk(data.id)" href="javascript:void(0)">
                    {{data.brand}}
                  </a>
                </div>
                <div style="padding-top:12px">
                  <v-row align="center" class="mx-0">
                    <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"/>
                    <div class="grey--text ml-4 h_stock_list">
                    </div>
                  </v-row>
                </div>

                <div class="my-4 h_price_list">
                    Rp. {{UMUM.formatMoney(data.harga)}} <br>
                    <span class="h_stock_list">Stock : {{data.stock}}</span>
                </div>
              </div>
            </div>
          </v-col>
          <v-col>
            <v-btn block color="pink accent-1" to="/listProduk">
              <span style="color:white">Lihat Semua Produk</span>
            </v-btn>

          </v-col>

        </v-row>

      </v-container>

    </div>



    <div style="background-color:#fafafa" class="">
      <br>
      <div class="text-center">
        <span class="h_pemisah_2">Produk Terlaris</span>
      </div>
      <v-container>





        <v-row class="paddingContent">
          <v-col  cols="6" md="3" sm="4" xs="6" v-for="data in list_produk" :key="data.id" class="pa-2" >
            <div class="white" style="box-shadow: 0.1px 0.1px 3px #bcbcbc;">
              <div>
                <a class="h_nav" @click="detail_produk(data.id)" href="javascript:void(0);">
                  <v-img height="250" :src="$store.state.URLX+'uploads/'+data.file" />
                </a>
              </div>

              <div class="pa-2">
                <div>
                  <a class="judulProduct" href="javascript:void(0)">
                    {{data.brand}}
                  </a>
                </div>
                <div style="padding-top:12px">
                  <v-row align="center" class="mx-0">
                    <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"/>
                    <div class="grey--text ml-4 h_stock_list">
                      4.5 (413)
                    </div>
                  </v-row>
                </div>

                <div class="my-4 h_price_list">
                    Rp.{{UMUM.formatMoney(data.harga)}} <br>
                    <span class="h_stock_list">Stock : {{data.stock}}</span>
                </div>
              </div>
            </div>
          </v-col>


          <v-col>
            <v-btn block color="orange lighten-2">
              <span style="color:white">Tampilkan Berikutnya</span>
            </v-btn>

          </v-col>

        </v-row>

      </v-container>

    </div>








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
    data () {
      return {
        form : {
          id : '',
          m_jenisPariwisata  : '',
          ekokrafPelaku  : '',
          brand : '',
          harga : '',
          stock : '',
          keterangan : '',
          file : '',
        },

        list_data : [],
        list_produk : [],
        UMUM : UMUM,


      }
    },
    methods: {

      getView : function(){
        fetch(this.$store.state.url.URL_PRODUK + "dashboard", {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
                data_ke: 1,
            })
        })
            .then(res => res.json())
            .then(res_data => {
              console.log(res_data);
              this.list_data = res_data;
        });
      },

      produkLaris : function(){
        fetch(this.$store.state.url.URL_PRODUK + "produkLaris", {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
                data_ke: 1,
            })
        })
            .then(res => res.json())
            .then(res_data => {
              console.log(res_data);
              this.list_produk = res_data;
        });
      },

      detail_produk: function (id) {
      this.$router.push("/detailProduk?id=" + id);
    },

    },
    mounted () {
      this.getView();
      this.produkLaris();
    },
  }
</script>