<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="subBar" style="padding:10px" no-gutters>
          <v-col cols="12" md="4">
            <span class="h_judul">Kegiatan</span>
            <br />
            <span class="h_Sub_judul">Data Umum</span>
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
                <th class="text-center" style="width:10%">File</th>
                <th class="text-center" style="width:45%">Judul</th>
                <th class="text-center" style="width:15%">Date</th>
                <th class="text-center" style="width:15%">Act</th>
              </tr>
            </thead>
            <tbody>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td class="text-center" style="padding-top:0.5%">
                  <img :src="$store.state.URLX+'uploads/'+data.foto" style="width:50%; height:auto" alt="">
                </td>
                <td>{{data.nama}}</td>
                <td>{{data.tgl}}</td>
                <td class="text-center">
                  <v-btn-toggle mandatory>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="blue darken-1" fab small v-bind="attrs" v-on="on" @click="selectData(data), mdl_lihat = true">
                          <v-icon color="white">mdi-eye</v-icon>
                        </v-btn>
                      </template>
                      <span>Lihat Detile Data</span>
                    </v-tooltip>


                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="orange darken-1" fab small v-bind="attrs" v-on="on" @click="selectData(data), mdl_edit = true, editQuill(data.deskripsi, 'editor_edit')">
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
        <v-dialog v-model="mdl_add" persistent max-width="780px">

          <v-card>
            <v-app-bar flat class="bg-primaryku">
              <v-toolbar-title class="title white--text pl-0">
                Messages
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add = false, editor = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br>


                <div class="divInput">
                  <small>Judul</small>
                  <v-text-field v-model="form.nama" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Sumber Berita</small>
                  <v-text-field v-model="form.sumber" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Foto Kegiatan</small>
                  <v-file-input v-model="form.file" truncate-length="15" outlined dense ></v-file-input>
                </div>

                <div class="divInput">
                  <small>Rangkuman</small>
                  <v-textarea v-model="form.rangkuman" outlined name="input-7-4"></v-textarea>
                </div>

                <div class="divInput">
                  <small>Isi Kegiatan</small>
                  <div v-if="editor">
                    <div id="editor" style="height:550px"></div>
                  </div>
                </div> <br>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_add = false, editor = false">Close</v-btn>
              <v-btn color="blue darken-1" @click="addData()" text >Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== ADD DATA ============================== -->

      <!-- =========================== EDIT DATA ============================== -->
        <v-dialog v-model="mdl_edit" persistent max-width="780px">

          <v-card>
            <v-app-bar flat class="orange darken-1">
              <v-toolbar-title class="title white--text pl-0">
                Edit Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_edit = false, editorEdit = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br>

                <div class="divInput">
                  <small>Judul</small>
                  <v-text-field v-model="form.nama" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Sumber Berita</small>
                  <v-text-field v-model="form.sumber" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Foto Kegiatan</small>
                  <v-file-input v-model="form.file" truncate-length="15" outlined dense ></v-file-input>
                </div>

                <div class="divInput">
                  <small>Rangkuman</small>
                  <v-textarea v-model="form.rangkuman" outlined name="input-7-4"></v-textarea>
                </div>

                <div class="divInput">
                  <small>Isi Kegiatan</small>
                  <div v-if="editorEdit">
                    <div id="editor_edit" style="height:550px"></div>
                  </div>
                </div> <br>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_edit = false, editorEdit = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="editData()" >Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== EDIT DATA ============================== -->


      <!-- =========================== LIHAT DATA ============================== -->
        <v-dialog v-model="mdl_lihat" persistent max-width="780px">

          <v-card>
            <v-app-bar flat class="blue darken-1">
              <v-toolbar-title class="title white--text pl-0">
                Lihat Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_lihat = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br>
                <br>
                <img :src="$store.state.URLX+'uploads/'+fileOld" style="width:100%; height:auto" alt="">
                <!-- <v-img :src="$store.state.URLX+'uploads/'+fileOld"></v-img> -->
                <!-- <v-img :src="'https://www.celebes.co/wp-content/uploads/2019/10/Keunikan-Air-Terjun-Moramo.jpg'"></v-img> -->
                <br>
                <hr class="batasAbu">
                <br>
                <span class="h_judulProduk">{{form.nama}}</span> <br>
                <hr class="batasAbu2">
                <div style="padding-top:8px">
                  <span>Sumber Berita : </span> <span class="h_hargaProduk">{{form.sumber}}</span> <br>
                  <span>Post By : </span> <span class="h_hargaProduk">{{form.userId}}</span> <br>
                </div>
                <hr class="batasAbu1">
                <br>
                <div class="ql-editor" v-html="UMUM.replaceEscapeString(form.deskripsi)"></div>




            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_lihat = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== LIHAT DATA ============================== -->


    <!-- ++++++++++++++++++++++++++++++++++++++ MODAL ++++++++++++++++++++++++++++++++++++++++++ -->
  </div>
</template>

<script>

  import Quill from 'quill';
  import ImageResize from 'quill-image-resize-module'
  Quill.register('modules/imageResize', ImageResize);

  import UMUM from "../../library/umum";

  export default {
    data () {
      return {
        page: 1,

        form : {
          id: "",
          nama: "",
          deskripsi: "",
          rangkuman : '',
          sumber : '',
          userId : '',
          tgl: "",

          file: null,
        },

        fileOld : '',

        editor : false,
        editorEdit : false,

        list_data : [],

        page_first: 1,
        page_last: 0,
        page_limit : 8,
        cari_value: "",


        mdl_add : false,
        mdl_edit : false,
        mdl_lihat : false,

        UMUM : UMUM,


      }
    },
    methods: {

      getView : function(){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_KEGIATAN + "view", {
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
        this.form.deskripsi = document.querySelector('#editor').children[0].innerHTML
        var formData = new FormData();
        formData.append('nama', this.form.nama);
        formData.append('sumber', this.form.sumber);
        formData.append('rangkuman', this.form.rangkuman);
        formData.append('deskripsi', this.form.deskripsi);
        formData.append('file', this.form.file);


console.log(this.$store.state.url.URL_KEGIATAN + 'AAAAAAAAA')




        fetch(this.$store.state.url.URL_KEGIATAN + "addData", {
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
        this.form.keterangan = document.querySelector('#editor_edit').children[0].innerHTML

        var formData = new FormData();
        formData.append('id', this.form.id);
        formData.append('nama', this.form.nama);
        formData.append('sumber', this.form.sumber);
        formData.append('rangkuman', this.form.rangkuman);
        formData.append('deskripsi', this.form.deskripsi);
        formData.append('file', this.form.file);
        formData.append('file_old', this.fileOld);

        fetch(this.$store.state.url.URL_KEGIATAN + "editData", {
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

      removeData : async function(data){

        await UMUM.notifDelete();
        fetch(this.$store.state.url.URL_KEGIATAN + "removeData", {
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
          this.form.nama = data.nama;
          this.form.sumber = data.sumber;
          this.form.deskripsi = data.deskripsi;
          this.form.userId = data.postBy;
          this.form.rangkuman = data.rangkuman;
          this.fileOld = data.foto;
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
        }


      // ====================================== PAGINATE ====================================

    },
    mounted () {
      this.getView();
    },
  }
</script>

<style>
</style>
