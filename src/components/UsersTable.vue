<template>
  <v-app style="font-family: danaRegular !important">
    <v-table class="tableClass" density="compact">
      <thead>
        <tr>
          <th class="text-right font-weight-bold">ردیف</th>
          <th class="text-right font-weight-bold">نام</th>
          <th class="text-right font-weight-bold">نام خانوادگی</th>
          <th class="text-right font-weight-bold">کد ملی</th>
          <th class="text-right font-weight-bold">شماره تماس</th>
          <th class="text-right font-weight-bold">نوع کاربری</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody v-if="hasUserBoolean == true">
        <tr
          v-if="searchList.length > 0"
          v-for="(item, index) in searchList"
          :key="index"
        >
          <td>{{ this.toFarsiNumber(index + 1) }}</td>
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>{{ item.national_code }}</td>
          <td>{{ item.phone_number }}</td>
          <td>{{ item.type }}</td>
          <td>
            <div class="flex_class" style="justify-content: flex-start">
              <!-- see details icon -->
              <v-tooltip text="مشاهده جزئیات" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    class="text-none submitBtn"
                    size="medium"
                    min-width="20"
                    variant="outlined"
                    @click="openDialog(1, item.national_code)"
                  >
                    <v-icon
                      class="iconCol"
                      size="large"
                      color="#373739"
                      icon="mdi-eye"
                    ></v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <!-- edit icon -->
              <v-tooltip text="ویرایش اطلاعات کاربر" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    class="text-none submitBtn mr-2"
                    size="medium"
                    min-width="20"
                    variant="outlined"
                    @click="openDialog(2, item.national_code)"
                  >
                    <v-icon
                      class="iconCol"
                      size="large"
                      color="#373739"
                      icon="mdi-pencil"
                    ></v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </div>
          </td>
        </tr>
        <div v-else class="text-center">
          <p>کاربری یافت نشد!</p>
        </div>
      </tbody>
      <div v-else class="text-center">
        <p>کاربری وجود ندارد!</p>
      </div>
    </v-table>
    <!-- user details dialog -->
    <v-dialog
      v-model="openUserDetailsDialog"
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
          <h2>اطلاعات کاربر</h2>
        </div>
        <!-- inputs section -->
        <!-- <div class="py-12 px-8 inputContainer"></div> -->
        <div class="inputContainer">
          <div class="input_part">
            <!-- user name -->
            <v-text-field
              label="نام"
              class="input_1"
              placeholder="نام خود را وارد کنید"
              variant="plain"
              :disabled="inputSituation"
              v-on:keydown="stopEnglishChars($event)"
              v-model="userName"
            >
            </v-text-field>
          </div>
          <div class="input_part">
            <!-- user last name -->
            <v-text-field
              label="نام خانوادگی"
              class="input_1"
              variant="plain"
              placeholder="نام خانوادگی خود را وارد کنید"
              :disabled="inputSituation"
              v-on:keydown="stopEnglishChars($event)"
              v-model="userLastName"
            >
            </v-text-field>
          </div>
          <div class="input_part">
            <!-- child national code -->
            <v-text-field
              label="کد ملی"
              class="ltrClass input_1"
              reverse
              variant="plain"
              placeholder="کد ملی خود را وارد کنید"
              :disabled="inputSituation"
              v-on:keydown="stopAllChars($event)"
              v-model="userNationalCode"
            >
            </v-text-field>
          </div>
          <div class="input_part">
            <!-- child birth day -->
            <DatePicker
              format="jYYYY/jMM/jDD"
              simple
              class="datePickerClass"
              label="تاریخ تولد"
              :disabled="inputSituation"
              placeholder="1370/01/01"
              v-model="userBirthDay"
            />
          </div>
          <div class="input_part">
            <!-- user phone number -->
            <v-text-field
              label="شماره همراه"
              class="input_1"
              variant="plain"
              placeholder="شماره همراه را وارد نمایید"
              :disabled="inputSituation"
              v-model="userPhoneNum"
            >
            </v-text-field>
          </div>
          <div class="input_part">
            <!-- user ralativity -->
            <v-select
              :items="userReletivesList"
              density="comfortable"
              class="input_1"
              variant="plain"
              label="نسبت"
              placeholder="نسبت خود با کودک را مشخص نمایید"
              item-text="title"
              item-value="value"
              :disabled="inputSituation"
              v-model="userRelativity"
            ></v-select>
          </div>
          <div class="input_part">
            <!-- user father's name -->
            <v-text-field
              label="نام پدر"
              class="input_1"
              variant="plain"
              placeholder="نام پدر کاربر را وارد کنید"
              :disabled="inputSituation"
              v-on:keydown="stopEnglishChars($event)"
              v-model="userFatherName"
            >
            </v-text-field>
          </div>
          <div class="input_part">
            <!-- user education -->
            <v-text-field
              label="تحصیلات"
              class="input_1"
              variant="plain"
              placeholder="تحصیلات را وارد کنید"
              :disabled="inputSituation"
              v-on:keydown="stopEnglishChars($event)"
              v-model="userEdjucation"
            >
            </v-text-field>
          </div>
          <div class="input_part">
            <!-- user field study -->
            <v-text-field
              label="رشته تحصیلی"
              class="input_1"
              variant="plain"
              placeholder="رشته تحصیلی کاربر را وارد کنید"
              :disabled="inputSituation"
              v-on:keydown="stopEnglishChars($event)"
              v-model="userFieldStudy"
            >
            </v-text-field>
          </div>
          <div class="input_part">
            <!-- user address -->
            <v-textarea
              class="textareaClass"
              clearable
              clear-icon="mdi-close-circle"
              label="آدرس محل سکونت را وارد کنید:"
              rows="2"
              hide-details
              variant="plain"
              :disabled="inputSituation"
              v-on:keydown="stopEnglishChars($event)"
              v-model="userAddress"
            ></v-textarea>
          </div>
          <div class="input_part">
            <!-- RegionalMunicipality field -->
            <v-text-field
              label="منطقه"
              class="input_1"
              variant="plain"
              placeholder="منطقه شهرداری را وارد کنید"
              :disabled="inputSituation"
              v-model="userRegionalMunicipality"
            >
            </v-text-field>
          </div>
          <div class="input_part">
            <!-- postal code -->
            <v-text-field
              label="کد پستی"
              class="input_1"
              variant="plain"
              placeholder="کد پستی را وارد کنید"
              :disabled="inputSituation"
              v-model="userPostalCode"
            >
            </v-text-field>
          </div>
          <div class="input_part">
            <!-- telephone -->
            <v-text-field
              label="تلفن ثابت"
              class="input_1"
              variant="plain"
              placeholder="شماره تلفن ثابت را وارد کنید"
              :disabled="inputSituation"
              v-model="userTelephone"
            >
            </v-text-field>
          </div>
          <div class="input_part">
            <!-- job -->
            <v-text-field
              label="شغل"
              class="input_1"
              variant="plain"
              placeholder="شغل را وارد کنید"
              :disabled="inputSituation"
              v-on:keydown="stopEnglishChars($event)"
              v-model="userJob"
            >
            </v-text-field>
          </div>
          <div class="input_part">
            <!-- boys -->
            <v-text-field
              label="تعداد فرزند پسر"
              class="input_1"
              variant="plain"
              placeholder="تعداد فرزندان پسر را وارد کنید"
              :disabled="inputSituation"
              v-model="userBoys"
            >
            </v-text-field>
          </div>
          <div class="input_part">
            <!-- girls -->
            <v-text-field
              label="تعداد فرزند دختر"
              class="input_1"
              variant="plain"
              placeholder="تعداد فرزندان دختر را وارد کنید"
              :disabled="inputSituation"
              v-model="userGirls"
            >
            </v-text-field>
          </div>
        </div>
        <!-- dialog buttons section -->
        <div class="btnContainer flex_class">
          <v-btn
            v-if="show == true"
            color="#525355"
            class="text-none editBtn"
            style="margin-top: -8%"
            size="large"
            min-width="200"
            variant="outlined"
            @click="editDetails()"
          >
            اعمال تغییرات
          </v-btn>
          <v-btn
            v-if="show == false"
            color="#525355"
            class="text-none closeBtn mr-3"
            style="margin-top: -8%"
            size="large"
            min-width="200"
            variant="outlined"
            @click="closeFunc()"
          >
            بازگشت
          </v-btn>
          <v-btn
            v-else
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
  </v-app>
