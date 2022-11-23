<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="subBar" style="padding:10px" no-gutters>
          <v-col cols="12" md="3">
            <span class="h_judul">Analisis Ekosistem</span>
            <br />
            <span class="h_Sub_judul">Ekonomi Kreatif</span>
          </v-col>

          <v-col cols="12" md="3" style="padding-right:2%">

                <v-autocomplete
                    v-model="form.ekokrafKuisioner"
                    :items="list_kuisioner"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    label="Pilih Jenis Indikator"
                    outlined
                    dense
                  >
                  </v-autocomplete>
          </v-col>

          <v-col cols="12" md="3" style="padding-right:2%">

                <v-autocomplete
                    v-model="form.ekokrafJenis"
                    :items="list_jenis"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    label="Pilih Jenis Ekokraf"
                    outlined
                    dense
                  >
                  </v-autocomplete>
          </v-col>

          <v-col cols="12" md="3" style="padding-right:20px">
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
                <th class="text-center" style="width:10%" v-for="(pelaku) in list_pelaku" :key="pelaku.id">{{pelaku.pelaku}}</th>
                <th class="text-center" style="width:10%">Act</th>
              </tr>
            </thead>
            <tbody>
              <tr class="h_table_body">
                <td class="text-center"></td>
                <td class="text-left">
                </td>
                <td class="text-left" v-for="(pelaku) in list_pelaku" :key="pelaku.id">
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
        <v-dialog v-model="mdl_add" fullscreen hide-overlay transition="dialog-bottom-transition">

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
                    <small>Jenis Indikator</small>
                  <v-autocomplete
                    v-model="form.ekokrafKuisioner"
                    :items="list_kuisioner"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    outlined
                    dense
                  >
                  </v-autocomplete>
                </div>
                <div class="divInput">
                    <small>Jenis Ekonomi Kreatif</small>
                    <v-autocomplete
                    v-model="form.ekokrafJenis"
                    :items="list_jenis"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    outlined
                    dense
                  >
                  </v-autocomplete>
                </div>
                    <v-simple-table style="width:100%">
          <template v-slot:default>
            <thead style="background:#5289E7">
              <tr class="h_table_head">
                <th class="text-center" style="width:20%">Indikator</th>
                <th class="text-center" style="width:10%" v-for="(pelaku) in list_pelaku" :key="pelaku.id">{{pelaku.pelaku}}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="h_table_body">
              </tr>
            </tbody>
          </template>
        </v-simple-table>


            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_add = false, close()">Close</v-btn>
              <v-btn color="blue darken-1" @click="addData()" text >Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== ADD DATA ============================== -->

      <!-- =========================== EDIT DATA ============================== -->
        <v-dialog v-model="mdl_edit" fullscreen hide-overlay transition="dialog-bottom-transition">

          <v-card>
            <v-app-bar flat class="orange darken-1">
              <v-toolbar-title class="title white--text pl-0">
                Tambah Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_edit = false, close()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>
                <div class="divInput">
                    <small>Jenis Indikator</small>
                  <v-autocomplete
                    v-model="form.ekokrafKuisioner"
                    :items="list_kuisioner"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    outlined
                    dense
                  >
                  </v-autocomplete>
                </div>
                <div class="divInput">
                    <small>Jenis Ekonomi Kreatif</small>
                    <v-autocomplete
                    v-model="form.ekokrafJenis"
                    :items="list_jenis"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    outlined
                    dense
                  >
                  </v-autocomplete>
                </div>
                    <v-simple-table style="width:100%">
          <template v-slot:default>
            <thead style="background:#5289E7">
              <tr class="h_table_head">
                <th class="text-center" style="width:20%">Indikator</th>
                <th class="text-center" style="width:10%" v-for="(pelaku) in list_pelaku" :key="pelaku.id">{{pelaku.pelaku}}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="h_table_body">
              </tr>
            </tbody>
          </template>
        </v-simple-table>


            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_edit = false, close()">Close</v-btn>
              <v-btn color="blue darken-1" @click="addData()" text >Simpan</v-btn>
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
        },

        list_data : [],
        list_pelaku : [],
        list_kuisioner : [],
        list_jenis : [],

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
        fetch(this.$store.state.url.URL_EKOSISTEM + "view", {
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

      selectData : async function(data){
        // console.log(data)
          this.list_jenis = await FETCHING.getJenisPariwisata()
          this.list_kuisioner = await FETCHING.getKuisioner()
          this.list_pelaku = await FETCHING.postPelakuEko()
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
          this.list_pelaku = await FETCHING.postPelakuEko()
        },

        close : async function(){
          this.fetching();

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
