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
        </tr>
      </thead>
      <tbody v-if="hasUserBoolean == true">
        <tr v-for="(item, index) in usersArray" :key="index">
          <td>{{this.toFarsiNumber(index+1)}}</td>
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>{{ item.national_code }}</td>
          <td>{{ item.phone_number }}</td>
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
  emits: ['clicked'],
  props: { users: Array,  hasUser: Boolean},
  data: () => {
    return {
      usersArray: null,
      hasUserBoolean: null,
    }
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
        this.usersArray[i].first_name = this.toFarsiNumber(this.usersArray[i].first_name);
        this.usersArray[i].last_name = this.toFarsiNumber(this.usersArray[i].last_name);
        this.usersArray[i].national_code = this.toFarsiNumber(this.usersArray[i].national_code);
        this.usersArray[i].phone_number = this.toFarsiNumber(this.usersArray[i].phone_number);
      }
    },
    getUsersData() {

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