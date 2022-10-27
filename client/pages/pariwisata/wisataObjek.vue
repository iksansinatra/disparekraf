<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="subBar" style="padding:10px" no-gutters>
          <v-col cols="12" md="4">
            <span class="h_judul">Objek Wisata</span>
            <br />
            <span class="h_Sub_judul">Pariwisata</span>
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
                <th class="text-center" style="width:30%">Uraian</th>
                <th class="text-center" style="width:20%">Tata-Kelola</th>
                <th class="text-center" style="width:20%">Desa/Kel</th>
                <th class="text-center" style="width:10%">Fasilitas</th>
                <th class="text-center" style="width:15%">Act</th>
              </tr>
            </thead>
            <tbody>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td>
                  {{data.uraian}} <br>
                  <span class="h_subtitle">{{data.m_jenispariwisata_uraian}}</span>
                </td>
                <td>{{data.m_jenistatakelola_uraian}}</td>
                <td>{{data.nama_des_kel}}</td>
                <td class="text-center">
                  <v-btn :color="UMUM.checkZero(data.jmlFasilitas)" small rounded @click="openFasilitas(data), mdl_list_fasilitas = true">
                    <v-icon left>mdi-coffee</v-icon>
                    {{data.jmlFasilitas}}
                  </v-btn>
                </td>
                <td class="text-center">
                  <v-btn-toggle mandatory>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="light-green darken-2" fab small v-bind="attrs" v-on="on" @click="selectData(data), mdl_map = true">
                          <v-icon color="white">mdi-map-marker</v-icon>
                        </v-btn>
                      </template>
                      <span>Map/Lokasi</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="blue darken-1" fab small v-bind="attrs" v-on="on" @click="selectData(data), mdl_lihat = true">
                          <v-icon color="white">mdi-eye</v-icon>
                        </v-btn>
                      </template>
                      <span>Detile Wisata</span>
                    </v-tooltip>

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
        <v-dialog v-model="mdl_add" persistent max-width="780px">

          <v-card>
            <v-app-bar flat class="bg-primaryku">
              <v-toolbar-title class="title white--text pl-0">
                Messages
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="editor = false, mdl_add = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br>
                <div class="divInput">
                  <small>Jenis Wisata</small>
                  <v-autocomplete
                    v-model="form.m_jenispariwisata"
                    :items="list_jenis"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    outlined
                    clearable
                    dense
                  />
                </div>

                <div class="divInput">
                  <small>Desa/Kel</small>
                  <v-autocomplete
                    v-model="form.des_kel_id"
                    :items="list_desKel"
                    :search-input.sync ="searchDeskel"
                    @keyup="eventDesKel()"
                    :item-text="'nama_des_kel'"
                    :item-value="'des_kel_id'"
                    outlined
                    dense
                  >
                     <template v-slot:item="data">
                        <div style="margin-top:5px; margin-bottom:5px">
                          <span style="">{{ data.item.nama_des_kel }}</span> <br>
                          <span class="h_subtitle">Kec. {{ data.item.nama_kecamatan }}</span> <br>
                        </div>
                    </template>

                  </v-autocomplete>
                </div>

                 <div class="divInput">
                  <small>Jenis Tata Kelola</small>
                  <v-autocomplete
                    v-model="form.m_jenisTataKelola"
                    :items="list_tataKelola"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    outlined
                    dense
                  />
                </div>

                <div class="divInput">
                  <small>Nama Objek Wisata</small>
                  <v-text-field v-model="form.uraian" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Koordinat Objek Wisata</small>
                  <v-text-field v-model="form.latLong" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Foto Sampul</small>
                  <v-file-input v-model="form.file" truncate-length="15" outlined dense ></v-file-input>
                </div>

                <div class="divInput">
                  <small>Keterangan</small>
                  <div v-if="editor">
                    <div id="editor" style="height:550px"></div>

                  </div>
                </div> <br>




            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="editor = false, mdl_add = false">Close</v-btn>
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
                  <small>Jenis Wisata</small>
                  <v-autocomplete
                    v-model="form.m_jenispariwisata"
                    :items="list_jenis"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    outlined
                    clearable
                    dense
                  />
                </div>

                <div class="divInput">
                  <small>Desa/Kel</small>
                  <v-autocomplete
                    v-model="form.des_kel_id"
                    :items="list_desKel"
                    :search-input.sync ="searchDeskel"
                    @keyup="eventDesKel()"
                    :item-text="'nama_des_kel'"
                    :item-value="'des_kel_id'"
                    outlined
                    dense
                  >
                     <template v-slot:item="data">
                        <div style="margin-top:5px; margin-bottom:5px">
                          <span style="">{{ data.item.nama_des_kel }}</span> <br>
                          <span class="h_subtitle">Kec. {{ data.item.nama_kecamatan }}</span> <br>
                        </div>
                    </template>

                  </v-autocomplete>
                </div>

                 <div class="divInput">
                  <small>Jenis Tata Kelola</small>
                  <v-autocomplete
                    v-model="form.m_jenisTataKelola"
                    :items="list_tataKelola"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    outlined
                    dense
                  />
                </div>

                <div class="divInput">
                  <small>Nama Objek Wisata</small>
                  <v-text-field v-model="form.uraian" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Koordinat Objek Wisata</small>
                  <v-text-field v-model="form.latLong" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Foto Sampul</small>
                  <v-file-input v-model="form.file" truncate-length="15" outlined dense ></v-file-input>
                </div>

                <div class="divInput">
                  <small>Keterangan</small>
                  <div v-if="editorEdit">
                    <div id="editor_edit" style="height:550px">

                    </div>

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
        <v-dialog v-model="mdl_lihat" persistent max-width="850px">

          <v-card>
            <v-app-bar flat class="blue darken-1">
              <v-toolbar-title class="title white--text pl-0">
                Detile Data
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
                <span class="h_judulProduk">{{form.uraian}}</span> <br>
                <hr class="batasAbu2">
                <div style="padding-top:8px">
                  <span>Jenis Wisata : </span> <span class="h_hargaProduk">{{form.m_jenispariwisata_uraian}}</span> <br>
                  <span>Tata Kelola : </span> <span class="h_hargaProduk">{{form.m_jenistatakelola_uraian}}</span> <br>
                  <span>Desa/Kel : </span> <span class="h_hargaProduk">{{form.nama_des_kel}}</span> <br>
                </div>
                <hr class="batasAbu1">
                <br>
                <div class="ql-editor" v-html="UMUM.replaceEscapeString(form.keterangan)"></div>


            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_lihat = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== LIHAT DATA ============================== -->

      <!-- =========================== LIST FASILITAS ============================== -->
        <v-dialog v-model="mdl_list_fasilitas" persistent max-width="975px">

          <v-card>
            <v-app-bar flat class="cyan accent-4">
              <v-toolbar-title class="title white--text pl-0">
                FASILITAS
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_list_fasilitas = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br>
              <v-btn color="blue darken-2" @click="mdl_add_fasilitas = true, editorFasilitas = true, Quilll('editorFasilitas')" style="color:white">Tambah Fasilitas</v-btn>
              <v-spacer></v-spacer>
              <br>
              <hr class="batasAbu">


              <v-simple-table style="width:100%">
                <template v-slot:default>
                  <thead style="background:#5289E7">
                    <tr class="h_table_head">
                      <th class="text-center" style="width:5%">No</th>
                      <th class="text-center" style="width:35%">Uraian</th>
                      <th class="text-center" style="width:10%">Jumlah</th>
                      <th class="text-center" style="width:10%">Tahun</th>
                      <th class="text-center" style="width:25%">Sumber Dana</th>
                      <th class="text-center" style="width:15%">Act</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="h_table_body" v-for="(data, index) in list_fasilitas" :key="data.id">
                      <td class="text-center">{{index+1}}</td>
                      <td>
                        {{data.uraian}}
                        <!-- <br><span class="h_subtitle">xxxx</span> -->
                      </td>
                      <td>{{data.jumlah}} {{data.satuan}}</td>
                      <td class="text-center">{{data.thn}}</td>
                      <td class="text-center">
                        {{data.sumberDana}}
                      </td>
                      <td class="text-center">
                        <v-btn-toggle mandatory>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn color="blue darken-1" fab small v-bind="attrs" v-on="on" >
                                <v-icon color="white">mdi-eye</v-icon>
                              </v-btn>
                            </template>
                            <span>Detile Fasilitas</span>
                          </v-tooltip>

                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn color="orange darken-1" fab small v-bind="attrs" v-on="on" @click="selectDataFasilitas(data), editorFasilitasEdit = true, mdl_edit_fasilitas =true, editQuill(data.keterangan, 'editorFasilitasEdit')">
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






            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_list_fasilitas = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== LIST FASILITAS ============================== -->

      <!-- =========================== ADD FASILITAS ============================== -->
        <v-dialog v-model="mdl_add_fasilitas" persistent max-width="720">

          <v-card>
            <v-app-bar flat class="blue darken-2">
              <v-toolbar-title class="title white--text pl-0">
                FASILITAS
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add_fasilitas = false, editorFasilitas = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br>




                <div class="divInput">
                  <small>Nama Fasilitas</small>
                  <v-text-field v-model="fasilitas.uraian" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Jumlah Fasilitas</small>
                  <v-text-field v-model="fasilitas.jumlah" type="number" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Satuan Fasilitas</small>
                  <v-text-field v-model="fasilitas.satuan" class="placeholerku" outlined dense required/>
                </div>


                <div class="divInput">
                  <small>Tahun Pengadaan</small>
                  <v-text-field v-model="fasilitas.thn" type="number" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Anggaran</small>
                  <v-text-field v-model="fasilitas.anggaran" type="number" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Sumber Anggaran</small>
                  <v-text-field v-model="fasilitas.sumberDana" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Foto Lampiran</small>
                  <v-file-input v-model="fasilitas.file" truncate-length="15" outlined dense ></v-file-input>
                </div>

                <div class="divInput">
                  <small>Keterangan</small>
                  <div v-if="editorFasilitas">
                    <div id="editorFasilitas" style="height:550px"></div>

                  </div>
                </div> <br>




            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_add_fasilitas = false, editorFasilitas = false">Close</v-btn>
              <v-btn color="blue darken-1" @click="addDataFasilitas()" text >Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== ADD FASILITAS ============================== -->

      <!-- =========================== EDIT FASILITAS ============================== -->
        <v-dialog v-model="mdl_edit_fasilitas" persistent max-width="720">

          <v-card>
            <v-app-bar flat class="orange darken-1">
              <v-toolbar-title class="title white--text pl-0">
                FASILITAS
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_edit_fasilitas = false, editorFasilitasEdit = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br>




                <div class="divInput">
                  <small>Nama Fasilitas</small>
                  <v-text-field v-model="fasilitas.uraian" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Jumlah Fasilitas</small>
                  <v-text-field v-model="fasilitas.jumlah" type="number" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Satuan Fasilitas</small>
                  <v-text-field v-model="fasilitas.satuan" class="placeholerku" outlined dense required/>
                </div>


                <div class="divInput">
                  <small>Tahun Pengadaan</small>
                  <v-text-field v-model="fasilitas.thn" type="number" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Anggaran</small>
                  <v-text-field v-model="fasilitas.anggaran" type="number" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Sumber Anggaran</small>
                  <v-text-field v-model="fasilitas.sumberDana" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Foto Lampiran</small>
                  <v-file-input v-model="fasilitas.file" truncate-length="15" outlined dense ></v-file-input>
                </div>

                <div class="divInput">
                  <small>Keterangan</small>
                  <div v-if="editorFasilitasEdit">
                    <div id="editorFasilitasEdit" style="height:550px"></div>

                  </div>
                </div> <br>




            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_edit_fasilitas = false, editorFasilitasEdit = false">Close</v-btn>
              <v-btn color="blue darken-1" @click="editDataFasilitas()" text >Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== EDIT FASILITAS ============================== -->


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
          m_jenisTataKelola : '',
          m_jenispariwisata : '',
          des_kel_id : '',
          uraian : '',
          latLong : '',
          keterangan : '',
          kode : '',
          file : null,

          nama_des_kel : '',
          m_jenispariwisata_uraian : '',
          m_jenistatakelola_uraian : '',
        },

        fasilitas : {
          id : '',
          wisataObjek : '',
          uraian : '',
          thn : '',
          sumberDana : '',
          anggaran : '',
          jumlah : 0,
          satuan : '',
          keterangan : '',
          file : null,
        },

        searchDeskel : '',
        searchDeskelEdit : '',
        fileOld : '',
        fileOldFasilitas : '',

        list_data : [],
        list_jenis : [],
        list_desKel : [],
        list_tataKelola : [],

        list_fasilitas : [],

        page_first: 1,
        page_last: 0,
        page_limit : 8,
        cari_value: "",


        mdl_add : false,
        mdl_edit : false,
        mdl_lihat : false,
        mdl_map : false,
        mdl_list_fasilitas : false,
        mdl_add_fasilitas : false,
        mdl_edit_fasilitas : false,

        UMUM : UMUM,
        FETCHING : FETCHING,


        editor : false,
        editorEdit : false,

        editorFasilitas : false,
        editorFasilitasEdit : false,


      }
    },
    methods: {

      getView : function(){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_WISATA_OBJEK + "view", {
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
        this.form.keterangan = document.querySelector('#editor').children[0].innerHTML
        var formData = new FormData();
        formData.append('m_jenisTataKelola', this.form.m_jenisTataKelola);
        formData.append('m_jenispariwisata', this.form.m_jenispariwisata);
        formData.append('des_kel_id', this.form.des_kel_id);
        formData.append('uraian', this.form.uraian);
        formData.append('latLong', this.form.latLong);
        formData.append('keterangan', this.form.keterangan);
        formData.append('kode', this.form.kode);
        formData.append('file', this.form.file);

        fetch(this.$store.state.url.URL_WISATA_OBJEK + "addData", {
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
        formData.append('m_jenisTataKelola', this.form.m_jenisTataKelola);
        formData.append('m_jenispariwisata', this.form.m_jenispariwisata);
        formData.append('des_kel_id', this.form.des_kel_id);
        formData.append('uraian', this.form.uraian);
        formData.append('latLong', this.form.latLong);
        formData.append('keterangan', this.form.keterangan);
        formData.append('kode', this.form.kode);
        formData.append('file', this.form.file);
        formData.append('fileOld', this.fileOld);

        fetch(this.$store.state.url.URL_WISATA_OBJEK + "editData", {
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
        fetch(this.$store.state.url.URL_WISATA_OBJEK + "removeData", {
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

          console.log(data)
          this.form.id = data.id;
          this.form.m_jenispariwisata = data.m_jenispariwisata;
          this.form.m_jenisTataKelola = data.m_jenisTataKelola;
          this.form.des_kel_id = data.des_kel_id;
          this.form.uraian = data.uraian;
          this.form.latLong = data.latLong;
          this.form.keterangan = data.keterangan;
          this.form.kode = data.kode;
          this.fileOld = data.file;

          this.form.nama_des_kel = data.nama_des_kel;
          this.form.m_jenispariwisata_uraian = data.m_jenispariwisata_uraian;
          this.form.m_jenistatakelola_uraian = data.m_jenistatakelola_uraian;

          var searchDeskelEdit = data.nama_des_kel;
          this.list_desKel =  await FETCHING.postDesKel(searchDeskelEdit);


      },

      openFasilitas : async function(data){
        this.fasilitas.wisataObjek = data.id;
        this.getViewFasilitas();
      },


      getViewFasilitas : function(){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_WISATA_OBJEK_FASILITAS + "view", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                wisataObjek: this.fasilitas.wisataObjek

            })
        })
            .then(res => res.json())
            .then(res_data => {
              console.log(res_data)

              this.list_fasilitas = res_data

        });
      },




      addDataFasilitas : function(number) {
        this.fasilitas.keterangan = document.querySelector('#editorFasilitas').children[0].innerHTML;



        // console.log(object)


        var formData = new FormData();
        formData.append('wisataObjek', this.fasilitas.wisataObjek);
        formData.append('uraian', this.fasilitas.uraian);
        formData.append('thn', this.fasilitas.thn);
        formData.append('sumberDana', this.fasilitas.sumberDana);
        formData.append('anggaran', this.fasilitas.anggaran);
        formData.append('jumlah', this.fasilitas.jumlah);
        formData.append('satuan', this.fasilitas.satuan);
        formData.append('keterangan', this.fasilitas.keterangan);
        formData.append('file', this.fasilitas.file);

        fetch(this.$store.state.url.URL_WISATA_OBJEK_FASILITAS + "addData", {
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

      editDataFasilitas : function(){
        this.form.keterangan = document.querySelector('#editorFasilitasEdit').children[0].innerHTML

        var formData = new FormData();
        formData.append('id', this.fasilitas.id);
        formData.append('wisataObjek', this.fasilitas.wisataObjek);
        formData.append('uraian', this.fasilitas.uraian);
        formData.append('thn', this.fasilitas.thn);
        formData.append('sumberDana', this.fasilitas.sumberDana);
        formData.append('anggaran', this.fasilitas.anggaran);
        formData.append('jumlah', this.fasilitas.jumlah);
        formData.append('satuan', this.fasilitas.satuan);
        formData.append('keterangan', this.fasilitas.keterangan);
        formData.append('file', this.fasilitas.file);
        formData.append('fileOld', this.fileOldFasilitas);

        fetch(this.$store.state.url.URL_WISATA_OBJEK_FASILITAS + "editData", {
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

      removeDataFasilitas : async function(data){

        await UMUM.notifDelete();
        fetch(this.$store.state.url.URL_WISATA_OBJEK_FASILITAS + "removeData", {
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

      selectDataFasilitas : async function(data){


          this.fasilitas.id = data.id;
          this.fasilitas.wisataObjek = data.wisataObjek;
          this.fasilitas.uraian = data.uraian;
          this.fasilitas.thn = data.thn;
          this.fasilitas.sumberDana = data.sumberDana;
          this.fasilitas.anggaran = data.anggaran;
          this.fasilitas.jumlah = data.jumlah;
          this.fasilitas.satuan = data.satuan;
          this.fasilitas.keterangan = data.keterangan;
          this.fileOldFasilitas = data.file;
      },




      eventDesKel : async function(){
          this.list_desKel =  await FETCHING.postDesKel(this.searchDeskel);
        },

      eventDesKelEdit : async function(){
        this.list_desKel =  await FETCHING.postDesKel(this.searchDeskelEdit);
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
          this.list_desKel =  await FETCHING.postDesKel();
          this.list_tataKelola = await FETCHING.postJenisTataKelola();
          // console.log(this.list_jenis)
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
      this.fetching();
      this.getView();
    },
  }
</script>

<style>
</style>
