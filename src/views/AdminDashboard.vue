<template>
  <v-app></v-app>
</template>
<script>
import axios from './../axios.js';

export default {
  emits: ['rerender-drawer', 'reset-app'],
  data: () => {
    return {
      
    }
  },
  created() {
    this.$cookies.remove('currentUserName');
    this.$cookies.remove('currentUserRole');
    this.getData();
  },
  methods: {
    getData() {
      axios({
        method: "GET",
        url: `admin-dashboard/`,
        header: "application/json",
        headers: {
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {
          console.log(response)
          if (response.status == 200) {
            this.$cookies.set('currentUserName', response.data.first_name);
            this.$cookies.set('currentUserRole', 'مدیر');
            this.$emit("rerender-drawer", 3);
          } else {
            this.$swal("مشکلی پیش آمد!", response.message, "error");
            this.$router.push({ name: "SignupLogin" });
          }
        })
        .catch((err) => {
          this.$swal("مشکلی پیش آمد!", err.message, "error");
          this.$router.push({ name: "SignupLogin" });
        });
    axios({
        method: "GET",
        url: `admin-dashboard/registered-courses/`,
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
    // axios({
    //     method: "GET",
    //     url: `admin-dashboard/user/${nCode}/`,
    //     headers: {
    //       Authorization: `Bearer ${this.$cookies.get("userToken")}`,
    //       'Content-Type': 'application/json'
    //     },
    //   })
    //     .then((response) => {
    //     })
    //     .catch((err) => {
    //       this.$swal("مشکلی پیش آمد!", err.message, "error");
    //     });
    // axios({
    //     method: "GET",
    //     url: `admin-dashboard/users/`,
    //     headers: {
    //       Authorization: `Bearer ${this.$cookies.get("userToken")}`,
    //       'Content-Type': 'application/json'
    //     },
    //   })
    //     .then((response) => {
    //     })
    //     .catch((err) => {
    //       this.$swal("مشکلی پیش آمد!", err.message, "error");
    //     });
    },
  },
}
</script>
<style scoped>

</style>