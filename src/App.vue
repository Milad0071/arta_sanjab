<template>
  <v-app class="mainApp">
    <div :key="resetKey">
      <!-- admin nav bars -->
      <AppBarAdmin
        :key="adminComponentKeyBar"
        @admin-rerender-drawer="adminForceRender"
        v-if="$route.meta.adminNavbar && showAdmin == true"
      />
      <DrawerAdmin
        :key="adminComponentKeyDrawer"
        :adminRenderToken="adminRenderToken"
        v-if="$route.meta.adminNavbar && showAdmin == true"
      />
      <!-- user nav bars -->
      <AppBar
        :key="userComponentKeyBar"
        @user-rerender-drawer="userForceRender"
        @dialog="getDialog"
        v-if="!$route.meta.hideNavbar && show == true"
      />
      <Drawer
        :key="userComponentKeyDrawer"
        :renderToken="renderToken"
        v-if="!$route.meta.hideNavbar && show == true"
      />
    </div>

    <router-view
      @reset-app="forceReset"
      @user-rerender-drawer="userForceRender"
      @admin-rerender-drawer="adminForceRender"
      :dialog="dialog"
      :key="homeResetKey"
    />
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue";
import Drawer from "./components/NavigationDrawer.vue";
import AppBarAdmin from "./components/AdminAppBar.vue";
import DrawerAdmin from "./components/AdminNavigationDrawer.vue";

export default {
  data: () => {
    return {
      show: false,
      showAdmin: false,
      dialog: false,
      userComponentKeyBar: 0,
      userComponentKeyDrawer: 0,
      adminComponentKeyBar: 0,
      adminComponentKeyDrawer: 0,
      homeResetKey: 0,
      resetKey: 0,
      renderToken: 0,
      adminRenderToken: 0,
    };
  },
  components: {
    AppBar,
    Drawer,
    AppBarAdmin,
    DrawerAdmin,
  },
  created() {
    this.showBars();
  },
  mounted() {
    //code for stopping browser back button
    window.onpopstate = (event) => {
      if (event.state.forward == "/quiz-page") {
        this.$router.push("/quiz-page"); // redirect to home, for example
        this.$cookies.set("stay");
      } else if (this.$cookies.get("stay")) {
        this.$router.push("/quiz-page");
      }
    };
  },
  methods: {
    userForceRender(n) {
      this.renderToken = n;
      this.userComponentKeyBar += 1;
      this.userComponentKeyDrawer += 1;
      this.show = true;
      this.showAdmin = false;
    },
    adminForceRender(n) {
      this.adminRenderToken = n;
      this.adminComponentKeyBar += 1;
      this.adminComponentKeyDrawer += 1;
      this.show = false;
      this.showAdmin = true;
    },
    forceReset() {
      this.resetKey += 1;
      this.showBars();
    },
    userType(n) {
      if (n == "user") {
        this.userEntered = true;
      } else {
        this.userEntered = false;
      }
    },
    showBars() {
      setTimeout(() => {
        if (
          this.$route.name === "SignupLogin" ||
          this.$route.name === "ParentsDetails" ||
          this.$route.name === "quizPage"
        ) {
          this.show = false;
          this.showAdmin = false;
        } else if (
          this.$route.name === "adminDashboard" ||
          this.$route.name === "adminCourses" ||
          this.$route.name === "adminUsers"
        ) {
          this.show = false;
          this.showAdmin = true;
        } else {
          this.show = true;
          this.showAdmin = false;
        }
      }, 300);
    },
    getDialog(n) {
      this.dialog = n;
      this.homeResetKey += 1;
    },
  },
};
</script>
<style scoped>
@font-face {
  font-family: danaRegular;
  src: url("./assets/fonts/Dana-Regular.ttf");
}
.mainApp {
  display: flex;
  flex-flow: column;
  font-family: danaRegular !important;
}
</style>
<style>
.mainApp > .v-application__wrap {
  position: unset !important;
  min-height: 0 !important;
  max-height: 0 !important;
}
</style>
