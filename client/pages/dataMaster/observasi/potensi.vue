<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="subBar" style="padding:10px" no-gutters>
          <v-col cols="12" md="4">
            <span class="h_judul">Observasi Potensi</span>
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



        <v-simple-table style="width:100%">
          <template v-slot:default>
            <thead style="background:#5289E7">
              <tr class="h_table_head">
                <th class="text-center" style="width:5%">No</th>
                <th class="text-center" style="width:20%">Indikator</th>
                <th class="text-center" style="width:10%">Bobot</th>
                <th class="text-center" style="width:15%">Tolak Ukur</th>
                <th class="text-center" style="width:10%">Act</th>
              </tr>
            </thead>
            <tbody>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td>
                  {{data.indikator}}
                </td>
                <td>
                  {{data.bobot}}
                </td>
                <td class="text-center">
                  <v-btn :color="UMUM.checkZero(data.jmlPilihan)" small rounded @click="openPilihan(data), mdl_list_tolak_ukur = true">
                    <v-icon left>mdi-file-document-edit</v-icon>
                    {{data.jmlPilihan}}
                  </v-btn>
                </td>
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
                        <v-btn color="red darken-4" fab small v-bind="attrs" v-on="on" @click="removeData(data)">
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
        <v-dialog v-model="mdl_add" persistent max-width="600px">

          <v-card>
            <v-app-bar flat class="bg-primaryku">
              <v-toolbar-title class="title white--text pl-0">
                Tambah Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>
                <br><br>
                <div class="divInput">
                  <small>Indikator</small>
                  <v-text-field v-model="form.indikator" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Bobot</small>
                  <v-text-field type="number" v-model="form.bobot" class="placeholerku" outlined dense required/>
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

                <br><br>

                <div class="divInput">
                  <small>Indikator</small>
                  <v-text-field v-model="form.indikator" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Bobot</small>
                  <v-text-field type="number" v-model="form.bobot" class="placeholerku" outlined dense required/>
                </div>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_edit = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="editData()" >Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== EDIT DATA ============================== -->

      <!-- =========================== VIEW LIST PERTANYAAN ============================== -->
      <!-- transition="none" -->
        <v-dialog v-model="mdl_list_tolak_ukur" persistent max-width="1200px" no-click-animation transition="none">

          <v-card>
            <v-app-bar flat class="bg-blue">
              <v-toolbar-title class="title white--text pl-0">
                Tolak Ukur
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_list_tolak_ukur = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>
                <v-btn color="blue" elevation="2" @click="mdl_add_tolak_ukur= true">
                  <span style="color:white">Tambah Data</span>
                </v-btn> <br> <br>
                <hr class="batasAbu" /> <br>
                <v-simple-table style="width:100%">
          <template v-slot:default>
            <thead style="background:#5289E7">
              <tr class="h_table_head">
                <th class="text-center" style="width:5%">No</th>
                <th class="text-center" style="width:30%">Tolak Ukur</th>
                <th class="text-center" style="width:15%">Nilai</th>
                <th class="text-center" style="width:10%">Act</th>
              </tr>
            </thead>
            <tbody>
              <tr class="h_table_body" v-for="(data, index) in list_tolak_ukur" :key="data.id">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td class="text-left">
                  {{data.tolak_ukur}}
                </td>
                <td class="text-center">
                    {{data.nilai}}
                </td>
                <td class="text-center">
                  <v-btn-toggle mandatory>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="orange darken-1" fab small v-bind="attrs" v-on="on" @click="selectDataPilihan(data), mdl_edit_tolak_ukur = true">
                          <v-icon color="white">mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Ubah Data</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="red darken-4" fab small v-bind="attrs" v-on="on" @click="removeDataPilihan(data)">
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

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_list_tolak_ukur = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== VIEW LIST PERTANYAAN ============================== -->

      <!-- =========================== ADD PERTANYAAN ============================== -->
        <v-dialog v-model="mdl_add_tolak_ukur" persistent max-width="600px" transition="none">

          <v-card>
            <v-app-bar flat class="blue">
              <v-toolbar-title class="title white--text pl-0">
                Tambah Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add_tolak_ukur = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>

                <div class="divInput">
                  <small>Tolak Ukur</small>
                  <v-text-field v-model="pilihan.tolak_ukur" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Nilai</small>
                  <v-text-field type="number" v-model="pilihan.nilai" class="placeholerku" outlined dense required/>
                </div>


            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_add_tolak_ukur = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="addDataPilihan()" >Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== ADD TOLAK UKUR ============================== -->

      <!-- =========================== EDIT TOLAK UKUR ============================== -->
        <v-dialog v-model="mdl_edit_tolak_ukur" persistent max-width="600px" transition="none">

          <v-card>
            <v-app-bar flat class="orange darken-1">
              <v-toolbar-title class="title white--text pl-0">
                Edit Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_edit_tolak_ukur = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>

                <div class="divInput">
                  <small>Tolak Ukur</small>
                  <v-text-field v-model="pilihan.tolak_ukur" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Nilai</small>
                  <v-text-field type="number" v-model="pilihan.nilai" class="placeholerku" outlined dense required/>
                </div>


            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_edit_tolak_ukur = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="editDataPilihan()" >Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== EDIT TOLAK UKUR ============================== -->


    <!-- ++++++++++++++++++++++++++++++++++++++ MODAL ++++++++++++++++++++++++++++++++++++++++++ -->
  </div>
