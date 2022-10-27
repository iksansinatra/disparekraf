<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="subBar" style="padding:10px" no-gutters>
          <v-col cols="12" md="4">
            <span class="h_judul">Produk Ekokraf</span>
            <br />
            <span class="h_Sub_judul">Ekonomi Kreatif</span>
          </v-col>

          <v-col cols="12" md="4" style="padding-right:2%">
            <!-- <v-text-field class="placeholerku" prepend-inner-icon="mdi-magnify" dense solo clear-icon="mdi-close-circle" clearable placeholder="Cari Data" type="text"></v-text-field> -->
          </v-col>

          <v-col cols="12" md="4" style="padding-right:20px">
            <v-row no-gutters>
              <v-col cols="10">
                <v-text-field class="placeholerku" prepend-inner-icon="mdi-magnify" dense solo clear-icon="mdi-close-circle" v-model="cari_value" @input="getView()" clearable placeholder="Cari Data" type="text"></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn tile height="37.5px" elevation="2" color="primary" v-bind="attrs" v-on="on" @click="mdl_add = true">
                      <v-icon color="white">mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <span>Tambah Data</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>

      <!-- <hr class="batasPrimary" /> -->

      <div>


        <br>

        <hr class="batasAbu" />
        <br>



        <v-row>

            <v-col cols="12" md="4" v-for="data in list_data" :key="data.id">
              <v-card class="mediaCard" color="#3DBEFF" dark>
                <v-row>
                  <v-col cols="12" md="8">
                    <span class="mediaTitle">{{data.brand}}</span> <br>
                    <div style="line-height: 90%; text-align: justify;">
                      <span class="mediaSubTitle text-justify two_line">{{UMUM.replaceEscapeString(data.keterangan)}}</span>
                      <br>
                      <span>Rp.{{UMUM.formatMoney(data.harga)}}</span>
                    </div>
                    <v-chip style="margin-top:12px; margin-left:-2px" small color="primary">
                      <v-icon left style="font-size:16px">mdi-account</v-icon>
                      {{data.ekokrafpelaku_pelaku}}
                    </v-chip>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-img :src="$store.state.URLX+'uploads/'+data.file"></v-img>
                  </v-col>
                </v-row>
                <br>
                      <v-btn outlined rounded small @click="selectData(data), mdl_lihat_produk=true">Lihat</v-btn>
                      <v-btn outlined rounded small @click="selectData(data), mdl_edit_produk=true">Edit</v-btn>
                      <v-btn outlined rounded small @click="selectData(data)">Hapus</v-btn>
              </v-card>
            </v-col>




          </v-row>
      </div>

      <br />
      <hr class="batasAbu" />

      <div class="text-center">
        <v-container>
          <v-row justify="center">
            <v-col cols="12">
              <v-container class="max-width">
                <v-pagination
                  v-model="page_first"
                  class="my-4"
                  :length="page_last"
                  :total-visible="7"
                  @input="getView()"
                  color="light-blue"
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-container>

    <!-- ++++++++++++++++++++++++++++++++++++++ MODAL ++++++++++++++++++++++++++++++++++++++++++ -->

      <!-- =========================== ADD DATA ============================== -->
        <v-dialog v-model="mdl_add" persistent max-width="600px">

          <v-card>
            <v-app-bar flat class="bg-primaryku">
              <v-toolbar-title class="title white--text pl-0">
                Messages
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br> <br>
                <div class="divInput">
                  <small>Jenis Pariwisata</small>
                  <v-autocomplete
                    v-model="form.m_jenisPariwisata"
                    :items="list_jenis"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    outlined
                    clearable
                    dense
                  />
                </div>

                <div class="divInput">
                  <small>Pelaku</small>
                  <v-autocomplete
                    v-model="form.ekokrafPelaku"
                    :items="list_pelaku"
                    :search-input.sync ="searchPelakuEko"
                    @keyup="eventPelakuEko()"
                    :item-text="'pelaku'"
                    :item-value="'id'"
                    outlined
                    clearable
                    dense
                  >
                    <template v-slot:item="data">
                        <div style="margin-top:5px; margin-bottom:5px">
                          <span style="">{{ data.item.pelaku }}</span> <br>
                          <span class="h_subtitle">{{ data.item.email }}</span> <br>
                        </div>
                    </template>

                  </v-autocomplete>
                </div>


                <div class="divInput">
                  <small>Brand</small>
                  <v-text-field v-model="form.brand" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Harga</small>
                  <v-text-field type="number" v-model="form.harga" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Stock</small>
                  <v-text-field type="number" v-model="form.stock" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Keterangan</small>
                  <v-textarea v-model="form.keterangan" outlined name="input-7-4"></v-textarea>
                </div>


                <div class="divInput">
                  <small>Foto</small>
                  <v-file-input v-model="form.file" truncate-length="15" outlined dense ></v-file-input>
                </div>


            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_add = false">Close</v-btn>
              <v-btn color="blue darken-1" @click="addData()" text >Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== ADD DATA ============================== -->

      <!-- =========================== EDIT DATA ============================== -->
        <v-dialog v-model="mdl_edit" persistent max-width="600px">

          <v-card>
            <v-app-bar flat class="orange darken-1">
              <v-toolbar-title class="title white--text pl-0">
                Edit Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_edit = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_edit = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="editData()" >Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== EDIT DATA ============================== -->

      <!-- =========================== LIHAT PRODUK ============================== -->
        <v-dialog v-model="mdl_lihat_produk" persistent max-width="600px" transition="none">

          <v-card>
            <v-app-bar flat class="light-blue accent-4">
              <v-toolbar-title class="title white--text pl-0">
                Edit Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_lihat_produk = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>
                <img style="width:100%; height:auto" :src="$store.state.URLX+'uploads/'+fileOld"/>
                <hr class="batasAbu" /> <br>

                <span class="h_judulProduk">{{form.brand}}</span> <br>

                <div style="padding-top:14px">{{form.keterangan}}</div>
                <hr class="batasAbu2">
                <div style="padding-top:8px">
                  <span>Harga : </span> <span class="h_hargaProduk">{{UMUM.formatMoney(form.harga)}}</span> <br>
                  <span>Stock : </span> <span class="h_hargaProduk">{{form.stock}}</span> <br>
                </div>
                <hr class="batasAbu1">
                <div style="padding-top:12px">
                  <v-chip small outlined color="light-green">
                    <v-icon left style="font-size:16px">mdi-account</v-icon>
                    {{form.ekokrafpelaku_pelaku}}
                  </v-chip>

                  <v-chip small outlined color="red lighten-2">
                    <v-icon left style="font-size:16px">mdi-phone</v-icon>
                   {{form.ekokrafpelaku_hp}}
                  </v-chip>

                  <v-chip small outlined color="blue lighten-2">
                    <v-icon left style="font-size:16px">mdi-email</v-icon>
                    {{form.ekokrafpelaku_email}}
                  </v-chip>
                </div>
                <br>
                <hr class="batasAbu2">
                <br>
                <v-chip small>Kat : {{form.m_jenispariwisata_uraian}}</v-chip>
                <br><br>
                <hr class="batasAbu" />
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_lihat_produk = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== LIHAT PRODUK ============================== -->


    <!-- ++++++++++++++++++++++++++++++++++++++ MODAL ++++++++++++++++++++++++++++++++++++++++++ -->
  </div>
