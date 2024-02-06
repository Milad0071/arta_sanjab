<template>
  <v-app>
    <v-table class="tableClass" density="compact">
      <thead>
        <tr>
          <th class="text-right font-weight-bold">ردیف</th>
          <th class="text-right font-weight-bold">نام</th>
          <th class="text-right font-weight-bold">نام خانوادگی</th>
          <th class="text-right font-weight-bold">کد ملی</th>
          <th class="text-right font-weight-bold">شماره تماس</th>
          <th class="text-right font-weight-bold">عملیات</th>
        </tr>
      </thead>
      <tbody v-if="hasUserBoolean == true">
        <tr v-for="(item, index) in usersArray" :key="index">
          <td>{{ this.toFarsiNumber(index + 1) }}</td>
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>{{ item.national_code }}</td>
          <td>{{ item.phone_number }}</td>
          <td>
            <div
              class="flex_class"
              style="justify-content: flex-start !important"
            >
              <v-tooltip location="bottom" text="مشاهده جزئیات">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    class="iconCol"
                    size="30px"
                    color="green-darken-2"
                    icon="mdi-eye"
                  >
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip location="bottom" text="ویرایش کاربر">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    class="iconCol"
                    size="30px"
                    color="orange"
                    icon="mdi-eye"
                  >
                  </v-btn>
                </template>
              </v-tooltip>
              <v-btn
                color="orange"
                class="text-none editBtn mr-5"
                style=""
                size="small"
                min-width="100"
                variant="outlined"
                @click="submitFunc()"
              >
                ویرایش اطلاعات
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
      <div v-else class="text-center">
        <p>کاربری وجود ندارد!</p>
      </div>
    </v-table>
  </v-app>
</template>
<script>
export default {
  emits: ["clicked"],
  props: { users: Array, hasUser: Boolean },
  data: () => {
    return {
      usersArray: null,
      hasUserBoolean: null,
    };
  },
  created() {
    this.getData();
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
    getData() {
      this.usersArray = this.users;
      this.hasUserBoolean = this.hasUser;
      if (this.usersArray.length === 0) {
        this.hasUserBoolean = false;
      }
      for (let i = 0; i < this.usersArray.length; i++) {
        this.usersArray[i].first_name = this.toFarsiNumber(
          this.usersArray[i].first_name
        );
        this.usersArray[i].last_name = this.toFarsiNumber(
          this.usersArray[i].last_name
        );
        this.usersArray[i].national_code = this.toFarsiNumber(
          this.usersArray[i].national_code
        );
        this.usersArray[i].phone_number = this.toFarsiNumber(
          this.usersArray[i].phone_number
        );
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
  background-color: hsl(31, 100%, 48%, 0.5);
  border-radius: 7px;
  margin-top: 10%;
}
.submitBtn {
  font-weight: bold;
  color: white !important;
  width: 26%;
}
.submitBtn:hover {
  border: none;
  color: white !important;
  background-color: #f68100;
  font-weight: bold;
}
.editBtn {
  font-weight: bold;
  color: #373739 !important;
  width: 26%;
}
.editBtn:hover {
  border: none;
  color: white !important;
  background-color: #373739;
  font-weight: bold;
}
</style>

<style>
.v-application__wrap {
  min-height: 0% !important;
}
</style>