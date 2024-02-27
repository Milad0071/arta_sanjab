<template>
  <v-locale-provider rtl>
    <v-navigation-drawer
      permanent
      location="right"
      :elevation="1"
      style="top: 0 !important; width: 20%; height: 100% !important"
    >
      <div class="logoPart">
        <v-img
          src="./../assets/sanjabTextLogo.png"
          alt="mainLogo"
          style="width: 250px; height: 250px; padding: 10px !important"
        ></v-img>
      </div>
      <v-list class="drawerList" density="compact" nav open-on-hover>
        <v-list-item
          class="homeItem"
          :key="activeKey"
          :active="homeActive"
          value="home"
          @click="goTo(1)"
        >
          <Home id="homeIconTag" style="width: 30px" />
          <p
            id="homeText"
            style="color: rgb(160, 168, 176); font-weight: bold"
            class="mr-3"
          >
            داشبورد
          </p>
        </v-list-item>
        <v-list-item
          :active="coursesListActive"
          class="coursesListItem"
          value="coursesList"
          @click="goTo(2)"
        >
          <CoursesList id="coursesListIconTag" style="width: 30px" />
          <p
            id="coursesListText"
            style="color: rgb(160, 168, 176); font-weight: bold"
            class="mr-3"
          >
            دوره‌ها
          </p>
        </v-list-item>
        <v-list-item
          :active="usersListActive"
          class="usersListItem"
          value="usersList"
          @click="goTo(3)"
        >
          <UsersManagement id="usersListIconTag" style="width: 30px" />
          <p
            id="usersListText"
            style="color: rgb(160, 168, 176); font-weight: bold"
            class="mr-3"
          >
            مدیریت کاربران
          </p>
        </v-list-item>
        <!-- <v-menu
          open-on-hover
        >
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
            >
              Dropdown
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu> -->
        <v-list-item
          :active="usersListActive"
          disabled
          class="registeredListItem"
          value="registeredList"
          @click="goTo(4)"
        >
          <RegisteredList id="usersListIconTag" style="width: 30px" />
          <p
            id="usersListText"
            style="color: rgb(160, 168, 176); font-weight: bold"
            class="mr-3"
          >
            لیست ثبت‌نامی‌ها
          </p>
        </v-list-item>
        <v-list-item
          :active="financeProcessActive"
          disabled
          class="financeProcess"
          value="financeProcess"
          @click="goTo(5)"
        >
          <FinanceProcess id="financeProcessIconTag" style="width: 30px" />
          <p
            id="financeProcessText"
            style="color: rgb(160, 168, 176); font-weight: bold"
            class="mr-3"
          >
            تراکنش مالی
          </p>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-locale-provider>
</template>
<script>
import Home from "./../assets/svgIcons/homeIcon.vue";
import CoursesList from "./../assets/svgIcons/CoursesListIcon.vue";
import UsersManagement from "./../assets/svgIcons/UsersManagement.vue";
import RegisteredList from "./../assets/svgIcons/RegisteredListIcon.vue";
import FinanceProcess from "./../assets/svgIcons/FinanceProcessIcon.vue";

