<template>
  <v-app>
    <v-table class="tableClass" density="compact">
      <thead>
        <tr>
          <th class="text-right font-weight-bold">ردیف</th>
          <th class="text-right font-weight-bold">نام والد</th>
          <th class="text-right font-weight-bold">نام خانوادگی والد</th>
          <th class="text-right font-weight-bold">کد ملی والد</th>

          <th class="text-right font-weight-bold">نام کودک</th>
          <th class="text-right font-weight-bold">نام خانوادگی کودک</th>
          <th class="text-right font-weight-bold">کد ملی کودک</th>

          <th class="text-right font-weight-bold">نام دوره</th>
          <th class="text-right font-weight-bold">بازه سنی دوره</th>
          <th class="text-right font-weight-bold">قیمت دوره</th>
<<<<<<< HEAD
          <th class="text-right font-weight-bold">وضعیت دوره</th>
          <th class="text-right font-weight-bold">فارغ‌التحصیلی</th>
=======
          <th class="text-right font-weight-bold">نام کودک</th>
          <th class="text-right font-weight-bold">نام خانوادگی کودک</th>
          <th class="text-right font-weight-bold">کد ملی کودک</th>
          <th class="text-right font-weight-bold">کد ملی والد</th>
>>>>>>> 965a3b7fc6311edc8dfc8687a5e21ca73370c3f2
        </tr>
      </thead>
      <tbody v-if="hasCourseBoolean == true">
        <tr
          v-if="searchList.length > 0"
          v-for="(item, index) in searchList"
          :key="index"
        >
          <td>{{ this.toFarsiNumber(index + 1) }}</td>
          <td>{{ item.user.first_name }}</td>
          <td>{{ item.user.last_name }}</td>
          <td>{{ item.child_user.parent }}</td>
          <td>{{ item.child_user.first_name }}</td>
          <td>{{ item.child_user.last_name }}</td>
          <td>{{ item.child }}</td>
          <td>{{ item.course.name }}</td>
          <td>{{ item.course.type }}</td>
          <td>{{ item.course.price }}</td>
          <td>{{ item.is_active }}</td>
          <td>{{ item.is_graduated }}</td>
        </tr>
        <tr v-else class="text-center">
          <p>دوره‌ای یافت نشد!</p>
        </tr>
      </tbody>
      <div v-else class="text-center">
        <p>دوره‌ای وجود ندارد!</p>
      </div>
    </v-table>
  </v-app>
</template>
<script>
export default {
  emits: ["clicked"],
  props: { courses: Array, hasCourse: Boolean, search: String, filter: Number },
  data: () => {
    return {
      coursesArray: null,
      hasCourseBoolean: null,
    };
  },
  computed: {
    searchList() {
      console.log(this.search)
      console.log(this.filter)
      console.log(this.coursesArray)
      if (this.search) {
        return this.coursesArray.filter((item) => {
          if (this.filter == 1) {
            return (
              item.child.includes(this.search) ||
              item.user.first_name.includes(this.search) ||
              item.user.last_name.includes(this.search) ||
              item.child_user.parent.includes(this.search) ||
              item.child_user.first_name.includes(this.search) ||
              item.child_user.last_name.includes(this.search)
            );
          } else if (this.filter == 2) {
            return (
              (item.child.includes(this.search) ||
              item.user.first_name.includes(this.search) ||
              item.user.last_name.includes(this.search) ||
              item.child_user.parent.includes(this.search) ||
              item.child_user.first_name.includes(this.search) ||
              item.child_user.last_name.includes(this.search)) &&
              item.is_active.includes("در حال برگزاری")
            );
          } else if (this.filter == 3) {
            (item.child.includes(this.search) ||
              item.user.first_name.includes(this.search) ||
              item.user.last_name.includes(this.search) ||
              item.child_user.parent.includes(this.search) ||
              item.child_user.first_name.includes(this.search) ||
              item.child_user.last_name.includes(this.search)) &&
              item.is_active.includes("اتمام دوره")
          } else if (this.filter == 4) {
            (item.child.includes(this.search) ||
              item.user.first_name.includes(this.search) ||
              item.user.last_name.includes(this.search) ||
              item.child_user.parent.includes(this.search) ||
              item.child_user.first_name.includes(this.search) ||
              item.child_user.last_name.includes(this.search)) &&
              item.is_active.includes("ناتمام")
          }
        });
      } else {
        console.log(this.filter)
        if (this.filter == 2) {
          return this.coursesArray.filter((item) => {
            return item.is_active.includes("در حال برگزاری")
          })
        } else if (this.filter == 3) {
          return this.coursesArray.filter((item) => {
            return item.is_active.includes("اتمام دوره")
          })
        } else if (this.filter == 4) {
          return this.coursesArray.filter((item) => {
            return item.is_active.includes("ناتمام")
          })
        } else {
          return this.coursesArray;
        }
      }
    },
  },
  created() {
    this.getData();
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
    getData() {
      this.coursesArray = this.courses;
      this.hasCourseBoolean = this.hasCourse;
      if (this.coursesArray.length === 0) {
        this.hasCourseBoolean = false;
      }
      for (let i = 0; i < this.coursesArray.length; i++) {
        this.coursesArray[i].child = this.toFarsiNumber(
          this.coursesArray[i].child
        );
        this.coursesArray[i].child_user.birth_date = this.toFarsiNumber(
          this.coursesArray[i].child_user.birth_date
        );
        this.coursesArray[i].child_user.grade = this.toFarsiNumber(
          this.coursesArray[i].child_user.grade
        );
        this.coursesArray[i].child_user.national_code = this.toFarsiNumber(
          this.coursesArray[i].child_user.national_code
        );
        this.coursesArray[i].child_user.parent = this.toFarsiNumber(
          this.coursesArray[i].child_user.parent
        );
        if (
          this.coursesArray[i].is_active == true &&
          this.coursesArray[i].is_graduated == false
        ) {
          this.coursesArray[i].is_active = "در حال برگزاری";
        } else if (
          this.coursesArray[i].is_active == true &&
          this.coursesArray[i].is_graduated == true
        ) {
          this.coursesArray[i].is_active = "اتمام دوره";
        } else if (
          this.coursesArray[i].is_active == false &&
          this.coursesArray[i].is_graduated == false
        ) {
          this.coursesArray[i].is_active = "ناتمام";
        }
        if (this.coursesArray[i].is_graduated == true) {
          this.coursesArray[i].is_graduated = "بله";
        } else {
          this.coursesArray[i].is_graduated = "خیر";
        }
      }
    },
    sendEmit() {
      this.$emit("clicked");
    },
  },
};
</script>
<style scoped>
.tableClass {
  width: 100%;
  display: flex;
  justify-content: center;
  color: #373739;
  background-color: hsl(31, 100%, 48%, 0.5);
  border-radius: 7px;
  margin-top: 3%;
}
.iconCol {
  border: 1px solid green;
  border-radius: 7px;
  width: 10px !important;
}
.iconCol:hover {
  color: white !important;
  background: green !important;
  cursor: pointer !important;
}
</style>

<style>
.v-application__wrap {
  min-height: 0% !important;
}
</style>