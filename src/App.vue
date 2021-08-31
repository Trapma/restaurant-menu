<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      dense
    >
      <div class="d-flex align-center">
        <v-icon size='40'> mdi-newspaper-plus</v-icon>

        <div class=' text-h4'>YBM</div>
      </div>

    </v-app-bar>


    <v-main>

      <createMenu/>

    </v-main>
  </v-app>
</template>

<script>
import createMenu from "./components/menu/createMenu"

export default {
  name: 'App',

  components: {
    createMenu
  },

  data: () => ({
    //

  }),
};
</script>
