<template>
  <v-app class="mainApp" :key="resetKey">
    <AppBar @rerender-drawer="forceRender" :userName="userName" v-if="!$route.meta.hideNavbar && show == true"/>
    <Drawer :key="componentKey" :renderToken="renderToken" :pageNum="pageNum" v-if="!$route.meta.hideNavbar && show == true" />

    <router-view @reset-app="forceReset" @rerender-drawer="forceRender"/>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue'
import Drawer from './components/NavigationDrawer.vue'

export default {
  
  data: () => {
    return {
      show: false,
      pageNum: 1,
      componentKey: 0,
      resetKey: 0,
      renderToken: 0,
      userName: null,
    }
  },
  components: {
    AppBar,
    Drawer
  },
  created() {
    this.showBars();
    
  },
  methods: {
    forceRender(n) {
      console.log(n)
      this.renderToken = n;
      this.$cookies.set('addChildActive', 1)
      this.componentKey += 1;
    },
    forceReset() {
      console.log('got it')
      this.showBars();
      this.resetKey += 1;
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
