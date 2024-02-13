<template>
  <v-app style="margin-right: 20%; font-family: iranSansRegular !important">
    <v-locale-provider rtl>
      <v-container class="flex_column_class">
        <!-- users section -->
        <div class="tableSections" style="margin-top: 10%">
          <div class="titlePart">
            <div class="titleShape"></div>
            <h2>اطلاعات کاربران</h2>
          </div>
          <UsersTable
            class="componentsClass"
            :key="userComponentKey"
            :users="usersArray"
            :hasUser="hasUser"
          >
          </UsersTable>
        </div>
        <!-- courses section -->
        <div class="tableSections">
          <div class="titlePart">
            <div class="titleShape"></div>
            <h2>اطلاعات دوره‌های خریداری شده</h2>
          </div>
          <CoursesTable
            class="componentsClass"
            :key="courseComponentKey"
            :courses="coursesArray"
            :hasCourse="hasCourse"
          >
          </CoursesTable>
        </div>
      </v-container>
    </v-locale-provider>
  </v-app>
</template>
<script>
import axios from "./../axios.js";
import UsersTable from "./../components/UsersTable.vue";
import CoursesTable from "./../components/CoursesTable.vue";

export default {
  emits: ["rerender-drawer", "reset-app"],
  components: { UsersTable, CoursesTable },
  data: () => {
    return {
      userComponentKey: 0,
      courseComponentKey: 0,
      hasUser: true,
      hasCourse: true,
      usersArray: [],
      coursesArray: [],
    };
  },
  created() {
    this.$cookies.remove("currentUserName");
    this.$cookies.remove("currentUserRole");
    this.getAdminData();
    this.getUsersData();
    this.getRegisteredCourses();
    this.$emit("reset-app");
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
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status == 200) {
            this.$cookies.set("currentUserName", response.data.first_name);
            this.$cookies.set("currentUserRole", "مدیر");
            this.$emit("rerender-drawer", 3);
          } else {
            console.log('1')
            this.$swal("مشکلی پیش آمد!", response.message, "error");
            this.$router.push({ name: "SignupLogin" });
          }
        })
        .catch((err) => {
          console.log('2')
          this.$swal("مشکلی پیش آمد!", err.message, "error");
          if (err.response.status == 401) {
            this.$router.push({ name: "SignupLogin" });
          }
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
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.data.length > 0) {
            this.hasUser = true;
          }
          this.usersArray = response.data;
          this.userComponentKey += 1;
        })
        .catch((err) => {
          console.log('3')
          this.$swal("مشکلی پیش آمد!", err.message, "error");
          // if (err.response.status == 401) {
            this.$router.push({ name: "SignupLogin" });
          // }
        });
    },
    getRegisteredCourses() {
      axios({
        method: "GET",
        url: `admin-dashboard/registered-courses/`,
        header: "application/json",
        headers: {
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response, '4')
          for (let i = 0; i < response.data.length; i++) {
            var data = response.data[i];
            if (data.child_user.type == 1) {
              data.child_user.type = "۴-۷ سال";
            } else if (data.child_user.type == 2) {
              data.child_user.type = "۸-۱۱ سال";
            } else if (data.child_user.type == 3) {
              data.child_user.type = "۱۲-۱۵ سال";
            }
            if (data.course.type == 1) {
              data.course.type = "۴-۷ سال";
            } else if (data.course.type == 2) {
              data.course.type = "۸-۱۱ سال";
            } else if (data.course.type == 3) {
              data.course.type = "۱۲-۱۵ سال";
            }
          }
          if (response.data.length > 0) {
            this.hasCourse = true;
          }
          this.coursesArray = response.data;
          this.courseComponentKey += 1;
        })
        .catch((err) => {
          console.log('4', err)
          this.$swal("مشکلی پیش آمد!", err.message, "error");
          // if (err.response.status == 401) {
            this.$router.push({ name: "SignupLogin" });
          // }
        });
    },
  },
};
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
.tableSections {
  width: 100% !important;
  margin: 0% 5% 5% 5%;
  padding: 10px;
  border: 1px solid #525355;
  border-radius: 7px;
}
.titlePart {
  display: flex;
  margin-top: 10px;
  margin-right: -10px;
}
.titlePart h2 {
  margin-right: 10px;
  color: #6d6e71;
}
.titleShape {
  border-left: 10px solid #6d6e71;
  border-radius: 7px 0 0 7px;
}
.componentsClass {
  height: 100%;
  background-color: transparent !important;
  margin-top: -8%;
}
</style>