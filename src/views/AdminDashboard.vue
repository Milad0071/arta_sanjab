<template>
  <v-app style="margin-right: 20%; font-family: danaRegular !important">
    <v-locale-provider rtl>
      <v-container class="flex_column_class">
        <v-btn
          v-if="superAdmin == true"
          color="#525355"
          class="text-none changeRoleBtn"
          size="large"
          min-width="200"
          variant="outlined"
          @click="showModalFunc()"
        >
          ایجاد دسترسی
        </v-btn>
        <div class="cards_flex_class">
          <div class="cardsContainer">
            <v-card style="width: 100%; height: 170px">
              <div style="padding: 10% !importnt">
                <div class="row_cards_flex_class">
                  <AllUsersIcon
                    style="width: 70px; align-self: flex-start !important"
                  />
                  <h3>تعداد کل کاربران</h3>
                </div>
                <div class="flex_class" style="height: 10%">
                  <div class="flex_class circleClass">
                    <p class="mt-1">{{ allUsersCount }}</p>
                  </div>
                </div>
              </div>
            </v-card>
            <v-card style="width: 100%; height: 170px">
              <div style="padding: 10% !importnt">
                <div class="row_cards_flex_class">
                  <PurchasedCourses style="width: 70px" />
                  <h3>تعداد دوره‌های خریداری شده</h3>
                </div>
                <div class="flex_class" style="height: 10%">
                  <div class="flex_class circleClass">
                    <p class="mt-1">{{ purchasedCoursesCount }}</p>
                  </div>
                </div>
              </div>
            </v-card>
            <v-card style="width: 100%; height: 170px">
              <div style="padding: 10% !importnt">
                <div class="row_cards_flex_class">
                  <CurrentlyRunningCourses style="width: 70px" />
                  <h3>تعداد دوره‌های در حال برگزاری</h3>
                </div>
                <div class="flex_class" style="height: 10%">
                  <div class="flex_class circleClass">
                    <p class="mt-1">{{ runningCoursesCount }}</p>
                  </div>
                </div>
              </div>
            </v-card>
            <v-card style="width: 100%; height: 170px">
              <div style="padding: 10% !importnt">
                <div class="row_cards_flex_class">
                  <FinishedCourses style="width: 70px" />
                  <h3>تعداد دوره‌های پایان‌یافته</h3>
                </div>
                <div class="flex_class" style="height: 10%">
                  <div class="flex_class circleClass">
                    <p class="mt-1">{{ finishedCoursesCount }}</p>
                  </div>
                </div>
              </div>
            </v-card>
            <v-card style="width: 100%; height: 170px">
              <div style="padding: 10% !importnt">
                <div class="row_cards_flex_class">
                  <UnfinishedCourses style="width: 70px" />
                  <h3>تعداد دوره‌های ناتمام</h3>
                </div>
                <div class="flex_class" style="height: 10%">
                  <div class="flex_class circleClass">
                    <p class="mt-1">{{ unfinishedCoursesCount }}</p>
                  </div>
                </div>
              </div>
            </v-card>
            <v-card style="width: 100%; height: 170px">
              <div style="padding: 10% !importnt">
                <div class="row_cards_flex_class">
                  <GraduatedIcon style="width: 70px" />
                  <h3>تعداد فارغ‌التحصیلان</h3>
                </div>
                <div class="flex_class" style="height: 10%">
                  <div class="flex_class circleClass">
                    <p class="mt-1">{{ finishedCoursesCount }}</p>
                  </div>
                </div>
              </div>
            </v-card>
          </div>
        </div>
      </v-container>
      <!-- manager access dialog -->
      <v-dialog
        v-model="managerAccessDialog"
        persistent
        width="auto"
        style="z-index: 1 !important; font-family: danaRegular !important"
      >
        <v-card
          class="detailsCard text-center mx-auto ma-4"
          style="right: 20%; margin-top: 5% !important"
        >
          <!-- dialog title -->
          <div class="titlePart">
            <div class="titleShape"></div>
            <h3>ایجاد دسترسی مدیریت</h3>
          </div>
          <!-- inputs section -->
          <!-- <div class="py-12 px-8 inputContainer"></div> -->
          <div class="inputContainer">
            <div class="input_part">
              <!-- parent name -->
              <v-text-field
                label="نام"
                class="input_1"
                placeholder="نام خود را وارد کنید"
                variant="plain"
                v-on:keydown="stopEnglishChars($event)"
                v-model="userName"
              >
              </v-text-field>
              <p
                v-if="userNameError == true"
                style="color: red; font-weight: fold"
              >
                فیلد نام نباید خالی باشد!
              </p>
            </div>
            <div class="input_part">
              <!-- parent last name -->
              <v-text-field
                label="نام خانوادگی"
                class="input_1"
                variant="plain"
                placeholder="نام خانوادگی خود را وارد کنید"
                v-on:keydown="stopEnglishChars($event)"
                v-model="userLastName"
              >
              </v-text-field>
              <p
                v-if="userLastNameError == true"
                style="color: red; font-weight: fold"
              >
                فیلد نام خانوادگی نباید خالی باشد!
              </p>
            </div>
            <div class="input_part">
              <!-- national code input -->
              <v-text-field
                label="کد ملی"
                class="ltrClass input_1"
                reverse
                variant="plain"
                v-on:keydown="stopAllChars($event)"
                placeholder="کد ملی خود را وارد کنید"
                v-model="userNationalCode"
              >
              </v-text-field>
              <p
                v-if="userNationalCodeError == true"
                style="color: red; font-weight: fold"
              >
                فیلد کد ملی نباید خالی باشد!
              </p>
            </div>
            <div class="input_part">
              <!-- phone number input -->
              <v-text-field
                label="شماره همراه"
                class="ltrClass input_1"
                reverse
                variant="plain"
                v-on:keydown="stopAllChars($event)"
                placeholder="شماره همراه مدیر را وارد کنید"
                v-model="userPhoneNum"
              >
              </v-text-field>
              <p
                v-if="userPhoneNumError == true"
                style="color: red; font-weight: fold"
              >
                فیلد کد ملی نباید خالی باشد!
              </p>
            </div>
          </div>
          <!-- dialog buttons section -->
          <div class="btnContainer flex_class">
            <v-btn
              color="#525355"
              class="text-none editBtn"
              style="margin-top: -8%"
              size="large"
              min-width="200"
              variant="outlined"
              @click="createAdmin()"
            >
              ایجاد دسترسی ادمین
            </v-btn>
            <v-btn
              color="#525355"
              class="text-none closeBtn mr-3"
              style="margin-top: -8%"
              size="large"
              min-width="200"
              variant="outlined"
              @click="closeFunc()"
            >
              انصراف
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </v-locale-provider>
  </v-app>
