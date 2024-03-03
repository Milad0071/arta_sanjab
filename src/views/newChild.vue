<template>
  <v-app style="font-family: danaRegular !important">
    <v-locale-provider rtl>
      <div class="mainPart flex_column_class">
        <!-- top section title -->
        <div class="topTitle">
          <div class="titlePart">
            <div class="titleShape"></div>
            <h3>ثبت فرزند</h3>
          </div>
          <v-btn
            color="#FF9635"
            class="text-none addChildBtn"
            size="large"
            variant="outlined"
            @click="openDialog()"
          >
            افزودن فرزند +
          </v-btn>
        </div>
        <!-- children table -->
        <ChildrenTable
          style="width: 90%"
          :key="componentKey"
          @clicked="openDialog"
          :tableType="tableType"
          :children="children"
          :hasChild="hasChild"
        >
        </ChildrenTable>
        <!-- child form dialog -->
        <v-dialog
          v-model="dialog"
          persistent
          width="auto"
          style="z-index: 1 !important"
        >
          <v-card
            class="text-center mx-auto ma-4"
            style="right: 20%"
            min-width="1020"
          >
            <div class="py-12 px-8 inputContainer">
              <div class="input_part">
                <!-- child name -->
                <h4 class="loginText">نام</h4>
                <v-text-field
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
                <!-- child last name -->
                <h4 class="loginText">نام خانوادگی</h4>
                <v-text-field
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
                <!-- child national code -->
                <h4 class="loginText">کد ملی</h4>
                <v-text-field
                  class="ltrClass input_1"
                  reverse
                  variant="plain"
                  placeholder="کد ملی خود را وارد کنید"
                  v-on:keydown="stopAllChars($event)"
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
                <!-- child birth day -->
                <h4 class="loginText">تاریخ تولد</h4>
                <DatePicker
                  format="jYYYY/jMM/jDD"
                  simple
                  class="datePickerClass"
                  placeholder="1370/01/01"
                  id="childDate"
                  v-model="userBirthDay"
                />
                <p
                  v-if="userBirthDayError == true"
                  style="color: red; font-weight: fold"
                >
                  فیلد تاریخ تولد نباید خالی باشد!
                </p>
              </div>
              <div class="input_part">
                <!-- child age category -->
                <h4 class="loginText">بازه سنی</h4>
                <v-select
                  :items="ageCategories"
                  density="comfortable"
                  class="input_1"
                  variant="plain"
                  placeholder="بازه سنی کودک را مشخص نمایید"
                  item-text="title"
                  item-value="value"
                  v-model="userAgeCat"
                ></v-select>
                <p
                  v-if="userAgeCatError == true"
                  style="color: red; font-weight: fold"
                >
                  فیلد بازه سنی نباید خالی باشد!
                </p>
              </div>
              <div class="input_part">
                <!-- child education -->
                <h4 class="loginText">فرزند چندم</h4>
                <v-text-field
                  class="input_1"
                  variant="plain"
                  placeholder="مشخص کنید فرزند چندم هستند"
                  v-on:keydown="stopEnglishChars($event)"
                  v-model="whichChild"
                >
                </v-text-field>
                <p
                  v-if="whichChildError == true"
                  style="color: red; font-weight: fold"
                >
                  فیلد فرزند چندم نباید خالی باشد!
                </p>
              </div>
              <div class="input_part">
                <!-- child education -->
                <h4 class="loginText">مقطع تحصیلی</h4>
                <v-text-field
                  class="input_1"
                  variant="plain"
                  placeholder="مقطع تحصیلی را وارد کنید"
                  v-on:keydown="stopEnglishChars($event)"
                  v-model="userEdjucation"
                >
                </v-text-field>
                <p
                  v-if="userEdjucationError == true"
                  style="color: red; font-weight: fold"
                >
                  فیلد مقطع تحصیلی نباید خالی باشد!
                </p>
              </div>
              <div class="input_part">
                <!-- child school address -->
                <h4 class="loginText">شهر محل تحصیل</h4>
                <v-text-field
                  class="input_1"
                  variant="plain"
                  placeholder="شهر محل تحصیل را وارد کنید"
                  v-on:keydown="stopEnglishChars($event)"
                  v-model="userSchoolStudy"
                >
                </v-text-field>
                <p
                  v-if="userSchoolStudyError == true"
                  style="color: red; font-weight: fold"
                >
                  فیلد شهر محل تحصیل نباید خالی باشد!
                </p>
              </div>
            </div>
            <div class="btnContainer flex_class">
              <v-btn
                color="#525355"
                class="text-none submitBtn"
                style="margin-top: -8%"
                size="large"
                min-width="200"
                variant="outlined"
                @click="
                  submitFunc(
                    userName,
                    userLastName,
                    userNationalCode,
                    userBirthDay,
                    userAgeCat,
                    userEdjucation,
                    userSchoolStudy,
                    whichChild
                  )
                "
              >
                ثبت فرزند
              </v-btn>
              <v-btn
                color="#525355"
                class="text-none closeBtn"
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
      </div>
    </v-locale-provider>
  </v-app>
