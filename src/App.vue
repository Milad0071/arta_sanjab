<template>
  <v-app class="mainApp">
    <div :key="resetKey">
      <!-- admin nav bars -->
      <AppBarAdmin
        :key="userComponentKeyBar"
        @rerender-drawer="forceRender"
        v-if="$route.meta.adminNavbar && showAdmin == true"
      />
      <DrawerAdmin
        :key="userComponentKeyDrawer"
        :adminRenderToken="adminRenderToken"
        :pageNum="pageNum"
        v-if="$route.meta.adminNavbar && showAdmin == true"
      />
      <!-- user nav bars -->
      <AppBar
        :key="adminComponentKeyBar"
        @rerender-drawer="forceRender"
        v-if="!$route.meta.hideNavbar && show == true"
      />
      <Drawer
        :key="adminComponentKeyDrawer"
        :renderToken="renderToken"
        :pageNum="pageNum"
        v-if="!$route.meta.hideNavbar && show == true"
      />
    </div>

    <router-view
      @reset-app="forceReset"
      @rerender-drawer="forceRender"
      @user-type="userType"
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
      pageNum: 1,
      userComponentKeyBar: 0,
      userComponentKeyDrawer: 0,
      adminComponentKeyBar: 0,
      adminComponentKeyDrawer: 0,
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
    forceRender(n) {
      this.renderToken = n;
      this.$cookies.set("addChildActive", 1);
      this.userComponentKeyBar += 1;
      this.userComponentKeyDrawer += 1;
      // this.adminComponentKeyBar += 1;
      // this.adminComponentKeyDrawer += 1;
    },
    adminForceRender(n) {
      this.adminRenderToken = n;
      this.adminComponentKeyBar += 1;
      this.adminComponentKeyDrawer += 1;
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
        } else if (this.$route.name === "adminDashboard") {
          this.show = false;
          this.showAdmin = true;
        } else {
          this.show = true;
          this.showAdmin = false;
        }
      }, 300);
    },
  },
};
</script>
<style scoped>
@font-face {
  font-family: iranSansRegular;
  src: url("./assets/fonts/IRANSansX-Regular.ttf");
}
.mainApp {
  display: flex;
  flex-flow: column;
  font-family: iranSansRegular !important;
}
</style>
<style>
.mainApp > .v-application__wrap {
  position: unset !important;
  min-height: 0 !important;
  max-height: 0 !important;
}
</style>
