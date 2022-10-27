<template>
  <v-app dark>

    <navBar  style="z-index:1;"/>

    <v-main>
        <nuxt />
    </v-main>

    <v-footer app class="pink lighten-4">
      <span style="color:white; font-weight:bold">&copy; www.vuuvy.id - 2021</span>
    </v-footer>


  </v-app>
</template>

<script>
export default {
  data () {
    return {

      data: null,


    }
  },
  methods: {
    Route() {
      alert('Yesss')
    }
  },
}
</script>
