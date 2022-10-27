<template>
  <div>
    <v-container>
      <v-row class="paddingContent">
        <v-col cols="6" md="3" sm="4" xs="6" v-for="data in list_data" :key="data.id" class="pa-2">
          <div class="white" style="box-shadow: 0.1px 0.1px 3px #bcbcbc;">
            <div>
              <a class="h_nav"  @click="detail_produk(data.id)" href="javascript:void(0)">
                <v-img height="250" :src="$store.state.URLX+'uploads/'+data.file" />
              </a>
            </div>

            <div class="pa-2">
              <div>
                <a class="judulProduct" @click="detail_produk(data.id)" href="javascript:void(0)">{{data.brand}}</a>
              </div>
              <!-- <div style="padding-top:12px">
                <v-row align="center" class="mx-0">
                  <v-rating :value="4.5" color="amber" dense half-increments readonly size="14" />
                  <div class="grey--text ml-4 h_stock_list">4.5 (413)</div>
                </v-row>
              </div> -->

              <div class="my-4 h_price_list">
                Rp. {{UMUM.formatMoney(data.harga)}}
                <br />
                <span class="h_stock_list">Stock : {{data.stock}}</span>
              </div>
            </div>
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
        page_first: 1,
        page_last: 0,
        cari_value: "",
        UMUM : UMUM,


      }
    },
    methods: {

      getView : function(){
        fetch(this.$store.state.url.URL_PRODUK + "listProduk", {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
                data_ke: this.page_first,
                cari_value: this.cari_value
            })
        })
            .then(res => res.json())
            .then(res_data => {
              console.log(res_data);
              this.list_data = res_data.data;
              this.page_last = res_data.jml_data;
        });
      },

      detail_produk: function (id) {
      this.$router.push("/detailProduk?id=" + id);
    },

    },
    mounted () {
      this.getView();
    },
  }
</script>
