<template>
  <v-app>
    <v-locale-provider rtl>
      <div class="mainContainer">
        <!-- title part -->
        <div class="titlePart">
          <div class="titleShape"></div>
          <h3>والد عزیز، لطفا فرم زیر را تکمیل نمایید</h3>
        </div>
        <div class="inputContainer row">
          <div class="input_part">
            <!-- reletive input -->
            <h4 class="loginText">نسبت</h4>
            <v-select
              :items="userReletivesList"
              density="comfortable"
              class="input_1"
              variant="plain"
              placeholder="نسبت خود با کودک را مشخص نمایید"
              item-text="title"
              item-value="value"
              v-model="userReletivity"
            ></v-select>
            <p
              v-if="userReletivityError == true"
              style="color: red; font-weight: fold"
            >
              فیلد نسبت نباید خالی باشد!
            </p>
          </div>
          <div class="input_part">
            <!-- parent name -->
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
            <!-- parent last name -->
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
            <h4 class="loginText">نام پدر</h4>
            <v-text-field
              class="input_1"
              variant="plain"
              placeholder="نام پدر خود را وارد کنید"
              v-on:keydown="stopEnglishChars($event)"
              v-model="userFatherName"
            >
            </v-text-field>
            <p
              v-if="userFatherNameError == true"
              style="color: red; font-weight: fold"
            >
              فیلد نام پدر نباید خالی باشد!
            </p>
          </div>
          <div class="input_part">
            <!-- nationality input -->
            <h4 class="loginText">ملیت</h4>
            <v-select
              :items="userNationalitArray"
              density="comfortable"
              class="input_1"
              variant="plain"
              placeholder="ملیت خود را مشخص نمایید"
              item-text="title"
              item-value="value"
              v-model="userNationality"
            ></v-select>
            <p
              v-if="userNationalityError == true"
              style="color: red; font-weight: fold"
            >
              فیلد ملیت نباید خالی باشد!
            </p>
          </div>
          <div v-if="userNationality == 1" class="input_part">
            <!-- national code input -->
            <h4 class="loginText">کد ملی</h4>
            <v-text-field
              class="ltrClass input_1"
              reverse
              variant="plain"
              v-on:keydown="stopAllChars($event)"
              placeholder="کد ملی خود را وارد کنید"
              v-model="userNationalCode"
            >
            </v-text-field>
            <p
              v-if="userNationalCodeError == true && userNationality == 1"
              style="color: red; font-weight: fold"
            >
              فیلد کد ملی نباید خالی باشد!
            </p>
            <p
              v-if="userNationalCodeValidateError == true"
              style="color: red; font-weight: fold"
            >
              کد ملی به درستی وارد نشده است!
            </p>
          </div>
          <div v-else-if="userNationality == 2" class="input_part">
            <!-- citizen code input -->
            <h4 class="loginText">کد شهروندی</h4>
            <v-text-field
              class="ltrClass input_1"
              reverse
              variant="plain"
              v-on:keydown="stopAllChars($event)"
              placeholder="کد شهروندی خود را وارد کنید"
              v-model="userNationalCode"
            >
            </v-text-field>
            <p
              v-if="userNationalCodeError == true && userNationality == 2"
              style="color: red; font-weight: fold"
            >
              فیلد کد شهروندی نباید خالی باشد!
            </p>
          </div>
          <div class="input_part">
            <!-- Birth day field -->
            <h4 class="loginText">تاریخ تولد</h4>
            <DatePicker
              format="jYYYY/jMM/jDD"
              simple
              class="datePickerClass"
              placeholder="1370/01/01"
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
            <!-- Edjucation field -->
            <h4 class="loginText">تحصیلات</h4>
            <v-text-field
              class="input_1"
              variant="plain"
              placeholder="عنوان تحصیلات خود را وارد کنید"
              v-model="userEdjucation"
            >
            </v-text-field>
          </div>
          <div class="input_part">
            <!-- EdjucationStudy field -->
            <h4 class="loginText">رشته تحصیلی</h4>
            <v-text-field
              class="input_1"
              variant="plain"
              placeholder="رشته تحصیلی خود را وارد کنید"
              v-on:keydown="stopEnglishChars($event)"
              v-model="userEdjucationStudyField"
            >
            </v-text-field>
          </div>
          <div class="input_part">
            <!-- Telephone field -->
            <h4 class="loginText">تلفن ثابت</h4>
            <v-text-field
              class="ltrClass input_1"
              variant="plain"
              reverse
              placeholder="شماره تلفن ثابت خود را وارد کنید"
              v-on:keydown="stopAllChars($event)"
              v-model="userTelephone"
            >
            </v-text-field>
            <p
              v-if="userTelephoneError == true"
              style="color: red; font-weight: fold"
            >
              فیلد تلفن ثابت نباید خالی باشد!
            </p>
          </div>
          <div class="input_part">
            <!-- RegionalMunicipality field -->
            <h4 class="loginText">منطقه شهرداری</h4>
            <v-text-field
              class="ltrClass input_1"
              variant="plain"
              reverse
              v-on:keydown="stopAllChars($event)"
              placeholder="منطقه شهرداری را وارد کنید"
              v-model="userRegionalMunicipality"
            >
            </v-text-field>
            <p
              v-if="userRegionalMunicipalityError == true"
              style="color: red; font-weight: fold"
            >
              فیلد منطقه شهرداری نباید خالی باشد!
            </p>
          </div>
          <div class="input_part">
            <!-- PostalCode field -->
            <h4 class="loginText">کد پستی</h4>
            <v-text-field
              class="ltrClass input_1"
              variant="plain"
              reverse
              v-on:keydown="stopAllChars($event)"
              placeholder="کد پستی محل سکونت را وارد کنید"
              v-model="userPostalCode"
            >
            </v-text-field>
            <p
              v-if="userPostalCodeError == true"
              style="color: red; font-weight: fold"
            >
              فیلد کد پستی نباید خالی باشد!
            </p>
          </div>
          <div class="input_part">
            <!-- Job field -->
            <h4 class="loginText">شغل</h4>
            <v-text-field
              class="input_1"
              variant="plain"
              placeholder="شغل را وارد کنید"
              v-on:keydown="stopEnglishChars($event)"
              v-model="userJob"
            >
            </v-text-field>
            <p
              v-if="userJobError == true"
              style="color: red; font-weight: fold"
            >
              فیلد شغل نباید خالی باشد!
            </p>
          </div>
          <div class="input_part">
            <!-- Address field -->
            <h4 class="loginText">آدرس</h4>
            <v-textarea
              class="textareaClass"
              clearable
              clear-icon="mdi-close-circle"
              rows="2"
              hide-details
              variant="plain"
              placeholder="آدرس محل سکونت خود را وارد نمایید"
              v-on:keydown="stopEnglishChars($event)"
              v-model="userAddress"
            ></v-textarea>
            <p
              v-if="userAddressError == true"
              style="color: red; font-weight: fold"
            >
              فیلد آدرس محل سکونت نباید خالی باشد!
            </p>
          </div>
          <div class="input_part">
            <!-- children field -->
            <h4 class="loginText">تعداد فرزند</h4>
            <div class="flex_class">
              <div class="flex_class">
                <p class="childText">دختر</p>
                <v-combobox
                  class="ltrClass input_children"
                  variant="plain"
                  v-on:keydown="stopAllChars($event)"
                  v-model="userGirls"
                  :items="numbers"
                  hide-spin-buttons
                  type="number"
                  min="0"
                >
                </v-combobox>
                <p
                  v-if="userGirlsError == true"
                  style="color: red; font-weight: fold"
                >
                  فیلد تعداد فرزندان دختر نباید خالی باشد!
                </p>
                <p
                  v-if="userGirlsZeroError == true"
                  style="color: red; font-weight: fold"
                >
                  مقدار فیلد تعداد فرزندان دختر نباید صفر باشد!
                </p>
              </div>
              <div class="flex_class mr-5">
                <h4 class="childText">پسر</h4>
                <v-combobox
                  class="ltrClass input_children"
                  variant="plain"
                  v-on:keydown="stopAllChars($event)"
                  v-model="userBoys"
                  :items="numbers"
                  hide-spin-buttons
                  type="number"
                  min="0"
                >
                </v-combobox>
                <p
                  v-if="userBoysError == true"
                  style="color: red; font-weight: fold"
                >
                  فیلد تعداد فرزندان پسر نباید خالی باشد!
                </p>
                <p
                  v-if="userBoysZeroError == true"
                  style="color: red; font-weight: fold"
                >
                  مقدار فیلد تعداد فرزندان ‌سر نباید صفر باشد!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="btnContainer flex_class">
          <v-btn
            color="#525355"
            class="text-none submitBtn"
            size="large"
            min-width="200"
            variant="outlined"
            @@click="
              signupFunc(
                userReletivity,
                userName,
                userLastName,
                userFatherName,
                userNationality,
                userNationalCode,
                userBirthDay,
                userEdjucation,
                userEdjucationStudyField,
                userTelephone,
                userRegionalMunicipality,
                userPostalCode,
                userJob,
                userAddress,
                userGirls,
                userBoys
              )
            "
          >
            ثبت
          </v-btn>
          <v-btn
            color="#525355"
            class="text-none closeBtn"
            size="large"
            min-width="200"
            variant="outlined"
            @click="backToHome()"
          >
            انصراف
          </v-btn>
        </div>
      </div>
    </v-locale-provider>
  </v-app>
