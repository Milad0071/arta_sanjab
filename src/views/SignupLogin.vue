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
          <v-card id="userLoginPart" class="loginPartContainer">
            <div class="titlePart">
              <div class="titleShape"></div>
              <h2>ورود/ثبت‌نام</h2>
            </div>
            <div class="mainBox flex_class">
              <!-- login/signupl part -->
              <div v-if="loginPart == true" class="flex_column_class">
                <div class="input_part">
                  <p class="loginText">برای ورود یا ثبت‌نام، لطفا شماره تلفن همراه خود را وارد نمایید:</p>
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
                    color="#525355"
                    class="text-none childBtn"
                    size="large"
                    min-width="200"
                    variant="outlined"
                    @click="signupFunc(
                        userPhoneNumber,
                      )"
                  >
                    ورود/ثبت‌نام
                  </v-btn>
                </div>
              </div>
              
            </div>
          </v-card>
          <v-card id="adminLoginPart" class="loginPartContainer">
            <div class="mainBox">
              <div >
                <div class="input_part">
                  <p>آدرس ایمیل</p>
                  <input
                    class="input_1"
                    type="text"
                    placeholder="ایمیل خود را وارد کنید"
                    v-model="userLastName"
                    @blur="validateEmail"
                    autocomplete="off"
                  />
                  <p
                    v-if="emailError == true"
                    style="color: red; font-weight: fold"
                  >
                    آدرس ایمیل معتبر نیست
                  </p>
                </div>
                <div class="input_part">
                  <p>نام کاربری</p>
                  <input
                    class="input_1"
                    type="text"
                    placeholder="نام کاربری را وارد کنید"
                    v-model="userName"
                    autocomplete="off"
                  />
                  <p
                    v-if="userError == true"
                    style="color: red; font-weight: fold"
                  >
                    نام کاربری نباید خالی باشد!
                  </p>
                </div>
                <div class="input_part mb-5">
                  <p>رمز عبور</p>
                  <input
                    class="input_1"
                    type="text"
                    placeholder="رمز عبور خود را وارد کنید"
                    v-model="userPass"
                    autocomplete="off"
                  />
                  <p
                    v-if="passError == true"
                    style="color: red; font-weight: fold"
                  >
                    رمز عبور نباید خالی باشد!
                  </p>
                </div>
                <div class="flex_class mobileLoginPhoneBtn">
                  <div
                    v-if="spinner === false"
                    @click="logninFunc(userLastName, userName, userPass)"
                  >
                    ورود
                  </div>
                  <easy-spinner v-else color="green" size="50px" />
                </div>
              </div>
            </div>
          </v-card>
        </div>
      </div>
    </v-locale-provider>
  </v-app>
</template>
<script>
// import axios from "axios";

