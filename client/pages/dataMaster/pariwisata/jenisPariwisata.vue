<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="subBar" style="padding:10px" no-gutters>
          <v-col cols="12" md="4">
            <span class="h_judul">Jenis Wisata</span>
            <br />
            <span class="h_Sub_judul">Data Master</span>
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
                <th class="text-center" style="width:10%">Kode</th>
                <th class="text-center" style="width:15%">Uraian</th>
                <th class="text-center" style="width:15%">Bidang</th>
                <th class="text-center" style="width:35%">Ket</th>
                <th class="text-center" style="width:10%">Act</th>
              </tr>
            </thead>
            <tbody>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td class="text-center">{{data.m_bidangpariwisata_kode}}.{{data.m_kategoriPariwisata_kode}}.{{data.kode}}</td>
                <td>
                  {{data.uraian}} <br>
                  <span class="h_subtitle">{{data.m_kategoriPariwisata_uraian}}</span>
                </td>
                <td>{{data.m_bidangpariwisata_uraian}}</td>
                <td>{{data.keterangan}}</td>
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
                  <small>Bidang Pariwisata</small>
                  <v-autocomplete
                    v-model="form.m_kategoriPariwisata"
                    :items="list_kategori"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    outlined
                    dense
                  />
                </div>

                <div class="divInput">
                  <small>Kode</small>
                  <v-text-field v-model="form.kode" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Uraian</small>
                  <v-text-field v-model="form.uraian" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Keterangan</small>
                  <v-textarea v-model="form.keterangan" outlined name="input-7-4"></v-textarea>
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
                  <small>Bidang Pariwisata</small>
                  <v-autocomplete
                    v-model="form.m_kategoriPariwisata"
                    :items="list_kategori"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    outlined
                    dense
                  />
                </div>

                <div class="divInput">
                  <small>Kode</small>
                  <v-text-field v-model="form.kode" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Uraian</small>
                  <v-text-field v-model="form.uraian" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Keterangan</small>
                  <v-textarea v-model="form.keterangan" outlined name="input-7-4"></v-textarea>
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


    <!-- ++++++++++++++++++++++++++++++++++++++ MODAL ++++++++++++++++++++++++++++++++++++++++++ -->
  </div>
</template>

<script>

  import UMUM from "../../../library/umum";
  import FETCHING from "../../../library/fetching";

  export default {
    data () {
      return {
        page: 1,

        form : {
          id : '',
          m_kategoriPariwisata  : '',
          uraian : '',
          keterangan : '',
          kode : '',
        },

        list_data : [],
        list_kategori : [],

        page_first: 1,
        page_last: 0,
        page_limit : 8,
        cari_value: "",


        mdl_add : false,
        mdl_edit : false,

        UMUM : UMUM,
        FETCHING : FETCHING,


      }
    },
    methods: {

      getView : function(){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_DM_JENIS_PARIWISATA + "view", {
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
        fetch(this.$store.state.url.URL_DM_JENIS_PARIWISATA + "addData", {
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
        fetch(this.$store.state.url.URL_DM_JENIS_PARIWISATA + "editData", {
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
        fetch(this.$store.state.url.URL_DM_JENIS_PARIWISATA + "removeData", {
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
          this.form.m_kategoriPariwisata = data.m_kategoriPariwisata;
          this.form.kode = data.kode;
          this.form.uraian = data.uraian;
          this.form.keterangan = data.keterangan;

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
          this.list_kategori = await FETCHING.getKategoriPariwisata()
          console.log(this.list_kategori)
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
