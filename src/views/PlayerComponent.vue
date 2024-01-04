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
import axios from 'axios';

export default {
  data: () => {
    return {
      video: "./../../../../Arta_Pardaz/sanjab-arta/src/assets/example.mp4"
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      var id = parseInt(this.$cookies.get('courseId'))
      console.log(typeof id)
      axios({
        method: "GET",
        url: `http://194.9.56.86/api/v1/dashboard/my-course/${id}/?session=${this.$cookies.get('sessionId')}`,
        header: "application/json",
        headers: {
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          this.$swal("مشکلی پیش آمد!", err.message, "error");
        });
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