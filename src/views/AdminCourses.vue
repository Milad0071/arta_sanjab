<template>
  <v-app style="margin-right: 20%; font-family: danaRegular !important">
    <v-locale-provider rtl>
      <v-container class="flex_column_class">
        <!-- courses section -->
        <div class="tableSections">
          <div class="upperTableSection">
            <div class="titlePart">
              <div class="titleShape"></div>
              <h2>اطلاعات دوره‌های خریداری شده</h2>
            </div>
            <div class="filter_part">
              <v-select
                :items="filterList"
                density="comfortable"
                class="input_1"
                variant="plain"
                label="فیلتر دوره‌ها"
                placeholder="نوع فیلتر را انتخاب نمایید"
                item-text="title"
                item-value="value"
                v-model="filterValue"
              ></v-select>
            </div>
            <div id="searchBox" class="searchContainer">
              <v-text-field
                label="جستجو"
                class="input_1"
                placeholder="جستجو نمایید"
                variant="plain"
                v-model="search"
              >
              </v-text-field>
            </div>
          </div>
          <CoursesTable
            class="componentsClass"
            :key="courseComponentKey"
            :courses="coursesArray"
            :hasCourse="hasCourse"
            :search="search"
            :filter="filterValue"
          >
          </CoursesTable>
        </div>
      </v-container>
    </v-locale-provider>
  </v-app>
</template>
<script>
import axios from "./../axios.js";
import CoursesTable from "./../components/CoursesTable.vue";

export default {
  components: { CoursesTable },
  emits: ["admin-rerender-drawer", "reset-app"],
  data: () => {
    return {
      filterValue: 1,
      search: "",
      hasCourse: true,
      courseComponentKey: 0,
      coursesArray: [],
      filterList: [
        {
          value: 1,
          title: "همه دوره‌ها",
        },
        {
          value: 2,
          title: "دوره‌های در حال برگزاری",
        },
        {
          value: 3,
          title: "دوره‌های پایان یافته",
        },
        {
          value: 4,
          title: "دوره‌های ناتمام",
        },
      ],
    };
  },
  watch: {
    search(newVal) {
      this.search = this.toFarsiNumber(newVal);
    },
    filterValue(newVal) {
      this.filterValue = newVal;
    },
  },
  created() {
    this.getRegisteredCourses();
    this.$emit("admin-rerender-drawer", 1);
  },
  mounted() {
    if (this.coursesArray.length === 0) {
      this.hasCourse = false;
    }
  },
  methods: {
    toFarsiNumber(n) {
      // n = parseInt(n);
      if (n != null) {
        if (n.length == 0) {
          return;
        }
        n = n.toString();
        var englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
          persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];

        for (
          var i = 0, numbersLen = englishNumbers.length;
          i < numbersLen;
          i++
        ) {
          n = n.replace(new RegExp(englishNumbers[i], "g"), persianNumbers[i]);
        }
        return n;
      }
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
          console.log("4", err);
          this.$swal("مشکلی پیش آمد!", err.message, "error");
          if (err.response.status == 401) {
            this.$cookies.set('userEntered', false);
            this.$cookies.set('adminEntered', false);
            this.$router.push({ name: "SignupLogin" });
          }
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
  margin: 10% 5% 5% 5%;
  padding: 10px;
  border: 1px solid #525355;
  border-radius: 7px;
}
.upperTableSection {
  display: flex;
  justify-content: space-between;
  padding-left: 30px;
  padding-top: 30px;
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
.filter_part {
  display: flex;
  flex-direction: column;
  width: 30%;
  padding: 0% 1%;
}
.searchContainer {
  width: 30%;
}
.input_1 {
  padding-top: 0 !important;
  max-height: 50px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 7px;
  border: 2px solid white;
  box-shadow: 1px 0px 10px 0px #525355;
  font-family: danaRegular !important;
}
.componentsClass {
  background-color: transparent !important;
  margin-top: -0%;
}
</style>
<style>
.v-application__wrap {
  /* min-height: 0% !important; */
  margin-top: 0px;
}
</style>