export default {
  data() {
    return {
      userPhoneNum: '',
      userPhoneNumError: false,
      loginPart: true,
      spinner: false,
      signupList: [],
    };
  },
  created() {
    this.spinner = false;
  },
  mounted() {
    document.getElementById("userLoginBtn").style.color = "white";
    document.getElementById("userLoginBtn").style.backgroundColor = "#f68100";
    document.getElementById("userLoginBtn").style.fontWeight = "bold";
    document.getElementById("userLoginPart").style.display = "block";
    document.getElementById("adminLoginPart").style.display = "none";
    // this.$cookies.set("test", "hi");
  },
  watch: {
    userPhoneNum(newVal) {
      this.userPhoneNum = this.toFarsiNumber(newVal);
      if (newVal.length > 0) {
        this.userPhoneNumError = false;
      }
    },
    userPass(newVal) {
      if (newVal.length > 0) {
        this.passError = false;
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
    goToUserForm() {
      document.getElementById("userLoginPart").style.display = "block";
      document.getElementById("adminLoginPart").style.display = "none";
      document.getElementById("userLoginBtn").style.color = "white";
      document.getElementById("userLoginBtn").style.backgroundColor = "#1abc9c";
      document.getElementById("userLoginBtn").style.fontWeight = "bold";
      document.getElementById("adminLoginBtn").style.color = "#1abc9c";
      document.getElementById("adminLoginBtn").style.backgroundColor = "white";
      document.getElementById("adminLoginBtn").style.fontWeight = "";
      
    },
    goToAdminForm() {
      // document.getElementById("userLoginPart").style.display = "none";
      // document.getElementById("adminLoginPart").style.display = "block";
      // document.getElementById("adminLoginBtn").style.color = "white";
      // document.getElementById("adminLoginBtn").style.backgroundColor = "#1abc9c";
      // document.getElementById("adminLoginBtn").style.fontWeight = "bold";
      // document.getElementById("userLoginBtn").style.color = "#1abc9c";
      // document.getElementById("userLoginBtn").style.backgroundColor = "white";
      // document.getElementById("userLoginBtn").style.fontWeight = "";
      this.$swal("در دست توسعه", "", "info");
    },
    goToLogin() {
      this.userLastName = null;
      this.userPass = null;
      this.loginPart = true;
    },
    // emptyCheck(userName, userPass) {
    //   if (userName == null || userName == "") {
    //     this.userError = true;
    //   }
    //   if (userPass == null || userPass == "") {
    //     this.passError = true;
    //   }
    //   if (
    //     userName == null ||
    //     userName == "" ||
    //     userPass == null ||
    //     userPass == ""
    //   ) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // },
    logninFunc(userLastName, userName, userPass) {
        this.spinner = true;
        if (this.emptyCheck(userName, userPass) === true) {
            // var bodyFormData = new FormData();
            // bodyFormData.append("username", JSON.stringify(userName));
            // bodyFormData.append("email", JSON.stringify(userLastName));
            // bodyFormData.append("password", JSON.stringify(userPass));

            // bodyFormData.append("username", userName);
            // bodyFormData.append("email", userLastName);
            // bodyFormData.append("password", userPass);

            var bodyObj = {
                username: userName,
                email: userLastName,
                password: userPass
            }
            console.log(JSON.stringify(bodyObj))

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyObj)
            };
            fetch("http://192.168.100.15:8000/api/v1/account/login/", requestOptions)
                .then(async response => {
                    const data = await response.json();
                    console.log(data)
                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        console.log(error)
                        // return Promise.reject(error);
                    }
                })
                .catch(error => {
                    console.log(error)
                });


            //     axios({
            //       method: "POST",
            //       url: "http://192.168.100.15:8000/api/v1/account/login/",
            //       header: "application/json",
            //       data: JSON.stringify(bodyObj),
            //     })
            //       .then((response) => {
            //         console.log(response);
            //         this.$cookies.set("userToken", response.data.access_token);
            //         // this.$cookies.set('userEntered', true);
            //         this.spinner = false;
            //         this.$router.push({ path: "/home" });
            //       })
            //       .catch((err) => {
            //         this.spinner = false;
            //         console.log(err);
            //         this.$swal("مشکلی پیش آمد!", err.message, "error");
            //       });
            //   } else {
            //     this.spinner = false;
            //   }
        }
    },
    signupFunc(name, lastName, nCode, phoneNum) {
      // if (this.emptyCheck2(name, lastName, fatherName, nCode, birthDay, telephone, phoneNum, address, region, pCode, job, girls, boys) == true) {

      // }

        var bodyObj = {
                first_name: name,
                last_name: lastName,
                national_code: nCode,
                phone_number: phoneNum,
            }
            console.log(JSON.stringify(bodyObj))

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyObj)
            };
            fetch("http://192.168.100.15:8000/api/v1/account/parent-register/", requestOptions)
                .then(async response => {
                    const data = await response.json();
                    console.log(data)
                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        console.log(error)
                        // return Promise.reject(error);
                    }
                })
                .catch(error => {
                    console.log(error)
                });





      // console.log(typeof phoneNum, typeof phoneNum)
      // var bodyFormData = new FormData();
      // JSON.stringify(bodyFormData.append("first_name", name));
      // JSON.stringify(bodyFormData.append("last_name", lastName));
      // bodyFormData.append("father_name", fatherName);
      // JSON.stringify(bodyFormData.append("national_code", nCode));
      // // bodyFormData.append("birth_date", birthDay);
      // bodyFormData.append("education", education);
      // bodyFormData.append("field_study", studyField);
      // bodyFormData.append("telephone", telephone);
      // JSON.stringify(bodyFormData.append("phone_number", phoneNum));
      // bodyFormData.append("address", address);
      // // bodyFormData.append("Regional_Municipality", region);
      // bodyFormData.append("postal_code", pCode);
      // bodyFormData.append("job", job);
      // bodyFormData.append("office_address", jobAddress);
      // // bodyFormData.append("girls", girls);
      // // bodyFormData.append("boys", boys);
      //   axios({
      //     method: "POST",
      //     headers: { 'Content-Type': 'application/json' },
      //     url: "http://192.168.100.15:8000/api/v1/account/parent-register/",
      //     data: bodyFormData,
      //   })
      //     .then((response) => {
      //       console.log(response)
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //       this.$alert(err.response.data.message, "", "error");
      //     });
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
  margin-bottom: 100px;
}
.loginPartContainer {
  width: 40%;
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
}
.btnContainer {
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
  width: 40%;
  margin-top: 6%;
}
.childBtn:hover {
  border: none;
  color: white !important;
  background-color: #f68100;
  font-weight: bold;
}
.mobileLoginPhoneBtn {
  align-content: center;
  width: 100%;
}
.mobileLoginPhoneBtn div {
  width: 80% !important;
  text-align: center;
  border: none;
  border-radius: 5px;
  height: 5vh;
  font-family: "IranSans Regular";
  background: #1abc9c;
  color: rgb(217, 213, 213);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-bottom: 2rem;
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
}
.userAdminFormBtn div {
  font-size: 20px;
  width: 20rem !important;
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
  font-size: 18px;

}
.vpd-container {
  left: 80% !important;
}
.v-field--variant-underlined .v-label.v-field-label, .v-field--variant-plain .v-label.v-field-label {
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
</style>