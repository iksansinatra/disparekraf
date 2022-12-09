<template>
  <div>
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-row class="subBar" style="padding:10px" no-gutters>
          <v-col cols="12" md="6">
            <span class="h_judul">Dinas Pariwisata & Ekonomi Kreatif</span>
            <br />
            <span class="h_Sub_judul">Provinsi Sulawesi Tenggara</span>
          </v-col>

          <v-col cols="12" md="3" style="padding-right:2%">

                <v-autocomplete
                    :items="list_kab"
                    :search-input.sync ="searchKab"
                    @keyup="eventKab()"
                    :item-text="'nama_kabupaten'"
                    :item-value="'kabupaten_id'"
                    label="Pilih Kabupaten"
                    outlined
                    dense
                  >
                     <template v-slot:item="data">
                        <div style="margin-top:5px; margin-bottom:5px">
                          <span style="">{{ data.item.nama_kabupaten }}</span> <br>
                        </div>
                    </template>

                  </v-autocomplete>
          </v-col>

          <v-col cols="12" md="3" style="padding-right:2%">
            <v-autocomplete
                    :items="list_jenis"
                    :item-text="'uraian'"
                    :item-value="'id'"
                    label="Pilih Jenis Ekokraf"
                    outlined
                    dense
                    @change="getPelakuJenis()"
                  >
                  </v-autocomplete>
          </v-col>
        </v-row>
      </v-card>
    <v-card class="cardContent">
      <v-row>
        <v-col cols="12" md="3">
          <div>
            <v-row class="rowContent elevation-1">
              <v-col cols="3" class="roundLeft vertical-center" style="background:#256AE1">
                <v-icon style="color:white; font-size:45px">mdi-chart-bar</v-icon>
              </v-col>
              <v-col cols="9" class="roundRight" style="background:#5289E7">
                <span class="HomeBarTitle">Komunitas Ekokraf</span>
                <br />
                <span class="HomeBarSubTitle">{{jumlah_komunitas}}</span>
              </v-col>
            </v-row>
          </div>
        </v-col>

        <v-col cols="12" md="3">
          <div>
            <v-row class="rowContent elevation-1">
              <v-col cols="3" class="roundLeft vertical-center" style="background:#E125C8">
                <v-icon style="color:white; font-size:45px">mdi-account</v-icon>
              </v-col>
              <v-col cols="9" class="roundRight" style="background:#E752D3">
                <span class="HomeBarTitle">Pelaku Ekokraf</span>
                <br />
                <span class="HomeBarSubTitle">{{jumlah_pelaku}}</span>
              </v-col>
            </v-row>
          </div>
        </v-col>

        <v-col cols="12" md="3">
          <div>
            <v-row class="rowContent elevation-1">
              <v-col cols="3" class="roundLeft vertical-center" style="background:#E19C25">
                <v-icon style="color:white; font-size:45px">mdi-shopping</v-icon>
              </v-col>
              <v-col cols="9" class="roundRight" style="background:#E7B052">
                <span class="HomeBarTitle">Produk Ekokraf</span>
                <br />
                <span class="HomeBarSubTitle">{{jumlah_produk}}</span>
              </v-col>
            </v-row>
          </div>
        </v-col>

        <v-col cols="12" md="3">
          <div>
            <v-row class="rowContent elevation-1">
              <v-col cols="3" class="roundLeft vertical-center" style="background:#5FC13E">
                <v-icon style="color:white; font-size:45px">mdi-account-box</v-icon>
              </v-col>
              <v-col cols="9" class="roundRight" style="background:#7FCD65">
                <span class="HomeBarTitle">Tenaga Kerja</span>
                <br />
                <span class="HomeBarSubTitle">{{jumlah_tenaga}}</span>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <br />
      <hr class="batasAbu" />
      <br>

      <v-row>
        <v-col cols="12" md="6">
          <div id="chart1"></div>
        </v-col>

        <v-col cols="12" md="6">
          <div id="subSektor"></div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <div id="pieChart1"></div>
        </v-col>

        <v-col cols="12" md="6">
          <div id="kemapanan"></div>
        </v-col>
      </v-row>

        <br>
       <hr class="batasAbu" />
       <br>

      <!-- <div>
        <v-simple-table style="width:100%">
          <template v-slot:default>
            <thead  style="background:#5289E7">
              <tr class="h_table_head">
                <th class="text-left" style="width:5%">No</th>
                <th class="text-left" style="width:35%">Name</th>
                <th class="text-left" style="width:35%">Calories</th>
                <th class="text-left" style="width:15%">Act</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-center">1.</td>
                <td>Oh</td>
                <td>Tuhan</td>
                <td class="text-center">
                  <v-btn-toggle mandatory>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="light-green darken-1" fab small v-bind="attrs" v-on="on">
                          <v-icon color="white">mdi-file-pdf</v-icon>
                        </v-btn>
                      </template>
                      <span>Lihat Data</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="orange darken-1" fab small v-bind="attrs" v-on="on">
                          <v-icon color="white">mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Ubah Data</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="red darken-4" fab small v-bind="attrs" v-on="on">
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
      </div> -->

    </v-card>
    </v-container>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// import VuetifyLogo from '~/components/VuetifyLogo.vue'

