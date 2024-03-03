<template>
  <v-app>
    <v-table class="tableClass" density="compact">
      <thead>
        <tr class="tableRows">
          <th v-if="childrenArray.length == 0">
            <!-- <v-icon
              class="iconCol"
              size="large"
              color="green-darken-2"
              icon="mdi-plus"
              @click="sendEmit()"
            ></v-icon> -->
          </th>
          <th v-else class="text-right font-weight-bold">عملیات</th>
          <th class="text-right font-weight-bold">ردیف</th>
          <th class="text-right font-weight-bold">نام</th>
          <th class="text-right font-weight-bold">نام خانوادگی</th>
          <th class="text-right font-weight-bold">کد ملی</th>
          <th class="text-right font-weight-bold">تاریخ تولد</th>
          <th class="text-right font-weight-bold">بازه سنی</th>
          <th class="text-right font-weight-bold">مقطع تحصیلی</th>
          <th class="text-right font-weight-bold">محل تحصیل</th>
          <th class="text-right font-weight-bold">فرزند چندم</th>
        </tr>
      </thead>
      <tbody v-if="hasChildBoolean == true">
        <tr
          class="tableRows"
          v-for="(item, index) in childrenArray"
          :key="index"
        >
          <td v-if="index + 1 == childrenArray.length">
            <!-- <v-icon
              class="iconCol"
              size="large"
              color="green-darken-2"
              icon="mdi-plus"
              @click="sendEmit()"
            ></v-icon> -->
          </td>
          <td v-else></td>
          <td>{{ this.toFarsiNumber(index + 1) }}</td>
          <td>{{ item.childName }}</td>
          <td>{{ item.childLastName }}</td>
          <td>{{ item.childnCode }}</td>
          <td>{{ item.childBirthDay }}</td>
          <td>{{ item.childAgeCat }}</td>
          <td>{{ item.childEducation }}</td>
          <td>{{ item.childSchoolStudy }}</td>
          <td>{{ item.childWhichChild }}</td>
          <td>

          </td>
        </tr>
      </tbody>
      <div v-else class="text-center">
        <p>هنوز فرزندی ثبت نکرده‌اید!</p>
      </div>
    </v-table>
  </v-app>
</template>
<script>
export default {
  emits: ["clicked"],
  props: { children: Array, hasChild: Boolean },
  data: () => {
    return {
      childrenArray: null,
      hasChildBoolean: null,
    };
  },
  created() {
    this.getCildrenData();
  },
  methods: {
    toFarsiNumber(n) {
      // n = parseInt(n);
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
    },
    getCildrenData() {
      this.childrenArray = this.children;
      this.hasChildBoolean = this.hasChild;
      if (this.childrenArray.length === 0) {
        this.hasChildBoolean = false;
      }
      for (let i = 0; i < this.childrenArray.length; i++) {
        this.childrenArray[i].childBirthDay = this.toFarsiNumber(
          this.childrenArray[i].childBirthDay
        );
        this.childrenArray[i].childWhichChild = this.toFarsiNumber(
          this.childrenArray[i].childWhichChild
        );
        this.childrenArray[i].childnCode = this.toFarsiNumber(
          this.childrenArray[i].childnCode
        );
        if (this.childrenArray[i].childAgeCat == 1) {
          this.childrenArray[i].childAgeCat = "بازه ۷-۴ سال";
        } else if (this.childrenArray[i].childAgeCat == 2) {
          this.childrenArray[i].childAgeCat = "بازه ۱۱-۸ سال";
        } else if (this.childrenArray[i].childAgeCat == 3) {
          this.childrenArray[i].childAgeCat = "بازه ۱۵-۱۲ سال";
        }
      }
    },
    getUsersData() {},
    sendEmit() {
      this.$emit("clicked");
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
.tableClass {
  width: 100%;
  display: flex;
  justify-content: center;
  color: #373739;
  background-color: white;
  border-radius: 20px;
  margin-top: 3%;
}
.tableRows td {
  text-align: center !important;
  border-left: 1px solid #eaecf0;
  padding: 1% !important;
}
.tableRows th {
  text-align: center !important;
  border-left: 1px solid #eaecf0;
  background-color: #fcfcfd;
  padding: 1% !important;
}
</style>

<style>
.v-application__wrap {
  min-height: 0% !important;
}
</style>