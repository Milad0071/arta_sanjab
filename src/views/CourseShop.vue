<template>
  <v-app>
    <v-locale-provider rtl>
      <div class="mainContainer flex_column_class">
        <div class="coursesContainer flex_column_class marginClass">
          <div class="titlePart">
            <div class="titleShape"></div>
            <h2>دوره‌های قابل خریداری</h2>
          </div>
          <div class="cardClass1 flex_class">
            <v-card
              class="mx-auto my-12 "
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
                <div>ریال {{ course.price }}قیمت: </div>
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
        </div>
        <div class="coursesContainer flex_column_class mt-4 mb-4">
          <div class="titlePart">
            <div class="titleShape"></div>
            <h2>دوره‌های خریداری شده</h2>
          </div>
          <div v-if="showCourses == true" class="cardClass flex_class">
            <v-card
              class="mx-auto my-12 "
              style="border: 1px solid #6d6e71;"
              min-width="374"
              elevation="24"
              v-for="(course, index) in purchasedCourses"
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
                  @click="goToCourse()"
                >
                  ادامه دوره
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
          <div v-else>
            دوره متناسب با این کاربر وجود ندارد.
          </div>
        </div>

      </div>
    </v-locale-provider>
  </v-app>
</template>
<script>
import axios from 'axios';

export default {
  data: () => {
    return {
      showCourses: true,
      courses: [],
      purchasedCourses: [],
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      //get courses that can be purchased
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
      //get courses that have been purchased before
      axios({
        method: "GET",
        url: `http://194.9.56.86/api/v1/dashboard/my-courses/?session=${this.$cookies.get('sessionId')}`,
        headers: {
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {
          console.log(response)
          for (let i = 0; i < response.data.length; i++) {
            this.purchasedCourses.push({
              id: response.data[i].id,
              name: response.data[i].course.name,
              description: response.data[i].course.description,
              price: response.data[i].course.price,
              startDate: response.data[i].created_at,
              expireDate: response.data[i].expire_at,
            })
          }
          if (this.purchasedCourses.length > 0) {
            this.showCourses = true;
          } else {
            this.showCourses = false;
          }
        })
        .catch((err) => {
          this.$swal("مشکلی پیش آمد!", err.message, "error");
        });
    },
    buyCourse(id) {
      console.log(id)
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
              this.$router.push({ name: "PlayerComp" });
            }
          })
          .catch((err) => {
            console.log(err);
            this.$swal(err.response.data.message, "", "error");
          });
    },
    goToCourse() {
      this.$router.push({ name: "PlayerComp" });
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
  padding-right: 22%;
  padding-left: 1.8%;
  background-color: #e2e2e3;
  background-size: cover;
}
.coursesContainer {
  background-color: white;
  width: 100%;
  border-radius: 7px;
}
.marginClass {
  margin-top: 10%;
}
.titlePart {
  display: flex;
  align-self: flex-start !important;
  margin-top: 10px;
  padding-right: 0px;
}
.titlePart h2 {
  margin-right: 10px;
  color: #6d6e71;
}
.titleShape {
  border-left: 10px solid #6d6e71;
  border-radius: 7px 0 0 7px;
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