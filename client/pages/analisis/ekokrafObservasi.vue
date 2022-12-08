<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="subBar" style="padding:10px" no-gutters>
          <v-col cols="12" md="5">
            <span class="h_judul">Observasi Potensi</span>
            <br />
            <span class="h_Sub_judul">Ekonomi Kreatif</span>
          </v-col>

          <v-col cols="12" md="3" style="padding-right:2%">

                <v-autocomplete
                    v-model="kabupaten_id"
                    :items="list_kab"
                    :search-input.sync ="searchKab"
                    @keyup="eventKab()"
                    :item-text="'nama_kabupaten'"
                    :item-value="'kabupaten_id'"
                    label="Pilih Kabupaten"
                    outlined
                    dense
                    @change="getView()"
                  >
                     <template v-slot:item="data">
                        <div style="margin-top:5px; margin-bottom:5px">
                          <span style="">{{ data.item.nama_kabupaten }}</span> <br>
                        </div>
                    </template>

                  </v-autocomplete>
          </v-col>

          <v-col cols="12" md="4" style="padding-right:20px">
            <v-row no-gutters>
              <v-col cols="10">
                
                    
                  <v-autocomplete
                    v-model="ekokrafJenis"
                    :items="list_jenis"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    label="Pilih Jenis Ekokraf"
                    outlined
                    dense
                    @change="getView()"
                  >
                  </v-autocomplete>
               
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



        <v-simple-table style="width:100%">
          <template v-slot:default>
            <thead style="background:#5289E7">
              <tr class="h_table_head">
                <th class="text-center" style="width:5%">No</th>
                <th class="text-center" style="width:20%">Indikator</th>
                <th class="text-center" style="width:20%">Tolak Ukur</th>
                <th class="text-center" style="width:10%">Act</th>
              </tr>
            </thead>
            <tbody>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td class="text-center">{{data.indikator}}</td>
                <td class="text-center">{{data.tolak_ukur}} ({{data.nilai}})</td>
                <td class="text-center">
                  <v-btn-toggle mandatory>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="orange darken-1" fab small v-bind="attrs" v-on="on" @click="selectData(data), mdl_edit = true">
                          <v-icon color="white">mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Ubah Data</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="red darken-4" fab small v-bind="attrs" v-on="on" @click="removeData(data.id_observasi)">
                          <v-icon color="white">mdi-delete</v-icon>
                        </v-btn>
                      </template>
                      <span>Hapus Data</span>
                    </v-tooltip>
                  </v-btn-toggle>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
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
        <v-dialog v-model="mdl_add" persistent max-width="500px">

          <v-card>
            <v-app-bar flat class="bg-primaryku">
              <v-toolbar-title class="title white--text pl-0">
                Tambah Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add = false, close()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>
                <div class="divInput">
                    <small>Indikator</small>
                    <v-autocomplete
                    v-model="ekokrafIndikator"
                    :items="list_indikator"
                    :item-text="'indikator'"
                    :item-value="'id'"
                    outlined
                    dense
                  >
                  </v-autocomplete>
                </div>


            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_add = false, close()">Close</v-btn>
              <v-btn color="blue darken-1" @click="mdl_potensi = true, potensi(ekokrafIndikator)" text >Cek Tolak Ukur</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== ADD DATA ============================== -->

      <!-- =========================== ADD DATA ============================== -->
        <v-dialog v-model="mdl_potensi" persistent max-width="400px">

          <v-card>
            <v-app-bar flat class="bg-primaryku">
              <v-toolbar-title class="title white--text pl-0">
                Tambah Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_potensi = false, close()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>
                <div class="divInput">
                    <small>Tolak Ukur</small>
                    <v-autocomplete
                    v-model="ekokrafPotensi"
                    :items="list_potensi"
                    :item-text="'tolak_ukur'"
                    :item-value="'id'"
                    outlined
                    dense
                  >
                  </v-autocomplete>
                </div>


            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_potensi = false, close()">Close</v-btn>
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
              <v-btn color="white" icon  @click="mdl_edit = false, close()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>
                <div class="divInput">
                    <small>Jenis Bobot</small>
                  <v-autocomplete
                    v-model="form.ekokrafPotensi"
                    :items="list_potensi"
                    :item-text="'tolak_ukur'"
                    :item-value="'id'"
                    outlined
                    dense
                  >
                  </v-autocomplete>
                </div>
                


            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_edit = false, close()">Close</v-btn>
              <v-btn color="blue darken-1" @click="editData()" text >Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== EDIT DATA ============================== -->


    <!-- ++++++++++++++++++++++++++++++++++++++ MODAL ++++++++++++++++++++++++++++++++++++++++++ -->
  </div>
