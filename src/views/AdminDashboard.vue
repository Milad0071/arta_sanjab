<template>
  <v-app style="margin-right: 20%; font-family: iranSansRegular !important">
    <v-locale-provider rtl>
      <v-container class="flex_column_class">

      </v-container>
    </v-locale-provider>
  </v-app>
</template>
<script>
import axios from './../axios.js';

export default {
  emits: ['rerender-drawer', 'reset-app'],
  data: () => {
    return {
      userComponentKey: 0,
      courseComponentKey: 0,
      hasUser: true,
      hasCourse: true,
      usersArray: [],
      coursesArray: [],
    }
  },
  created() {
    this.$cookies.remove('currentUserName');
    this.$cookies.remove('currentUserRole');
    this.getAdminData();
    this.getUsersData();
    this.getRegisteredCourses();
  },
  mounted() {
    if (this.usersArray.length === 0) {
      this.hasUser = false;
    }
    if (this.coursesArray.length === 0) {
      this.hasCourse = false;
    }
  },
  methods: {
    getAdminData() {
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
    
    },
    getUsersData() {
      axios({
          method: "GET",
          url: `admin-dashboard/users/`,
          headers: {
            Authorization: `Bearer ${this.$cookies.get("userToken")}`,
            'Content-Type': 'application/json'
          },
        })
        .then((response) => {
          console.log(response)
          for (let i = 0; i < response.data.length; i++) {
            this.usersArray.push({
              first_name: response.data[i].first_name,
              last_name: response.data[i].last_name,
              national_code: response.data[i].national_code,
              phone_number: response.data[i].phone_number,
            })
          }
          if (response.data.length > 0) {
            this.hasUser = true;
          }
          
          this.userComponentKey += 1;
          })
          .catch((err) => {
            this.$swal("مشکلی پیش آمد!", err.message, "error");
          });
    },
    getRegisteredCourses() {
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
        for (let i = 0; i < response.data.length; i++) {
          var data = response.data[i];
          if (data.child_user.type == 1) {
            data.child_user.type = '۴-۷ سال';
          }
          this.coursesArray.push({
            
            child_national_num: data.child,
            child_first_name: data.child_user.first_name,
            child_last_name: data.child_user.last_name,
            child_age_range: data.child_user.type,
            phone_number: data.phone_number,
          })
        }
        if (response.data.length > 0) {
          this.hasCourse = true;
        }
        this.courseComponentKey += 1;
      })
      .catch((err) => {
        this.$swal("مشکلی پیش آمد!", err.message, "error");
      });
    },
  },
}
</script>
<style scoped>
.flex_class {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.flex_column_class {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>