</template>
<script>
import axios from "./../axios.js";
import GraduatedIcon from "./../assets/svgIcons/GraduatedIcon.vue";
import AllUsersIcon from "./../assets/svgIcons/AllUsersIcon.vue";
import PurchasedCourses from "./../assets/svgIcons/PurchasedCourses.vue";
import CurrentlyRunningCourses from "./../assets/svgIcons/CurrentlyRunningCourses.vue";
import FinishedCourses from "./../assets/svgIcons/FinishedCourses.vue";
import UnfinishedCourses from "./../assets/svgIcons/UnfinishedCourses.vue";

export default {
  emits: ["admin-rerender-drawer", "reset-app"],
  components: {
    GraduatedIcon,
    AllUsersIcon,
    PurchasedCourses,
    CurrentlyRunningCourses,
    FinishedCourses,
    UnfinishedCourses,
  },
  data: () => {
    return {
      allUsersCount: 0,
      purchasedCoursesCount: 0,
      runningCoursesCount: 0,
      finishedCoursesCount: 0,
      unfinishedCoursesCount: 0,
      managerAccessDialog: false,
      userNameError: false,
      userLastNameError: false,
      userNationalCodeError: false,
      userPhoneNumError: false,
      superAdmin: false,
      userName: "",
      userLastName: "",
      userNationalCode: "",
      userPhoneNum: "",
    };
  },
  watch: {
    userName(newVal) {
      if (newVal.length > 0) {
        this.userNameError = false;
      }
    },
    userLastName(newVal) {
      if (newVal.length > 0) {
        this.userLastNameError = false;
      }
    },
    userNationalCode(newVal) {
      this.userNationalCode = this.toFarsiNumber(newVal);
      if (newVal.length > 0) {
        this.userNationalCodeError = false;
      }
    },
    userPhoneNum(newVal) {
      this.userPhoneNum = this.toFarsiNumber(newVal);
      if (newVal.length > 0) {
        this.userPhoneNumError = false;
      }
    },
  },
  created() {
    this.$cookies.remove("currentUserName");
    this.$cookies.remove("currentUserRole");
    this.getAdminData();
    this.getUsersData();
    this.getRegisteredCourses();
    this.$emit("admin-rerender-drawer", 0);
  },
  methods: {
    toFarsiNumber(n) {
      if (n != undefined || n != null) {
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
    toEnglishNumber(n) {
      // n = parseInt(n);
      if (n.length == 0) {
        return;
      }
      n = n.toString();
      var englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];

      for (var i = 0, numbersLen = persianNumbers.length; i < numbersLen; i++) {
        n = n.replace(new RegExp(persianNumbers[i], "g"), englishNumbers[i]);
      }
      return n;
    },
    stopAllChars(e) {
      if (
        e.key.match(/^[a-zA-Zا-ی]*$/) &&
        !(e.key == "Backspace") &&
        !(e.key == "Tab")
      ) {
        e.preventDefault();
      }
    },
    stopEnglishChars(e) {
      if (
        e.key.match(/^[a-zA-Z0-9۰-۹]*$/) &&
        !(e.key == "Backspace") &&
        !(e.key == "Tab")
      ) {
        e.preventDefault();
      }
    },
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
            if (response.data.type == 3) {
              this.superAdmin = false;
            } else if (response.data.type == 4) {
              this.superAdmin = true;
            }
            this.$cookies.set("currentUserName", response.data.first_name);
            this.$cookies.set("currentUserRole", "مدیر");
            this.$emit("admin-rerender-drawer", 0);
          } else {
            this.$swal("مشکلی پیش آمد!", response.message, "error");
            this.$router.push({ name: "SignupLogin" });
          }
        })
        .catch((err) => {
          this.$swal("مشکلی پیش آمد!", err.message, "error");
          if (err.response.status == 401) {
            this.$cookies.set('userEntered', false);
            this.$cookies.set('adminEntered', false);
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
          console.log(response)
          // this.allUsersCount = this.toFarsiNumber(response.data.length);
        })
        .catch((err) => {
          this.$swal("مشکلی پیش آمد!", err.message, "error");
          if (err.response.status == 401) {
            this.$cookies.set('userEntered', false);
            this.$cookies.set('adminEntered', false);
            this.$router.push({ name: "SignupLogin" });
          }
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
          this.purchasedCoursesCount = this.toFarsiNumber(response.data.length);
          var courses = response.data;
          for (let i = 0; i < courses.length; i++) {
            if (
              courses[i].is_active == true &&
              courses[i].is_graduated == false
            ) {
              this.runningCoursesCount += 1;
            }
            if (courses[i].is_graduated == true) {
              this.finishedCoursesCount += 1;
            }
            if (
              courses[i].is_active == false &&
              courses[i].is_graduated == false
            ) {
              this.unfinishedCoursesCount += 1;
            }
          }
          this.runningCoursesCount = this.toFarsiNumber(
            this.runningCoursesCount
          );
          this.finishedCoursesCount = this.toFarsiNumber(
            this.finishedCoursesCount
          );
          this.unfinishedCoursesCount = this.toFarsiNumber(
            this.unfinishedCoursesCount
          );
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
    showModalFunc() {
      this.managerAccessDialog = true;
    },
    closeFunc() {
      this.managerAccessDialog = false;
      this.userName = "";
      this.userLastName = "";
      this.userNationalCode = "";
      this.userPhoneNum = "";
    },
    emptyCheck(itemArray) {
      let emptyCheck = false;
      for (let i = 0; i < itemArray.length; i++) {
        console.log(itemArray[i]);
        if (itemArray[i] == "" || itemArray[i] == null) {
          emptyCheck = true;
          if (i == 0) {
            this.userNameError = true;
          } else if (i == 1) {
            this.userLastNameError = true;
          } else if (i == 2) {
            this.userNationalCodeError = true;
          } else if (i == 3) {
            this.userPhoneNumError = true;
          }
        }
      }
      if (emptyCheck == true) {
        this.$swal("لطفا فیلدهای خالی رو پر کنید!", "", "warning");
        return false;
      } else {
        return true;
      }
    },
    createAdmin() {
      let itemArray = [
        this.userName,
        this.userLastName,
        this.userNationalCode,
        this.userPhoneNum,
      ];
      if (this.emptyCheck(itemArray) == true) {
        var data = {
          first_name: this.userName,
          last_name: this.userLastName,
          national_code: this.userNationalCode,
          phone_number: this.userPhoneNum,
        };
        console.log(data);
        axios({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          },
          url: `admin-dashboard/create-employer/`,
          data: JSON.stringify(data),
        })
          .then((response) => {
            console.log(response);
            if (response.status == 201) {
              this.$swal("دسترسی با موفقیت ایجاد شد!", "", "success");
              this.closeFunc();
            } else {
              this.$swal("مشکلی پیش آمد، لطفا مجددا تلاش نمایید!", "error");
              if (response.status == 401) {
                this.$cookies.set('userEntered', false);
                this.$cookies.set('adminEntered', false);
                this.$router.push({ name: "SignupLogin" });
              }
            }
          })
          .catch((err) => {
            this.$swal("مشکلی پیش آمد!", err.message, "error");
            if (err.response.status == 401) {
              this.$cookies.set('userEntered', false);
              this.$cookies.set('adminEntered', false);
              this.$router.push({ name: "SignupLogin" });
            }
          });
      }
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
.row_cards_flex_class {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 10px 10px 10px 10px;
}
.row_cards_flex_class h3 {
  margin-right: 10%;
}
.cards_flex_class {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  padding: 5% 10% 10% 10%;
}
.flex_column_class {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
}
.changeRoleBtn {
  font-weight: bold;
  color: #f68100;
  width: 500px;
  height: 50px;
  margin-top: 10%;
}
.changeRoleBtn:hover {
  border: none;
  color: white !important;
  background-color: #f68100;
  font-weight: bold;
}
.detailsCard {
  width: 150vh;
}
.titlePart {
  display: flex;
  margin-top: 10px;
  margin-right: -10px;
}
.titlePart h3 {
  margin-right: 10px;
  color: #6d6e71;
}
.titleShape {
  border-left: 10px solid #6d6e71;
  border-radius: 7px 0 0 7px;
}
.inputContainer {
  display: grid;
  grid-gap: 2%;
  grid-template-columns: repeat(3, minmax(350px, 1fr));
  justify-items: center;
  padding-top: 0%;
  font-family: danaRegular !important;
}
.input_part {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0% 10%;
  margin-top: 5%;
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
.cardsContainer {
  display: grid;
  grid-gap: 5%;
  grid-template-columns: repeat(3, minmax(350px, 1fr));
  justify-items: center;
  padding-top: 0%;
  font-family: danaRegular !important;
}
.circleClass {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 5px solid #f68100;
  color: #f68100;
  font-size: 20px;
  font-weight: bold;
}
.btnContainer {
  width: 100%;
  margin-top: 12%;
}
.editBtn {
  font-weight: bold;
  color: #f68100 !important;
  width: 26%;
}
.editBtn:hover {
  border: none;
  color: white !important;
  background-color: #f68100;
  font-weight: bold;
}
.closeBtn {
  font-weight: bold;
  color: #373739 !important;
  width: 26%;
}
.closeBtn:hover {
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
@font-face {
  font-family: danaRegular;
  src: url("./../assets/fonts/Dana-Regular.ttf");
}
.vpd-input-group {
  min-height: 50px;
}
.vpd-input-group label {
  border-radius: 0px 7px 7px 0px;
  background-color: #f68100 !important;
}
.vpd-input-group input:not(.vpd-is-editable) {
  border-radius: 7px 0px 0px 7px;
}
.vpd-icon-btn {
  padding: 0 15px;
}
.vpd-input-group input:not(.vpd-is-editable) {
  border-radius: 7px 0px 0px 7px;
  width: 100% !important;
}
.v-field--variant-underlined .v-label.v-field-label,
.v-field--variant-plain .v-label.v-field-label {
  top: 20% !important;
}
.ltrClass > .v-field--variant-underlined .v-label.v-field-label,
.v-field--variant-plain .v-label.v-field-label {
  right: 0 !important;
  margin-top: 1% !important;
  font-size: 16px;
}
.ltrClass {
  position: relative;
}
.ltrClass input::placeholder {
  position: absolute;
}
.v-input__details {
  min-height: 0 !important;
}
div:where(.swal2-container).swal2-center > .swal2-popup {
  z-index: 1 !important;
}
#childDate > .vpd-wrapper {
  margin-right: 20%;
}
</style>