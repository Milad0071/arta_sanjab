<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app class="appClass">
    <v-locale-provider rtl>
      <div class="mainPart">
        <!-- desctop contents -->
        <div class="bodyContainer">
          <div class="upperCharts">
            <div class="childChartContainer">
              <v-select
                :items="childNames"
                density="comfortable"
                class="selectClass"
                variant="plain"
                placeholder="وضعیت دوره فرزند"
                item-text="title"
                item-value="value"
                v-model="childrenList"
              ></v-select>
              <apexchart
                class="childChartClass ss03"
                type="bar"
                height="200"
                width="463"
                :options="childCourseChartOptions"
                :series="childCourseChartSeries"
              >
              </apexchart>
            </div>
            <div class="childChartContainer">
              <v-select
                :items="childNames"
                density="comfortable"
                class="selectClass"
                variant="plain"
                placeholder="وضعیت آزمون فرزند"
                item-text="title"
                item-value="value"
                v-model="childrenList"
              ></v-select>
              <apexchart
                class="childChartClass ss03"
                type="bar"
                height="200"
                width="463"
                :options="childExamChartOptions"
                :series="childExamChartSeries"
              >
              </apexchart>
            </div>
            <div class="purchasedCourses">
              <PurchasedCoursesImage />
              <div class="purchasedCoursesTexts mr-4">
                <h4>دوره‌های خریداری شده</h4>
                <p>۲ مورد</p>
              </div>
            </div>
          </div>
          <div class="downCourses mt-1">
            <h2>دوره‌های آموزشی</h2>
            <div v-if="showCourses == true" class="coursesCardsContainer mt-2">
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
        <!-- change role dialog -->
        <v-dialog
          v-model="dialogValue"
          persistent
          width="auto"
          style="z-index: 1 !important"
        >
          <v-card
            class="mainCard text-center mx-auto ma-4 pa-4"
            style="right: 20%"
            min-width="801"
          >
            <!-- text part -->
            <h3 class="fontClass mb-5">لطفا نقش خود را انتخاب کنید:</h3>
            <!-- choose role part -->
            <div class="rolePart">
              <div class="parentsPart flex_column_class mt-7">
                <div style="width: 100%">
                  <ParentsChooseImage />
                </div>
                <div class="parentPart">
                  <div class="divChooseItems flex_class mt-3" @click="goTo(1)">
                    <p class="fontClass">والد</p>
                  </div>
                </div>
              </div>
              <div class="childPart flex_column_class mt-7">
                <div style="width: 100%">
                  <ChildrenChooseImage />
                </div>
                <div v-if="showChildren == true" class="flex_column_class">
                  <v-select
                    :items="childrenList"
                    density="comfortable"
                    class="selectChooseItems"
                    variant="plain"
                    placeholder="نام کودک را انتخاب نمایید"
                    item-text="title"
                    item-value="value"
                    v-model="chosenChild"
                  ></v-select>
                </div>
                <div v-else class="flex_column_class">
                  <p class="fontClass">
                    اطلاعات کودک را وارد نکرده‌اید! جهت وارد کردن اطلاعات کودک
                    روی لینک زیر کلیک نمایید:
                  </p>
                  <div class="divChooseItems flex_class" @click="goTo(3)">
                    ثبت فرزند
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </v-dialog>
      </div>
    </v-locale-provider>
  </v-app>
</template>
<script>
import axios from "./../axios.js";
import VueApexCharts from "vue3-apexcharts";
import ParentsChooseImage from "./../assets/svgIcons/ParentsChooseImage.vue";
import ChildrenChooseImage from "./../assets/svgIcons/ChildrenChooseImage.vue";
import PurchasedCoursesImage from "./../assets/svgIcons/PurchasedCoursesImage.vue";
import WatchIcon from "./../assets/svgIcons/WatchIcon.vue";
import ChildOneImage from "./../assets/svgIcons/ChildOneImage.vue";
import ChildTwoImage from "./../assets/svgIcons/ChildTwoImage.vue";
import ChildThreeImage from "./../assets/svgIcons/ChildThreeImage.vue";

