<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="subBar" style="padding:10px" no-gutters>
          <v-col cols="12" md="4">
            <span class="h_judul">Form Ekosistem</span>
            <br />
            <span class="h_Sub_judul">Ekonomi Kreatif</span>
          </v-col>

          <v-col cols="12" md="4" style="padding-right:2%">

                
          </v-col>


          <v-col  cols="12" md="4" style="padding-right:20px">
            <v-row no-gutters>
              <v-col cols="10">
                <v-autocomplete 
                    v-model="ekokrafKuisioner"
                    :items="list_kuisioner"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    label="Pilih Jenis Indikator"
                    outlined
                    dense
                    @change="getView()"
                  >
                  </v-autocomplete>
              </v-col>
              <v-col cols="1">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn tile height="37.5px" elevation="2" color="primary" v-bind="attrs" v-on="on" @click="mdl_tolak_ukur = true, tolak_ukur(ekokrafKuisioner)">
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
                <th class="text-center" style="width:5%">Indikator</th>
                <th class="text-center" style="width:5%">Tolak Ukur</th>
                
                <th class="text-center" style="width:10%">Act</th>
              </tr>
            </thead>
            <tbody>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td class="text-center">{{data.nama_indikator}}</td>
                <td class="text-center">{{data.nama_tolak_ukur}}</td>
                
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
                        <v-btn color="red darken-4" fab small v-bind="attrs" v-on="on" @click="removeData(data.id_ekosistem)">
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

      <!-- =========================== TOLAK UKUR DATA ============================== -->
      <v-dialog v-model="mdl_tolak_ukur" persistent max-width="500px">

            <v-card>
              <v-app-bar flat class="bg-warning">
                <v-toolbar-title class="title white--text pl-0">
                  Tambah Tolak Ukur
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="white" icon  @click="mdl_tolak_ukur = false, close()">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
              <v-card-text>

                  <br><br>
                  <div class="divInput">
                      <small>Jenis Tolak Ukur</small>
                    <v-autocomplete
                      v-model="ekokraftolakukur"
                      :items="list_tolak_ukur"
                      :item-text="'uraian'"
                      :item-value="'id'"
                      outlined
                      dense
                      
                    >
                    </v-autocomplete>
                  </div>

                 


              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click=" mdl_tolak_ukur = false, close()">Close</v-btn>
                <v-btn color="blue darken-1" @click="mdl_bobot=true, bobot(ekokraftolakukur)" text >Cek Bobot</v-btn>
              </v-card-actions>
            </v-card>
      </v-dialog>
<!-- =========================== TOLAK UKUR DATA ============================== -->

<!-- =========================== BOBOT DATA ============================== -->
<v-dialog v-model="mdl_bobot" persistent max-width="400px">

<v-card>
  <v-app-bar flat class="bg-red">
    <v-toolbar-title class="title white--text pl-0">
      Tambah Bobot 
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="white" icon  @click="mdl_bobot = false, close()">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-app-bar>
  <v-card-text>

      <br><br>
      <div class="divInput">
          <small>Jenis Bobot</small>
        <v-autocomplete
          v-model="ekokrafbobot"
          :items="list_tes_bobot"
          :item-text="'pertanyaan'"
          :item-value="'id'"
          outlined
          dense
          
        >
        </v-autocomplete>
      </div>

     


  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="red darken-1" text @click=" mdl_bobot = false, close()">Close</v-btn>
    <v-btn color="blue darken-1" @click="addData(), mdl_bobot = false, close()" text >Simpan</v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
<!-- =========================== BOBOT DATA ============================== -->

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
                    v-model="form.id_bobot"
                    :items="list_tes_bobot"
                    :item-text="'pertanyaan'"
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
          uniq : '',
          id_kuisioner: '',
          id_bobot: '',
          createdBy: ''

        },

        list_data : [],
        list_kuisioner : [],
        list_indikator : [],
        list_jenis : [],
        list_bobot : [],
        list_tolak_ukur : [],
        list_tes_bobot: [],
        list_pelaku: [],


        ekokrafKuisioner: '',
        ekokraftolakukur: '',
        ekokrafbobot: '',
        ekokrafPelaku: '',


        page_first: 1,
        page_last: 0,
        page_limit : 8,
        cari_value: "",

        mdl_add : false,
        mdl_edit : false,
        mdl_tolak_ukur: false,
        mdl_bobot: false,

        UMUM : UMUM,
        FETCHING : FETCHING,


      }
    },
    methods: {

      getView : function(){
        // this.$store.commit("shoWLoading");


        fetch(this.$store.state.url.URL_EKO_EKOSISTEM + "view", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                createdBy: this.createdBy,
                data_ke: this.page_first,
                id_indikator: this.ekokrafKuisioner,
                page_limit : this.page_limit,
            })
        })
            .then(res => res.json())
            .then(res_data => {
              this.list_data = res_data.data;
              this.page_last = res_data.jml_data;

        });
      },

      getPelakuId : function(){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_EKO_EKOSISTEM + "getID", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
        })
            .then(res => res.json())
            .then(res_data => {
              this.ekokrafPelaku = res_data.data[0].id;
              
        });
      },

      tolak_ukur : function(id){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_EKO_EKOSISTEM + "cek_tolak_ukur", {
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
              this.list_tolak_ukur = res_data.data;
        });
      },

      bobot : function(id){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_EKO_EKOSISTEM + "cek_bobot", {
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
              this.list_tes_bobot = res_data.data;
        });
      },

      addData : function() {
        fetch(this.$store.state.url.URL_EKO_EKOSISTEM + "addData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
              id_indikator: this.ekokrafKuisioner,
              id_kuisioner: this.ekokraftolakukur,
              id_bobot: this.ekokrafbobot,
              id_pelakuEkoraf : this.ekokrafPelaku,
            })
        }).then(res_data => {
            this.getView();
            this.$store.commit('notifAdd', 'Menambah')
        });
      },

      editData : function(){

        fetch(this.$store.state.url.URL_EKO_EKOSISTEM + "editData", {
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

      removeData : async function(id){


        await UMUM.notifDelete();
        fetch(this.$store.state.url.URL_EKO_EKOSISTEM + "removeData", {
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

          this.form.id = data.id_ekosistem;
          this.form.id_kuisioner = data.id_kuisioner;

          this.bobot(data.id_kuisioner);


          this.list_jenis = await FETCHING.getJenisPariwisata()
          this.list_kuisioner = await FETCHING.getKuisioner()
          this.list_indikator = await FETCHING.getIndikator()
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
          this.list_jenis = await FETCHING.getJenisPariwisata()
          this.list_kuisioner = await FETCHING.getKuisioner()
          // this.list_indikator = await FETCHING.getIndikator()
          this.list_bobot = await FETCHING.getKuisionerBobot()
        },

        close : async function(){
          this.fetching();

        }


      // ====================================== PAGINATE ====================================

    },
    mounted () {
      this.fetching();
      this.getView();
      this.getPelakuId();
    },
  }
</script>

<style>
</style>
