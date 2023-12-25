<template>
  <v-app style="margin-right: 20%;">
    <v-locale-provider rtl>
      <div style="padding-top: 5%">
        <!-- radios -->
        <v-radio-group class="radio_part" v-model="parent_type" inline>
          <v-radio
            label="پدر"
            value="1"
            class="radio_text ml-7"
            color="#f68100"
          ></v-radio>
          <v-radio
            label="مادر"
            value="2"
            class="radio_text"
            color="#f68100"
          ></v-radio>
        </v-radio-group>
        <div class="inputContainer row">
          <div class="input_part">
            <!-- parent name -->
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
            <!-- parent last name -->
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
            <v-text-field
              label="نام پدر"
              class="input_1"
              variant="plain"
              placeholder="نام پدر خود را وارد کنید"
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
            <v-text-field
              label="کد ملی"
              class="ltrClass input_1"
              reverse
              variant="plain"
              v-on:keydown="stopChars($event)"
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
            <p
              v-if="userNationalCodeValidateError == true"
              style="color: red; font-weight: fold"
            >
              کد ملی به درستی وارد نشده است!
            </p>
          </div>
          <div class="input_part">
            <DatePicker
              format="jYYYY/jMM/jDD"
              simple
              class="datePickerClass"
              label="تاریخ تولد"
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
            <v-text-field
              label="تحصیلات"
              class="input_1"
              variant="plain"
              placeholder="عنوان تحصیلات خود را وارد کنید"
              v-model="userEdjucation"
            >
            </v-text-field>
          </div>
          <div class="input_part">
            <v-text-field
              label="رشته تحصیلی"
              class="input_1"
              variant="plain"
              placeholder="رشته تحصیلی خود را وارد کنید"
              v-model="userEdjucationStudyField"
            >
            </v-text-field>
          </div>
          <div class="input_part">
            <v-text-field
              label="تلفن ثابت"
              class="ltrClass input_1"
              variant="plain"
              reverse
              placeholder="شماره تلفن ثابت خود را وارد کنید"
              v-on:keydown="stopChars($event)"
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
            <v-text-field
              label="منطقه شهرداری"
              class="ltrClass input_1"
              variant="plain"
              reverse
              v-on:keydown="stopChars($event)"
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
            <v-text-field
              label="کد پستی"
              class="ltrClass input_1"
              variant="plain"
              reverse
              v-on:keydown="stopChars($event)"
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
            <v-text-field
              label="شغل"
              class="input_1"
              variant="plain"
              placeholder="شغل را وارد کنید"
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
            <v-textarea
              class="textareaClass"
              clearable
              clear-icon="mdi-close-circle"
              label="آدرس محل کار خود را وارد کنید:"
              rows="2"
              hide-details
              variant="plain"
              v-model="userOfficeAddress"
            ></v-textarea>
          </div>
          <div class="input_part">
            <v-textarea
              class="textareaClass"
              clearable
              clear-icon="mdi-close-circle"
              label="آدرس محل سکونت خود را وارد کنید:"
              rows="2"
              hide-details
              variant="plain"
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
            <p>تعداد فرزند</p>
            <div class="flex_class">
              <div class="girls">
                <v-text-field
                  label="دختر"
                  class="ltrClass input_children"
                  variant="plain"
                  reverse
                  v-model="userGirls"
                  type="number"
                  min="0"
                >
                </v-text-field>
                <p
                  v-if="userGirlsError == true"
                  style="color: red; font-weight: fold"
                >
                  فیلد تعداد فرزندان دختر نباید خالی باشد!
                </p>
              </div>
              <div class="boys">
                <v-text-field
                  label="پسر"
                  class="ltrClass input_children"
                  variant="plain"
                  reverse
                  v-model="userBoys"
                  type="number"
                  min="0"
                >
                </v-text-field>
                <p
                  v-if="userBoysError == true"
                  style="color: red; font-weight: fold"
                >
                  فیلد تعداد فرزندان پسر نباید خالی باشد!
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
            @click="
              signupFunc(
                userName,
                userLastName,
                userNationalCode,
                
              )
            "
          >
            ثبت اطلاعات
          </v-btn>
        </div>
      </div>
    </v-locale-provider>
  </v-app>
</template>
<script>
import axios from "axios";
import DatePicker from "vue3-persian-datetime-picker";

