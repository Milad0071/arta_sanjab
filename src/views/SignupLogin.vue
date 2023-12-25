<template>
  <v-app style="height: 100% !important; font-family: iranSansRegular !important;">
    <v-locale-provider rtl>
      <div class="mainBody">
        <div class="mainLogSignBody">
          <!-- choose user type -->
          <div class="flex_class chooseRole">
            <div class="flex_class userAdminFormBtn hoverClass">
              <div id="userLoginBtn" class="userRadius" @click="goToUserForm()">ورود کاربران</div>
            </div>
            <div class="flex_class userAdminFormBtn hoverClass">
              <div id="adminLoginBtn" class="adminRadius" @click="goToAdminForm()">ورود کارمندان سنجاب</div>
            </div>
          </div>
          <!-- login/signup part -->
          <v-card class="loginPartContainer">
            <div class="titlePart">
              <div class="titleShape"></div>
              <h2 v-if="userType == true">ورود/ثبت‌نام کاربران</h2>
              <h2 v-else>ورود کارمندان سنجاب</h2>
            </div>
            <div class="mainBox flex_class">
              <!-- login/signupl part -->
              <div class="flex_column_class">
                <div class="input_part">
                  <p v-if="userType == true" class="loginText">برای ورود یا ثبت‌نام، لطفا شماره تلفن همراه خود را وارد نمایید:</p>
                  <p v-else class="loginText">برای ورود به بخش مدیریت، لطفا شماره تلفن همراه خود را وارد نمایید:</p>
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
                    v-if="userType == true"
                    color="#525355"
                    class="text-none childBtn"
                    size="large"
                    min-width="200"
                    variant="outlined"
                    @click="logninFunc(userPhoneNum, 0)"
                  >
                    ورود/ثبت‌نام
                  </v-btn>
                  <v-btn
                    v-else
                    color="#525355"
                    class="text-none childBtn"
                    size="large"
                    min-width="200"
                    variant="outlined"
                    @click="logninFunc(userPhoneNum, 1)"
                  >
                    ورود به بخش مدیریت
                  </v-btn>
                </div>
              </div>
            </div>
          </v-card>
        </div>
        <v-dialog
          v-model="dialog"
          width="auto"
        >
          <v-card
            class="py-12 px-8 text-center mx-auto ma-4"
            max-width="420"
            width="100%"
          >
            <h3 class="text-h6 mb-2">
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
            <v-btn
              color="#f68100"
              class="text-none childBtn"
              size="large"
              min-width="200"
              variant="outlined"
              @click="validateCode(otp)"
            >
            ارسال کد
            </v-btn>
          </v-card>
        </v-dialog>
      </div>
    </v-locale-provider>
  </v-app>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      userPhoneNum: '',
      otp: '',
      userPhoneNumError: false,
      userType: true,
      dialog: false,
    };
  },
  mounted() {
    this.userType = true;
    document.getElementById("userLoginBtn").style.color = "white";
    document.getElementById("userLoginBtn").style.backgroundColor = "#f68100";
    document.getElementById("userLoginBtn").style.fontWeight = "bold";
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
    goToUserForm() {
      this.userType = true;
      document.getElementById("userLoginBtn").style.color = "white";
      document.getElementById("userLoginBtn").style.backgroundColor = "#f68100";
      document.getElementById("userLoginBtn").style.fontWeight = "bold";
      document.getElementById("adminLoginBtn").style.color = "#f68100";
      document.getElementById("adminLoginBtn").style.backgroundColor = "white";
      document.getElementById("adminLoginBtn").style.fontWeight = "";
      
    },
    goToAdminForm() {
      this.userType = false;
      document.getElementById("adminLoginBtn").style.color = "white";
      document.getElementById("adminLoginBtn").style.backgroundColor = "#f68100";
      document.getElementById("adminLoginBtn").style.fontWeight = "bold";
      document.getElementById("userLoginBtn").style.color = "#f68100";
      document.getElementById("userLoginBtn").style.backgroundColor = "white";
      document.getElementById("userLoginBtn").style.fontWeight = "";
      // this.$swal("در دست توسعه", "", "info");
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
    logninFunc(userPhoneNum, userType) {
      userPhoneNum = this.toEngNumber(userPhoneNum);
      if (this.emptyCheck(userPhoneNum) === true) {
        if (userType == '1' && this.userPhoneNum == '۰۹۱۳۳۰۹۱۴۷۸') {
          this.$cookies.set('admin');
            this.$router.push({ name: "adminDashboard" });
        } else {
          // var bodyObj = {
          //   phone_number: userPhoneNum,
          // }

          // const requestOptions = {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(bodyObj)
          // };
          // fetch("http://194.9.56.86/api/v1/account/login-register/", requestOptions)
          //   .then(response => {
          //     this.dialog = true;
          //     const data = response;
          //     // const data = response.headers.getSetCookie();
          //     console.log(data)
          //     const sessionId = this.getSessionIdFromCookie(data);
          //     console.log(sessionId);
          //     if (!response.ok) {
          //         const error = (data && data.message) || response.status;
          //         console.log(error)
          //         return Promise.reject(error);
          //     }
          //   })
          //   .catch(error => {
          //       console.log(error)
          //   });

          var bodyFormData = new FormData();
          JSON.stringify(bodyFormData.append("phone_number", userPhoneNum));
            axios({
              method: "POST",
              url: "http://194.9.56.86/api/v1/account/login-register/",
              headers: {
              'Content-Type': "application/json"
              },
              withCredentials: true,
              data: bodyFormData,
            })
              .then((response) => {
                console.log(response);
                console.log(response.headers);
                console.log(typeof response.data)
                this.$cookies.set('sessionId', response.data)
                this.dialog = true;
                // this.$cookies.set("userToken", response.data.access_token);
                // this.$cookies.set('userEntered', true);
                // this.$router.push({ path: "/home" });
              })
              .catch((err) => {
                console.log(err);
                this.$swal("مشکلی پیش آمد!", err.message, "error");
              });
        // } 
          // else {
        //   }
        }
      }
    },
    validateCode(recivedCode) {
      // recivedCode = parseInt(recivedCode);
      // var bodyObj = {
      //   code: recivedCode,
      // }
      // console.log(this.$cookies.get('sessionId'))
      // const requestOptions = {
      //   method: 'POST',
        
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   credentials: 'include',
      //   body: JSON.stringify(bodyObj)
      // };
      // fetch('http://194.9.56.86/api/v1/account/phone-verification/', requestOptions)
      //   .then( response => {
      //     if (response.ok) {
      //       console.log(response);
      //       this.dialog = false;
      //       this.$router.push({ name: "ParentsDetails" });
      //     } 
      //     this.dialog = false;
      //     // check for error response
      //     if (!response.ok) {
      //       // get error message from body or default to response status
      //       this.dialog = false;
      //       // const error = (data && data.message) || response.status;
      //       // console.log(error)
      //       this.$swal("کد به درستی وارد نشده است!", "", "error")
      //       // return Promise.reject(error);
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   });


        var bodyFormData = new FormData();
          JSON.stringify(bodyFormData.append("code", recivedCode));
            axios({
              method: "POST",
              url: "http://192.168.100.15:8000/api/v1/account/phone-verification/",
              headers: {
                "content-type": "application/json",
              },
              data: bodyFormData,
              withCredentials: true,
            })
              .then((response) => {
                console.log(response);
                this.dialog = false;
                this.$router.push({ name: "ParentsDetails" });
                // this.$cookies.set("userToken", response.data.access_token);
                // this.$cookies.set('userEntered', true);
                // this.$router.push({ path: "/home" });
              })
              .catch((err) => {
                console.log(err);
                this.$swal("مشکلی پیش آمد!", err.message, "error");
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
  height: 100%;
}
.mainLogSignBody {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
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
}
.childBtn:hover {
  border: none;
  color: white !important;
  background-color: #f68100;
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