export default {
  emits: ["user-rerender-drawer", "reset-app"],
  props: { dialog: Boolean },
  components: {
    ParentsChooseImage,
    ChildrenChooseImage,
    PurchasedCoursesImage,
    WatchIcon,
    ChildOneImage,
    ChildTwoImage,
    ChildThreeImage,
    apexchart: VueApexCharts,
  },
  data: () => {
    return {
      power: 78,
      userName: null,
      userRole: null,
      parentsData: null,
      chosenChild: null,
      children: [],
      childrenList: [],
      courses: [
        {
          id: 1,
          name: "دوره ۷-۴ سال",
          description: "توضیح نداریم",
          price: "قیمت نداریم ریال",
        },
        {
          id: 2,
          name: "دوره ۱۱-۸ سال",
          description: "توضیح نداریم",
          price: "قیمت نداریم ریال",
        },
        {
          id: 3,
          name: "دوره ۱۵-۱۲ سال",
          description: "توضیح نداریم",
          price: "قیمت نداریم ریال",
        },
      ],
      childCourseChartSeries: [
        {
          data: [2, 5, 7],
        },
      ],
      childCourseChartOptions: {
        chart: {
          id: "childCoursesChartId",
          fontFamily: 'danaRegular'
        },
        plotOptions: {
          bar: {
            columnWidth: "30%",
          },
        },
        colors: ["#FF9635"],
        xaxis: {
          categories: ["انجام شده", "در حال انجام", "تکمیل شده"],
        },
      },
      childExamChartSeries: [
        {
          data: [2, 5, 7],
        },
      ],
      childExamChartOptions: {
        chart: {
          id: "childExamChartId",
          fontFamily: 'danaRegular'
        },
        plotOptions: {
          bar: {
            columnWidth: "30%",
          },
        },
        colors: ["#6118F5"],
        xaxis: {
          categories: ["انجام شده", "در حال انجام", "تکمیل شده"],
        },
      },

      dialogValue: false,
      showChildren: false,
      showCourses: false,
    };
  },
  watch: {
    chosenChild(newVal) {
      this.goTo(2, newVal.first_name, newVal.nCode);
    },
  },
  created() {
    if (this.$cookies.get("btnClicked")) {
      this.dialogValue = this.dialog;
      this.getData();
    }
    this.showCourses = true;
    this.$emit("user-rerender-drawer", 0);
    this.testAuth();
    this.showCharts();
    if (this.$cookies.get("showModal")) {
      this.dialogValue = false;
    }
  },
  methods: {
    getData() {
      axios({
        method: "GET",
        url: `dashboard/?session=${this.$cookies.get("sessionId")}`,
        header: "application/json",
        headers: {
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status == 200) {
            this.userName = response.data.first_name;
            this.userRole = "والد";
            this.$cookies.remove("addChildActive");
            this.$cookies.remove("parentsDetailsActive");
            this.$cookies.remove("coursesShopActive");
            this.children = response.data.children;
            for (let i = 0; i < this.children.length; i++) {
              if (this.children[i].type == 1) {
                this.children[i].type = "۴-۷ سال";
              } else if (this.children[i].type == 2) {
                this.children[i].type = "۸-۱۱ سال";
              } else {
                this.children[i].type = "۱۲-۱۵ سال";
              }
              this.childrenList.push({
                title:
                  this.children[i].first_name +
                  " " +
                  this.children[i].last_name,
                value: {
                  first_name: this.children[i].first_name,
                  nCode: this.children[i].national_code,
                },
              });
            }
            if (this.children.length > 0) {
              this.showChildren = true;
            } else {
              this.showChildren = false;
              this.$swal(
                "هنوز اطلاعات کودک را وارد نکرده‌اید!",
                "",
                "warning"
              ).then((result) => {
                if (result.isConfirmed) {
                  this.$emit("user-rerender-drawer", 1);
                  this.$cookies.remove("addChildActive");
                  this.$cookies.remove("parentsDetailsActive");
                  this.$cookies.remove("coursesShopActive");
                  // this.$emit("reset-app");
                  this.$cookies.remove("btnClicked");
                  this.$router.push({ path: "/add-child" });
                }
              });
            }
          } else {
            this.$swal("مشکلی پیش آمد!", response.message, "error");
            if (response.status == 401) {
              this.$cookies.set("userEntered", false);
              this.$cookies.set("adminEntered", false);
              this.$cookies.remove("btnClicked");
              this.$router.push({ name: "SignupLogin" });
            }
          }
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
    },
    showCharts() {
      console.log("hi");
    },
    goTo(num, first_name, nCode) {
      if (num == 1) {
        this.dialogValue = false;
        this.$cookies.set("currentUserName", this.userName);
        this.$cookies.set("currentUserRole", this.userRole);
        this.$emit("user-rerender-drawer", 3);
        this.$cookies.remove("addChildActive");
        this.$cookies.remove("parentsDetailsActive");
        this.$cookies.remove("coursesShopActive");
        this.$cookies.remove("childNationalCode");
        this.$cookies.remove("btnClicked");
        this.$router.push({ name: "courseShop" });
      } else if (num == 2) {
        this.chooseCourse(first_name, nCode);
      } else if (num == 3) {
        this.$router.push({ name: "AddChild" });
      }
    },
    testAuth() {
      axios({
        method: "GET",
        url: `dashboard/?session=${this.$cookies.get("sessionId")}`,
        header: "application/json",
        headers: {
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status == 401) {
            this.$cookies.set("userEntered", false);
            this.$cookies.set("adminEntered", false);
            this.$cookies.remove("btnClicked");
            this.$router.push({ name: "SignupLogin" });
          }
        })
        .catch((err) => {
          if (err.response.status == 401) {
            this.$cookies.set("userEntered", false);
            this.$cookies.set("adminEntered", false);
            this.$cookies.remove("btnClicked");
            this.$router.push({ name: "SignupLogin" });
          }
        });
    },
    chooseCourse(first_name, nCode) {
      this.$cookies.set("currentUserName", first_name);
      this.$cookies.set("currentUserRole", "فرزند");
      this.$cookies.set("childNationalCode", nCode);
      axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          "Content-Type": "application/json",
        },
        url: `dashboard/change-child-user/${nCode}/?session=${this.$cookies.get(
          "sessionId"
        )}`,
      })
        .then(() => {
          this.$emit("user-rerender-drawer", 3);
          this.$cookies.remove("addChildActive");
          this.$cookies.remove("parentsDetailsActive");
          this.$cookies.remove("coursesShopActive");
          // this.$emit("reset-app");
          this.dialogValue = false;
          this.$cookies.remove("btnClicked");
          this.$router.push({ name: "courseShop" });
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
    },
  },
};
</script>
<style scoped>
.flex_class {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.flex_column_class {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.fontClass {
  font-family: danaRegular !important;
}
.appClass {
  font-family: danaRegular !important;
  width: 100%;
  height: 60%;
}
.mainPart {
  font-family: danaRegular !important;
  width: 80%;
  height: 91.4vh;
  margin-top: 3.85%;
  margin-left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f5f6;
  border-top-right-radius: 60px;
}
.bodyContainer {
  width: 100%;
  height: 91.8%;
  margin-top: -5%;
  margin-left: 0px;
  padding: 3%;
  display: flex;
  flex-flow: column;
}
.upperCharts {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.childChartContainer {
  width: 35% !important;
  background-color: white;
  padding: 1%;
  border-radius: 12px;
}
.selectClass {
  width: 50%;
  max-height: 50px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 8px;
  font-family: danaRegular !important;
}
.childChartClass {
  font-family: danaRegular !important;
}
.purchasedCourses {
  align-self: flex-start;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  padding: 2%;
  background-color: white;
  border-radius: 12px;
}
.purchasedCoursesTexts {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
}
.downCourses {
  width: 100%;
  display: flex;
  flex-flow: column;
}
.coursesCardsContainer {
  display: flex;
  align-items: center;
}
.cardClass {
  width: 323px;
  height: 396px;
  border-radius: 10px !important;
}
.imagesContainer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -20%;
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
.progressBar {
  width: 85%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.progressBar p {
  align-self: flex-start;
  color: #8a8b8d;
  font-size: 10px;
}
.mainCard {
  position: relative;
  height: 500px;
}
.rolePart {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.parentsPart {
  font-family: danaRegular !important;
  justify-content: flex-start !important;
}
.childPart {
  font-family: danaRegular !important;
}
.divChooseItems {
  font-weight: bold;
  color: #8a8b8d !important;
  background-color: #f4f5f6;
  width: 90%;
  min-height: 45px;
  max-height: 45px;
  border-radius: 8px;
  margin-right: 5%;
  cursor: pointer;
}
.selectChooseItems {
  font-weight: bold;
  color: #8a8b8d !important;
  background-color: #f4f5f6;
  width: 90% !important;
  min-height: 45px;
  max-height: 45px;
  border-radius: 8px;
  cursor: pointer;
}
.parentPart {
  width: 100%;
  margin-top: 3.8%;
}
.divChooseItems:hover {
  color: white !important;
  background-color: #ff9635;
}
.ss03 {
  -moz-font-feature-settings: "ss03";
  -webkit-font-feature-settings: "ss03";
  font-feature-settings: "ss03";
}
</style>

<style>
.selectClass input::placeholder {
  opacity: 1 !important;
  font-size: 20px !important;
}
.apexcharts-text tspan {
  font-family: danaRegular !important;
}
.ss03 {
  -moz-font-feature-settings: "ss03";
  -webkit-font-feature-settings: "ss03";
  font-feature-settings: "ss03";
}
.v-overlay__scrim {
  pointer-events: auto;
  background: #f4f5f6;
  border-radius: inherit;
  bottom: 0;
  left: 0;
  opacity: 0.32;
  position: fixed;
  right: 20% !important;
  top: 8.2% !important;
  border-top-right-radius: 60px;
}
.v-dialog > .v-overlay__content > .v-card,
.v-dialog > .v-overlay__content > .v-sheet,
.v-dialog > .v-overlay__content > form > .v-card,
.v-dialog > .v-overlay__content > form > .v-sheet {
  box-shadow: none !important;
  border-radius: 20px !important;
}
</style>
