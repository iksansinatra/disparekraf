<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="subBar" style="padding:10px" no-gutters>
          <v-col cols="12" md="4">
            <span class="h_judul">Foto dan Dokumentasi</span>
            <br />
            <span class="h_Sub_judul">Gallery</span>
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
    <v-col
      v-for="data in list_data"
      :key="data.id"
      class="d-flex child-flex"
      cols="2"
    >

        <v-img
          :src="$store.state.URLX+'uploads/'+data.fileThumb"
          :lazy-src="$store.state.URLX+'uploads/'+data.fileThumb"
          aspect-ratio="1"
          class="grey lighten-2"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>


            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon color="orange" v-bind="attrs" v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <a href="javascript:void(0)" class="removeUnderline huruf_a" @click="selectData(data), mdl_lihat = true">lihat Foto</a>
                </v-list-item>
                <v-list-item>
                  <a href="javascript:void(0)" class="removeUnderline huruf_a" @click="removeData(data)">Hapus Foto</a>
                </v-list-item>
              </v-list>
            </v-menu>



        </v-img>


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

                <br>

                <div class="divInput">
                  <small>Uraian</small>
                  <v-text-field v-model="form.uraian" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Foto</small>
                  <v-file-input v-model="form.file" truncate-length="15" outlined dense multiple></v-file-input>
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
                <div class="divInput">
                  <small>Uraian</small>
                  <v-text-field v-model="form.uraian" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Foto</small>
                  <v-file-input v-model="form.file" truncate-length="15" outlined dense multiple></v-file-input>
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

      <!-- =========================== LIHAT DATA ============================== -->
        <v-dialog v-model="mdl_lihat" persistent max-width="720px">

          <v-card>
            <v-app-bar flat class="blue darken-1">
              <v-toolbar-title class="title white--text pl-0">
                Lihat Foto
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_lihat = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br>
                <span class="h_judulProduk">{{form.uraian}}</span> <br>

                <hr class="batasAbu2">
                <div style="padding-top:8px">
                  <span>Post By : </span> <span class="h_hargaProduk">{{form.postBy}}</span> <br>
                </div>


                <img :src="$store.state.URLX+'uploads/'+fileOld" style="width:100%; height:auto" alt="">

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_lihat = false">Close</v-btn>
              <!-- <v-btn color="blue darken-1" text @click="editData()" >Simpan</v-btn> -->
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== LIHAT DATA ============================== -->


    <!-- ++++++++++++++++++++++++++++++++++++++ MODAL ++++++++++++++++++++++++++++++++++++++++++ -->
  </div>
</template>

<script>

  import UMUM from "../../library/umum";

  export default {
    data () {
      return {
        page: 1,

        form : {
          id : '',
          file : [],
          fileThumb : null,
          uraian : '',
          kode : '',
          postBy : '',
        },

        list_data : [],
        fileOld : '',

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
        fetch(this.$store.state.url.URL_FOTO + "view", {
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

        console.log(this.form.file)

        console.log(this.$store.state.url.URL_FOTO)




        var formData = new FormData();
        formData.append('uraian', this.form.uraian);
        // formData.append('file', this.form.file);

        var filex = this.form.file
        filex.forEach(element => {
          console.log(element)
          formData.append('file', element);
        });

        fetch(this.$store.state.url.URL_FOTO + "addData", {
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
        formData.append('uraian', this.form.uraian);
        formData.append('file', this.form.file);
        formData.append('fileOld', this.fileOld);

        fetch(this.$store.state.url.URL_FOTO + "editData", {
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
        fetch(this.$store.state.url.URL_FOTO + "removeData", {
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
          this.form.kode = data.kode;
          this.form.uraian = data.uraian;
          this.form.keterangan = data.keterangan;
          this.form.postBy = data.postBy

          this.fileOld = data.file;


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


      // ====================================== PAGINATE ====================================

    },
    mounted () {
      this.getView();
    },
  }
</script>

<style>
</style>