export default {
  props: { adminRenderToken: Number },
  components: {
    Home,
    CoursesList,
    RegisteredList,
    FinanceProcess,
    UsersManagement,
  },
  data: () => ({
    activeKey: 1,
    homeActive: false,
    coursesListActive: false,
    usersListActive: false,
    financeProcessActive: false,
  }),
  mounted() {
    this.showChosenPage();
  },
  methods: {
    showChosenPage() {
      // highligh the chosen page name
      if (this.adminRenderToken == 1) {
        this.$cookies.set("coursesListActive", true);
      } else if (this.adminRenderToken == 2) {
        this.$cookies.set("usersListActive", true);
      }
      // else if (this.adminRenderToken == 3) {
      //   this.$cookies.set("financeProcessActive", true);
      // }
      if (
        this.adminRenderToken == 0 &&
        (this.$cookies.get("adminHomeActive") == "true" ||
          this.$cookies.get("adminHomeActive") == true)
      ) {
        this.homeActive = true;
        this.coursesListActive = false;
        this.usersListActive = false;
        document.getElementById("homeText").classList.add("chosenLink");
        document.getElementById("homeIconTag").classList.add("chosenIcon");
        document
          .getElementById("coursesListText")
          .classList.remove("chosenLink");
        document
          .getElementById("coursesListIconTag")
          .classList.remove("chosenIcon");
        document.getElementById("usersListText").classList.remove("chosenLink");
        document
          .getElementById("usersListIconTag")
          .classList.remove("chosenIcon");
        // document
        //   .getElementById("financeProcessText")
        //   .classList.remove("chosenLink");
        // document
        //   .getElementById("financeProcessIconTag")
        //   .classList.remove("chosenIcon");
      }
      if (
        this.adminRenderToken == 1 ||
        this.$cookies.get("coursesListActive") == "true" ||
        this.$cookies.get("coursesListActive") == true
      ) {
        this.homeActive = false;
        this.coursesListActive = true;
        this.usersListActive = false;
        // this.financeProcessActive = false;
        document.getElementById("homeText").classList.remove("chosenLink");
        document.getElementById("homeIconTag").classList.remove("chosenIcon");
        document.getElementById("coursesListText").classList.add("chosenLink");
        document
          .getElementById("coursesListIconTag")
          .classList.add("chosenIcon");
        document.getElementById("usersListText").classList.remove("chosenLink");
        document
          .getElementById("usersListIconTag")
          .classList.remove("chosenIcon");
        // document
        //   .getElementById("financeProcessText")
        //   .classList.remove("chosenLink");
        // document
        //   .getElementById("financeProcessIconTag")
        //   .classList.remove("chosenIcon");
      } else if (
        this.adminRenderToken == 2 ||
        this.$cookies.get("usersListActive") == "true" ||
        this.$cookies.get("usersListActive") == true
      ) {
        this.homeActive = false;
        this.coursesListActive = false;
        // this.financeProcessActive = false;
        this.usersListActive = true;
        document.getElementById("homeText").classList.remove("chosenLink");
        document.getElementById("homeIconTag").classList.remove("chosenIcon");
        document
          .getElementById("coursesListText")
          .classList.remove("chosenLink");
        document
          .getElementById("coursesListIconTag")
          .classList.remove("chosenIcon");
        // document
        //   .getElementById("financeProcessText")
        //   .classList.remove("chosenLink");
        // document
        //   .getElementById("financeProcessIconTag")
        //   .classList.remove("chosenIcon");
        document.getElementById("usersListText").classList.add("chosenLink");
        document.getElementById("usersListIconTag").classList.add("chosenIcon");
      }
      // else if (
      //   this.renderToken == 3 ||
      //   this.$cookies.get("financeProcessActive") == "true" ||
      //   this.$cookies.get("financeProcessActive") == true
      // ) {
      //   this.homeActive = false;
      //   this.coursesListActive = false;
      //   this.usersListActive = false;
      //   this.financeProcessActive = true;
      //   document.getElementById("homeText").classList.remove("chosenLink");
      //   document.getElementById("homeIconTag").classList.remove("chosenIcon");
      //   document
      //     .getElementById("coursesListText")
      //     .classList.remove("chosenLink");
      //   document
      //     .getElementById("coursesListIconTag")
      //     .classList.remove("chosenIcon");
      //   document
      //     .getElementById("usersListText")
      //     .classList.remove("chosenLink");
      //   document
      //     .getElementById("usersListIconTag")
      //     .classList.remove("chosenIcon");
      //   document
      //     .getElementById("financeProcessText")
      //     .classList.add("chosenLink");
      //   document
      //     .getElementById("financeProcessIconTag")
      //     .classList.add("chosenIcon");
      // }
    },
    changeDecoration(num) {
      this.homeActive = null;
      this.coursesListActive = null;
      this.usersListActive = null;
      // this.financeProcessActive = null;
      if (num == 1) {
        this.$cookies.remove("coursesListActive");
        this.$cookies.remove("usersListActive");
        // this.$cookies.remove("financeProcessActive");
        document.getElementById("homeText").classList.add("chosenLink");
        document.getElementById("homeIconTag").classList.add("chosenIcon");
        document
          .getElementById("coursesListText")
          .classList.remove("chosenLink");
        document
          .getElementById("coursesListIconTag")
          .classList.remove("chosenIcon");
        document.getElementById("usersListText").classList.remove("chosenLink");
        document
          .getElementById("usersListIconTag")
          .classList.remove("chosenIcon");
        // document
        //   .getElementById("financeProcessText")
        //   .classList.remove("chosenLink");
        // document
        //   .getElementById("financeProcessIconTag")
        //   .classList.remove("chosenIcon");
      } else if (num == 2) {
        this.$cookies.set("coursesListActive", true);
        this.$cookies.remove("usersListActive");
        // this.$cookies.remove("financeProcessActive");
        document.getElementById("coursesListText").classList.add("chosenLink");
        document
          .getElementById("coursesListIconTag")
          .classList.add("chosenIcon");
        document.getElementById("homeText").classList.remove("chosenLink");
        document.getElementById("homeIconTag").classList.remove("chosenIcon");
        document.getElementById("usersListText").classList.remove("chosenLink");
        document
          .getElementById("usersListIconTag")
          .classList.remove("chosenIcon");
        // document
        //   .getElementById("financeProcessText")
        //   .classList.remove("chosenLink");
        // document
        //   .getElementById("financeProcessIconTag")
        //   .classList.remove("chosenIcon");
      } else if (num == 3) {
        this.$cookies.set("usersListActive", true);
        this.$cookies.remove("coursesListActive");
        // this.$cookies.remove("financeProcessActive");
        document
          .getElementById("coursesListText")
          .classList.remove("chosenLink");
        document
          .getElementById("coursesListIconTag")
          .classList.remove("chosenIcon");
        document.getElementById("homeText").classList.remove("chosenLink");
        document.getElementById("homeIconTag").classList.remove("chosenIcon");
        document.getElementById("usersListText").classList.add("chosenLink");
        document.getElementById("usersListIconTag").classList.add("chosenIcon");
        // document
        //   .getElementById("financeProcessText")
        //   .classList.remove("chosenLink");
        // document
        //   .getElementById("financeProcessIconTag")
        //   .classList.remove("chosenIcon");
      }
      // else if (num == 4) {
      //   this.$cookies.set("financeProcessActive", true);
      //   this.$cookies.remove("coursesListActive");
      //   this.$cookies.remove("usersListActive");
      //   document
      //     .getElementById("coursesListText")
      //     .classList.remove("chosenLink");
      //   document
      //     .getElementById("coursesListIconTag")
      //     .classList.remove("chosenIcon");
      //   document.getElementById("homeText").classList.remove("chosenLink");
      //   document.getElementById("homeIconTag").classList.remove("chosenIcon");
      //   document
      //     .getElementById("usersListText")
      //     .classList.remove("chosenLink");
      //   document
      //     .getElementById("usersListIconTag")
      //     .classList.remove("chosenIcon");
      //   document
      //     .getElementById("financeProcessText")
      //     .classList.add("chosenLink");
      //   document
      //     .getElementById("financeProcessIconTag")
      //     .classList.add("chosenIcon");
      // }
    },
    goTo(numPage) {
      this.changeDecoration(numPage);
      if (numPage == 1) {
        this.$router.push({ name: "adminDashboard" });
      } else if (numPage == 2) {
        this.$router.push({ name: "adminCourses" });
      } else if (numPage == 3) {
        this.$router.push({ name: "adminUsers" });
      }
      // else if (numPage == 4) {
      //   this.$router.push({ name: "adminRegisters" });
      // } else if (numPage == 5) {
      //   this.$router.push({ name: "adminFinance" });
      // }
    },
  },
};
</script>
<style scoped>
.chosenLink {
  color: rgb(94, 89, 255) !important;
}
.chosenIcon {
  stroke: rgb(94, 89, 255) !important;
}
.logoPart {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.drawerList {
  font-size: 15px !important;
  font-weight: bold;
}
.homeItem:hover p {
  color: rgb(94, 89, 255) !important;
}
.homeItem:hover #homeIconTag {
  stroke: rgb(94, 89, 255) !important;
}
.coursesListItem:hover p {
  color: rgb(94, 89, 255) !important;
}
.coursesListItem:hover #addChildIconTag {
  stroke: rgb(94, 89, 255) !important;
}
.registeredListItem:hover p {
  color: rgb(94, 89, 255) !important;
}
.registeredListItem:hover #parentsDetailsIconTag {
  stroke: rgb(94, 89, 255) !important;
}
</style>
<style>
@font-face {
  font-family: danaRegular;
  src: url("./assets/fonts/Dana-Regular.ttf");
}
.homeItem > .v-list-item-title {
  font-size: 18px !important;
}
</style>
