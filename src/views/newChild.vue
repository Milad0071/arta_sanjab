<template>
  <v-app style="margin-right: 20%; font-family: iranSansRegular !important">
    <v-locale-provider rtl>
      <v-container class="flex_column_class">
        <div style="width: 100%">
          <!-- add new child btn -->
          <div class="btnContainer flex_class">
            <v-btn
              color="#525355"
              class="text-none submitBtn"
              size="large"
              min-width="200"
              variant="outlined"
              @click="this.dialog = true"
            >
              ثبت فرزند جدید
            </v-btn>
          </div>
          <!-- children table -->
          <v-table class="tableClass" density="compact">
            <thead>
              <tr>
                <th class="text-right font-weight-bold">نام</th>
                <th class="text-right font-weight-bold">نام خانوادگی</th>
                <th class="text-right font-weight-bold">کد ملی</th>
                <th class="text-right font-weight-bold">تاریخ تولد</th>
                <th class="text-right font-weight-bold">مقطع تحصیلی</th>
                <th class="text-right font-weight-bold">محل تحصیل</th>
                <th class="text-right font-weight-bold">فرزند چندم</th>
              </tr>
            </thead>
            <tbody v-if="hasChild == true">
              <tr v-for="item in children" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
              </tr>
            </tbody>
            <div v-else class="text-center">
              <p>هنوز فرزندی ثبت نکرده‌اید!</p>
            </div>
          </v-table>
          <!-- child form dialog -->
          <v-dialog v-model="dialog" persistent width="auto" style="z-index: 1 !important;">
            <v-card class="text-center mx-auto ma-4" style="right: 20%;" min-width="1020">
              <div class="titlePart">
                <div class="titleShape"></div>
                <h2>فرم ثبت فرزند</h2>
              </div>
              <div class="py-12 px-8 inputContainer">
                <div class="input_part">
                  <!-- child name -->
                  <v-text-field
                    label="نام"
                    class="input_1"
                    placeholder="نام خود را وارد کنید"
                    variant="plain"
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
                  <v-text-field
                    label="نام خانوادگی"
                    class="input_1"
                    variant="plain"
                    placeholder="نام خانوادگی خود را وارد کنید"
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
                  <v-text-field
                    label="کد ملی"
                    class="ltrClass input_1"
                    reverse
                    variant="plain"
                    placeholder="کد ملی خود را وارد کنید"
                    v-on:keydown="stopChars($event)"
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
                  <DatePicker
                    format="jYYYY/jMM/jDD"
                    simple
                    class="datePickerClass"
                    label="تاریخ تولد"
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
                  <!-- child education -->
                  <v-text-field
                    label="فرزند چندم"
                    class="input_1"
                    variant="plain"
                    placeholder="مشخص کنید فرزند چندم هستند"
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
                  <v-text-field
                    label="مقطع تحصیلی"
                    class="input_1"
                    variant="plain"
                    placeholder="مقطع تحصیلی را وارد کنید"
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
                  <v-text-field
                    label="شهر محل تحصیل"
                    class="input_1"
                    variant="plain"
                    placeholder="شهر محل تحصیل را وارد کنید"
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
      </v-container>
    </v-locale-provider>
  </v-app>
</template>
<script>
import DatePicker from "vue3-persian-datetime-picker";