</template>
<script>
import axios from "./../axios.js";
import DatePicker from "vue3-persian-datetime-picker";

export default {
  components: { DatePicker },
  props: {
    numPage: {
      type: Number,
    },
  },
  emits: ["reset-app"],
  data() {
    return {
      userNameError: false,
      userLastNameError: false,
      userFatherNameError: false,
      userNationalCodeError: false,
      userCitizenCodeError: false,
      userNationalCodeValidateError: false,
      userTelephoneError: false,
      userAddressError: false,
      userRegionalMunicipalityError: false,
      userPostalCodeError: false,
      userJobError: false,
      userGirlsError: false,
      userGirlsZeroError: false,
      userBoysError: false,
      userBoysZeroError: false,
      userBirthDayError: false,
      validating: false,
      userReletivityError: false,
      userNationalityError: false,
      userReletivity: null,
      userNationality: null,
      userName: "",
      userLastName: "",
      userFatherName: "",
      userNationalCode: "",
      userBirthDay: "",
      userEdjucation: "",
      userEdjucationStudyField: "",
      userTelephone: "",
      userAddress: "",
      userRegionalMunicipality: "",
      userPostalCode: "",
      userJob: "",
      userGirls: "0",
      userBoys: "0",
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      userReletivesList: [
        {
          value: 1,
          title: "پدر",
        },
        {
          value: 2,
          title: "مادر",
        },
      ],
      userNationalitArray: [
        {
          value: 1,
          title: "ایرانی",
        },
        {
          value: 2,
          title: "اتباع خارجه",
        },
      ],
    };
  },
  watch: {
    userReletivity(newVal) {
      if (newVal == 1 || newVal == 2) {
        this.userReletivityError = false;
      }
    },
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
    userFatherName(newVal) {
      if (newVal.length > 0) {
        this.userFatherNameError = false;
      }
    },
    userNationality(newVal) {
      if (newVal == 1 || newVal == 2) {
        this.userNationalityError = false;
      }
    },
    userNationalCode(newVal) {
      this.userNationalCode = this.toFarsiNumber(newVal);
      if (newVal.length > 0) {
        this.userNationalCodeError = false;
        this.userCitizenCodeError == false;
      }
    },
    userBirthDay(newVal) {
      if (newVal.length > 0) {
        this.userBirthDayError = false;
      }
    },
    userTelephone(newVal) {
      this.userTelephone = this.toFarsiNumber(newVal);
      if (newVal.length > 0) {
        this.userTelephoneError = false;
      }
    },
    userAddress(newVal) {
      if (newVal.length > 0) {
        this.userAddressError = false;
      }
    },
    userRegionalMunicipality(newVal) {
      this.userRegionalMunicipality = this.toFarsiNumber(newVal);
      if (newVal.length > 0) {
        this.userRegionalMunicipalityError = false;
      }
    },
    userPostalCode(newVal) {
      this.userPostalCode = this.toFarsiNumber(newVal);
      if (newVal.length > 0) {
        this.userPostalCodeError = false;
      }
    },
    userJob(newVal) {
      if (newVal.length > 0) {
        this.userJobError = false;
      }
    },
    userGirls(newVal) {
      // this.userGirls = this.toFarsiNumber(newVal);
      if (newVal.length > 0) {
        this.userGirlsError = false;
      }
      if (newVal > 0) {
        this.userGirlsError = false;
        this.userGirlsZeroError = false;
      }
    },
    userBoys(newVal) {
      // this.userBoys = this.toFarsiNumber(newVal);
      if (newVal.length > 0) {
        this.userBoysError = false;
      }
      if (newVal > 0) {
        this.userBoysError = false;
        this.userBoysZeroError = false;
      }
    },
  },
  methods: {
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
    backToHome() {
      this.$emit("reset-app");
      this.$emit("user-rerender-drawer", 0);
      if (this.$cookies.get("firstTimeParentDetails")) {
        this.$cookies.remove("firstTimeParentDetails");
      }
      this.$router.push({ name: "Home" });
    },
    emptyCheck(itemArray) {
      let emptyCheck = false;
      for (let i = 0; i < itemArray.length; i++) {
        if (itemArray[i] == "" || itemArray[i] == null) {
          emptyCheck = true;
          if (i == 0) {
            this.userReletivityError = true;
          } else if (i == 1) {
            this.userNameError = true;
          } else if (i == 2) {
            this.userLastNameError = true;
          } else if (i == 3) {
            this.userFatherNameError = true;
          } else if (i == 4) {
            this.userNationalityError = true;
          } else if (i == 5) {
            this.userNationalCodeError = true;
          } else if (i == 6) {
            this.userBirthDayError = true;
          } else if (i == 7) {
            this.userTelephoneError = true;
          } else if (i == 8) {
            this.userRegionalMunicipalityError = true;
          } else if (i == 9) {
            this.userPostalCodeError = true;
          } else if (i == 10) {
            this.userJobError = true;
          } else if (i == 11) {
            this.userAddressError = true;
          } else if (i == 12) {
            this.userGirlsError = true;
          } else if (i == 13) {
            this.userBoysError = true;
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
    closeFunc() {
      this.dialog = false;
      this.userName = "";
      this.userLastName = "";
      this.userNationalCode = "";
      this.userBirthDay = "";
      this.userEdjucation = "";
      this.userSchoolStudy = "";
      this.whichChild = "";
      this.userNameError = false;
      this.userLastNameError = false;
      this.userNationalCodeError = false;
      this.userEdjucationError = false;
      this.userSchoolStudyError = false;
      this.whichChildError = false;
    },
    signupFunc(
      userReletivity,
      userName,
      userLastName,
      userFatherName,
      userNationality,
      userNationalCode,
      userBirthDay,
      userEdjucation,
      userEdjucationStudyField,
      userTelephone,
      userRegionalMunicipality,
      userPostalCode,
      userJob,
      userAddress,
      userGirls,
      userBoys
    ) {
      let itemArray = [
        userReletivity,
        userName,
        userLastName,
        userFatherName,
        userNationality,
        userNationalCode,
        userBirthDay,
        userTelephone,
        userRegionalMunicipality,
        userPostalCode,
        userJob,
        userAddress,
        userGirls,
        userBoys,
      ];
      if (this.emptyCheck(itemArray) == true) {
        if (
          (this.userGirls == 0 && this.userBoys == 0) ||
          (this.userGirls == "0" && this.userBoys == "0")
        ) {
          this.$swal("مقدار فیلدهای فرزند نباید صفر باشد!", "", "warning");
        } else {
          userReletivity = parseInt(userReletivity);
          userNationalCode = this.toEnglishNumber(userNationalCode);
          var data = {
            type: userReletivity,
            first_name: userName,
            last_name: userLastName,
            national_code: userNationalCode,
            user_profile: {
              father_name: userFatherName,
              education: userEdjucation,
              field_study: userEdjucationStudyField,
              telephone: userTelephone,
              address: userAddress,
              Regional_Municipality: userRegionalMunicipality,
              postal_code: userPostalCode,
              job: userJob,
              girls: userGirls,
              boys: userBoys,
              // nationality: userNationality,
              // birth_date: birthDay
            },
          };
          // JSON.stringify(bodyFormData.append("type", userReletivity));
          // JSON.stringify(bodyFormData.append("first_name", userName));
          // JSON.stringify(bodyFormData.append("last_name", userLastName));
          // JSON.stringify(bodyFormData.append("national_code", userNationalCode));
          // JSON.stringify(bodyFormData.append("user_profile", userprofile));
          axios({
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            url: `account/user-register/?session=${this.$cookies.get(
              "sessionId"
            )}`,
            data: JSON.stringify(data),
          })
            .then((response) => {
              if (response.status == 201) {
                this.$cookies.set("userToken", response.data.access);
                this.$cookies.set("userEntered", true);
                if (this.$cookies.get("firstTimeParentDetails")) {
                  this.$cookies.remove("firstTimeParentDetails");
                }
                this.$emit("reset-app");
                this.$router.push({ path: "/add-child" });
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
}
.mainContainer {
  position: relative;
  margin: 5%;
}
.titlePart {
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
  padding-right: 3%;
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
.inputContainer {
  display: grid;
  grid-gap: 2%;
  grid-template-columns: repeat(3, minmax(350px, 10fr));
  justify-items: center;
  padding: 0%;
}
.input_part {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0% 10%;
  margin-top: 0%;
}
.input_1 {
  max-height: 50px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 8px;
  background-color: #f4f5f6;
  font-family: danaRegular !important;
}
.loginText {
  text-align: right;
  font-size: 20px;
  color: #525355;
  font-weight: 700;
  margin-bottom: 10px;
}
.childText {
  color: #8a8b8d;
  font-weight: 500;
}
.input_children {
  width: 70px;
  min-height: 50px;
  padding-right: 20px;
  margin-right: 20px;
  border-radius: 7px;
  background-color: #f4f5f6;
}
.textareaClass {
  width: 100%;
  border-radius: 7px;
  background-color: #f4f5f6;
}
.datePickerClass {
  min-height: 50px;
  border-radius: 7px;
  color: #525355;
}
.btnContainer {
  width: 100%;
  margin-top: 5%;
}
.submitBtn {
  font-weight: bold;
  color: white !important;
  background-color: #f68100;
  width: 44%;
  border-radius: 12px;
}
.closeBtn {
  font-weight: bold;
  color: #c5c5c6 !important;
  width: 44%;
  margin-right: 5%;
  border-radius: 12px;
}
</style>
<style>
@font-face {
  font-family: danaRegular;
  src: url("./assets/fonts/Dana-Regular.ttf");
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
  width: 100% !important;
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
.textareaClass > .v-field--variant-underlined .v-label.v-field-label,
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
.vpd-input-group label {
  border-radius: 0px 8px 8px 0px;
  background-color: #f4f5f6 !important;
}
.vpd-input-group input:not(.vpd-is-editable) {
  border-radius: 8px 0px 0px 8px;
  background-color: #f4f5f6;
  border: none !important;
}
.datePickerClass svg {
  fill: #525355 !important;
}
.vpd-content {
  border-radius: 12px;
}
.vpd-main *,
.vpd-wrapper * {
  color: #f68100 !important;
}
</style>