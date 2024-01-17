<template>
  <v-app class="mainApp" :key="resetKey">
    <!-- user nav bars -->
    <AppBar :key="componentKey" @rerender-drawer="forceRender" v-if="!$route.meta.hideNavbar && show == true"/>
    <Drawer :key="componentKey" :renderToken="renderToken" :pageNum="pageNum" v-if="!$route.meta.hideNavbar && show == true" />
    <!-- admin nav bars -->
    <AppBarAdmin :key="componentKey" @rerender-drawer="forceRender" v-if="$route.meta.adminNavbar && showAdmin == true"/>
    <DrawerAdmin :key="componentKey" :renderToken="renderToken" :pageNum="pageNum" v-if="$route.meta.adminNavbar && showAdmin == true" />

    <router-view @reset-app="forceReset" @rerender-drawer="forceRender" @user-type="userType"/>
      

  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue'
import Drawer from './components/NavigationDrawer.vue'
import AppBarAdmin from './components/AdminAppBar.vue'
import DrawerAdmin from './components/AdminNavigationDrawer.vue'

export default {
  
  data: () => {
    return {
      show: false,
      showAdmin: false,
      pageNum: 1,
      componentKey: 0,
      resetKey: 0,
      renderToken: 0,
    }
  },
  components: {
    AppBar,
    Drawer,
    AppBarAdmin,
    DrawerAdmin
  },
  created() {
    this.showBars();
    
  },
  methods: {
    forceRender(n) {
      this.renderToken = n;
      this.$cookies.set('addChildActive', 1)
      this.componentKey += 1;
    },
    forceReset() {
      this.showBars();
      this.resetKey += 1;
    },
    userType(n) {
      if (n == 'user') {
        this.userEntered = true;
      } else {
        this.userEntered = false;
      }
    },
    showBars() {
      setTimeout(() => {
        if (this.$route.name === 'SignupLogin' || this.$route.name === 'ParentsDetails' ||  this.$route.name === 'quizPage') {
          this.show = false;
        } else {
          this.show = true;
        }
        
      }, 300);
    }
  },
}
</script>
<style scoped>
@font-face {
    font-family: iranSansRegular;
    src: url('./assets/fonts/IRANSansX-Regular.ttf');
}
.mainApp {
  display: flex;
  flex-flow: column;
  font-family: iranSansRegular !important;
}
</style>
