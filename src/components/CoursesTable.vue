<template>
  <v-app>
    <v-table class="tableClass" density="compact">
      <thead>
        <tr>
          <th class="text-right font-weight-bold">ردیف</th>
          <th class="text-right font-weight-bold">نام دوره</th>
          <th class="text-right font-weight-bold">بازه سنی دوره</th>
          <th class="text-right font-weight-bold">قیمت دوره</th>
          <th class="text-right font-weight-bold">نام کودک</th>
          <th class="text-right font-weight-bold">نام خانوادگی کودم</th>
          <th class="text-right font-weight-bold">کد ملی کودک</th>
          <th class="text-right font-weight-bold">کد ملی والد</th>
          <th class="text-right font-weight-bold">وضعیت دوره</th>
          <th class="text-right font-weight-bold">فارغ‌التحصیلی</th>
        </tr>
      </thead>
      <tbody v-if="hasCourseBoolean == true">
        <tr v-for="(item, index) in coursesArray" :key="index">
          <td>{{this.toFarsiNumber(index+1)}}</td>
          <td>{{ item.course.name }}</td>
          <td>{{ item.course.type }}</td>
          <td>{{ item.course.price }}</td>
          <td>{{ item.child_user.first_name }}</td>
          <td>{{ item.child_user.last_name }}</td>
          <td>{{ item.child }}</td>
          <td>{{ item.child_user.parent }}</td>
          <td>{{ item.is_active }}</td>
          <td>{{ item.is_graduated }}</td>
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
  emits: ['clicked'],
  props: { courses: Array,  hasCourse: Boolean},
  data: () => {
    return {
      coursesArray: null,
      hasCourseBoolean: null,
    }
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

        for (var i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
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
        this.coursesArray[i].child = this.toFarsiNumber(this.coursesArray[i].child);
        this.coursesArray[i].child_user.birth_date = this.toFarsiNumber(this.coursesArray[i].child_user.birth_date);
        this.coursesArray[i].child_user.grade = this.toFarsiNumber(this.coursesArray[i].child_user.grade);
        this.coursesArray[i].child_user.national_code = this.toFarsiNumber(this.coursesArray[i].child_user.national_code);
        this.coursesArray[i].child_user.parent = this.toFarsiNumber(this.coursesArray[i].child_user.parent);
        if (this.coursesArray[i].is_active == true) {
          this.coursesArray[i].is_active = 'در حال برگزاری';
        } else {
          this.coursesArray[i].is_active = 'پایان یافته';
        }
        if (this.coursesArray[i].is_graduated == true) {
          this.coursesArray[i].is_graduated = 'بله';
        } else {
          this.coursesArray[i].is_graduated = 'خیر';
        }
      }
      console.log(this.coursesArray)
    },
    sendEmit() {
      this.$emit("clicked");
    },
  },
}
</script>
<style scoped>
.tableClass {
  width: 100%;
  display: flex;
  justify-content: center;
  color: #373739;
  background-color: hsl(31, 100%, 48%, 0.5);
  border-radius: 7px;
  margin-top: 10%;
}
.iconCol {
  border: 1px solid green;
  border-radius: 7px;
  width: 10px !important;
}
.iconCol:hover {
  color: white !important;
  background: green !important;
  cursor: pointer !important;;
}
</style>

<style>
.v-application__wrap {
  min-height: 0% !important;
}
</style>