</template>

<script>

  import Quill from 'quill';
  import ImageResize from 'quill-image-resize-module'
  Quill.register('modules/imageResize', ImageResize);

  import UMUM from "../../library/umum";
  import FETCHING from "../../library/fetching";

  export default {
    data () {
      return {
        page: 1,

        form : {
          id : '',
          id_indikator : '',
          id_potensi : '',
        },

        searchKab : '',
        searchKabEdit : '',

        kabupaten_id : '',
        ekokrafJenis : '',
        ekokrafIndikator : '',
        ekokrafPotensi : '',

        list_data : [],
        list_kab : [],
        list_indikator : [],
        list_potensi : [],
        list_jenis : [],

        page_first: 1,
        page_last: 0,
        page_limit : 8,
        cari_value: "",

        mdl_add : false,
        mdl_potensi : false,
        mdl_edit : false,

        UMUM : UMUM,
        FETCHING : FETCHING,


      }
    },
    methods: {

      getView : function(){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_EKO_OBSERVASI_POTENSI + "view", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                data_ke: this.page_first,
                kabupaten_id: this.kabupaten_id,
                ekokrafJenis: this.ekokrafJenis,
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

      potensi : function(id){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_EKO_POTENSI + "potensi", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                id: id,
                
            })
        })
            .then(res => res.json())
            .then(res_data => {
              this.list_potensi = res_data.data;
        });
      },

      addData : function() {
        fetch(this.$store.state.url.URL_EKO_OBSERVASI_POTENSI + "addData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
              kabupaten_id: this.kabupaten_id,
              ekokrafJenis: this.ekokrafJenis,
              ekokrafIndikator: this.ekokrafIndikator,
              ekokrafPotensi : this.ekokrafPotensi,
            })
        }).then(res_data => {
            this.getView();
            this.$store.commit('notifAdd', 'Menambah')
        });
      },

      editData : function(){

        fetch(this.$store.state.url.URL_EKO_OBSERVASI_POTENSI + "editData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.form)
        }).then(res_data => {

            this.getView();
            this.$store.commit('notifAdd', 'Mengubah')
        });
      },

      getPotensiBobot1 : function(id){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_EKO_POTENSI_BOBOT + "list1", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                data : id
            })
        })
            .then(res => res.json())
            .then(res_data => {

              this.list_potensi = res_data;
              var tes = [];
              tes = res_data;
              console.log("tes ", tes);
              
              return res_data;

        });
      },

      // indikator : function(id){
      //   // this.$store.commit("shoWLoading");
      //   fetch(this.$store.state.url.URL_EKO_OBSERVASI + "indikator", {
      //       method: "POST",
      //       headers: {
      //         "content-type": "application/json",
      //         authorization: "kikensbatara " + localStorage.token
      //       },
      //       body: JSON.stringify({
      //           id: id,
                
      //       })
      //   })
      //       .then(res => res.json())
      //       .then(res_data => {
      //         this.list_indikator = res_data.data;
      //   });
      // },

      removeData : async function(id){


        await UMUM.notifDelete();
        fetch(this.$store.state.url.URL_EKO_OBSERVASI_POTENSI + "removeData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
              id: id
            })
        }).then(res_data => {
            this.getView();
            this.mdl_remove = false;
            this.$store.commit('notifAdd', 'Menghapus')
        });
      },

      selectData : async function(data){
        // console.log(data)
          this.form.id = data.id_observasi;
          this.form.id_indikator = data.id_indikator;
          this.potensi(data.id_indikator)

          this.searchKabEdit = data.nama_kabupaten;
          this.list_kab =  await FETCHING.postKab(this.searchKabEdit);
          this.list_jenis = await FETCHING.getJenisPariwisata();
          this.list_indikator = await FETCHING.getPotensi()
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
          this.list_kab =  await FETCHING.postKab();
          this.list_jenis = await FETCHING.getJenisPariwisata();
          this.list_indikator = await FETCHING.getPotensi()
          // this.list_potensi = await FETCHING.getPotensiBobot1()
          // console.log(this.list_indikator);
        },

        eventKab : async function(){
          this.list_kab =  await FETCHING.postKab(this.searchKab);
        },

        eventKabEdit : async function(){
          this.list_kab =  await FETCHING.postKab(this.searchKabEdit);
        },

        close : async function(){
          this.fetching();
          this.searchKab = '';

        }


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
