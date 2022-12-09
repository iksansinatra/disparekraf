<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="subBar" style="padding:10px" no-gutters>
          <v-col cols="12" md="4">
            <span class="h_judul">Kelompok Ekokraf</span>
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
                <th class="text-center" style="width:20%">Kelompok</th>
                <th class="text-center" style="width:25%">Jenis</th>
                <th class="text-center" style="width:25%">Anggota</th>
                <th class="text-center" style="width:25%">Alamat</th>
                <th class="text-center" style="width:15%">Act</th>
              </tr>
            </thead>
            <tbody>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td>{{data.uraian}}</td>
                <td>
                  <v-chip v-for="data1 in data.subData" :key="data1.id" color="yellow darken-3" small style="color:white; margin-left:2px; margin-top:2px">{{data1.m_jenisPariwisata_uraian}}</v-chip>
                </td>
                <td class="text-center">
                  <v-btn :color="UMUM.checkZero(data.jmlAnggota)" small rounded @click="openMember(data), mdl_list_anggota = true">
                    <v-icon left>mdi-account</v-icon>
                    {{data.jmlAnggota}}
                  </v-btn>
                </td>
                <td>{{data.alamat}}</td>
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
                  <small>Jenis Ekonomi Kreatif</small>
                  <v-autocomplete
                    v-model="form.jenisPariwisata"
                    :items="list_jenis"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    multiple outlined dense
                    clearable deletable-chips small-chips
                  />
                </div>


                <div class="divInput">
                  <small>Nama Kelompok</small>
                  <v-text-field v-model="form.uraian" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Alamat</small>
                  <v-text-field v-model="form.alamat" class="placeholerku" outlined dense required/>
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
                  <small>Jenis Pariwisata</small>
                  <v-autocomplete
                    v-model="form.jenisPariwisata"
                    :items="list_jenis"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    multiple
                    outlined
                    dense

                  />
                </div>


                <div class="divInput">
                  <small>Nama Kelompok</small>
                  <v-text-field v-model="form.uraian" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Alamat</small>
                  <v-text-field v-model="form.alamat" class="placeholerku" outlined dense required/>
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

      <!-- =========================== VIEW LIST ANGGOTA ============================== -->
      <!-- transition="none" -->
        <v-dialog v-model="mdl_list_anggota" persistent max-width="1200px" no-click-animation transition="none">

          <v-card>
            <v-app-bar flat class="bg-blue">
              <v-toolbar-title class="title white--text pl-0">
                Anggota
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_list_anggota = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>
                <v-btn color="blue" elevation="2" @click="mdl_add_anggota= true">
                  <span style="color:white">TAMBAH ANGGOTA</span>
                </v-btn> <br> <br>
                <hr class="batasAbu" /> <br>
                <v-row>

                    <v-col cols="12" md="4" v-for="data in list_anggota" :key="data.id">
                      <v-card class="mediaCard" color="#5289e7" dark>
                        <v-row>
                          <v-col cols="12" md="8">
                            <span class="mediaTitle">{{data.nama}}</span> <br>
                            <div style="line-height: 90%; text-align: justify;">
                              <span class="mediaSubTitle text-justify two_line">{{data.jabatan}}</span>
                              <br>
                              <span>{{UMUM.replaceEscapeString(data.alamat)}}</span>
                            </div>
                          </v-col>

                          <v-col cols="12" md="4">
                            <v-img width="85px" height="100px" :src="$store.state.URLX+'uploads/'+data.file"></v-img>
                          </v-col>
                        </v-row>
                        <br>
                              <v-btn outlined rounded small @click="selectDataAnggota(data), mdl_lihat_anggota=true">Lihat</v-btn>
                              <v-btn outlined rounded small @click="selectDataAnggota(data), mdl_edit_anggota=true">Edit</v-btn>
                              <v-btn outlined rounded small @click="removeDataAnggota(data)">Hapus</v-btn>
                      </v-card>
                    </v-col>
                  </v-row>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_list_anggota = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== VIEW LIST ANGGOTA ============================== -->

            <!-- =========================== ADD ANGGOTA ============================== -->
        <v-dialog v-model="mdl_add_anggota" persistent max-width="600px" transition="none">

          <v-card>
            <v-app-bar flat class="blue">
              <v-toolbar-title class="title white--text pl-0">
                Edit Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add_anggota = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>


                <div class="divInput">
                  <small>Nama</small>
                  <v-text-field v-model="anggota.nama" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Jabatan</small>
                  <v-text-field v-model="anggota.jabatan" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Email</small>
                  <v-text-field v-model="anggota.email" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>HP</small>
                  <v-text-field v-model="anggota.hp" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Alamat</small>
                  <v-textarea v-model="anggota.alamat" outlined name="input-7-4"></v-textarea>
                </div>


                <div class="divInput">
                  <small>Foto</small>
                  <v-file-input v-model="anggota.file" truncate-length="15" outlined dense ></v-file-input>
                </div>


            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_add_anggota = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="addDataAnggota()" >Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== ADD ANGGOTA ============================== -->

      <!-- =========================== EDIT ANGGOTA ============================== -->
        <v-dialog v-model="mdl_edit_anggota" persistent max-width="600px" transition="none">

          <v-card>
            <v-app-bar flat class="orange darken-1">
              <v-toolbar-title class="title white--text pl-0">
                Edit Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_edit_anggota = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>

                <div class="divInput">
                  <small>Nama</small>
                  <v-text-field v-model="anggota.nama" class="placeholerku" outlined dense required/>
                </div>

               <div class="divInput">
                  <small>Jabatan</small>
                  <v-text-field v-model="anggota.jabatan" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Email</small>
                  <v-text-field v-model="anggota.email" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>HP</small>
                  <v-text-field v-model="anggota.hp" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Alamat</small>
                  <v-textarea v-model="anggota.alamat" outlined name="input-7-4"></v-textarea>
                </div>


                <div class="divInput">
                  <small>Foto</small>
                  <v-file-input v-model="anggota.file" truncate-length="15" outlined dense ></v-file-input>
                </div>


            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_edit_anggota = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="editDataAnggota()" >Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== EDIT ANGGOTA ============================== -->

      <!-- =========================== LIHAT ANGGOTA ============================== -->
        <v-dialog v-model="mdl_lihat_anggota" persistent max-width="600px" transition="none">

          <v-card>
            <v-app-bar flat class="light-blue accent-4">
              <v-toolbar-title class="title white--text pl-0">
                Detail Anggota
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_lihat_anggota = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>
                <v-img :src="$store.state.URLX+'uploads/'+fileOld"></v-img>
                <hr class="batasAbu" /> <br>

                <span class="h_judulProduk">{{anggota.nama}}</span> <br>

                <div style="padding-top:4px">{{anggota.jabatan}}</div>
                <hr class="batasAbu2">
                <div style="padding-top:8px">
                  <span class="h_hargaProduk">{{anggota.alamat}}</span>
                </div>
                <!-- <div style="padding-top:12px">
                  <v-chip small outlined color="light-green">
                    <v-icon left style="font-size:16px">mdi-account</v-icon>
                    {{produk.ekokrafpelaku_pelaku}}
                  </v-chip>

                  <v-chip small outlined color="red lighten-2">
                    <v-icon left style="font-size:16px">mdi-phone</v-icon>
                   {{produk.ekokrafpelaku_hp}}
                  </v-chip>

                  <v-chip small outlined color="blue lighten-2">
                    <v-icon left style="font-size:16px">mdi-email</v-icon>
                    {{produk.ekokrafpelaku_email}}
                  </v-chip>
                </div> -->
                <hr class="batasAbu" />
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_lihat_anggota = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== LIHAT ANGGOTA ============================== -->


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
          uraian : '',
          alamat : '',
          jenisPariwisata : [],
        },

        form2 : {
          id : 'x',
          m_jenisPariwisata : 'xx',
          ekokrafKelompok : 'xxx',
        },

        anggota : {
          id : '',
          ekokrafKelompok  : '',
          nama : '',
          jabatan : '',
          email : '',
          hp : '',
          alamat : '',
          file : null,

          ekokrafuraian : '',
        },

        fileOld : '',

        list_data : [],
        list_jenis : [],

        page_first: 1,
        page_last: 0,
        page_limit : 8,
        cari_value: "",


        mdl_add : false,
        mdl_edit : false,
        mdl_list_anggota : false,
        mdl_add_anggota : false,
        mdl_edit_anggota : false,
        mdl_lihat_anggota : false,

        list_anggota : [],

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
        fetch(this.$store.state.url.URL_EKO_KELOMPOK + "view1", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
              createdBy : this.createdBy,
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




      addData : function() {
        fetch(this.$store.state.url.URL_EKO_KELOMPOK + "addData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.form)
        })
        // .then(res => res.json())
        .then(res_data => {
          console.log(res_data);
            this.getView();
            this.$store.commit('notifAdd', 'Menambah')
        });

        //  console.log(this.form.jenisPariwisata)



      },

      editData : function(){
        fetch(this.$store.state.url.URL_EKO_KELOMPOK + "editData", {
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
        fetch(this.$store.state.url.URL_EKO_KELOMPOK + "removeData", {
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
          this.form.kode = data.kode;
          this.form.uraian = data.uraian;
          this.form.alamat = data.alamat;


          this.form.jenisPariwisata = []
          var dt = data.subData

          dt.forEach(element => {
            this.form.jenisPariwisata.push(element.m_jenisPariwisata)
          });

      },

            // ====================================== PRODUK ====================================
      openMember(data){
        this.anggota.ekokrafKelompok = data.id;
        this.getViewAnggota();
      },
      getViewAnggota : function(){
        fetch(this.$store.state.url.URL_EKO_ANGGOTA + "view", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                ekokrafKelompok : this.anggota.ekokrafKelompok,
                data_ke: this.page_first1,
                cari_value: this.cari_value1,
                page_limit : this.page_limit1,
            })
        })
            .then(res => res.json())
            .then(res_data => {
              console.log(res_data)
              this.list_anggota = res_data.data;
              this.page_last1 = res_data.jml_data;
        });
      },


      addDataAnggota : function() {

        var formData = new FormData();
        formData.append('ekokrafKelompok', this.anggota.ekokrafKelompok);
        formData.append('nama', this.anggota.nama);
        formData.append('jabatan', this.anggota.jabatan);
        formData.append('email', this.anggota.email);
        formData.append('hp', this.anggota.hp);
        formData.append('alamat', this.anggota.alamat);
        formData.append('file', this.anggota.file);

        fetch(this.$store.state.url.URL_EKO_ANGGOTA + "addData", {
            method: "POST",
            headers: {
              authorization: "kikensbatara " + localStorage.token
            },
            body: formData
        }).then(res_data => {
            this.getViewAnggota();
            this.getView();
            this.$store.commit('notifAdd', 'Menambah')
        });
        // console.log(this.produk.file)
      },

      editDataAnggota : function(){
        var formData = new FormData();
        formData.append('id', this.anggota.id);
        formData.append('ekokrafKelompok', this.anggota.ekokrafKelompok);
        formData.append('nama', this.anggota.nama);
        formData.append('jabatan', this.anggota.jabatan);
        formData.append('email', this.anggota.email);
        formData.append('hp', this.anggota.hp);
        formData.append('alamat', this.anggota.alamat);
        formData.append('file', this.anggota.file);
        formData.append('fileOld', this.fileOld);

        fetch(this.$store.state.url.URL_EKO_ANGGOTA + "editData", {
            method: "POST",
            headers: {
              authorization: "kikensbatara " + localStorage.token
            },
            body: formData
        }).then(res_data => {
            // this.getView();
            this.getViewAnggota();
            this.$store.commit('notifAdd', 'Menambah')
        });
      },

      removeDataAnggota : async function(data){

        await UMUM.notifDelete();
        fetch(this.$store.state.url.URL_EKO_ANGGOTA + "removeData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(data)
        }).then(res_data => {
            this.getViewAnggota();
            this.getView();
            this.$store.commit('notifAdd', 'Menghapus')
        });
      },

      selectDataAnggota : async function(data){
          this.anggota.id = data.id;
          this.anggota.ekokrafKelompok = data.ekokrafKelompok;
          this.anggota.nama = data.nama;
          this.anggota.jabatan = data.jabatan;
          this.anggota.email = data.email;
          this.anggota.hp = data.hp;
          this.anggota.alamat = UMUM.replaceEscapeString(data.alamat);
          this.fileOld = data.file;

          this.anggota.ekokrafuraian = data.ekokrafuraian;
          this.getViewAnggota();
          this.getView();

      },

      // ====================================== ANGGOTA ====================================

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
          // console.log(this.list_jenis)
        }


      // ====================================== PAGINATE ====================================

    },
    mounted () {
      this.fetching()
      this.getView();
    },
  }
</script>

<style>
</style>
