<template>
  <v-app style="height: 100% !important; font-family: iranSansRegular !important;">
    <v-locale-provider rtl>
      <div class="mainBody">
        <div class="mainLogSignBody">
          <!-- choose user type -->
          <!-- <div class="flex_class chooseRole">
            <div class="flex_class userAdminFormBtn hoverClass">
              <div id="userLoginBtn" class="userRadius" @click="goToUserForm()">ورود کاربران</div>
            </div>
            <div class="flex_class userAdminFormBtn hoverClass">
              <div id="adminLoginBtn" class="adminRadius" @click="goToAdminForm()">ورود کارمندان سنجاب</div>
            </div>
          </div> -->
          <!-- login/signup part -->
          <v-card class="loginPartContainer">
            <div class="titlePart">
              <div class="titleShape"></div>
              <h2>ورود/ثبت‌نام کاربران</h2>
              <!-- <h2 v-else>ورود کارمندان سنجاب</h2> -->
            </div>
            <div class="mainBox flex_class">
              <!-- login/signupl part -->
              <div class="flex_column_class">
                <div class="input_part">
                  <p class="loginText">برای ورود یا ثبت‌نام، لطفا شماره تلفن همراه خود را وارد نمایید:</p>
                  <!-- <p v-else class="loginText">برای ورود به بخش مدیریت، لطفا شماره تلفن همراه خود را وارد نمایید:</p> -->
                  <v-text-field
                    label="تلفن همراه"
                    class="ltrClass input_1"
                    reverse
                    v-on:keydown="stopChars($event)"
                    variant="plain"
                    placeholder="شماره تلفن همراه خود را وارد کنید"
                    v-model="userPhoneNum"
                  >
                  </v-text-field>
                  <p
                    v-if="userPhoneNumError == true"
                    style="color: red; font-weight: fold"
                  >
                    لطفا شماره تلفن را درست وارد کنید!
                  </p>
                </div>
                <div class="btnContainer flex_class">
                  <v-btn
                    :loading="phoneBtnLoading"
                    color="#525355"
                    class="text-none childBtn"
                    size="large"
                    min-width="200"
                    variant="outlined"
                    @click="logninFunc(userPhoneNum)"
                  >
                    ورود/ثبت‌نام
                  </v-btn>
                  <!-- <v-btn
                    v-else
                    :loading="phoneBtnLoading"
                    color="#525355"
                    class="text-none childBtn"
                    size="large"
                    min-width="200"
                    variant="outlined"
                    @click="logninFunc(userPhoneNum)"
                  >
                    ورود به بخش مدیریت
                  </v-btn> -->
                </div>
              </div>
            </div>
          </v-card>
        </div>
        <v-dialog
          v-model="dialog"
          style="width: 35% !important;"
        >
          <v-card
            class="py-12 px-8 text-center mx-auto ma-4"
            style="font-family: iranSansRegular !important;"
            width="100%"
          >
            <h3 class="text-h6 mb-2" style="font-family: iranSansRegular !important;">
              لطفا کد ارسالی به شماره همراه خود را در کادر زیر وارد نمایید:
            </h3>

            <!-- <div>A code has been sent to *****2489</div> -->
            <v-locale-provider ltr>
              <v-otp-input
                v-model="otp"
                reverse
                variant="plain"
                color="#f68100"
                length="4"
              ></v-otp-input>
            </v-locale-provider>
            <div v-if="startCountDown == true" class="timerClass flex_class">
              <p>ارسال مجدد پیامک:</p>
              <div v-if="timer > 9" class="flex_class mr-1">00:{{timer}}</div>
              <div v-else class="flex_class mr-1">00:0{{timer}}</div>
            </div>
            <div v-if="sendAgin == false" class="flex_class">
              <v-btn
                :loading="verificationBtnLoading"
                color="#f68100"
                class="text-none childBtn"
                size="large"
                min-width="200"
                variant="outlined"
                @click="validateCode(otp)"
              >
              ارسال کد
              </v-btn>
            </div>
            <div v-else class="flex_class">
              <v-btn
                :loading="verificationBtnLoading"
                color="#f68100"
                class="text-none childBtn"
                size="large"
                min-width="200"
                variant="outlined"
                @click="validateCode(otp)"
              >
              ارسال کد
              </v-btn>
              <v-btn
                :loading="verificationBtnLoading"
                color="#f68100"
                class="text-none sendAgainBtn"
                size="large"
                min-width="200"
                variant="outlined"
                @click="logninFunc(userPhoneNum)"
              >
              ارسال مجدد پیامک
              </v-btn>
            </div>
          </v-card>
        </v-dialog>
      </div>
    </v-locale-provider>
  </v-app>
