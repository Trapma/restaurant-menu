<template>
  <v-form ref="form" v-model="valid" lazy-validation>

    <v-text-field
      v-model="name"
      :counter="50"
      :rules="nameRules"
      label="Название блюда"
      required
    ></v-text-field>

    <v-text-field
      v-model="price"
      :rules="priceRules"
      label="Цена"
      required
    ></v-text-field>

    <v-text-field v-model="ccal" :rules="ccalRules" label="Ккал"></v-text-field>

    <v-textarea
      v-model="description"
      color="cyan"
      label="Описание"
      outlined
      required
    ></v-textarea>

    <v-container>
      <v-row justify="space-around">
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Создать блюдо
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">
          Сбросить форму
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Поле не может быть пустым",
      (v) => (v && v.length <= 30) || "Name must be less than 30 characters",
    ],
    price: "",
    priceRules: [
      (v) => !!v || "Поле не может быть пустым",
      (v) => (v && !isNaN(Number(v))) || "Введите цифры",
    ],
    ccal: "",
    ccalRules: [
      (v) => !!v || "Поле не может быть пустым",
      (v) => (v && !isNaN(Number(v))) || "Введите цифры",
    ],
    description: "",
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
