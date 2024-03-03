<template>
  <v-app>
    <v-locale-provider rtl>
      <div class="mainContainer flex_column_class">
        <div class="coursesContainer marginClass">
          <div class="titlePart">
            <h2>دوره‌های آموزشی</h2>
          </div>
          <div v-if="showCourses == true" class="coursesCardsContainer">
            <v-card
              class="cardClass mt-5 mr-5 flex_column_class"
              v-for="(course, index) in courses"
              :key="index"
            >
              <div class="imagesContainer" style="width: 100%">
                <ChildOneImage v-if="course.id == 1" class="mt-7" />
                <ChildTwoImage v-else-if="course.id == 2" class="mt-7" />
                <ChildThreeImage v-else-if="course.id == 3" class="mt-7" />
              </div>
              <div class="topPart">
                <div>
                  <p>مدرس: نام مدرس</p>
                </div>
                <div class="watchPart">
                  <p>۰۰:۰۰:۰۰</p>
                  <WatchIcon class="mr-2" />
                </div>
              </div>
              <div class="cardTitle">
                <h4>{{ course.name }}</h4>
              </div>
              <div class="purchasePart">
                <div class="pricePart">۲۶۵ هزار تومان</div>
                <v-btn
                  color="#FF9635"
                  class="text-none buyCourseBtn"
                  size="large"
                  variant="outlined"
                  @click="buyCourse(course.id)"
                >
                  خرید
                  <template v-slot:prepend>
                    <purchaseIcon />
                  </template>
                </v-btn>
              </div>
            </v-card>
          </div>
          <div v-else>دوره متناسب با این کاربر وجود ندارد.</div>
        </div>
        <div
          v-if="showPurchasedCourses == true"
          class="myCoursesContainer mb-4"
        >
          <div class="titlePart">
            <h2>دوره‌های من</h2>
          </div>
          <div v-if="showCourses == true" class="coursesCardsContainer">
            <v-card
              class="cardClass mt-5 mr-5 flex_column_class"
              v-for="(course, index) in courses"
              :key="index"
              @click="goToCourse()"
            >
              <div class="imagesContainer" style="width: 100%">
                <ChildOneImage v-if="course.id == 1" class="mt-7" />
                <ChildTwoImage v-else-if="course.id == 2" class="mt-7" />
                <ChildThreeImage v-else-if="course.id == 3" class="mt-7" />
              </div>
              <div class="topPart">
                <div>
                  <p>مدرس: نام مدرس</p>
                </div>
                <div class="watchPart">
                  <p>۰۰:۰۰:۰۰</p>
                  <WatchIcon class="mr-2" />
                </div>
              </div>
              <div class="cardTitle">
                <h4>{{ course.name }}</h4>
              </div>
              <div class="progressBar">
                <p>میزان پیشرفت</p>
                <v-progress-linear
                  v-model="power"
                  color="#FF9635"
                  height="8"
                  style="border-radius: 20px"
                ></v-progress-linear>
              </div>
            </v-card>
          </div>
        </div>
      </div>
    </v-locale-provider>
  </v-app>
</template>
<script>
import axios from "./../axios.js";
import ChildOneImage from "./../assets/svgIcons/ChildOneImage.vue";
import ChildTwoImage from "./../assets/svgIcons/ChildTwoImage.vue";
import ChildThreeImage from "./../assets/svgIcons/ChildThreeImage.vue";
import WatchIcon from "./../assets/svgIcons/WatchIcon.vue";
import purchaseIcon from "./../assets/svgIcons/purchaseIcon.vue";

