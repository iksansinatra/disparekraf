<template>
  <div class="mainPage">
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="subBar" style="padding:10px" no-gutters>
          <v-col cols="12" md="4">
            <span class="h_judul">Pelaku Ekokraf</span>
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
                <th class="text-center" style="width:20%">Alamat</th>
                <th class="text-center" style="width:20%">Brand</th>
                <th class="text-center" style="width:20%">Nama Pemilik</th>
                <th class="text-center" style="width:15%">Kontak</th>
                <th class="text-center" style="width:10%">Produk</th>
                <th class="text-center" style="width:10%">Act</th>
              </tr>
            </thead>
            <tbody>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td class="text-left">
                  {{data.alamat}} <br>
                  <span class="h_subtitle">DES/KEL.{{data.nama_des_kel}}</span>
                </td>
                  <td>
                  {{data.brand}} <br>
                  <span class="h_subtitle">{{data.ekokrafjenis_uraian}}</span>
                </td>
                <td>
                  {{data.pelaku}}<br>
                  <span class="h_subtitle">{{data.nik}}</span>
                </td>
                <td>
                  {{data.hp}} <br>
                  <span class="h_subtitle">{{data.email}}</span>
                </td>
                <td class="text-center">
                  <v-btn :color="UMUM.checkZero(data.jmlProduk)" small rounded @click="openProduct(data), mdl_list_produk = true">
                    <v-icon left>mdi-cart</v-icon>
                    {{data.jmlProduk}}
                  </v-btn>
                </td>
                <td class="text-center">
                  <v-btn-toggle mandatory>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="blue darken-1" fab small v-bind="attrs" v-on="on" @click="selectData(data), mdl_lihat = true">
                          <v-icon color="white">mdi-eye</v-icon>
                        </v-btn>
                      </template>
                      <span>Lihat Profil</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="orange darken-1" fab small v-bind="attrs" v-on="on" @click="selectData(data), mdl_edit = true, editQuill(data.profil, 'editor_edit')">
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
              <v-btn color="white" icon  @click="mdl_add = false, editor = false, close()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>
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
                          <span class="h_subtitle">KECAMATAN {{ data.item.nama_kecamatan }}</span> <br>
                          <span class="h_subtitle">{{ data.item.nama_kabupaten }}</span> <br>
                        </div>
                    </template>

                  </v-autocomplete>
                </div>

                <div class="divInput">
                  <small>Jenis Sub Sektor</small>
                  <v-autocomplete
                    v-model="form.ekokrafJenis"
                    :items="list_jenis"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    outlined
                    clearable
                    dense
                  />
                </div>
                <div class="divInput">
                  <small>Nama Brand</small>
                  <v-text-field v-model="form.brand" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Nama Pemilik</small>
                  <v-text-field v-model="form.pelaku" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>NIK</small>
                  <v-text-field v-model="form.nik" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Telepon</small>
                  <v-text-field v-model="form.hp" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Email</small>
                  <v-text-field v-model="form.email" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Tahun</small>
                  <v-text-field v-model="form.tahun" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Tenaga Kerja</small>
                  <v-text-field v-model="form.tenaga" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Omset</small>
                  <v-text-field v-model="form.omset" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Badan Usaha</small>
                  <v-text-field v-model="form.badan_usaha" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Alamat</small>
                  <v-text-field v-model="form.alamat" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Profil</small>
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
                  <small>Desa/Kel</small>
                  <v-autocomplete
                    v-model="form.des_kel_id"
                    :items="list_desKel"
                    :search-input.sync ="searchDeskelEdit"
                    @keyup="eventDesKelEdit()"
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
                  <small>Jenis Sub Sektor</small>
                  <v-autocomplete
                    v-model="produk.m_jenisPariwisata"
                    :items="list_jenis"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    outlined
                    clearable
                    dense
                  />
                </div>

                <div class="divInput">
                  <small>Nama Brand</small>
                  <v-text-field v-model="form.brand" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Nama Pemilik</small>
                  <v-text-field v-model="form.pelaku" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>NIK</small>
                  <v-text-field v-model="form.nik" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Telepon</small>
                  <v-text-field v-model="form.hp" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Email</small>
                  <v-text-field v-model="form.email" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Tahun</small>
                  <v-text-field v-model="form.tahun" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Tenaga Kerja</small>
                  <v-text-field v-model="form.tenaga" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Omset</small>
                  <v-text-field v-model="form.omset" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Badan Usaha</small>
                  <v-text-field v-model="form.badan_usaha" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Alamat</small>
                  <v-text-field v-model="form.alamat" class="placeholerku" outlined dense required/>
                </div>
                <div class="divInput">
                  <small>Profil</small>
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

      <!-- =========================== LIHAT DATA ============================== -->
        <v-dialog v-model="mdl_lihat" persistent max-width="780px">

          <v-card>
            <v-app-bar flat class="blue darken-1">
              <v-toolbar-title class="title white--text pl-0">
                Profil Ekokraf
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_lihat = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br>
                <br>
                <!-- <img :src="$store.state.URLX+'uploads/'+fileOld" style="width:100%; height:auto" alt=""> -->
                <!-- <v-img :src="$store.state.URLX+'uploads/'+fileOld"></v-img> -->
                <!-- <v-img :src="'https://www.celebes.co/wp-content/uploads/2019/10/Keunikan-Air-Terjun-Moramo.jpg'"></v-img> -->
                <!-- <br>
                <hr class="batasAbu">
                <br> -->
                <span class="h_judulProduk">{{form.pelaku}} || {{form.brand}}</span> <br>
                <hr class="batasAbu2">
                <div style="padding-top:8px">
                  <span class="h_hargaProduk">Badan Usaha : {{form.badan_usaha}}</span> <br>
                  <span class="h_hargaProduk">Tahun Mulai Usaha : {{form.tahun}}</span> <br>
                  <span class="h_subtitle">Jumlah Tenaga Kerja : {{form.tenaga}}</span> <br>
                  <span class="h_subtitle">Jumlah Omset : {{form.omset}}</span> <br>
                </div>
                <hr class="batasAbu1">
                <br>
                <div class="ql-editor" v-html="UMUM.replaceEscapeString(form.profil)"></div>




            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_lihat = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== LIHAT DATA ============================== -->

      <!-- =========================== VIEW LIST PRODUK ============================== -->
      <!-- transition="none" -->
        <v-dialog v-model="mdl_list_produk" persistent max-width="1200px" no-click-animation transition="none">

          <v-card>
            <v-app-bar flat class="bg-blue">
              <v-toolbar-title class="title white--text pl-0">
                Produk
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_list_produk = false, close()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>
                <v-btn color="blue" elevation="2" @click="mdl_add_produk= true">
                  <span style="color:white">TAMBAH PRODUK</span>
                </v-btn> <br> <br>
                <hr class="batasAbu" /> <br>
                <v-row>

                    <v-col cols="12" md="4" v-for="data in list_produk" :key="data.id">
                      <v-card class="mediaCard" color="#5289e7" dark>
                        <v-row>
                          <v-col cols="12" md="8">
                            <span class="mediaTitle">{{data.brand}}</span> <br>
                            <div style="line-height: 90%; text-align: justify;">
                              <span class="mediaSubTitle text-justify two_line">{{UMUM.replaceEscapeString(data.keterangan)}}</span>
                              <br>
                              <span>Rp.{{UMUM.formatMoney(data.harga)}}</span>
                            </div>
                          </v-col>

                          <v-col cols="12" md="4">
                            <v-img width="85px" height="100px" :src="$store.state.URLX+'uploads/'+data.file"></v-img>
                          </v-col>
                        </v-row>
                        <br>
                              <v-btn outlined rounded small @click="selectDataProduk(data), mdl_lihat_produk=true">Lihat</v-btn>
                              <v-btn outlined rounded small @click="selectDataProduk(data), mdl_edit_produk=true">Edit</v-btn>
                              <v-btn outlined rounded small @click="removeDataProduk(data)">Hapus</v-btn>
                      </v-card>
                    </v-col>
                  </v-row>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_list_produk = false, close()">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== VIEW LIST PRODUK ============================== -->

      <!-- =========================== ADD PRODUK ============================== -->
        <v-dialog v-model="mdl_add_produk" persistent max-width="600px" transition="none">

          <v-card>
            <v-app-bar flat class="blue">
              <v-toolbar-title class="title white--text pl-0">
                Tambah Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_add_produk = false, close()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>


                <div class="divInput">
                  <small>Jenis Pariwisata</small>
                  <v-autocomplete
                    v-model="produk.m_jenisPariwisata"
                    :items="list_jenis"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    outlined
                    clearable
                    dense
                  />
                </div>


                <div class="divInput">
                  <small>Brand</small>
                  <v-text-field v-model="produk.brand" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Harga</small>
                  <v-text-field type="number" v-model="produk.harga" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Stock</small>
                  <v-text-field type="number" v-model="produk.stock" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Keterangan</small>
                  <v-textarea v-model="produk.keterangan" outlined name="input-7-4"></v-textarea>
                </div>


                <div class="divInput">
                  <small>Foto</small>
                  <v-file-input v-model="produk.file" truncate-length="15" outlined dense ></v-file-input>
                </div>


            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_add_produk = false, close()">Close</v-btn>
              <v-btn color="blue darken-1" text @click="addDataProduk()" >Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== ADD PRODUK ============================== -->

      <!-- =========================== EDIT PRODUK ============================== -->
        <v-dialog v-model="mdl_edit_produk" persistent max-width="600px" transition="none">

          <v-card>
            <v-app-bar flat class="orange darken-1">
              <v-toolbar-title class="title white--text pl-0">
                Edit Data
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_edit_produk = false, close()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>


                <div class="divInput">
                  <small>Jenis Pariwisata</small>
                  <v-autocomplete
                    v-model="produk.m_jenisPariwisata"
                    :items="list_jenis"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    outlined
                    clearable
                    dense
                  />
                </div>


                <div class="divInput">
                  <small>Brand</small>
                  <v-text-field v-model="produk.brand" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Harga</small>
                  <v-text-field type="number" v-model="produk.harga" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Stock</small>
                  <v-text-field type="number" v-model="produk.stock" class="placeholerku" outlined dense required/>
                </div>

                <div class="divInput">
                  <small>Keterangan</small>
                  <v-textarea v-model="produk.keterangan" outlined name="input-7-4"></v-textarea>
                </div>


                <div class="divInput">
                  <small>Foto</small>
                  <v-file-input v-model="produk.file" truncate-length="15" outlined dense ></v-file-input>
                </div>


            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_edit_produk = false, close()">Close</v-btn>
              <v-btn color="blue darken-1" text @click="editDataProduk()" >Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== EDIT PRODUK ============================== -->

      <!-- =========================== LIHAT PRODUK ============================== -->
        <v-dialog v-model="mdl_lihat_produk" persistent max-width="600px" transition="none">

          <v-card>
            <v-app-bar flat class="light-blue accent-4">
              <v-toolbar-title class="title white--text pl-0">
                Detail Produk
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" icon  @click="mdl_lihat_produk = false, close()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text>

                <br><br>
                <v-img :src="$store.state.URLX+'uploads/'+fileOld"></v-img>
                <hr class="batasAbu" /> <br>

                <span class="h_judulProduk">{{produk.brand}}</span> <br>

                <div style="padding-top:14px">{{produk.keterangan}}</div>
                <hr class="batasAbu2">
                <div style="padding-top:8px">
                  <span>Harga : </span> <span class="h_hargaProduk">Rp.20.000</span> <br>
                  <span>Stock : </span> <span class="h_hargaProduk">12</span> <br>
                </div>
                <hr class="batasAbu1">
                <div style="padding-top:12px">
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
                </div>
                <br>
                <hr class="batasAbu2">
                <br>
                <v-chip small>Kat : {{produk.m_jenispariwisata_uraian}}</v-chip>
                <br><br>
                <hr class="batasAbu" />
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="mdl_lihat_produk = false, close()">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <!-- =========================== LIHAT PRODUK ============================== -->


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
          ekokrafJenis   : '',
          brand : '',
          pelaku : '',
          nik : '',
          badan_usaha : '',
          alamat : '',
          email : '',
          hp : '',
          tahun : '',
          tenaga : '',
          omset : '',
          profil : '',
          des_kel_id  : '',

          m_jenispariwisata_uraian : '',

          nama_des_kel  : '',
        },

        produk : {
          id : '',
          m_jenisPariwisata  : '',
          ekokrafPelaku  : '',
          brand : '',
          harga : '',
          stock : '',
          keterangan : '',
          file : null,

          m_jenispariwisata_uraian : '',
          ekokrafpelaku_pelaku : '',
          ekokrafpelaku_badan_usaha : '',
          ekokrafpelaku_alamat : '',
          ekokrafpelaku_email : '',
          ekokrafpelaku_hp : '',
        },

        fileOld : '',

        editor : false,
        editorEdit : false,

        searchDeskel : '',
        searchJenisEko : '',
        searchDeskelEdit : '',
        searchJenisEkoEdit : '',

        list_data : [],
        list_desKel : [],
        list_jenisEko : [],
        list_jenis : [],

        page_first: 1,
        page_last: 0,
        page_limit : 8,
        cari_value: "",

        mdl_lihat : false,
        mdl_add : false,
        mdl_edit : false,

        // ========= PRODUK =========
        mdl_list_produk : false,
        mdl_add_produk : false,
        mdl_edit_produk : false,
        mdl_lihat_produk : false,

        list_produk : [],


        page_first1: 1,
        page_last1: 0,
        page_limit1 : 8,
        cari_value1: "",

        // ========= PRODUK =========

        UMUM : UMUM,
        FETCHING : FETCHING,


      }
    },
    methods: {

      getView : function(){
        // this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_EKO_PELAKU + "view", {
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

        this.form.profil = document.querySelector('#editor').children[0].innerHTML

        fetch(this.$store.state.url.URL_EKO_PELAKU + "addData", {
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
        this.form.profil = document.querySelector('#editor_edit').children[0].innerHTML
        fetch(this.$store.state.url.URL_EKO_PELAKU + "editData", {
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
        fetch(this.$store.state.url.URL_EKO_PELAKU + "removeData", {
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
          this.form.ekokrafJenis = data.ekokrafJenis;
          this.form.brand = data.brand;
          this.form.pelaku = data.pelaku;
          this.form.nik = data.nik;
          this.form.badan_usaha = data.badan_usaha;

          this.form.alamat = data.alamat;
          this.form.email = data.email;
          this.form.hp = data.hp;
          this.form.tahun = data.tahun;
          this.form.tenaga = data.tenaga;
          this.form.omset = data.omset;
          this.form.profil = data.profil;
          this.form.des_kel_id = data.des_kel_id;
          this.form.nama_des_kel = data.nama_des_kel;

          this.searchDeskelEdit = data.nama_des_kel;
          this.searchJenisEkoEdit = data.ekokrafjenis_uraian;
          this.list_desKel =  await FETCHING.postDesKel(this.searchDeskelEdit);
          this.list_klpEko =  await FETCHING.postKlpEko(this.searchKlpEkoEdit);


      },

      // ====================================== PRODUK ====================================
      openProduct(data){
        this.produk.ekokrafPelaku = data.id;
        this.getViewProduk();
      },
      getViewProduk : function(){
        fetch(this.$store.state.url.URL_EKO_PELAKU_PRODUK + "view", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                ekokrafPelaku : this.produk.ekokrafPelaku,
                data_ke: this.page_first1,
                cari_value: this.cari_value1,
                page_limit : this.page_limit1,
            })
        })
            .then(res => res.json())
            .then(res_data => {
              console.log(res_data)
              this.list_produk = res_data.data;
              this.page_last1 = res_data.jml_data;
        });
      },


      addDataProduk : function() {

        var formData = new FormData();
        formData.append('m_jenisPariwisata', this.produk.m_jenisPariwisata);
        formData.append('ekokrafPelaku', this.produk.ekokrafPelaku);
        formData.append('brand', this.produk.brand);
        formData.append('harga', this.produk.harga);
        formData.append('stock', this.produk.stock);
        formData.append('keterangan', this.produk.keterangan);
        formData.append('file', this.produk.file);

        fetch(this.$store.state.url.URL_EKO_PELAKU_PRODUK + "addData", {
            method: "POST",
            headers: {
              authorization: "kikensbatara " + localStorage.token
            },
            body: formData
        }).then(res_data => {
            this.getViewProduk();
            this.getView();
            this.$store.commit('notifAdd', 'Menambah')
        });
        // console.log(this.produk.file)
      },

      editDataProduk : function(){
        var formData = new FormData();
        formData.append('id', this.produk.id);
        formData.append('m_jenisPariwisata', this.produk.m_jenisPariwisata);
        formData.append('ekokrafPelaku', this.produk.ekokrafPelaku);
        formData.append('brand', this.produk.brand);
        formData.append('harga', this.produk.harga);
        formData.append('stock', this.produk.stock);
        formData.append('keterangan', this.produk.keterangan);
        formData.append('file', this.produk.file);
        formData.append('fileOld', this.fileOld);

        fetch(this.$store.state.url.URL_EKO_PELAKU_PRODUK + "editData", {
            method: "POST",
            headers: {
              authorization: "kikensbatara " + localStorage.token
            },
            body: formData
        }).then(res_data => {
            // this.getView();
            this.getViewProduk();
            this.$store.commit('notifAdd', 'Menambah')
        });
      },

      removeDataProduk : async function(data){

        await UMUM.notifDelete();
        fetch(this.$store.state.url.URL_EKO_PELAKU_PRODUK + "removeData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(data)
        }).then(res_data => {
            this.getViewProduk();
            this.getView();
            this.$store.commit('notifAdd', 'Menghapus')
        });
      },

      selectDataProduk : async function(data){
          this.produk.id = data.id;
          this.produk.m_jenisPariwisata = data.m_jenisPariwisata;
          this.produk.ekokrafPelaku = data.ekokrafPelaku;
          this.produk.brand = data.brand;
          this.produk.harga = data.harga;
          this.produk.stock = data.stock;
          this.produk.keterangan = UMUM.replaceEscapeString(data.keterangan);
          this.fileOld = data.file;

          this.produk.m_jenispariwisata_uraian = data.m_jenispariwisata_uraian;
          this.produk.ekokrafpelaku_pelaku = data.ekokrafpelaku_pelaku;
          this.produk.ekokrafpelaku_badan_usaha = data.ekokrafpelaku_badan_usaha;
          this.produk.ekokrafpelaku_alamat = data.ekokrafpelaku_alamat;
          this.produk.ekokrafpelaku_email = data.ekokrafpelaku_email;
          this.produk.ekokrafpelaku_hp = data.ekokrafpelaku_hp;

      },

      // ====================================== PRODUK ====================================

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
          this.list_desKel =  await FETCHING.postDesKel();
          this.list_klpEko =  await FETCHING.postKlpEko();
          this.list_jenis = await FETCHING.getJenisPariwisata()
          // console.log(this.list_desKel)
        },

        eventDesKel : async function(){
          this.list_desKel =  await FETCHING.postDesKel(this.searchDeskel);
        },
        eventKlpEko : async function(){
          this.list_klpEko =  await FETCHING.postKlpEko(this.searchKlpEko);
        },

        eventDesKelEdit : async function(){
          this.list_desKel =  await FETCHING.postDesKel(this.searchDeskelEdit);
        },
        eventKlpEkoEdit : async function(){
          this.list_klpEko =  await FETCHING.postKlpEko(this.searchKlpEkoEdit);
        },

        close : async function(){
          this.fetching();
          this.searchDeskel = '';
          this.searchKlpEko = '';

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