</template>
<script>
import axios from "./../axios.js";
import DatePicker from "vue3-persian-datetime-picker";

export default {
  emits: ["clicked"],
  props: { users: Array, hasUser: Boolean, search: String, filter: Number },
  components: { DatePicker },
  data: () => {
    return {
      userData: [],
      firstData: [],
      updateData: [],
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
      usersArray: null,
      hasUserBoolean: null,
      show: true,
      inputSituation: false,
      openUserDetailsDialog: false,
      userName: "",
      userLastName: "",
      userNationalCode: "",
      firstUserNationalCode: "",
      userBirthDay: "",
      userPhoneNum: "",
      userRelativity: "",
      userFatherName: "",
      userEdjucation: "",
      userFieldStudy: "",
      userAddress: "",
      userRegionalMunicipality: "",
      userPostalCode: "",
      userTelephone: "",
      userJob: "",
      userBoys: "0",
      userGirls: "0",
    };
  },
  computed: {
    searchList() {
      console.log(this.search);
      console.log(this.filter);
      if (this.search) {
        return this.usersArray.filter((item) => {
          if (this.filter == 1) {
            return (
              item.first_name.includes(this.search) ||
              item.last_name.includes(this.search) ||
              item.national_code.includes(this.search) ||
              item.phone_number.includes(this.search)
            );
          } else if (this.filter == 2) {
            return (
              (item.first_name.includes(this.search) ||
                item.last_name.includes(this.search) ||
                item.national_code.includes(this.search) ||
                item.phone_number.includes(this.search)) &&
              item.type.includes("مدیر")
            );
          } else if (this.filter == 3) {
            return (
              (item.first_name.includes(this.search) ||
                item.last_name.includes(this.search) ||
                item.national_code.includes(this.search) ||
                item.phone_number.includes(this.search)) &&
              item.type.includes("کاربر")
            );
          }
        });
      } else {
        console.log(this.filter);
        if (this.filter == 2) {
          return this.usersArray.filter((item) => {
            return item.type.includes("مدیر");
          });
        } else if (this.filter == 3) {
          return this.usersArray.filter((item) => {
            return item.type.includes("کاربر");
          });
        } else {
          return this.usersArray;
        }
      }
    },
    filterList() {
      if (this.filter) {
        return this.usersArray.filter((item) => {
          return item.type.includes(this.filter);
        });
      } else {
        return this.usersArray;
      }
    },
  },
  created() {
    this.getData();
  },
  methods: {
    toFarsiNumber(n) {
      // n = parseInt(n);
      if (n != null) {
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
    getData() {
      this.usersArray = this.users;
      console.log(this.usersArray);
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
        if (this.usersArray[i].type == 1 || this.usersArray[i].type == 2) {
          this.usersArray[i].type = "کاربر";
        } else if (this.usersArray[i].type == 3) {
          this.usersArray[i].type = "مدیر";
        } else if (this.usersArray[i].type == 4) {
          this.usersArray[i].type = "مدیر ارشد";
        }
      }
    },
    getUserData(nCode) {
      nCode = this.toEnglishNumber(nCode);
      console.log(nCode);
      axios({
        method: "GET",
        url: `admin-dashboard/user/${nCode}`,
        header: "application/json",
        headers: {
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response);
          this.userData = response.data;
          if (this.userData.type != 3 && this.userData.type != 4) {
            if (this.userData.type == 1) {
              this.userData.type = "پدر";
            } else if (this.userData.type == 2) {
              this.userData.type = "مادر";
            }

            if (this.userData.children[0].type == 1) {
              this.userData.children[0].type = "۴-۷ سال";
            } else if (this.userData.children[0].type == 2) {
              this.userData.children[0].type = "۸-۱۱ سال";
            } else if (this.userData[0].children.type == 3) {
              this.userData.children[0].type = "۱۲-۱۵ سال";
            }
            this.userData.national_code = this.toFarsiNumber(
              this.userData.national_code
            );
            this.userData.phone_number = this.toFarsiNumber(
              this.userData.phone_number
            );
            this.userData.children[0].birth_date = this.toFarsiNumber(
              this.userData.children[0].birth_date
            );
            this.userData.children[0].grade = this.toFarsiNumber(
              this.userData.children[0].grade
            );
            this.userData.children[0].national_code = this.toFarsiNumber(
              this.userData.children[0].national_code
            );
            this.userData.children[0].parent = this.toFarsiNumber(
              this.userData.children[0].parent
            );
            this.userData.user_profile.Regional_Municipality =
              this.toFarsiNumber(
                this.userData.user_profile.Regional_Municipality
              );
            this.userData.user_profile.address = this.toFarsiNumber(
              this.userData.user_profile.address
            );
            this.userData.user_profile.birth_date = this.toFarsiNumber(
              this.userData.user_profile.birth_date
            );
            this.userData.user_profile.boys = this.toFarsiNumber(
              this.userData.user_profile.boys
            );
            this.userData.user_profile.girls = this.toFarsiNumber(
              this.userData.user_profile.girls
            );
            this.userData.user_profile.postal_code = this.toFarsiNumber(
              this.userData.user_profile.postal_code
            );
            this.userData.user_profile.telephone = this.toFarsiNumber(
              this.userData.user_profile.telephone
            );
          } else {
            if (this.userData.type == 3) {
              this.userData.type = "مدیر";
            } else if (this.userData.type == 4) {
              this.userData.type = "مدیر ارشد";
            }
          }
          this.insertData();
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
    openDialog(type, nCode) {
      nCode = this.toEnglishNumber(nCode);
      console.log(typeof nCode);
      this.openUserDetailsDialog = true;
      this.getUserData(nCode);
      this.changeEditability(type);
    },
    changeEditability(type) {
      if (type == 1 || type == "1") {
        console.log("1");
        this.inputSituation = true;
        this.show = false;
      } else if (type == 2 || type == "2") {
        console.log("2");
        this.inputSituation = false;
        this.show = true;
      }
    },
    insertData() {
      console.log(this.userData);
      this.userName = this.userData.first_name;
      this.userLastName = this.userData.last_name;
      this.userNationalCode = this.userData.national_code;
      this.firstUserNationalCode = this.userData.national_code;
      this.userPhoneNum = this.userData.phone_number;
      this.userBirthDay = this.userData.user_profile.birth_date;
      this.userRelativity = this.userData.type;
      this.userFatherName = this.userData.user_profile.father_name;
      this.userEdjucation = this.userData.user_profile.education;
      this.userFieldStudy = this.userData.user_profile.field_study;
      this.userAddress = this.userData.user_profile.address;
      this.userRegionalMunicipality =
        this.userData.user_profile.Regional_Municipality;
      this.userPostalCode = this.userData.user_profile.postal_code;
      this.userTelephone = this.userData.user_profile.telephone;
      this.userJob = this.userData.user_profile.job;
      this.userBoys = this.userData.user_profile.boys;
      this.userGirls = this.userData.user_profile.girls;
      this.firstData.push(
        {
          name: "first_name",
          value: this.userData.first_name,
        },
        {
          name: "last_name",
          value: this.userData.last_name,
        },
        {
          name: "national_code",
          value: this.userData.national_code,
        },
        {
          name: "type",
          value: this.userData.type,
        },
        {
          name: "father_name",
          value: this.userData.user_profile.father_name,
        },
        {
          name: "education",
          value: this.userData.user_profile.education,
        },
        {
          name: "field_study",
          value: this.userData.user_profile.field_study,
        },
        {
          name: "address",
          value: this.userData.user_profile.address,
        },
        {
          name: "Regional_Municipality",
          value: this.userData.user_profile.Regional_Municipality,
        },
        {
          name: "postal_code",
          value: this.userData.user_profile.postal_code,
        },
        {
          name: "telephone",
          value: this.userData.user_profile.telephone,
        },
        {
          name: "job",
          value: this.userData.user_profile.job,
        },
        {
          name: "boys",
          value: this.userData.user_profile.boys,
        },
        {
          name: "girls",
          value: this.userData.user_profile.girls,
        },
        {
          name: "phone_number",
          value: this.userData.phone_number,
        }
      );
    },
    editDetails() {
      this.updateData.push(
        {
          name: "first_name",
          value: this.userName,
        },
        {
          name: "last_name",
          value: this.userLastName,
        },
        {
          name: "national_code",
          value: this.userNationalCode,
        },
        {
          name: "type",
          value: this.userRelativity,
        },
        {
          name: "father_name",
          value: this.userFatherName,
        },
        {
          name: "education",
          value: this.userEdjucation,
        },
        {
          name: "field_study",
          value: this.userFieldStudy,
        },
        {
          name: "address",
          value: this.userAddress,
        },
        {
          name: "Regional_Municipality",
          value: this.userRegionalMunicipality,
        },
        {
          name: "postal_code",
          value: this.userPostalCode,
        },
        {
          name: "telephone",
          value: this.userTelephone,
        },
        {
          name: "job",
          value: this.userJob,
        },
        {
          name: "boys",
          value: this.userBoys,
        },
        {
          name: "girls",
          value: this.userGirls,
        },
        {
          name: "phone_number",
          value: this.userPhoneNum,
        }
      );
      var data = {};
      for (let i = 0; i < this.updateData.length; i++) {
        if (this.updateData[i].name == this.firstData[i].name) {
          if (this.updateData[i].value !== this.firstData[i].value) {
            data[this.updateData[i].name] = this.updateData[i].value;
          }
        }
      }
      if (data.length != 0) {
        axios({
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          },
          url: `admin-dashboard/user/${this.firstUserNationalCode}/`,
          data: JSON.stringify(data),
        })
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              this.closeFunc();
            } else {
              this.$swal("مشکلی پیش آمد!", "", "error");
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
      } else {
        this.closeFunc();
      }
    },
    closeFunc() {
      this.openUserDetailsDialog = false;
      this.userName = "";
      this.userLastName = "";
      this.userNationalCode = "";
      this.userPhoneNum = "";
      this.userBirthDay = "";
      this.userRelativity = "";
      this.userFatherName = "";
      this.userEdjucation = "";
      this.userFieldStudy = "";
      this.userAddress = "";
      this.userRegionalMunicipality = "";
      this.userPostalCode = "";
      this.userTelephone = "";
      this.userJob = "";
      this.userBoys = "";
      this.userGirls = "";
      this.updateData = [];
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
  margin-top: 3%;
}
.submitBtn {
  font-weight: bold;
  color: #373739 !important;
  width: 26%;
}
.submitBtn:hover {
  border: none;
  color: white !important;
  background-color: white;
  font-weight: bold;
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
.detailsCard {
  width: 150vh;
}
.titlePart {
  display: flex;
  margin-top: 10px;
  font-family: danaRegular !important;
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
  grid-template-columns: repeat(3, minmax(350px, 1fr));
  justify-items: center;
  padding-top: 0%;
  font-family: danaRegular !important;
}
.input_part {
  display: flex;
  flex-direction: column;
  width: 45vh;
  padding: 0% 8%;
  margin-top: 4%;
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
.datePickerClass {
  width: 100% !important;
  min-height: 50px;
  box-shadow: 1px 0px 10px 0px #525355;
  border-radius: 7px;
}
.btnContainer {
  width: 100%;
  margin-top: 12%;
}
.textareaClass {
  border-radius: 7px;
  border: 2px solid white;
  box-shadow: 1px 0px 10px 0px #525355;
}
</style>

<style>
.v-application__wrap {
  min-height: 0% !important;
}
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