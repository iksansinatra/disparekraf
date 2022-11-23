<template>
  <div>
    <br />
    <hr class="batasAbu" />
    <v-card class="cardContent">
      <v-row>
        <v-col cols="12" md="3">
          <div>
            <v-row class="rowContent elevation-1">
              <v-col cols="3" class="roundLeft vertical-center" style="background:#256AE1">
                <v-icon style="color:white; font-size:45px">mdi-chart-bar</v-icon>
              </v-col>
              <v-col cols="9" class="roundRight" style="background:#5289E7">
                <span class="HomeBarTitle">Jumlah Kelompok</span>
                <br />
                <span class="HomeBarSubTitle">54</span>
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
                <span class="HomeBarTitle">Jumlah Pelaku</span>
                <br />
                <span class="HomeBarSubTitle">54</span>
              </v-col>
            </v-row>
          </div>
        </v-col>

        <v-col cols="12" md="3">
          <div>
            <v-row class="rowContent elevation-1">
              <v-col cols="3" class="roundLeft vertical-center" style="background:#E19C25">
                <v-icon style="color:white; font-size:45px">mdi-alert-circle</v-icon>
              </v-col>
              <v-col cols="9" class="roundRight" style="background:#E7B052">
                <span class="HomeBarTitle">Jumlah Produk</span>
                <br />
                <span class="HomeBarSubTitle">54</span>
              </v-col>
            </v-row>
          </div>
        </v-col>

        <v-col cols="12" md="3">
          <div>
            <v-row class="rowContent elevation-1">
              <v-col cols="3" class="roundLeft vertical-center" style="background:#5FC13E">
                <v-icon style="color:white; font-size:45px">mdi-clipboard-alert</v-icon>
              </v-col>
              <v-col cols="9" class="roundRight" style="background:#7FCD65">
                <span class="HomeBarTitle">Jenis Ekokraf</span>
                <br />
                <span class="HomeBarSubTitle">54</span>
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
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      key: ''
    }
  },

  methods: {

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
              text: 'Keunggulan Sub Sektor Ekonomi Kreatif'
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
            'Kuliner', 'Fesyen', 'Musik', 'Film, Animasi dan Video', 'Televisi dan Radio', 'Fotografi', 'Arsitektur', 'Kriya', 'Aplikasi dan Game', 'Seni Pertunjukan', 'Seni Rupa', 'Desain Grafis', 'Desain Interior', 'Desain Produk', 'Periklanan', 'Penerbitan', 'Pengembangan Permainan'
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
  },
}
</script>
