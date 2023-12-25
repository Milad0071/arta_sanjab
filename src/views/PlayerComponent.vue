<template>
  <v-app>
    <v-locale-provider rtl>
      <div class="mainContainer flex_class">
        <video width="450" controls :src="video"></video>
      </div>
    </v-locale-provider>
  </v-app>
</template>
<script>

export default {
  data: () => {
    return {
      video: "./../../../../Arta_Pardaz/sanjab-arta/src/assets/example.mp4"
    }
  },

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
  background-image: url('./../assets/quiz_background.jpg');
  background-size: cover;
}
</style>