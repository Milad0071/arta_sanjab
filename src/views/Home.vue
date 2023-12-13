<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app class="appClass">
    <div class="logoPart">
      <v-img
        src="./../assets/sanjabTextLogo.png"
        alt="mainLogo"
        style="width: 250px; height: 250px; padding: 10px !important"
      ></v-img>
    </div>
  </v-app>
</template>
<script>

export default {
  data: () => {
    return {
    }
  },
  created() {
    if (this.$cookies.get('resetPage')) {
      window.location.reload();
      this.$cookies.remove('resetPage');
    }
  },
  methods: {
  }
};
</script>
<style scoped>
.appClass {
  width: 100%;
  height: 100%;
}
.logoPart {
  width: 80%;
  height: 91.8%;
  margin-top: 3.85%;
  margin-left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
