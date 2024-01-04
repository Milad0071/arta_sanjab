<template>
  <v-app>
    <v-locale-provider rtl>
      <div class="mainContainer flex_class">
        <v-card
          class="mx-auto my-12"
          style="border: 1px solid #6d6e71;"
          min-width="374"
          elevation="24"
          v-for="(course, index) in courses"
          :key="index"
        >
          <v-img
            cover
            height="320"
            src="./../assets/sanjabTextLogo.png"
          ></v-img>
          <v-card-item>
            <v-card-title>{{ course.name }}</v-card-title>
          </v-card-item>
          <v-card-text>
            <div>{{ course.description }}</div>
            <div>{{ course.price }}</div>
          </v-card-text>
          <v-divider class="mx-4 mb-1"></v-divider>
          <v-card-actions class="btnLocation">
            <v-btn
              class="text-none buyBtn"
              color="#f68100"
              variant="outlined"
              size="large"
              @click="buyCourse(course.id)"
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
import axios from 'axios';

export default {
  data: () => {
    return {
      courses: [],
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios({
        method: "GET",
        url: `http://194.9.56.86/api/v1/courses/list/?session=${this.$cookies.get('sessionId')}`,
        headers: {
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {
          console.log(response)
          for (let i = 0; i < response.data.length; i++) {
            this.courses.push({
              id: response.data[i].id,
              name: response.data[i].name,
              description: response.data[i].description,
              price: response.data[i].price
            })
          }
        })
        .catch((err) => {
          this.$swal("مشکلی پیش آمد!", err.message, "error");
        });
    },
    buyCourse(id) {
      id = parseInt(id);
      var bodyFormData = new FormData();
      JSON.stringify(bodyFormData.append("course", id)); 
        JSON.stringify(bodyFormData.append("session_id", this.$cookies.get('sessionId')));
        axios({
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          },
          url: `http://194.9.56.86/api/v1/courses/create/?session=${this.$cookies.get('sessionId')}`,
          data: bodyFormData,
        })
          .then((response) => {
            if (response.status == 201) {
              this.$cookies.set('courseId', id);
              this.$router.push({ name: "PlayerComp" });
            }
          })
          .catch((err) => {
            console.log(err);
            this.$swal(err.response.data.message, "", "error");
          });
    },
  }
}
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