<template>
  <v-app class="mainApp">
    <AppBar @rerender-drawer="forceRender" v-if="show"/>
    <Drawer :key="componentKey" :renderToken="renderToken" :pageNum="pageNum" v-if="show" />

    <router-view />
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
      renderToken: 0,
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
      this.renderToken = n;
      this.$cookies.set('addChildActive', 1)
      this.componentKey += 1;
    },
    showBars() {
      setTimeout(() => {
        if (this.$route.name === 'SignupLogin' || this.$route.name === 'ParentsDetails' ||  this.$route.name === 'quizPage' || this.$route.name === 'PlayerComp') {
          this.show = false;
        } else {
          this.show = true;
        }
        
      }, 500);
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