import UMUM from "../library/umum";
import FETCHING from "../library/fetching";

export default {
  // components: {
  //   Logo,
  //   VuetifyLogo
  // },
  data() {
    return {
      list_kab : [],
      list_jenis : [],
      searchKab : '',
      jumlah_pelaku : '',
      jumlah_produk : '',
      jumlah_komunitas : '',
      jumlah_tenaga : '',
      UMUM : UMUM,
      FETCHING : FETCHING,

    }
  },

  methods: {

    getJumlahPelaku : function(){
        fetch(this.$store.state.url.URL_INDEX + "pelaku", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
        })
            .then(res => res.json())
            .then(res_data => {
              console.log(res_data);
              this.jumlah_pelaku = res_data.data[0].jumlah_pelaku;
              // console.log(jumlah_pelaku);
        });
      },

      getJumlahProduk : function(){
        fetch(this.$store.state.url.URL_INDEX + "produk", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
        })
            .then(res => res.json())
            .then(res_data => {
              console.log(res_data);
              this.jumlah_produk = res_data.data[0].jumlah_produk;
              // console.log(jumlah_pelaku);
        });
      },

      getJumlahKomunitas : function(){
        fetch(this.$store.state.url.URL_INDEX + "komunitas", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
        })
            .then(res => res.json())
            .then(res_data => {
              console.log(res_data);
              this.jumlah_komunitas = res_data.data[0].jumlah_komunitas;
              // console.log(jumlah_pelaku);
        });
      },

      getJumlahTenaga : function(){
        fetch(this.$store.state.url.URL_INDEX + "tenaga", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
        })
            .then(res => res.json())
            .then(res_data => {
              console.log(res_data);
              this.jumlah_tenaga = res_data.data[0].jumlah_tenaga;
              // console.log(jumlah_pelaku);
        });
      },

    fetching : async function(){
          this.list_kab =  await FETCHING.postKab();
          this.list_jenis = await FETCHING.getJenisPariwisata();
          // this.list_indikator = await FETCHING.getPotensi()
        },

    eventKab : async function(){
          this.list_kab =  await FETCHING.postKab(this.searchKab);
        },

    chart1(chartku) {
      const chart = Highcharts.chart(chartku, {
          chart: {
              borderColor: '#efefef',
              borderWidth: 2,
          },
          title: {
              text: 'Pelaku Ekokraf Kabupaten / Kota'
          },
          subtitle: {
              text: ''
          },
          xAxis: {
              categories: ['Kendari', 'Bau-Bau', 'Buton', 'Buton Utara', 'Buton Tengah', 'Buton Selatan', 'Konawe', 'Konawe Kepulauan', 'Konawe Selatan', 'Konawe Utara', 'Kolaka', 'Kolaka Utara', 'Kolaka Timur', 'Bombana', 'Muna', 'Muna Barat', 'Wakatobi' ]
          },
          yAxis: {
        title: {
            useHTML: true,
            text: 'Jumlah'
        }
    },
          series: [{
              type: 'column',
              colorByPoint: true,
              data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4, 148.5, 216.4, 194.1, 95.6, 54.4],
              showInLegend: false
          }]
      });


    },

    subSektor(chartku) {
      const chart = Highcharts.chart(chartku, {
          chart: {
              borderColor: '#efefef',
              borderWidth: 2,
          },
          title: {
              text: 'Keunggulan Sub Sektor Kota Kreatif'
          },
          subtitle: {
              text: ''
          },
          xAxis: {
              categories: ['Kuliner', 'Fesyen', 'Musik', 'Film, Animasi dan Video', 'Televisi dan Radio', 'Fotografi', 'Arsitektur', 'Kriya', 'Aplikasi dan Game', 'Seni Pertunjukan', 'Seni Rupa', 'Desain Grafis', 'Desain Interior', 'Desain Produk', 'Periklanan', 'Penerbitan', 'Pengembangan Permainan' ]
          },
          yAxis: {
        title: {
            useHTML: true,
            text: 'Persentasi'
        }
    },
          series: [{
              type: 'column',
              colorByPoint: true,
              data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4, 148.5, 216.4, 194.1, 95.6, 54.4],
              showInLegend: false
          }]
      });


    },

    kemapanan(data){
      Highcharts.chart(data, {
    chart: {
        type: 'column',
        borderColor: '#efefef',
              borderWidth: 2,
    },
    title: {
        text: 'Kemapanan Sub Sektor Ekonomi Kreatif'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: [
            'Kuliner', 'Fashion', 'Musik', 'Film, Animasi dan Video', 'Televisi dan Radio', 'Fotografi', 'Arsitektur', 'Kriya', 'Aplikasi dan Game', 'Seni Pertunjukan', 'Seni Rupa', 'Desain Grafis', 'Desain Interior', 'Desain Produk', 'Periklanan', 'Penerbitan', 'Pengembangan Permainan'
        ],
        crosshair: true
    },
    yAxis: {
        title: {
            useHTML: true,
            text: 'Persentasi'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'SDM',
        data: [13.93, 13.63, 13.73, 13.67, 14.37, 14.89, 14.56,
            14.32, 14.13, 13.93, 13.21, 12.16, 13.21, 12.16, 11.96, 13.21, 12.16]

    }, {
        name: 'Karya',
        data: [12.24, 12.24, 11.95, 12.02, 11.65, 11.96, 11.59,
            11.94, 11.96, 11.59, 11.42, 11.76, 13.21, 12.16, 11.96, 13.21, 12.16]

    }, {
        name: 'Pemasaran',
        data: [10.00, 9.93, 9.97, 10.01, 10.23, 10.26, 10.00,
            9.12, 9.36, 8.72, 8.38, 8.69, 13.21, 11.96, 12.16, 13.21, 12.16]

    }, {
        name: 'R & D',
        data: [4.35, 4.32, 4.34, 4.39, 4.46, 4.52, 4.58, 4.55,
            4.53, 4.51, 4.49, 4.57, 13.21, 12.16, 13.21, 11.96, 12.16]

    }]
});
    },

    pieChart1(datax){

      // Build the chart
      Highcharts.chart(datax, {
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              borderColor: '#efefef',
              borderWidth: 2,
              type: 'pie'
          },
          title: {
              text: 'Kapasitas Indikator Ekosistem Ekonomi Kreatif'
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          accessibility: {
              point: {
                  valueSuffix: '%'
              }
          },
          plotOptions: {
              pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: false
                  },
                  showInLegend: true
              }
          },
          series: [{
              name: 'Brands',
              colorByPoint: true,
              data: [{
                  name: 'SDM',
                  y: 61.41,
                  sliced: true,
                  selected: true
              }, {
                  name: 'Karya',
                  y: 11.84
              }, {
                  name: 'Pemasaran',
                  y: 10.85
              }, {
                  name: 'R & D',
                  y: 4.67
              }]
          }]
      });

    }


  },

  mounted () {
    this.chart1('chart1');
    this.pieChart1('pieChart1');
    this.subSektor('subSektor');
    this.kemapanan('kemapanan');
    this.fetching();
    this.getJumlahPelaku();
    this.getJumlahProduk();
    this.getJumlahKomunitas();
    this.getJumlahTenaga();
  },
}
</script>
