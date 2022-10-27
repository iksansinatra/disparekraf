import Vue from 'vue'

import navBar from '../components/navBar.vue'


// import { VueAgile } from 'vue-agile'




// const components = { BlMain, BlRegion, ... }

const components = {navBar}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
