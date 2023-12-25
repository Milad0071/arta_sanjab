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
import axios from 'axios';

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
    this.getData();
  },
  methods: {
    getData() {
      // const requestOptions = {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNDM0NjA3LCJpYXQiOjE3MDM0MTY2MDcsImp0aSI6ImIxYWNlYzdkYjk4YTQxY2Q4Y2I0MmZkMmQwYTIxY2RiIiwidXNlcl9pZCI6IjEyNzEyNjgwNTUifQ.oYhvIeMadeQENebdiUuWdzLX8jWcLjGdVlM6I0-hNrQ"
      //   },
        
      // };
      // fetch("http://194.9.56.86/api/v1/dashboard/", requestOptions)
      //   .then(async response => {
      //     console.log(response);
      //     // if (!response.ok) {
      //     //     const error = (data && data.message) || response.status;
      //     //     console.log(error)
      //     //     return Promise.reject(error);
      //     // }
      //   })
      //   .catch(error => {
      //       console.log(error)
      //   });


        // var bodyFormData = new FormData();
          // bodyFormData.append("phone_number", JSON.stringify(userPhoneNum));
            axios({
              method: "GET",
              url: "http://194.9.56.86/api/v1/dashboard/",
              header: "application/json",
              headers: {
                cookie: "sessionid: 0khrrtn5p2h225amtx5o20ftknm63cz8",
                'Content-Type': 'application/json' },
            })
              .then((response) => {
                console.log(response);
                // this.$cookies.set("userToken", response.data.access_token);
                // this.$cookies.set('userEntered', true);
                // this.$router.push({ path: "/home" });
              })
              .catch((err) => {
                console.log(err);
                this.$swal("مشکلی پیش آمد!", err.message, "error");
              });
    }
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