export default {
  emits: ["reset-app", "user-rerender-drawer"],
  components: {
    ChildOneImage,
    ChildTwoImage,
    ChildThreeImage,
    WatchIcon,
    purchaseIcon,
  },
  data: () => {
    return {
      power: 78,
      showCourses: true,
      showPurchasedCourses: true,
      buyCourseLoading: false,
      continueCourseBtnLoading: false,
      courses: [],
      purchasedCourses: [],
    };
  },
  created() {
    this.getData();
    this.$emit("user-rerender-drawer", 3);
  },
  methods: {
    getData() {
      //get courses that can be purchased
      console.log(this.$cookies.get("childNationalCode"));
      if (this.$cookies.get("childNationalCode") != null) {
        axios({
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.$cookies.get("userToken")}`,
            "Content-Type": "application/json",
          },
          url: `dashboard/change-child-user/${this.$cookies.get(
            "childNationalCode"
          )}/?session=${this.$cookies.get("sessionId")}`,
        })
          .then(() => {
            axios({
              method: "GET",
              url: `courses/list/?session=${this.$cookies.get("sessionId")}`,
              headers: {
                Authorization: `Bearer ${this.$cookies.get("userToken")}`,
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                  this.courses.push({
                    id: response.data[i].id,
                    name: response.data[i].name,
                    description: response.data[i].description,
                    price: response.data[i].price,
                  });
                }
              })
              .catch((err) => {
                this.$swal("مشکلی پیش آمد!", err.message, "error");
                if (err.response.status == 401) {
                  this.$cookies.set("userEntered", false);
                  this.$cookies.set("adminEntered", false);
                  this.$router.push({ name: "SignupLogin" });
                }
              });
            //get courses that have been purchased
            axios({
              method: "GET",
              url: `dashboard/my-courses/?session=${this.$cookies.get(
                "sessionId"
              )}`,
              headers: {
                Authorization: `Bearer ${this.$cookies.get("userToken")}`,
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                  this.purchasedCourses.push({
                    id: response.data[i].id,
                    name: response.data[i].course.name,
                    description: response.data[i].course.description,
                    price: response.data[i].course.price,
                    startDate: response.data[i].created_at,
                    expireDate: response.data[i].expire_at,
                  });
                }
                if (this.purchasedCourses.length > 0) {
                  this.showPurchasedCourses = true;
                } else {
                  this.showPurchasedCourses = false;
                }
              })
              .catch((err) => {
                this.$swal("مشکلی پیش آمد!", err.message, "error");
                console.log(err.response.status);
                if (err.response.status == 401) {
                  this.$cookies.set("userEntered", false);
                  this.$cookies.set("adminEntered", false);
                  this.$router.push({ name: "SignupLogin" });
                }
              });
          })
          .catch((err) => {
            this.$swal("مشکلی پیش آمد!", err.message, "error");
            if (err.response.status == 401) {
              this.$cookies.set("userEntered", false);
              this.$cookies.set("adminEntered", false);
              this.$cookies.remove("btnClicked");
              this.$router.push({ name: "SignupLogin" });
            }
          });
      } else {
        axios({
          method: "GET",
          url: `courses/list/?session=${this.$cookies.get("sessionId")}`,
          headers: {
            Authorization: `Bearer ${this.$cookies.get("userToken")}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              this.courses.push({
                id: response.data[i].id,
                name: response.data[i].name,
                description: response.data[i].description,
                price: response.data[i].price,
              });
            }
          })
          .catch((err) => {
            this.$swal("مشکلی پیش آمد!", err.message, "error");
            if (err.response.status == 401) {
              this.$cookies.set("userEntered", false);
              this.$cookies.set("adminEntered", false);
              this.$router.push({ name: "SignupLogin" });
            }
          });
        //get courses that have been purchased
        axios({
          method: "GET",
          url: `dashboard/my-courses/?session=${this.$cookies.get(
            "sessionId"
          )}`,
          headers: {
            Authorization: `Bearer ${this.$cookies.get("userToken")}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              this.purchasedCourses.push({
                id: response.data[i].id,
                name: response.data[i].course.name,
                description: response.data[i].course.description,
                price: response.data[i].course.price,
                startDate: response.data[i].created_at,
                expireDate: response.data[i].expire_at,
              });
            }
            if (this.purchasedCourses.length > 0) {
              this.showPurchasedCourses = true;
            } else {
              this.showPurchasedCourses = false;
            }
          })
          .catch((err) => {
            this.$swal("مشکلی پیش آمد!", err.message, "error");
            console.log(err.response.status);
            if (err.response.status == 401) {
              this.$cookies.set("userEntered", false);
              this.$cookies.set("adminEntered", false);
              this.$router.push({ name: "SignupLogin" });
            }
          });
      }
    },
    buyCourse(id) {
      this.buyCourseLoading = true;
      id = parseInt(id);
      var bodyFormData = new FormData();
      JSON.stringify(bodyFormData.append("course", id));
      JSON.stringify(
        bodyFormData.append("session_id", this.$cookies.get("sessionId"))
      );
      // if (this.$cookies.get('stay')) {
      axios({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
        },
        url: `courses/create/?session=${this.$cookies.get("sessionId")}`,
        data: bodyFormData,
      })
        .then((response) => {
          this.buyCourseLoading = false;
          if (response.status == 201) {
            this.buyCourseLoading = false;
            this.courses = [];
            this.getData();
            this.$emit("reset-app");
            this.$swal("خرید موفق!", "دوره با موفقیت خریداری شد!", "success");
          } else {
            this.buyCourseLoading = false;
            if (response.status == 403) {
              this.buyCourseLoading = false;
              this.$swal(
                "عدم امکان خرید!",
                "شما قبلا این دوره را خریداری نموده‌اید!",
                "warning"
              ).then(() => {
                this.buyCourseLoading = false;
              });
            } else {
              this.buyCourseLoading = false;
              this.$swal("مشکلی پیش آمد!", response.message, "error");
              if (response.status == 401) {
                this.$cookies.set("userEntered", false);
                this.$cookies.set("adminEntered", false);
                this.$router.push({ name: "SignupLogin" });
              }
            }
          }
        })
        .catch((err) => {
          this.buyCourseLoading = false;
          if (err.request.status == 403) {
            this.$swal(
              "عدم امکان خرید!",
              "شما قبلا این دوره را خریداری نموده‌اید!",
              "warning"
            );
          } else {
            this.$swal("مشکلی پیش آمد!", err.message, "error");
            if (err.request.status == 401) {
              this.$cookies.set("userEntered", false);
              this.$cookies.set("adminEntered", false);
              this.$router.push({ name: "SignupLogin" });
            }
          }
        });
      // }
    },
    goToCourse() {
      this.continueCourseBtnLoading = true;
      this.$router.push({ name: "PlayerComp" });
      this.continueCourseBtnLoading = false;
    },
  },
};
</script>
<style scoped>
.flex_class {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.flex_column_class {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.mainContainer {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  font-family: danaRegular !important;
  width: 80%;
  height: 91.6vh;
  margin-top: 3.85%;
  margin-left: 0px;
  background-color: #f4f5f6;
  border-top-right-radius: 60px;
}
.coursesContainer {
  width: 100%;
  padding: 3%;
}
.myCoursesContainer {
  width: 100%;
  margin-top: -2%;
  padding-right: 3%;
}
.marginClass {
  margin-top: -2%;
}
.titlePart {
  display: flex;
  align-self: flex-start !important;
  padding-right: 0px;
}
.titlePart h2 {
  margin-right: 10px;
  color: #373739;
  font-weight: 700;
  font-size: 20px;
}
.coursesCardsContainer {
  display: flex;
  align-items: center;
  margin-top: -1%;
}
.cardClass {
  width: 323px;
  height: 100%;
  border-radius: 10px !important;
  cursor: pointer;
}
.imagesContainer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -5%;
}
.topPart {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.watchPart {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cardTitle {
  width: 100%;
  margin-right: 20%;
  margin-top: 5%;
  display: flex;
  justify-content: flex-start !important;
  align-items: center;
}
.purchasePart {
  width: 100%;
  padding: 0 10%;
  margin-top: 2%;
  margin-bottom: 2%;
  display: flex;
  justify-content: space-between;
  align-items: center !important;
}
.pricePart {
  color: #ff9635;
  font-size: 18px;
  font-weight: 500;
}
.buyCourseBtn {
  font-weight: bold;
  border-radius: 12px;
  color: white !important;
  background-color: #f68100;
}
.progressBar {
  width: 85%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
  margin-bottom: 2%;
}
.progressBar p {
  align-self: flex-start;
  color: #8a8b8d;
  font-size: 10px;
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