</template>

<script>

  import UMUM from "../../library/umum";
  import FETCHING from "../../library/fetching";

  export default {
    data () {
      return {
        page: 1,

        form : {
          id : '',
          m_jenisPariwisata  : '',
          ekokrafPelaku  : '',
          brand : '',
          harga : '',
          stock : '',
          keterangan : '',
          file : null,

          m_jenispariwisata_uraian : '',
          ekokrafpelaku_pelaku : '',
          ekokrafpelaku_badan_usaha : '',
          ekokrafpelaku_alamat : '',
          ekokrafpelaku_email : '',
          ekokrafpelaku_hp : '',
        },

        list_data : [],
        list_jenis : [],
        list_pelaku : [],
        searchPelakuEko : '',

        page_first: 1,
        page_last: 0,
        page_limit : 6,
        cari_value: "",


        mdl_add : false,
        mdl_edit : false,
        mdl_lihat_produk : false,

        UMUM : UMUM,
        FETCHING : FETCHING,

        fileOld : '',


      }
    },
    methods: {

      getView : function(){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_EKO_PELAKU_PRODUK + "view", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                data_ke: this.page_first,
                cari_value: this.cari_value,
                page_limit : this.page_limit,
            })
        })
            .then(res => res.json())
            .then(res_data => {
              console.log(res_data)
              this.list_data = res_data.data;
              this.page_last = res_data.jml_data;
        });
      },


      addData : function(number) {
        // this.form.createdAt = UMUM.NOW()
        var formData = new FormData();
        formData.append('m_jenisPariwisata', this.form.m_jenisPariwisata);
        formData.append('ekokrafPelaku', this.form.ekokrafPelaku);
        formData.append('brand', this.form.brand);
        formData.append('harga', this.form.harga);
        formData.append('stock', this.form.stock);
        formData.append('keterangan', this.form.keterangan);
        formData.append('file', this.form.file);

        fetch(this.$store.state.url.URL_EKO_PELAKU_PRODUK + "addData", {
            method: "POST",
            headers: {
              authorization: "kikensbatara " + localStorage.token
            },
            body: formData
        }).then(res_data => {

            this.getView();
            this.$store.commit('notifAdd', 'Menambah')
        });


      },

      editData : function(){
          var formData = new FormData();
          formData.append('id', this.form.id);
          formData.append('m_jenisPariwisata', this.form.m_jenisPariwisata);
          formData.append('ekokrafPelaku', this.form.ekokrafPelaku);
          formData.append('brand', this.form.brand);
          formData.append('harga', this.form.harga);
          formData.append('stock', this.form.stock);
          formData.append('keterangan', this.form.keterangan);
          formData.append('file', this.form.file);
          formData.append('fileOld', this.fileOld);

          fetch(this.$store.state.url.URL_EKO_PELAKU_PRODUK + "addData", {
              method: "POST",
              headers: {
                authorization: "kikensbatara " + localStorage.token
              },
              body: formData
          }).then(res_data => {
              this.getViewProduk();
              this.getView();
              this.$store.commit('notifAdd', 'Menambah')
          });
      },

      removeData : async function(data){

        await UMUM.notifDelete();
        fetch(this.$store.state.url.URL_EKO_PELAKU_PRODUK + "removeData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(data)
        }).then(res_data => {
            this.getView();
            this.mdl_remove = false;
            this.$store.commit('notifAdd', 'Menghapus')
        });

      },

      selectData : async function(data){
          this.form.id = data.id;
          this.form.m_jenisPariwisata = data.m_jenisPariwisata;
          this.form.ekokrafPelaku = data.ekokrafPelaku;
          this.form.brand = data.brand;
          this.form.harga = data.harga;
          this.form.stock = data.stock;
          this.form.keterangan = UMUM.replaceEscapeString(data.keterangan);
          this.fileOld = data.file;

          this.form.m_jenispariwisata_uraian = data.m_jenispariwisata_uraian;
          this.form.ekokrafpelaku_pelaku = data.ekokrafpelaku_pelaku;
          this.form.ekokrafpelaku_badan_usaha = data.ekokrafpelaku_badan_usaha;
          this.form.ekokrafpelaku_alamat = data.ekokrafpelaku_alamat;
          this.form.ekokrafpelaku_email = data.ekokrafpelaku_email;
          this.form.ekokrafpelaku_hp = data.ekokrafpelaku_hp;

      },

      // ====================================== PAGINATE ====================================
        indexing : function(index){
            var idx = ((this.page_first-1)*this.page_limit)+index
            return idx
        },

        cari_data : function(){
            this.page_first = 1;
            this.getData();
        },

        fetching : async function(){
          this.list_jenis = await FETCHING.getJenisPariwisata();
          this.list_pelaku =  await FETCHING.postPelakuEko();
          // console.log(this.list_pelaku)
        },

        eventPelakuEko : async function(){
          this.list_pelaku =  await FETCHING.postPelakuEko(this.searchPelakuEko);
        },


      // ====================================== PAGINATE ====================================

    },
    mounted () {
      this.fetching();
      this.getView();
    },
  }
</script>

<style>
</style>