export default {
  components: { DatePicker },
  props: {
    numPage: {
      type: Number
    },
  },
  data() {
    return {
      userNameError: false,
      userLastNameError: false,
      userFatherNameError: false,
      userNationalCodeError: false,
      userNationalCodeValidateError: false,
      userTelephoneError: false,
      userAddressError: false,
      userRegionalMunicipalityError: false,
      userPostalCodeError: false,
      userJobError: false,
      userGirlsError: false,
      userBoysError: false,
      userBirthDayError: false,
      validating: false,
      otp: '',
      parent_type: "1",
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
      userOfficeAddress: "",
      userGirls: "",
      userBoys: "",
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
    userFatherName(newVal) {
      if (newVal.length > 0) {
        this.userFatherNameError = false;
      }
    },
    userNationalCode(newVal) {
      this.userNationalCode = this.toFarsiNumber(newVal);
      if (newVal.length > 0) {
        this.userNationalCodeError = false;
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
    },
    userBoys(newVal) {
      // this.userBoys = this.toFarsiNumber(newVal);
      if (newVal.length > 0) {
        this.userBoysError = false;
      }
    },
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
      n = n.toString();
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
      let emptyCheck = false;
      for (let i = 0; i < itemArray.length; i++) {
        if (itemArray[i] == "") {
          emptyCheck = true;
          if (i == 0) {
            this.userNameError = true;
          } else if (i == 1) {
            this.userLastNameError = true;
          } else if (i == 2) {
            this.userFatherNameError = true;
          } else if (i == 3) {
            this.userNationalCodeError = true;
          } else if (i == 4) {
            this.userTelephoneError = true;
          } else if (i == 5) {
            this.userAddressError = true;
          } else if (i == 6) {
            this.userRegionalMunicipalityError = true;
          } else if (i == 7) {
            this.userPostalCodeError = true;
          } else if (i == 8) {
            this.userJobError = true;
          } else if (i == 9) {
            this.userGirlsError = true;
          } else if (i == 10) {
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
    signupFunc(
      name,
      lastName,
      nCode,
    ) {
      // let itemArray = [
      //   name,
      //   lastName,
      //   nCode,
      // ];
      // if (this.emptyCheck(itemArray) == true) {
        // userBirthDay = this.convertToGerigorian(userBirthDay);

        // var bodyObj = {
        //   first_name: name,
        //   last_name: lastName,
        //   national_code: nCode,
        // };
        // console.log(JSON.stringify(bodyObj));

        // const requestOptions = {
        //   method: 'POST',
        //   headers: {
        //     'Access-Control-Allow-Origin' : '*',
        //     'Content-Type': 'application/json',
        //   },
        //   credentials: 'include',
        //   body: JSON.stringify(bodyObj)
        // };
        // fetch("http://194.9.56.86/api/v1/account/user-register/", requestOptions)
        //     .then(async response => {
        //       const data = await response.json();
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
        //     });


        // console.log(typeof phoneNum, typeof phoneNum)
      var bodyFormData = new FormData();
      JSON.stringify(bodyFormData.append("first_name", name));
      JSON.stringify(bodyFormData.append("last_name", lastName));
      // bodyFormData.append("father_name", userFatherName);
      JSON.stringify(bodyFormData.append("national_code", nCode));
      // bodyFormData.append("birth_date", birthDay);
      // bodyFormData.append("education", userEdjucation);
      // bodyFormData.append("field_study", userEdjucationStudyField);
      // bodyFormData.append("telephone", userTelephone);
      // bodyFormData.append("address", userAddress);
      // bodyFormData.append("Regional_Municipality", userRegionalMunicipality);
      // bodyFormData.append("postal_code", userPostalCode);
      // bodyFormData.append("job", userJob);
      // bodyFormData.append("office_address", userOfficeAddress);
      // bodyFormData.append("girls", userGirls);
      // bodyFormData.append("boys", userBoys);
        axios({
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          url: "http://192.168.100.15:8000/api/v1/account/user-register/",
          data: bodyFormData,
          withCredentials: true,
        })
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.log(err);
            this.$alert(err.response.data.message, "", "error");
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
}
.radio_part {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.radio_text {
  font-size: 20px !important;
}
.inputContainer {
  display: grid;
  grid-gap: 2%;
  grid-template-columns: repeat(3, minmax(350px, 10fr));
  justify-items: center;
  padding-top: 0%;
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
  font-family: iranSansRegular !important;
}
.input_children {
  width: 70px;
  min-height: 50px;
  padding-right: 20px;
  margin-right: 20px;
  border-radius: 7px;
  border: 2px solid white;
  box-shadow: 1px 0px 10px 0px #525355;
}
.textareaClass {
  border-radius: 7px;
  border: 2px solid white;
  box-shadow: 1px 0px 10px 0px #525355;
}
.datePickerClass {
  min-height: 50px;
  box-shadow: 1px 0px 10px 0px #525355;
  border-radius: 7px;
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
</style>
<style>
@font-face {
    font-family: iranSansRegular;
    src: url('./../assets/fonts/IRANSansX-Regular.ttf');
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
</style>