</template>
<script>
import DatePicker from "vue3-persian-datetime-picker";
import ChildrenTable from "./../components/ChildrenTable.vue";
import axios from "./../axios.js";

export default {
  components: { DatePicker, ChildrenTable },
  emits: ["reset-app", "user-rerender-drawer"],
  data: () => {
    return {
      tableType: "children",
      componentKey: 0,
      childrenCount: 0,
      hasChild: true,
      notShow: true,
      dialog: false,
      userNameError: false,
      userLastNameError: false,
      userNationalCodeError: false,
      userBirthDayError: false,
      userAgeCatError: false,
      userEdjucationError: false,
      userSchoolStudyError: false,
      whichChildError: false,
      children: [],
      ageCategories: [
        {
          value: 1,
          title: "بازه ۷-۴ سال",
        },
        {
          value: 2,
          title: "بازه ۱۱-۸ سال",
        },
        {
          value: 3,
          title: "بازه ۱۵-۱۲ سال",
        },
      ],
      parentsData: null,
      userAgeCat: null,
      userName: "",
      userLastName: "",
      userNationalCode: "",
      userBirthDay: "",
      userEdjucation: "",
      userSchoolStudy: "",
      whichChild: "",
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
    userAgeCat(newVal) {
      if (newVal.length > 0) {
        this.userAgeCatError = false;
      }
    },
    userEdjucation(newVal) {
      if (newVal.length > 0) {
        this.userEdjucationError = false;
      }
    },
    userSchoolStudy(newVal) {
      if (newVal.length > 0) {
        this.userSchoolStudyError = false;
      }
    },
    whichChild(newVal) {
      if (newVal.length > 0) {
        this.whichChildError = false;
      }
    },
  },
  created() {
    this.getData();
    this.$emit("user-rerender-drawer", 3);
  },

  mounted() {
    if (this.children.length === 0) {
      this.hasChild = false;
    }
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    getData() {
      axios({
        method: "GET",
        url: "account/child-register/",
        headers: {
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            this.children.push({
              childName: response.data[i].first_name,
              childLastName: response.data[i].last_name,
              childnCode: response.data[i].national_code,
              childBirthDay: "۱۴۰۲/۱۰/۱۲",
              childAgeCat: response.data[i].type,
              childEducation: response.data[i].grade,
              childSchoolStudy: response.data[i].school_address,
              childWhichChild: "دوم",
            });
          }
          this.hasChild = true;
          this.componentKey += 1;
        })
        .catch((err) => {
          this.$swal("مشکلی پیش آمد!", err.message, "error");
          if (err.response.status == 401) {
            this.$cookies.set("userEntered", false);
            this.$cookies.set("adminEntered", false);
            this.$router.push({ name: "SignupLogin" });
          }
        });
    },
    closeFunc() {
      this.dialog = false;
      this.userName = "";
      this.userLastName = "";
      this.userNationalCode = "";
      this.userBirthDay = "";
      this.userEdjucation = "";
      this.userSchoolStudy = "";
      this.whichChildcloseFunc = "";
      this.userNameError = false;
      this.userLastNameError = false;
      this.userNationalCodeError = false;
      this.userEdjucationError = false;
      this.userSchoolStudyError = false;
      this.whichChildError = false;
    },
    submitFunc(
      userName,
      userLastName,
      userNationalCode,
      userBirthDay,
      userAgeCat,
      userEdjucation,
      userSchoolStudy,
      whichChild
    ) {
      userNationalCode = this.toEnglishNumber(userNationalCode);
      this.children.push({
        childName: userName,
        childLastName: userLastName,
        childnCode: userNationalCode,
        childBirthDay: userBirthDay,
        childAgeCat: userAgeCat,
        childEducation: userEdjucation,
        childSchoolStudy: userSchoolStudy,
        childWhichChild: whichChild,
      });
      let itemArray = [
        userName,
        userLastName,
        userNationalCode,
        userAgeCat,
        userEdjucation,
        userSchoolStudy,
        whichChild,
      ];
      if (this.emptyCheck(itemArray) == true) {
        // userBirthDay = this.convertToGerigorian(userBirthDay);

        var bodyFormData = new FormData();
        JSON.stringify(bodyFormData.append("first_name", userName));
        JSON.stringify(bodyFormData.append("last_name", userLastName));
        JSON.stringify(bodyFormData.append("national_code", userNationalCode));
        // bodyFormData.append("birth_date", birthDay);
        JSON.stringify(bodyFormData.append("type", userAgeCat));
        JSON.stringify(bodyFormData.append("grade", userEdjucation));
        JSON.stringify(bodyFormData.append("school_address", userSchoolStudy));
        axios({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          },
          url: "account/child-register/",
          data: bodyFormData,
        })
          .then((response) => {
            if (response.status == 201) {
              this.hasChild = true;
              this.componentKey += 1;
              this.$swal("اطلاعات فرزند با موفقیت ذخیره شد!", "", "success");
              this.dialog = false;
            } else {
              this.$swal("مشکلی پیش آمد، لطفا مجددا تلاش نمایید!", "error");
              if (response.status == 401) {
                this.$cookies.set("userEntered", false);
                this.$cookies.set("adminEntered", false);
                this.$router.push({ name: "SignupLogin" });
              }
            }
          })
          .catch((err) => {
            this.$swal("مشکلی پیش آمد!", err.message, "error");
            if (err.response.status == 401) {
              this.$cookies.set("userEntered", false);
              this.$cookies.set("adminEntered", false);
              this.$router.push({ name: "SignupLogin" });
            }
          });
      }
    },
    goToDesktop() {
      this.$cookies.set("showModal");
      this.$emit("reset-app");
      this.$router.push({ name: "Home" });
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
    toFarsiNumber(n) {
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
    jalaliToGregorian(j_y, j_m, j_d, JalaliDate) {
      j_y = parseInt(j_y);
      j_m = parseInt(j_m);
      j_d = parseInt(j_d);
      var jy = j_y - 979;
      var jm = j_m - 1;
      var jd = j_d - 1;

      var j_day_no =
        365 * jy + parseInt(jy / 33) * 8 + parseInt(((jy % 33) + 3) / 4);
      for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

      j_day_no += jd;

      var g_day_no = j_day_no + 79;

      var gy =
        1600 +
        400 *
          parseInt(
            g_day_no / 146097
          ); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
      g_day_no = g_day_no % 146097;

      var leap = true;
      if (g_day_no >= 36525) {
        /* 36525 = 365*100 + 100/4 */
        g_day_no--;
        gy +=
          100 *
          parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
        g_day_no = g_day_no % 36524;

        if (g_day_no >= 365) g_day_no++;
        else leap = false;
      }

      gy += 4 * parseInt(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
      g_day_no %= 1461;

      if (g_day_no >= 366) {
        leap = false;

        g_day_no--;
        gy += parseInt(g_day_no / 365);
        g_day_no = g_day_no % 365;
      }

      for (
        var j = 0;
        g_day_no >= JalaliDate.g_days_in_month[j] + (j == 1 && leap);
        j++
      )
        g_day_no -= JalaliDate.g_days_in_month[j] + (j == 1 && leap);
      var gm = j + 1;
      var gd = g_day_no + 1;

      gm = gm < 10 ? "0" + gm : gm;
      gd = gd < 10 ? "0" + gd : gd;

      return [gy, gm, gd];
    },
    convertToGerigorian(date) {
      var JalaliDate = {
        g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
      };
      let dateSplitted = date.split("/"),
        jD = this.jalaliToGregorian(
          dateSplitted[0],
          dateSplitted[1],
          dateSplitted[2],
          JalaliDate
        );
      let result = jD[0] + "/" + jD[1] + "/" + jD[2];
      return result;
    },
    emptyCheck(itemArray) {
      // userBirthDay = this.convertToGerigorian(userBirthDay);
      let emptyCheck = false;
      for (let i = 0; i < itemArray.length; i++) {
        if (itemArray[i] == "") {
          emptyCheck = true;
          if (i == 0) {
            this.userNameError = true;
          } else if (i == 1) {
            this.userLastNameError = true;
          } else if (i == 2) {
            this.userNationalCodeError = true;
          } else if (i == 3) {
            this.userAgeCat = true;
          } else if (i == 4) {
            this.userEdjucation = true;
          } else if (i == 5) {
            this.userSchoolStudy = true;
          } else if (i == 6) {
            this.whichChild = true;
          }
        }
      }
      if (emptyCheck == true) {
        this.$swal("لطفا فیلدهای خالی رو پر کنید!", "", "warning").then(
          (result) => {
            if (result.isConfirmed) {
              this.dialog = true;
            }
          }
        );
        this.dialog = true;
        return false;
      } else {
        return true;
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
.flex_column_class {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.mainPart {
  font-family: danaRegular !important;
  width: 80%;
  height: 94.2vh;
  padding-top: 1%;
  margin-top: 3.85%;
  margin-left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f5f6;
  border-top-right-radius: 60px;
}
.topTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 50px;
  background-color: white;
  border-radius: 20px;
  padding: 3%;
}
.btnContainer {
  display: flex;
  justify-content: space-between;
  padding: 0 8% 0 8%;
  width: 100%;
  margin-top: 8%;
}
.submitBtn {
  font-weight: bold;
  color: white !important;
  background-color: #f68100;
  width: 43%;
  border-radius: 12px;
}
.closeBtn {
  font-weight: bold;
  color: #c5c5c6 !important;
  width: 43%;
  margin-right: 5%;
  border-radius: 12px;
}

.titlePart {
  display: flex;
  margin-top: 3px;
  font-family: danaRegular !important;
}
.titlePart h3 {
  margin-right: 10px;
  color: #1b1c1c;
  font-size: 22px;
  font-weight: bold;
}
.titleShape {
  border: 3px solid #ff9635;
  border-radius: 7px;
}
.addChildBtn {
  font-weight: bold;
  width: 15%;
  border-radius: 12px;
}
.addChildBtn:hover {
  color: white !important;
  background-color: #f68100;
  border-radius: 12px;
}
.inputContainer {
  display: grid;
  grid-gap: 2%;
  grid-template-columns: repeat(2, minmax(350px, 1fr));
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
  border-radius: 8px;
  border: 2px solid white;
  background-color: #f4f5f6;
}
.loginText {
  text-align: right;
  font-size: 20px;
  color: #525355;
  font-weight: 700;
  margin-bottom: 10px;
}
.datePickerClass {
  min-height: 50px;
  border-radius: 7px;
  color: #525355;
}
</style>
<style>
@font-face {
  font-family: danaRegular;
  src: url("./assets/fonts/Dana-Regular.ttf");
}
.v-application {
  background-color: transparent !important;
}
.vpd-input-group {
  min-height: 50px;
}
.vpd-input-group label {
  border-radius: 0px 8px 8px 0px;
  background-color: #f4f5f6 !important;
}
.vpd-input-group input:not(.vpd-is-editable) {
  border-radius: 8px 0px 0px 8px;
  background-color: #f4f5f6;
  border: none !important;
}
.vpd-icon-btn {
  padding: 0 15px;
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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.vpd-main *, .vpd-wrapper * {
  color: #f68100 !important;
}
.v-text-field .v-field--no-label input,
.v-text-field .v-field--active input {
  margin-top: -8px;
}
.datePickerClass svg {
  fill: #525355 !important;
}
</style>