export default {
  components: { DatePicker },
  data: () => {
    return {
      hasChild: true,
      dialog: false,
      userNameError: false,
      userLastNameError: false,
      userNationalCodeError: false,
      userBirthDayError: false,
      userEdjucationError: false,
      userSchoolStudyError: false,
      whichChildError: false,
      children: [],
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
  mounted() {
    if (this.children.length === 0) {
      this.hasChild = false;
    }
    console.log(this.hasChild);
  },
  methods: {
    stopChars(e) {
      if(e.key.match(/^[a-zA-Z]*$/) && !(e.key == 'Backspace'))
      {
        e.preventDefault();
      }
    },
    toFarsiNumber(n) {
      if (n.length == 0) {
        return;
      }
      console.log(typeof n)
      n = n.toString();
      console.log(typeof n)
      var englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
          persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];

      for (var i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
          n = n.replace(new RegExp(englishNumbers[i], "g"), persianNumbers[i]);
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
            this.userEdjucationError = true;
          } else if (i == 4) {
            this.userSchoolStudyError = true;
          } else if (i == 5) {
            this.whichChildError = true;
          }
        }
      }
      if (emptyCheck == true) {
        this.$swal("لطفا فیلدهای خالی رو پر کنید!", "", "warning").then((result) => {
          console.log(result)
          if (result.isConfirmed) {
            this.dialog = true;
            console.log(this.dialog)
          }
        });
        this.dialog = true;
        console.log(this.dialog)
        return false;
      } else {
        return true;
      }
    },
    submitFunc(
      userName,
      userLastName,
      userNationalCode,
      userEdjucation,
      userSchoolStudy,
      whichChild
    )
    {
      let itemArray = [
        userName,
        userLastName,
        userNationalCode,
        userEdjucation,
        userSchoolStudy,
        whichChild,
      ];
      if (this.emptyCheck(itemArray) == true) {
        // userBirthDay = this.convertToGerigorian(userBirthDay);
        // var bodyObj = {
        //   first_name: userName,
        //   last_name: userLastName,
        //   national_code: userNationalCode,
        //   education: userEdjucation,
        //   school_address: userSchoolStudy,
        //   which_child: whichChild
        // };
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(bodyObj)
        // };
        // fetch("http://192.168.100.15:8000/api/v1/account/parent-register/", requestOptions)
        //     .then(async response => {
        //       const data = await response.json();
        //       this.dialog = true;
        //       console.log(data)
        //       // check for error response
        //       if (!response.ok) {
        //           // get error message from body or default to response status
        //           const error = (data && data.message) || response.status;
        //           console.log(error)
        //           // return Promise.reject(error);
        //       }
        //     })
        //     .catch(error => {
        //       console.log(error)
        // });
      }
    },
    closeFunc() {
      this.dialog = false;
      this.userName = '';
      this.userLastName = '';
      this.userNationalCode = '';
      this.userBirthDay = '';
      this.userEdjucation = '';
      this.userSchoolStudy = '';
      this.whichChild = '';
      this.userNameError = false;
      this.userLastNameError = false;
      this.userNationalCodeError = false;
      this.userEdjucationError = false;
      this.userSchoolStudyError = false;
      this.whichChildError = false;
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
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
}
.btnContainer {
  width: 100%;
  margin-top: 5%;
}
.submitBtn {
  font-weight: bold;
  color: #f68100 !important;
  width: 26%;
}
.submitBtn:hover {
  border: none;
  color: white !important;
  background-color: #f68100;
  font-weight: bold;
}
.closeBtn {
  font-weight: bold;
  color: #525355 !important;
  width: 26%;
  margin-right: 5%;
}
.closeBtn:hover {
  border: none;
  color: white !important;
  background-color: #525355;
  font-weight: bold;
}
.tableClass {
  width: 100%;
  display: flex;
  justify-content: center;
  color: #373739;
  background-color: hsl(31, 100%, 48%, 0.5);
  border-radius: 7px;
}
.titlePart {
  display: flex;
  margin-top: 10px;
  font-family: iranSansRegular !important;
}
.titlePart h2 {
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
  grid-template-columns: repeat(2, minmax(350px, 1fr));
  justify-items: center;
  padding-top: 0%;
  font-family: iranSansRegular !important;
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
}
</style>
<style>
@font-face {
  font-family: iranSansRegular;
  src: url("./../assets/fonts/IRANSansX-Regular.ttf");
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
.v-field--variant-underlined .v-label.v-field-label,
.v-field--variant-plain .v-label.v-field-label {
  top: 20% !important;
}
.ltrClass > .v-field--variant-underlined .v-label.v-field-label,
.v-field--variant-plain .v-label.v-field-label {
  right: 0 !important;
  margin-top: 2% !important;
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
