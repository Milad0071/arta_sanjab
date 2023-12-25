<template>
  <v-app>
    <v-locale-provider rtl>
      <div class="mainContainer flex_class">
        <v-card
          class="mx-auto my-12"
          max-width="374"
        >
          <v-img
            cover
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>
          <v-card-item>
            <v-card-title>رده سنی ۷-۴ سال</v-card-title>
            <v-card-subtitle>
              <span class="me-1">Local Favorite</span>
              <v-icon
                color="error"
                icon="mdi-fire-circle"
                size="small"
              ></v-icon>
            </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <v-row
              align="center"
              class="mx-0"
            >
              <v-rating
                :model-value="4.5"
                color="amber"
                density="compact"
                half-increments
                readonly
                size="small"
              ></v-rating>
              <div class="text-grey ms-4">
                4.5 (413)
              </div>
            </v-row>
            <div class="my-4 text-subtitle-1">
              $ • Italian, Cafe
            </div>
            <div>Small plates, salads and sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
          </v-card-text>
          <v-divider class="mx-4 mb-1"></v-divider>
          <v-card-actions class="btnLocation">
            <v-btn
              class="text-none buyBtn"
              color="#f68100"
              variant="outlined"
              size="large"
              @click="reserve"
            >
              خرید دوره
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card
          class="mx-auto my-12"
          max-width="374"
        >
          <v-img
            cover
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>
          <v-card-item>
            <v-card-title>رده سنی ۱۱-۸ سال</v-card-title>
            <v-card-subtitle>
              <span class="me-1">Local Favorite</span>
              <v-icon
                color="error"
                icon="mdi-fire-circle"
                size="small"
              ></v-icon>
            </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <v-row
              align="center"
              class="mx-0"
            >
              <v-rating
                :model-value="4.5"
                color="amber"
                density="compact"
                half-increments
                readonly
                size="small"
              ></v-rating>
              <div class="text-grey ms-4">
                4.5 (413)
              </div>
            </v-row>
            <div class="my-4 text-subtitle-1">
              $ • Italian, Cafe
            </div>
            <div>Small plates, salads and sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
          </v-card-text>
          <v-divider class="mx-4 mb-1"></v-divider>
          <v-card-actions class="btnLocation">
            <v-btn
              class="text-none buyBtn"
              color="#f68100"
              variant="outlined"
              size="large"
              @click="reserve"
            >
              خرید دوره
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card
          class="mx-auto my-12"
          max-width="374"
        >
          <v-img
            cover
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>
          <v-card-item>
            <v-card-title>رده سنی ۱۴-۱۲ سال</v-card-title>
            <v-card-subtitle>
              <span class="me-1">Local Favorite</span>
              <v-icon
                color="error"
                icon="mdi-fire-circle"
                size="small"
              ></v-icon>
            </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <v-row
              align="center"
              class="mx-0"
            >
              <v-rating
                :model-value="4.5"
                color="amber"
                density="compact"
                half-increments
                readonly
                size="small"
              ></v-rating>
              <div class="text-grey ms-4">
                4.5 (413)
              </div>
            </v-row>
            <div class="my-4 text-subtitle-1">
              $ • Italian, Cafe
            </div>
            <div>Small plates, salads and sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
          </v-card-text>
          <v-divider class="mx-4 mb-1"></v-divider>
          <v-card-actions class="btnLocation">
            <v-btn
              class="text-none buyBtn"
              color="#f68100"
              variant="outlined"
              size="large"
              @click="reserve"
            >
              خرید دوره
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-locale-provider>
  </v-app>
</template>
<script>

</script>
<style scoped>
.flex_class {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex_column_class {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.mainContainer {
  width: 100%;
  height: 100%;
  padding-right: 20%;
  background-image: url('./../assets/quiz_background.jpg');
  background-size: cover;
}
.btnLocation {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.buyBtn {
  font-weight: bold;
  color: #f68100;
}
.buyBtn:hover {
  border: none;
  color: white !important;
  background-color: #f68100;
  font-weight: bold;
}
</style>