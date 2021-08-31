<template>
  <v-container>
    <v-row>
      <v-col lg="10" offset-lg="1">
        <v-card>
          <!-- toolbar menu -->
          <v-toolbar color="deep-purple accent-4" dark flat>
            <v-toolbar-title>Create menu</v-toolbar-title>
            <template v-slot:extension>
              <v-tabs
                v-model="tabs"
                background-color="deep-purple accent-4"
                color="white"
                fixed-tabs
                slider-color="red"
              >
                <v-tab v-for="item in items" :key="item">
                  {{ item }}
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>
          <v-container>
            <!-- tabs items -->
            <v-tabs-items v-model="tabs">
              <v-tab-item>
                <!-- characteristic dish -->
                <v-container>
                  <v-row sm-justify="start" no-gutters>
                    <v-col sm="9" md="6">
                      <h2 class="">Характеристики блюда</h2>
                      <br />

                      <!-- input category -->
                      <v-autocomplete
                        v-model="filter.category"
                        :items="categoryList"
                        filled
                        rounded
                        dense
                        auto-select-first
                        clearable
                        messages="Категория"
                      >
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col sm="9" md="6">
                      <!-- accordion description category -->
                      <v-expansion-panels accordion>
                        <v-expansion-panel v-if="filter.category">
                          <v-expansion-panel-header
                            >Описание</v-expansion-panel-header
                          >
                          <v-expansion-panel-content>
                            <span :key="categoryInfo">
                              {{ categoryInfo }}
                            </span>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-col>
                  </v-row>
                </v-container>

                <!-- input kind dish -->
                <v-container>
                  <v-row sm-justify="start" no-gutters>
                    <v-col sm="9" md="6">
                      <v-autocomplete
                        v-model="filter.kind"
                        :items="kindes"
                        filled
                        dense
                        rounded
                        auto-select-first
                        clearable
                        messages="Вид кухни"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>

                <!-- input type dish -->
                <v-container>
                  <v-row sm-justify="start" no-gutters>
                    <v-col sm="9" md="6">
                      <v-autocomplete
                        v-model="filter.type"
                        :items="types"
                        filled
                        dense
                        rounded
                        auto-select-first
                        clearable
                        messages="Тип блюда"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>

                <!-- horizontal line -->
                <v-divider></v-divider>

                <!-- create dishCard -->
                <v-container>
                  <v-row justify="space-around">
                    <!-- dishForm -->
                    <v-col>
                      <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field
                          v-model="dish.name"
                          :counter="30"
                          :rules="nameRules"
                          label="Название блюда"
                          required
                        ></v-text-field>

                        <v-text-field
                          v-model="dish.price"
                          :rules="priceRules"
                          label="Цена"
                          required
                        ></v-text-field>

                        <v-text-field
                          v-model="dish.ccal"
                          :rules="ccalRules"
                          label="Ккал"
                        ></v-text-field>

                        <v-textarea
                          height="150"
                          v-model="dish.description"
                          color="cyan"
                          label="Описание"
                          outlined
                          required
                        ></v-textarea>

                        <v-row justify="space-around">
                          <v-btn
                            :disabled="!valid"
                            color="success"
                            class="mr-4 mb-2"
                            @click="validate"
                          >
                            Создать блюдо
                          </v-btn>

                          <v-btn color="error" class="mr-3" @click="reset">
                            Сбросить форму
                          </v-btn>
                        </v-row>
                      </v-form>
                    </v-col>

                    <!--dishCard  -->
                    <v-col>
                      <dishCard :dish_data="dish" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-tab-item>
              <v-tab-item> </v-tab-item>
              <v-tab-item> </v-tab-item>
            </v-tabs-items>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import dishCard from "./dishCard.vue";

export default {
  components: {
    dishCard,
  },

  data: () => ({
    tabs: null,
    items: ["Create Dish", "Statistics", "Result"],

    filter: {
      kind: "",
      category: "",
      type: "",
    },
    dish: {
      name: "",
      price: "",
      description: "",
      ccal: "",
    },

    categoryList: [],
    categories: [],
    types: [],
    kindes: [],
    dishes: [],

    //dishForm data

    valid: true,

    nameRules: [
      (v) => !!v || "Поле не может быть пустым",
      (v) => (v && v.length <= 30) || "Name must be less than 30 characters",
    ],

    priceRules: [
      (v) => !!v || "Поле не может быть пустым",
      (v) => (v && !isNaN(Number(v))) || "Введите цифры",
    ],

    ccalRules: [
      (v) => !!v || "Поле не может быть пустым",
      (v) => (v && !isNaN(Number(v))) || "Введите цифры",
    ],
    description: "",
  }),

  created() {
    this.getData();
    this.getDishes();
  },

  computed: {
    categoryInfo() {
      let result;
      this.categories.filter((category) => {
        if (category.name_category === this.filter.category) {
          return (result = category.description);
        }
      });
      return result;
    },
  },

  methods: {
    //dishForm methods
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.dish.name = ''
      this.dish.price = ''
      this.dish.description = ''
      this.dish.ccal = ''
      this.$refs.form.resetValidation()()


    },

    async getData() {
      const response = await fetch("http://localhost:3000/data", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      console.log("data", data);
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const type = data[key];

          if (key === "kind") {
            for (let i = 0; i < type.length; i++) {
              const kind = type[i];
              this.kindes = [...this.kindes, kind.name_kind];
            }
          }

          if (key === "category") {
            for (let i = 0; i < type.length; i++) {
              const category = type[i];
              this.categories = [...this.categories, category];
              this.categoryList = [
                ...this.categoryList,
                category.name_category,
              ];
            }
          }

          if (key === "type") {
            for (let i = 0; i < type.length; i++) {
              const types = type[i];
              this.types = [...this.types, types.name_type];
            }
          }
        }
      }
      // console.log("kindes", this.kindes);
      // console.log("types", this.types);
      // console.log("categories", this.categories);
      // console.log("categories", this.categoryList);
    },
    async getDishes() {
      const response = await fetch("http://localhost:3000/dishes", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const dish = data[key];
          for (let i = 0; i < dish.length; i++) {
            const d = dish[i];

            this.dishes.push(d);
          }
        }
      }
    },
  },
};
</script>