</template>

<script>

  import Quill from 'quill';
  import ImageResize from 'quill-image-resize-module'
  Quill.register('modules/imageResize', ImageResize);

  import UMUM from "../../../library/umum";
  import FETCHING from "../../../library/fetching";

  export default {
    data () {
      return {
        page: 1,

        form : {
          id : '',
          indikator   : '',
          bobot : '',
        },

        pilihan : {
          id : '',
          ekokrafIndikator : '',
          tolak_ukur  : '',
          nilai  : '',
        },

        list_data : [],

        page_first: 1,
        page_last: 0,
        page_limit : 10,
        cari_value: "",

        mdl_add : false,
        mdl_edit : false,

        mdl_list_tolak_ukur : false,
        mdl_add_tolak_ukur : false,
        mdl_edit_tolak_ukur : false,

        list_tolak_ukur : [],


        page_first1: 1,
        page_last1: 0,
        page_limit1 : 8,
        cari_value1: "",

        UMUM : UMUM,
        FETCHING : FETCHING,


      }
    },
    methods: {

      getView : function(){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_EKO_POTENSI + "view", {
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
              console.log(res_data);
              this.list_data = res_data.data;
              console.log(this.list_data);
              this.page_last = res_data.jml_data;
        });
      },


      addData : function() {

        fetch(this.$store.state.url.URL_EKO_POTENSI + "addData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.form)
        }).then(res_data => {
            this.getView();
            this.$store.commit('notifAdd', 'Menambah')
        });
      },

      editData : function(){
        fetch(this.$store.state.url.URL_EKO_POTENSI + "editData", {
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

      removeData : async function(data){

        await UMUM.notifDelete();
        fetch(this.$store.state.url.URL_EKO_POTENSI + "removeData", {
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
        // console.log(data)
          this.form.id = data.id;
          this.form.indikator = data.indikator;
          this.form.bobot = data.bobot;
          


      },

      // ====================================== TOLAK UKUR ====================================
      openPilihan(data){
        this.pilihan.ekokrafIndikator = data.id;
        this.getViewPilihan();
      },
      getViewPilihan : function(){
        fetch(this.$store.state.url.URL_EKO_POTENSI_BOBOT + "view", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                ekokrafIndikator : this.pilihan.ekokrafIndikator,
                data_ke: this.page_first1,
                cari_value: this.cari_value1,
                page_limit : this.page_limit1,
            })
        })
            .then(res => res.json())
            .then(res_data => {
              console.log(res_data)
              this.list_tolak_ukur = res_data.data;
              this.page_last1 = res_data.jml_data;
        });
      },


      addDataPilihan : function() {

        fetch(this.$store.state.url.URL_EKO_POTENSI_BOBOT + "addData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.pilihan)
        }).then(res_data => {
            this.getViewPilihan();
            this.getView();
            this.$store.commit('notifAdd', 'Menambah')
        });
      },

      editDataPilihan : function(){
        // var formData = new FormData();
        // formData.append('id', this.pilihan.id);
        // formData.append('ekokrafIndikator', this.pilihan.ekokrafIndikator);
        // formData.append('tolak_ukur', this.pilihan.tolak_ukur);
        // formData.append('nilai', this.pilihan.nilai);

        fetch(this.$store.state.url.URL_EKO_POTENSI_BOBOT + "editData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.pilihan)
        }).then(res_data => {
            this.getViewPilihan();
            this.getView();
            this.$store.commit('notifAdd', 'Menambah')
        });
      },

      removeDataPilihan : async function(data){

        await UMUM.notifDelete();
        fetch(this.$store.state.url.URL_EKO_POTENSI_BOBOT + "removeData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(data)
        }).then(res_data => {
            this.getViewPilihan();
            this.getView();
            this.$store.commit('notifAdd', 'Menghapus')
        });
      },

      selectDataPilihan : async function(data){
          this.pilihan.id = data.id;
          this.pilihan.ekokrafIndikator = data.ekokrafIndikator;
          this.pilihan.tolak_ukur = data.tolak_ukur;
          this.pilihan.nilai = data.nilai;

      },

      // ====================================== TOLAK UKUR ====================================

      // ====================================== PAGINATE ====================================
        indexing : function(index){
            var idx = ((this.page_first-1)*this.page_limit)+index
            return idx
        },

        cari_data : function(){
            this.page_first = 1;
            this.getData();
        },


      // ====================================== PAGINATE ====================================

    },
    mounted () {
      this.getView();
    },
  }
</script>

<style>
</style>
