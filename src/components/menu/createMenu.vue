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
                    <v-col xs="12" sm="9" md="6">
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
                    <v-col cols="12" sm="9" md="6">
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
                      <v-text-field class="pt-0" v-else v-model="filter.kind">
                        <v-icon
                          large
                          @click="createKind()"
                          slot="append"
                          color="green"
                        >
                          mdi-plus
                        </v-icon>
                        <v-icon
                          large
                          @click="delKind()"
                          slot="prepend"
                          color="red"
                        >
                          mdi-minus
                        </v-icon>
                      </v-text-field>
                    </v-col>
                    <v-col xs="6">
                      <v-btn
                        v-if="viewKind"
                        @click="toogleKind()"
                        class="ml-5"
                        color="primary"
                        elevation="2"
                      >
                        <span>{{ typeBtnKind }}</span></v-btn
                      >

                      <v-btn
                        v-else
                        @click="toogleKind()"
                        class="ml-5 mt-2"
                        color="secondary"
                        elevation="2"
                        >Отмена</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-container>

                <!-- input type dish -->
                <v-container>
                  <v-row sm-justify="start" no-gutters>
                    <v-col cols="12" sm="9" md="6">
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
                      <v-text-field class="mt-0" v-else v-model="filter.type">
                        <v-icon
                          large
                          @click="createType()"
                          slot="append"
                          color="green"
                        >
                          mdi-plus
                        </v-icon>
                        <v-icon
                          large
                          @click="delType()"
                          slot="prepend"
                          color="red"
                        >
                          mdi-minus
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
                        ><span>{{ typeBtnType }}</span></v-btn
                      >
                      <v-btn
                        v-else
                        @click="toogleType()"
                        class="ml-5 mt-2"
                        color="secondary"
                        elevation="2"
                        >Отмена</v-btn
                      >
                    </v-col>
                  </v-row>
                  <v-row justify="center" sm-justify="end">
                    <v-col cols="12" sm-offset="6">
                      <v-btn color="error" class="ml-5" @click="resetCategory">
                        Сбросить форму
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>

                <!-- horizontal line -->
                <v-divider class="mt-5"></v-divider>
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

                <!-- horizontal line -->
                <v-divider class="mt-5"></v-divider>
                <h2 class="my-5">Созданные блюда</h2>


                <v-container v-if="dishes.length > 0">
                  <v-row>
                     <v-autocomplete
                      v-model="filterN"
                      :items="filterName"
                      dense
                      clearable
                      filled
                      label="Поиск блюда"
                    ></v-autocomplete>

                  </v-row>
                </v-container>

                 <v-divider class="mt-5"></v-divider>

                <v-container>
                  <v-row>
                    <v-col
                      @click="select(dish)"

                      v-for="dish in filteredDishes"
                      :key="dish.id"
                    >
                    <!-- filterdish -->
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
                          <v-expansion-panels focusable accordion>
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
              <v-tab-item>
                  <h1>Coming soon!</h1>
              </v-tab-item>
              <!-- results -->
              <v-tab-item>
                <v-container>
                  <v-row>
                    <v-col v-for="dish in dishes" :key="dish.id">
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
                          <v-expansion-panels focusable accordion>
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
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-tab-item>
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
    //item
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

    patchK: "",
    patchT: "",

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

    description: "",
    //filter
    filterN: ''
  }),

  created() {
    this.getData();
    this.getDishes();
  },

  computed: {

    filterName(){
      let result = []
      this.dishes.forEach((el)=> {
        result = [...result, el.name]
      })
      return result
    },

    filteredDishes(){
      return this.dishes.filter((dish)=>dish.name.includes(this.filterN))

    },

    statisticMenu() {
      let dishes = {
        category: [],
        kind: [],
        type: [],
      };
      this.dishes.forEach((el) => {
        dishes.category = [...dishes.category, el.category];
        dishes.kind = [...dishes.kind, el.kind];
        dishes.type = [...dishes.type, el.type];
      });

      let result = {
        category: [],
        kind: [],
        type: [],
      };
      result.category = [...new Set(dishes.category)];
      result.kind = new Set(dishes.kind);
      result.type = [...new Set(dishes.type)];

      console.log("test result uCharDish", result);

      return result;
    },

    typeBtnKind() {
      return this.filter.kind ? "Изменить" : "Добавить новый тип";
    },
    typeBtnType() {
      return this.filter.type ? "Изменить" : "Добавить новый тип";
    },
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

    async patchKind() {
      const id = this.patchK;
      const response = await fetch(`http://localhost:3000/kind/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: this.filter.kind,
        }),
      });
      if (response.ok === true) {
        const res = await fetch(`http://localhost:3000/kinds`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const getKinds = await res.json();
        this.kindes = [];
        console.log("test get kind = ", getKinds.kindes);

        getKinds.kindes.forEach((kind) => {
          this.kindes = [...this.kindes, kind.name_kind];
        });
        console.log("test kindes", this.kindes);
        this.toogleKind();
      }
    },
    async patchType() {
      const id = this.patchT;
      const response = await fetch(`http://localhost:3000/type/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: this.filter.type,
        }),
      });
      if (response.ok === true) {
        const res = await fetch(`http://localhost:3000/types`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const getType = await res.json();
        this.types = [];
        console.log("test get type", getType.types);
        getType.types.forEach((type) => {
          this.types = [...this.types, type.name_type];
        });
        console.log("test types", this.types);
        this.toogleType();
      }
    },

    async delKind() {
      const name_kind = this.filter.kind;
      const response = await fetch(`http://localhost:3000/kind/${name_kind}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.ok === true) {
        this.kindes = this.kindes.filter((k) => k != name_kind);
        this.filter.kind = "";
        this.viewKind = true;
      }
    },

    async delType() {
      const name_type = this.filter.type;
      const response = await fetch(`http://localhost:3000/type/${name_type}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.ok === true) {
        this.types = this.types.filter((k) => k != name_type);
        this.filter.type = "";
        this.viewType = true;
      }
    },

    toogleKind() {
      this.viewKind = !this.viewKind;
      if (this.typeBtnKind === "Изменить") {
        const patch = this.filter.kind;
        return (this.patchK = patch);
      }
    },

    toogleType() {
      this.viewType = !this.viewType;
      if (this.typeBtnType === "Изменить") {
        const patch = this.filter.type;
        return (this.patchT = patch);
      }
    },

    async createType() {
      if (this.patchT) {
        return this.patchType();
      }
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
      if (this.patchK) {
        return this.patchKind();
      }
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
    resetCategory() {
      this.filter.category = "";
      this.filter.kind = "";
      this.filter.type = "";
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
      this.dish.url = dish.photo;
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
