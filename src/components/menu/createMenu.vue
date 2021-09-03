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
                        v-if="viewKind"
                        clearable
                        v-model="filter.kind"
                        :items="kindes"
                        item-color="secondary"
                        filled
                        dense
                        rounded
                        auto-select-first
                        messages="Вид кухни"
                      ></v-autocomplete>
                      <v-text-field v-else v-model="filter.kind">
                        <v-icon
                          large
                          @click="createKind()"
                          slot="append"
                          color="green"
                        >
                          mdi-plus
                        </v-icon>
                      </v-text-field>
                    </v-col>
                    <v-col
                      ><v-btn
                        v-if="viewKind"
                        @click="toogleKind()"
                        class="ml-5"
                        color="primary"
                        elevation="2"
                        >Добавить новый вид</v-btn
                      ></v-col
                    >
                  </v-row>
                </v-container>

                <!-- input type dish -->
                <v-container>
                  <v-row sm-justify="start" no-gutters>
                    <v-col sm="9" md="6">
                      <v-autocomplete
                        v-if="viewType"
                        v-model="filter.type"
                        :items="types"
                        filled
                        dense
                        rounded
                        auto-select-first
                        clearable
                        messages="Тип блюда"
                      ></v-autocomplete>
                      <v-text-field v-else v-model="filter.type">
                        <v-icon
                          large
                          @click="createType()"
                          slot="append"
                          color="green"
                        >
                          mdi-plus
                        </v-icon>
                      </v-text-field>
                    </v-col>
                    <v-col
                      ><v-btn
                        v-if="viewType"
                        @click="toogleType()"
                        class="ml-5"
                        color="primary"
                        elevation="2"
                        >Добавить новый тип</v-btn
                      ></v-col
                    >
                  </v-row>
                </v-container>

                <!-- horizontal line -->
                <v-divider></v-divider>
                <h2 class="mt-5">Карточка блюда</h2>

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
                      <dishCard :dish_data="dish" @loadImage="imageLoad" />
                    </v-col>
                  </v-row>
                </v-container>
                <v-container>
                  <v-row>
                    <v-col
                      @click="select(dish)"
                      v-for="dish in dishes"
                      :key="dish.id"
                    >
                      <v-card

                        outline
                        class="mx-auto mb-10 py-auto"
                        max-width="344"
                      >
                        <v-card-title>
                          {{ dish.name }}
                        </v-card-title>
                        <v-container>
                          <v-card>
                            <v-img height="200" :src="dish.photo">
                              <template v-slot:placeholder>
                                <v-row
                                  class="fill-height ma-0"
                                  align="center"
                                  justify="center"
                                >
                                  <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                  ></v-progress-circular>
                                </v-row>
                              </template>
                            </v-img>
                          </v-card>
                        </v-container>
                        <v-container>
                           <v-expansion-panels accordion>
                          <v-expansion-panel>
                            <v-expansion-panel-header
                              >Описание</v-expansion-panel-header
                            >
                            <v-expansion-panel-content>
                              <v-card-text class="body-1">
                                {{ dish.description }}
                              </v-card-text>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                        </v-container>

                        <v-card-subtitle class="py-0">
                          <p class="text-right">
                            в порции содержится: {{ dish.ccal }}ккал
                          </p>
                        </v-card-subtitle>
                        <v-row justify="end">
                          <v-card-title class="mr-4">
                            <p class="text-right">{{ dish.price }}₽</p>
                          </v-card-title>
                        </v-row>
                        <v-card-actions>
                          <v-btn
                            color="orange lighten-2"
                            text
                            @click.stop="handleDelete(dish)"
                          >
                            Удалить
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-tab-item>

              <!-- statistics -->
              <v-tab-item> </v-tab-item>
              <!-- results -->
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
    items: ["Создание блюд", "Статистика", "Конечный результат"],

    filter: {
      kind: "",
      category: "",
      type: "",
    },
    dish: {
      id: "",
      name: "",
      price: "",
      description: "",
      ccal: "",
      url: "",
      imageUrl: "",
    },

    selectedDish: null,

    categoryList: [],
    categories: [],
    types: [],
    kindes: [],
    dishes: [],

    //dishForm data

    valid: true,

    viewKind: true,
    viewType: true,

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

    // kindRules: [
    //   item-color:'primary'
    // ],
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

    viewDelBtnKind() {
      let result = this.kindes.filter((k) => k.includes(this.filter.kind));

      return result[0] === this.filter.kind;
    },

    viewAddBtnKind() {
      console.log("test kind", this.filter.kind);
      let result = this.kindes.filter((k) => k.includes(this.filter.kind));
      console.log("test boolean", result[0] === this.filter.kind);
      if (result[0] === this.filter.kind) {
        console.log("test boolean true");
        return true;
      }
      console.log("test boolean false");
      return false;
    },

    viewDelBtnType() {
      let result = this.types.filter((k) => k.includes(this.filter.type));
      return result[0] === this.filter.type;
    },
    viewCreateType() {
      return true;
    },
  },

  methods: {
    toogleKind() {
      this.viewKind = !this.viewKind;
    },

    toogleType() {
      this.viewType = !this.viewType;
    },

    async createType() {
      if (this.filter.type === "" || this.filter.type === undefined) {
        console.log("test err type placeholder", this.err);
        return (this.typeErr = this.err);
      }

      const response = await fetch("http://localhost:3000/type", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name_type: this.filter.type,
        }),
      });
      if (response.ok === true) {
        this.types.push(this.filter.type);
        this.toogleType();
      }
    },
    async createKind() {
      console.log("test create kind start", this.filter.type);
      if (this.filter.kind === "" || this.filter.kind === undefined) {
        console.log("err");
        return (this.kindErr = this.err);
      }
      console.log("test go");

      const response = await fetch("http://localhost:3000/kind", {
        method: "POST",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name_kind: this.filter.kind,
        }),
      });
      if (response.ok === true) {
        this.kindes.push(this.filter.kind);
        this.toogleKind();
      }
    },

    //imageLoad не работает
    imageLoad(data) {
      console.log("test url to parent = ", data);
      this.dish.url = data;
      console.log("test dish.url", this.dish.url);
    },

    //dishForm methods
    validate() {
      if (this.$refs.form.validate()) {
        this.createDish();
      }
    },

    reset() {
      this.dish.id = "";
      this.dish.name = "";
      this.dish.price = "";
      this.dish.description = "";
      this.dish.ccal = "";
      this.dish.imageUrl = "";
      this.dish.url = "";
      this.$refs.form.resetValidation();
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
      console.log("test data response", data);

      this.dishes = [];
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const dish = data[key];
          for (let i = 0; i < dish.length; i++) {
            const d = dish[i];
            this.dishes.push(d);
          }
        }
      }
      console.log("get dishes data", this.dishes);
    },
    async select(dish) {
      this.selectedDish = dish;
      console.log("selected dish", dish);

      this.dish.id = dish.id;
      this.filter.category = dish.category;
      this.filter.kind = dish.kind;
      this.filter.type = dish.type;

      this.dish.name = dish.name;
      this.dish.price = dish.price;
      this.dish.description = dish.description;
      this.dish.ccal = dish.ccal;
      //связываемся с dishCard
      this.dish.imageUrl = dish.photo;
      this.dish.url = dish.photo
    },

    async patchDish() {
      console.log("start patch");
      const id = this.dish.id;
      console.log("start patch imageUrl", this.dish.imageUrl);
      console.log("start patch url", this.dish.url);
      const response = await fetch(`http://localhost:3000/dishes/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          kind: this.filter.kind,
          category: this.filter.category,
          type: this.filter.type,
          name: this.dish.name,
          price: this.dish.price,
          description: this.dish.description,
          ccal: this.dish.ccal,
          photo: this.dish.url,
        }),
      });
      if (response.ok === true) {
        console.log("response patch", response);
        this.getDishes();
        return this.reset();
      }
    },
    async createDish() {
      //если блюдо выбрано тогда перебросить на обновление блюда
      if (this.dish.id) {
        console.log("test patch");
        return this.patchDish();
      }

      console.log("test duration");
      const response = await fetch("http://localhost:3000/dishes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kind: this.filter.kind,
          category: this.filter.category,
          type: this.filter.type,
          name: this.dish.name,
          price: this.dish.price,
          description: this.dish.description,
          ccal: this.dish.ccal,
          photo: this.dish.url,
        }),
      });

      const dishId = await response.json();
      console.log("test dishId", dishId);
      const f = await fetch("http://localhost:3000/dishes");
      const data = await f.json();
      console.log("test dishes befor cicle", this.dishes);
      for (const dishes in data) {
        if (Object.hasOwnProperty.call(data, dishes)) {
          const dish = data[dishes];
          for (let i = 0; i < dish.length; i++) {
            const d = dish[i];
            console.log("test d", d);
            if (d.id === dishId.id) {
              this.dishes.push(d);
              console.log(this.dishes);
              this.reset();
            }
          }
        }
      }
    },
    async handleDelete(dishToRemove) {
      const id = dishToRemove.id;
      const response = await fetch(`http://localhost:3000/dishes/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.ok === true) {
        this.dishes = this.dishes.filter((d) => d != dishToRemove);
      }
      //обновление localStorage (мой вариант)
      // localStorage.setItem("cryptonomicon-list", JSON.stringify(this.tickers));
    },
  },
};
</script>
