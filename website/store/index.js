
var URL = 'http://localhost:5014/';





export const state = () => ({

    URLX : URL,
    url: {
      URL_APP: URL,
      URL_DASHBOARD : URL + 'api/v1/dashboard/',
      URL_PRODUK : URL + 'api/v1/ekokrafProduk/',
    },
    MENU: [
      {
        icon: 'mdi-apps',
        title: 'Home',
        type : 'single',
        to: '/'
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Inspire',
        type : 'single',
        to: '/inspire'
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Fonts',
        type : 'single',
        to: '/fonts/fontsExample'
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Cth Sub Menu',
        type : 'multy',
        subItem: [
          {
            title: 'Karamba',
            type : 'single',
            to: '/inspire'
          },
          {
            title: 'Lautan',
            type : 'single',
            to: '/'
          },
          // {
          //   title: 'Fonts',
          //   type : 'multy',
          //   subItem: [
          //     {
          //       title: 'Contoh Huruf',
          //       type : 'single',
          //       to: '/fonts/fontsExample'
          //     },


          //   ]

          // },

        ],
      },

      {
        icon: 'mdi-chart-bubble',
        title: 'Contentn',
        type : 'multy',
        subItem: [
          {
            title: 'Tabel Standar',
            type : 'single',
            to: '/content/tableStandard'
          },
          {
            title: 'Tabel Striped',
            type : 'single',
            to: '/'
          },
        ],
      }

      // ++++++++++++++++++++++++ BATAS +++++++++++++++++++++++++
    ],



})



