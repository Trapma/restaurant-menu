<template>
  <v-card class="mx-auto" max-width="344">

    <v-card-title :key="upperName">
      {{ upperName }}
    </v-card-title>

    <v-container

    >
      <v-card
      min-height="200"
      color="grey"
      @click.stop="selectImage">

        <v-file-input
          id="uploadImage"
          class="d-none"
          hide-input
          @change="Preview_image"
          v-model="image"
        >
        </v-file-input>
        <v-img height="200" v-if="url" :src="url">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-card>
    </v-container>

    <v-card-text class="body-1">
      {{ dish_data.description }}
    </v-card-text>
    <v-card-subtitle class="py-0">
      <p class="text-right">в порции содержится: {{ dish_data.ccal }}ккал</p>
    </v-card-subtitle>
    <v-row justify="end">
      <v-card-title class="mr-4">
        <p class="text-right">{{ dish_data.price }}₽</p>
      </v-card-title>
    </v-row>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    input: undefined,
    show: false,
    url: null,
    image: null,
  }),

  props: {
    dish_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  mounted() {
    this.input = document.getElementById("uploadImage");
  },
  computed: {
    upperName() {
      return this.dish_data.name.toUpperCase();
    },
  },

  methods: {
    selectImage() {
      this.input.click();
    },

    Preview_image() {
      this.url = URL.createObjectURL(this.image);
    },
  },
};
</script>
