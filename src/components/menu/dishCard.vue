<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-title :key="upperName">
      {{ upperName }}
    </v-card-title>

    <v-container>
      <v-card min-height="200" color="grey" @click.stop="selectImage">
        <v-file-input
          type="file"
          id="input"
          class="d-none"
          label="upload license"
          hint="add a picture of youre license"
          hide-input
          ref="myfile"
          @change="onFileChange"
          v-model="image"
          accept="image/*"
        >
        </v-file-input>
        <v-img height="200" :src="dish_data.imageUrl">
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
    imageUrl: "",
    image: undefined,
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
    this.input = document.getElementById("input");
  },
  computed: {
    upperName() {
      return this.dish_data.name.toUpperCase();
    }
  },

  methods: {
    async createImage(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.dish_data.imageUrl = e.target.result;
        this.sendUrlParent();
      };
      reader.readAsDataURL(file);
    },
    onFileChange(file) {
      if (!file) {
        return;
      }
      this.createImage(file);
    },

    selectImage() {
        // this.input = v-file-input
      this.input.click();
    },

    sendUrlParent() {
      this.imageUrl = this.dish_data.imageUrl
      this.$emit("loadImage", this.imageUrl);
    },
  },
};
</script>
