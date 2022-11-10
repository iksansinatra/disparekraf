<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="subBar" style="padding:10px" no-gutters>
          <v-col cols="12" md="4">
            <span class="h_judul">Kuisioner</span>
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
                    <v-btn tile height="37.5px" elevation="2" color="primary" v-bind="attrs" v-on="on" @click="mdl_add = true, Quilll('editor')">
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
                <th class="text-center" style="width:15%">Kuisioner</th>
                <th class="text-center" style="width:25%">Keterangan</th>
                <th class="text-center" style="width:10%">Tolak Ukur</th>
                <th class="text-center" style="width:10%">Act</th>
              </tr>
            </thead>
            <tbody>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td class="text-left">
                  {{data.uraian}} <br>
                  <span class="h_subtitle">{{data.ekokrafindikator_uraian}}</span>
                </td>
                <div class="ql-editor" v-html="UMUM.replaceEscapeString(data.keterangan)"></div>
                <td class="text-center">
                  <v-btn :color="UMUM.checkZero(data.jmlPertanyaan)" small rounded @click="openPertanyaan(data), mdl_list_bobot = true">
                    <v-icon left>mdi-file-document-edit</v-icon>
                    {{data.jmlPertanyaan}}
                  </v-btn>
                </td>
                <td class="text-center">
                  <v-btn-toggle mandatory>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="orange darken-1" fab small v-bind="attrs" v-on="on" @click="selectData(data), mdl_edit = true, editQuill(data.keterangan, 'editor_edit')">
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
                Messages
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add = false, editor = false, close()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>

                <div class="divInput">
                  <small>Indikator</small>
                  <v-autocomplete
                    v-model="form.ekokrafIndikator"
                    :items="list_indikator"
                    :search-input.sync ="searchIndikator"
                    @keyup="eventIndikator()"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    outlined
                    clearable
                    dense
                  >
                     <template v-slot:item="data">
                        <div style="margin-top:5px; margin-bottom:5px">
                          <span style="">{{ data.item.uraian }}</span>
                        </div>
                    </template>

                  </v-autocomplete>
                </div>

                <div class="divInput">
                  <small>Kuisioner</small>
                  <v-text-field v-model="form.uraian" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Keterangan</small>
                  <div v-if="editor">
                    <div id="editor" style="height:550px"></div>
                  </div>
                </div>


            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_add = false, editor = false, close()">Close</v-btn>
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
              <v-btn color="white" icon  @click="mdl_edit = false, editorEdit = false, close()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>

                <div class="divInput">
                  <small>Indikator</small>
                  <v-autocomplete
                    v-model="form.ekokrafIndikator"
                    :items="list_indikator"
                    :search-input.sync ="searchIndikatorEdit"
                    @keyup="eventIndikatorEdit()"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    outlined
                    clearable
                    dense
                  >
                     <template v-slot:item="data">
                        <div style="margin-top:5px; margin-bottom:5px">
                          <span style="">{{ data.item.uraian }}</span>
                        </div>
                    </template>

                  </v-autocomplete>
                </div>

                <div class="divInput">
                  <small>Kuisioner</small>
                  <v-text-field v-model="form.uraian" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Keterangan</small>
                  <div v-if="editorEdit">
                    <div id="editor_edit" style="height:550px"></div>
                  </div>
                </div>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_edit = false, editorEdit = false, close()">Close</v-btn>
              <v-btn color="blue darken-1" text @click="editData()" >Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== EDIT DATA ============================== -->

      <!-- =========================== VIEW LIST PERTANYAAN ============================== -->
      <!-- transition="none" -->
        <v-dialog v-model="mdl_list_bobot" persistent max-width="1200px" no-click-animation transition="none">

          <v-card>
            <v-app-bar flat class="bg-blue">
              <v-toolbar-title class="title white--text pl-0">
                Tolak Ukur
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_list_bobot = false, close()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>
                <v-btn color="blue" elevation="2" @click="mdl_add_bobot= true">
                  <span style="color:white">Tambah Data</span>
                </v-btn> <br> <br>
                <hr class="batasAbu" /> <br>
                <v-simple-table style="width:100%">
          <template v-slot:default>
            <thead style="background:#5289E7">
              <tr class="h_table_head">
                <th class="text-center" style="width:5%">No</th>
                <th class="text-center" style="width:30%">Pertanyaan</th>
                <th class="text-center" style="width:15%">Bobot</th>
                <th class="text-center" style="width:10%">Act</th>
              </tr>
            </thead>
            <tbody>
              <tr class="h_table_body" v-for="(data, index) in list_bobot" :key="data.id">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td class="text-left">
                  {{data.pertanyaan}}
                </td>
                <td class="text-center">
                    {{data.bobot}}
                </td>
                <td class="text-center">
                  <v-btn-toggle mandatory>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="orange darken-1" fab small v-bind="attrs" v-on="on" @click="selectDataBobot(data), mdl_edit_bobot = true">
                          <v-icon color="white">mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Ubah Data</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="red darken-4" fab small v-bind="attrs" v-on="on" @click="removeDataBobot(data)">
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
              <v-btn color="red darken-1" text @click="mdl_list_bobot = false, close()">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== VIEW LIST PERTANYAAN ============================== -->

      <!-- =========================== ADD PERTANYAAN ============================== -->
        <v-dialog v-model="mdl_add_bobot" persistent max-width="600px" transition="none">

          <v-card>
            <v-app-bar flat class="blue">
              <v-toolbar-title class="title white--text pl-0">
                Tambah Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add_bobot = false, close()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>


                <div class="divInput">
                  <small>Pertanyaan</small>
                  <v-text-field v-model="ukur.pertanyaan" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Bobot</small>
                  <v-text-field type="number" v-model="ukur.bobot" class="placeholerku" outlined dense required/>
                </div>


            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_add_bobot = false, close()">Close</v-btn>
              <v-btn color="blue darken-1" text @click="addDataBobot()" >Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== ADD TOLAK UKUR ============================== -->

      <!-- =========================== EDIT BOBOT ============================== -->
        <v-dialog v-model="mdl_edit_bobot" persistent max-width="600px" transition="none">

          <v-card>
            <v-app-bar flat class="orange darken-1">
              <v-toolbar-title class="title white--text pl-0">
                Edit Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_edit_bobot = false, close()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>


                <div class="divInput">
                  <small>Pertanyaan</small>
                  <v-text-field v-model="ukur.pertanyaan" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Bobot</small>
                  <v-text-field type="number" v-model="ukur.bobot" class="placeholerku" outlined dense required/>
                </div>


            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_edit_bobot = false, close()">Close</v-btn>
              <v-btn color="blue darken-1" text @click="editDataBobot()" >Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== EDIT BOBOT ============================== -->


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
          ekokrafIndikator   : '',
          uraian : '',
          keterangan : '',
        },

        ukur : {
          id : '',
          ekokrafKuisioner  : '',
          pertanyaan : '',
          bobot : '',
        },

        editor : false,
        editorEdit : false,

        searchIndikator : '',
        searchIndikatorEdit : '',

        list_data : [],
        list_indikator : [],

        page_first: 1,
        page_last: 0,
        page_limit : 8,
        cari_value: "",

        mdl_lihat : false,
        mdl_add : false,
        mdl_edit : false,

        // ========= BOBOT =========
        mdl_list_bobot : false,
        mdl_add_bobot : false,
        mdl_edit_bobot : false,

        list_bobot : [],


        page_first1: 1,
        page_last1: 0,
        page_limit1 : 8,
        cari_value1: "",

        // ========= BOBOT =========

        UMUM : UMUM,
        FETCHING : FETCHING,


      }
    },
    methods: {

      getView : function(){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_EKO_KUISIONER + "view", {
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
              // console.log(res_data)
              this.list_data = res_data.data;
              this.page_last = res_data.jml_data;
        });
      },


      addData : function() {

        this.form.keterangan = document.querySelector('#editor').children[0].innerHTML

        fetch(this.$store.state.url.URL_EKO_KUISIONER + "addData", {
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
        this.form.keterangan = document.querySelector('#editor_edit').children[0].innerHTML
        fetch(this.$store.state.url.URL_EKO_KUISIONER + "editData", {
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
        fetch(this.$store.state.url.URL_EKO_KUISIONER + "removeData", {
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
          this.form.ekokrafIndikator = data.ekokrafIndikator;
          this.form.uraian = data.uraian;
          this.form.keterangan = data.keterangan;
          this.searchIndikatorEdit = data.ekokrafindikator_uraian;
          this.list_indikator =  await FETCHING.postIndikator(this.searchIndikatorEdit);


      },

      // ====================================== TOLAK UKUR ====================================
      openPertanyaan(data){
        this.ukur.ekokrafKuisioner = data.id;
        this.getViewBobot();
      },
      getViewBobot : function(){
        fetch(this.$store.state.url.URL_EKO_KUISIONER_BOBOT + "view", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                ekokrafKuisioner : this.ukur.ekokrafKuisioner,
                data_ke: this.page_first1,
                cari_value: this.cari_value1,
                page_limit : this.page_limit1,
            })
        })
            .then(res => res.json())
            .then(res_data => {
              console.log(res_data)
              this.list_bobot = res_data.data;
              this.page_last1 = res_data.jml_data;
        });
      },


      addDataBobot : function() {

        var formData = new FormData();
        formData.append('ekokrafKuisioner', this.ukur.ekokrafKuisioner);
        formData.append('pertanyaan', this.ukur.pertanyaan);
        formData.append('bobot', this.ukur.bobot);

        fetch(this.$store.state.url.URL_EKO_KUISIONER_BOBOT + "addData", {
            method: "POST",
            headers: {
              authorization: "kikensbatara " + localStorage.token
            },
            body: formData
        }).then(res_data => {
            this.getViewBobot();
            this.getView();
            this.$store.commit('notifAdd', 'Menambah')
        });
      },

      editDataBobot : function(){
        var formData = new FormData();
        formData.append('id', this.ukur.id);
        formData.append('ekokrafKuisioner', this.ukur.ekokrafKuisioner);
        formData.append('pertanyaan', this.ukur.pertanyaan);
        formData.append('bobot', this.ukur.bobot);

        fetch(this.$store.state.url.URL_EKO_KUISIONER_BOBOT + "editData", {
            method: "POST",
            headers: {
              authorization: "kikensbatara " + localStorage.token
            },
            body: formData
        }).then(res_data => {
            // this.getView();
            this.getViewBobot();
            this.$store.commit('notifAdd', 'Menambah')
        });
      },

      removeDataBobot : async function(data){

        await UMUM.notifDelete();
        fetch(this.$store.state.url.URL_EKO_KUISIONER_BOBOT + "removeData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(data)
        }).then(res_data => {
            this.getViewBobot();
            this.getView();
            this.$store.commit('notifAdd', 'Menghapus')
        });
      },

      selectDataBobot : async function(data){
          this.ukur.id = data.id;
          this.ukur.ekokrafKuisioner = data.ekokrafKuisioner;
          this.ukur.pertanyaan = data.pertanyaan;
          this.ukur.bobot = data.bobot;

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

        Quilll : function(editor){
          this.editor = true
          setTimeout(() => {
            new Quill('#'+editor, {
                  modules: {
                      toolbar: this.$store.state.toolbarOptions,
                      imageResize: true,
                  },
                  theme: 'snow'
            });
          }, 100);

        },

        editQuill(text, id){
          this.editorEdit = true
          var htmlToInsert = UMUM.replaceEscapeString(text)
          setTimeout(() => {
            let quill = new Quill('#'+id, {
                  modules: {
                      toolbar: this.$store.state.toolbarOptions,
                      imageResize: true,
                  },
                  theme: 'snow'
            });
            quill.container.firstChild.innerHTML = htmlToInsert
          }, 100);
        },

        fetching : async function(){
        //   this.list_desKel =  await FETCHING.postDesKel();
          this.list_indikator =  await FETCHING.postIndikator();
        //   this.list_jenis = await FETCHING.getJenisPariwisata()
          // console.log(this.list_desKel)
        },
        eventIndikator : async function(){
          this.list_indikator =  await FETCHING.postIndikator(this.searchIndikator);
        },
        eventIndikatorEdit : async function(){
          this.list_indikator =  await FETCHING.postIndikator(this.searchIndikatorEdit);
        },

        close : async function(){
          this.fetching();
          this.searchIndikator = '';

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