</template>
<script>
import axios from './../axios.js';

export default {
  emits: ['reset-app'],
  data() {
    return {
      timer: 60,
      userPhoneNum: '',
      otp: '',
      sendAgin: false,
      startCountDown: false,
      phoneBtnLoading: false,
      verificationBtnLoading: false,
      userPhoneNumError: false,
      // userType: true,
      dialog: false,
    };
  },
  watch: {
    userPhoneNum(newVal) {
      this.userPhoneNum = this.toFarsiNumber(newVal);
      if (newVal.length > 0) {
        this.userPhoneNumError = false;
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
    toEngNumber(n) {
      if (n.length == 0) {
        return;
      }
      n = n.toString();
      var englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
          persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];

      for (var i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
          n = n.replace(new RegExp(persianNumbers[i], "g"), englishNumbers[i]);
      }
      return n;
    },
    emptyCheck(phoneNum) {
      if (phoneNum == null || phoneNum == "") {
        this.userPhoneNumError = true;
      }
      if (
        phoneNum == null ||
        phoneNum == ""
      ) {
        return false;
      } else {
        return true;
      }
    },
    logninFunc(userPhoneNum) {
      this.phoneBtnLoading = true;
      this.sendAgin = false;
      userPhoneNum = this.toEngNumber(userPhoneNum);
      if (this.emptyCheck(userPhoneNum) === true) {
        var bodyFormData = new FormData();
        JSON.stringify(bodyFormData.append("phone_number", userPhoneNum));
          axios({
            method: "POST",
            url: "account/login-register/",
            headers: {
              'Content-Type': "application/json",
            },
            data: bodyFormData,
          })
            .then((response) => {
              if (response.status == 200) {
                this.startCountDown = true;
                this.countDownTimer();
                this.$cookies.set('sessionId', response.data);
                this.phoneBtnLoading = false;
                this.dialog = true;
              } else {
                this.$swal("مشکلی پیش آمد!", response.message, "error");
                this.phoneBtnLoading = false;
              }
              
            })
            .catch((err) => {
              this.$swal("مشکلی پیش آمد!", err.message, "error");
              this.phoneBtnLoading = false;
            });
      }
    },
    countDownTimer() {
      if (this.timer > 0) {
        setTimeout(() => {
            this.timer -= 1
            this.countDownTimer()
        }, 1000)
      } else {
        this.startCountDown = false
        this.sendAgain = true;
      }
    },
    validateCode(otpCode) {
      this.verificationBtnLoading = true;
      var bodyFormData = new FormData();
      JSON.stringify(bodyFormData.append("code", otpCode));
        axios({
          method: "POST",
          url: `account/phone-verification/?session=${this.$cookies.get('sessionId')}`,
          headers: {
            "content-type": "application/json",
          },
          data: bodyFormData,
        })
          .then((response) => {
            if (response.status == 201) {
              if (response.data.is_admin == true) {
                this.$cookies.set("userToken", response.data.access);
                this.$cookies.set('adminEntered', true);
                // if (this.$cookies.get("userToken")) {
                  this.$emit("reset-app");
                  this.$router.push({ name: "adminDashboard" });
                  this.dialog = false;
                  this.verificationBtnLoading = false;
                // }
              } else {
                this.$cookies.set("userToken", response.data.access);
                this.$cookies.set('userEntered', true);
                this.$cookies.set('showBars');
                if (this.$cookies.get("userEntered") == true || this.$cookies.get("userEntered") == 'true') {
                  this.$emit("reset-app");
                  this.$router.push({ name: "Home" });
                  this.dialog = false;
                  this.verificationBtnLoading = false;
                }
              }
            } else if (response.status == 200) {
              if (response.data.is_admin == true) {
                this.$cookies.set('is_admin');
                this.$cookies.set("userToken", response.data.access);
                this.$cookies.set('adminEntered', true);
                this.$emit("reset-app");
                this.$router.push({ name: "adminDashboard" });
                this.dialog = false;
                this.verificationBtnLoading = false;
              } else {
                if (response.is_registered == false) {
                  this.dialog = false;
                  this.$swal("مشکلی پیش آمد، لطفا مجدد تلاش نمایید!", "error");
                  this.verificationBtnLoading = false;
                } else {
                  this.dialog = false;
                  this.verificationBtnLoading = false;
                  this.$cookies.set('showBars');
                  this.$cookies.set('firstTimeParentDetails');
                  this.$router.push({ name: "ParentsDetails" });
                }
              }
            } else {
              this.$swal("مشکلی پیش آمد، لطفا مجدد تلاش نمایید!", "error");
              this.verificationBtnLoading = false;
            }
            
          })
          .catch((err) => {
            this.$swal("مشکلی پیش آمد!", err.message, "error");
            this.verificationBtnLoading = false;
          });
    }
  },
};
</script>
<style scoped>
.flex_class {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex_column_class {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.mainBody {
  background-image: url('./../assets/kidsTalent.jpg');
  background-size: cover;
  height: 100vh !important;
}
.mainLogSignBody {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 3.78%;
}
.chooseRole {
  font-family: iranSansRegular;
  width: 70%;
  margin-bottom: 100px;
}
.loginPartContainer {
  font-family: iranSansRegular;
  width: 50%;
  min-height: 300px;
  margin-top: -3%;
  background-color: hsl(120, 61%, 90%, 0.8);
}
.titlePart {
  display: flex;
  margin-top: 10px;
  padding-right: 0px;
}
.titlePart h2 {
  margin-right: 10px;
  color: #6d6e71;
}
.titleShape {
  border-left: 10px solid #6d6e71;
  border-radius: 7px 0 0 7px;
}
.mainBox {
  width: 100%;
  min-height: 300px !important;
}
.input_part {
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 100%;
  padding: 0% 10%;
  margin-top: 5%;
}
.loginText {
  text-align: center;
  font-size: 23px;
}
.btnContainer {
  width: 100%;
  margin-top: 5%;
  margin-bottom: 20%;
}
.input_1 {
  margin-top: 5%;
  padding-top: 0 !important;
  max-height: 50px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 7px;
  border: 2px solid white;
  box-shadow: 1px 0px 10px 0px #525355;
}
input:focus {
  border: 2px solid white;
  outline-width: 0;
}
input:-ms-input-placeholder {
  text-align: right;
  color: #3d3d3d;
  opacity: 0.8;
}
input::-webkit-input-placeholder {
  text-align: right;
  color: #3d3d3d;
  opacity: 0.8;
}
input::-moz-placeholder {
  text-align: right;
  color: #3d3d3d;
  opacity: 0.8;
}
.childBtn {
  font-weight: bold;
  color: #f68100 !important;
  width: 60%;
  height: 3rem;
  margin-top: 6%;
  align-self: center;
}
.childBtn:hover {
  border: none;
  color: white !important;
  background-color: #f68100;
  font-weight: bold;
}
.sendAgainBtn {
  font-weight: bold;
  color: #3d3d3d !important;
  width: 10%;
  height: 3rem;
  margin-top: 6%;
  margin-right: 1%;
  align-self: center;
}
.sendAgainBtn:hover {
  border: none;
  color: white !important;
  background-color: #3d3d3d;
  font-weight: bold;
}
.userRadius {
  border-radius: 0px 10px 10px 0px !important;
}
.adminRadius {
  border-radius: 10px 0px 0px 10px !important;
}
.userAdminFormBtn{
  align-content: center;
  text-align: center;
  width: 100%;
  margin-top: 0% !important;
  font-family: iranSansRegular !important;
}
.userAdminFormBtn div {
  font-family: iranSansRegular !important;
  font-size: 20px;
  width: 100%;
  text-align: center;
  border: 1px solid #6d6e71;
  height: 5vh;
  font-family: "IranSans Regular";
  background: white;
  color: #f68100;
  display: flex;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
}
.userAdminFormBtn div:hover {
  color: white;
  background-color: #f68100;
  font-weight: bold;
}
.timerClass {
  font-family: iranSansRegular !important;
  font-size: 20px;
  font-weight: bold;
  color: #6d6e71;
}
</style>
<style>
@font-face {
    font-family: iranSansRegular;
    src: url('./../assets/fonts/IRANSansX-Regular.ttf');
}
.v-selection-control--inline .v-label {
  font-size: 28px;

}
.vpd-container {
  left: 80% !important;
}
.v-field--variant-underlined .v-label.v-field-label, .v-field--variant-plain .v-label.v-field-label {
  top: 0% !important;
}
.ltrClass > .v-field--variant-underlined .v-label.v-field-label,
.v-field--variant-plain .v-label.v-field-label {
  right: 0 !important;
  margin-top: 1.5% !important;
  font-size: 16px;
}
.ltrClass {
  position: relative;
}
.ltrClass input::placeholder {
  position: absolute;
  margin-bottom: 10px !important;
}
.ltrClass .v-field--reverse .v-field__input, .v-field--reverse input {
  font-size: 20px;
}
</style>