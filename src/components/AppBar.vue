<template>
  <v-locale-provider style="font-family: danaRegular !important" rtl>
    <v-app-bar class="mainBar" block :elevation="0" scroll-threshold="0">
      <div class="contentBar">
        <div class="welcomePart">
          <div v-if="this.currentUserName" class="welcomeNote">
            <h3>{{ this.currentUserName }} عزیز، خوش اومدی!</h3>
          </div>
          <div v-else class="welcomeNote">
            <h3>مهمان عزیز، خوش اومدی!</h3>
          </div>
          <div class="datePart" dir="auto">
            <p>{{ this.todayDate }}</p>
          </div>
        </div>
        <div class="userProfilePart">
          <v-menu>
            <template v-slot:activator="{ props }">
              <!-- icons part -->
              <div class="flex_class" v-bind="props">
                <div class="iconPart">
                  <span class="iconNum"> 0 </span>
                  <CartIcon style="width: 35px" />
                </div>
                <div class="iconPart">
                  <span class="iconNum"> 0 </span>
                  <NotificationBellIcon style="width: 35px" />
                </div>
              </div>
            </template>
            <v-list style="width: 200px">
              <v-list-item
                v-for="(item, index) in items_2"
                :key="index"
                :value="index"
              >
                <v-list-item-title>
                  <p style="font-family: danaRegular !important">
                    {{ item.title }}
                  </p>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- divider -->
          <div class="dividerContainer">
            <v-divider
              class="dividerClass"
              length="60"
              color="#525355"
              :thickness="2"
              vertical
            ></v-divider>
          </div>

          <!-- user profile -->
          <v-menu>
            <template v-slot:activator="{ props }">
              <div class="userPart" v-bind="props">
                <v-avatar class="mr-1">
                  <v-img src="./../assets/newUser.png" alt="newUser"></v-img>
                </v-avatar>
                <div
                  v-if="currentUserName == null"
                  style="width: 150px !important"
                  class="ml-2 mr-5 space-y-0.5 text-right"
                >
                  <p class="topText">مهمان</p>
                  <p class="bottomText">کاربر مهمان</p>
                </div>
                <div
                  v-else
                  style="width: 150px !important"
                  class="ml-2 mr-5 space-y-0.5 text-right"
                >
                  <p class="topText">{{ this.currentUserName }}</p>
                  <p class="bottomText">{{ this.currentUserRole }}</p>
                </div>
                <v-icon
                  size="x-large"
                  color="#525355"
                  icon="mdi-chevron-down"
                ></v-icon>
              </div>
            </template>
            <v-list>
              <v-list-item
                class="profileItems"
                v-for="(item, index) in items"
                :key="index"
                :value="index"
                @click="goToItem(item.id)"
              >
                <template v-slot:prepend>
                  <v-icon :icon="item.icon"></v-icon>
                </template>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- change role button -->
          <v-btn
            color="#525355"
            class="text-none changeRoleBtn"
            size="large"
            min-width="200"
            variant="outlined"
            @click="showModalFunc()"
          >
            تغییر نقش
          </v-btn>
        </div>
      </div>
    </v-app-bar>
  </v-locale-provider>
</template>

<script>
import axios from "./../axios.js";
import NotificationBellIcon from "./../assets/svgIcons/NotificationBellIcon.vue";
import CartIcon from "./../assets/svgIcons/CartIcon.vue";

export default {
  emits: ["user-rerender-drawer", "dialog"],
  components: { NotificationBellIcon, CartIcon },
  data: () => ({
    currentUserName: null,
    currentUserRole: null,
    todayDate: "",
    items: [
      {
        id: 2,
        title: "خرید دوره",
        icon: "mdi-basket-plus-outline",
      },
      {
        id: 3,
        title: "خروج از حساب",
        icon: "mdi-logout-variant",
      },
    ],
    items_2: [{ title: "موردی یافت نشد" }],
  }),
  created() {
    this.currentUserName = this.$cookies.get("currentUserName");
    this.currentUserRole = this.$cookies.get("currentUserRole");
    // this.getData();
    this.setJalaliDate();
  },
  methods: {
    goToItem(id) {
      if (id == 1) {
        this.$emit("user-rerender-drawer", 2);
        this.$cookies.remove("addChildActive");
        this.$cookies.remove("parentsDetailsActive");
        this.$cookies.remove("btnClicked");
        this.$router.push({ name: "ParentsDetails" });
      } else if (id == 2) {
        this.$emit("user-rerender-drawer", 3);
        this.$cookies.remove("addChildActive");
        this.$cookies.remove("parentsDetailsActive");
        this.$cookies.remove("coursesShopActive");
        this.$cookies.remove("btnClicked");
        this.$router.push({ name: "courseShop" });
      } else if (id == 3) {
        var bodyFormData = new FormData();
        JSON.stringify(
          bodyFormData.append("token", this.$cookies.get("userRefreshToken"))
        );
        axios({
          method: "POST",
          url: `account/logout/`,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          },
          data: bodyFormData,
        })
          .then((response) => {
            if (response.status == 200) {
              this.$cookies.remove("addChildActive");
              this.$cookies.remove("parentsDetailsActive");
              this.$cookies.remove("coursesShopActive");
              this.$cookies.remove("userToken");
              this.$cookies.set("userEntered", false);
              this.$cookies.remove("userToken");
              this.$cookies.remove("userRefreshToken");
              this.$cookies.remove("btnClicked");
              this.$cookies.remove("currentUserName");
              this.$cookies.remove("currentUserRole");
              this.$cookies.remove("btnClicked");
              this.$router.push({ name: "SignupLogin" });
            } else if (response.status == 401 || response.status == 403) {
              this.$cookies.set("userEntered", false);
              this.$cookies.set("adminEntered", false);
              this.$cookies.remove("btnClicked");
              this.$cookies.remove("currentUserName");
              this.$cookies.remove("currentUserRole");
              this.$cookies.remove("btnClicked");
              this.$router.push({ name: "SignupLogin" });
              this.$swal("مشکلی پیش آمد!", response.message, "error");
              this.verificationBtnLoading = false;
            } else {
              this.$swal("مشکلی پیش آمد، لطفا مجدد تلاش نمایید!", "error");
              this.verificationBtnLoading = false;
            }
          })
          .catch((err) => {
            if (err.request.status == 401 || err.request.status == 403) {
              this.$cookies.set("userEntered", false);
              this.$cookies.set("adminEntered", false);
              this.$cookies.remove("currentUserName");
              this.$cookies.remove("currentUserRole");
              this.$cookies.remove("btnClicked");
              this.$router.push({ name: "SignupLogin" });
              this.$swal("مشکلی پیش آمد!", err.message, "error");
              this.verificationBtnLoading = false;
            }
          });
      }
    },
    getData(perm) {
      if (perm == 1) {
        axios({
          method: "GET",
          url: `dashboard/?session=${this.$cookies.get("sessionId")}`,
          headers: {
            Authorization: `Bearer ${this.$cookies.get("userToken")}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.status == 200) {
              this.$cookies.set("currentUserName", response.data.first_name);
              this.$cookies.set("currentUserRole", "والد");
              this.$emit("user-rerender-drawer", 3);
              this.$cookies.remove("addChildActive");
              this.$cookies.remove("parentsDetailsActive");
              this.$cookies.remove("coursesShopActive");
              // this.$emit("reset-app");
              this.$cookies.remove("btnClicked");
              this.$router.push({ name: "courseShop" });
            } else {
              this.$swal("مشکلی پیش آمد!", response.message, "error");
            }
          })
          .catch((err) => {
            this.$swal("مشکلی پیش آمد!", err.message, "error");
          });
      } else {
        axios({
          method: "GET",
          url: `dashboard/?session=${this.$cookies.get("sessionId")}`,
          header: "application/json",
          headers: {
            Authorization: `Bearer ${this.$cookies.get("userToken")}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.status == 200) {
              this.$cookies.set("currentUserName", response.data.first_name);
              this.$cookies.set("currentUserRole", "والد");
              this.children = response.data.children;
              for (let i = 0; i < this.children.length; i++) {
                if (this.children[i].type == 1) {
                  this.children[i].type = "۴-۷ سال";
                } else if (this.children[i].type == 2) {
                  this.children[i].type = "۸-۱۱ سال";
                } else {
                  this.children[i].type = "۱۲-۱۵ سال";
                }
              }
            } else {
              if (response.status == 401) {
                this.$cookies.set("userEntered", false);
                this.$cookies.set("adminEntered", false);
                this.$cookies.remove("btnClicked");
                this.$router.push({ name: "SignupLogin" });
                this.$swal(
                  "توکن شما منقضی شده است!",
                  response.message,
                  "error"
                );
              } else {
                this.$swal("مشکلی پیش آمد!", response.message, "error");
              }
            }
          })
          .catch((err) => {
            if (err.response.status == 401) {
              this.$cookies.set("userEntered", false);
              this.$cookies.set("adminEntered", false);
              this.$cookies.remove("btnClicked");
              this.$router.push({ name: "SignupLogin" });
              this.$swal("توکن شما منقضی شده است!", err.message, "error");
            } else {
              this.$swal("مشکلی پیش آمد!", err.message, "error");
            }
          });
      }
    },
    showModalFunc() {
      this.$router.push({ name: "Home" });
      // this.getData();
      this.$emit("dialog", true);
      this.$cookies.set("btnClicked");
    },
    setJalaliDate() {
      const options = {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
      this.todayDate = new Date().toLocaleDateString("fa-IR", options);
    },
  },
};
</script>
<style scoped>
.flex_class {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mainBar {
  width: 80% !important;
  height: 8%;
}
.contentBar {
  width: 100% !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.welcomePart {
  margin-right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.welcomeNote h3 {
  font-weight: 700;
}
.datePart p {
  direction: ltr !important;
  writing-mode: horizontal-tb;
  margin-right: 10px;
  font-weight: 400;
}
.userProfilePart {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 40px !important;
  height: 100%;
}
.iconPart {
  position: relative;
  cursor: pointer;
}
.iconNum {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: #ff9635;
  color: white;
  font-size: 10px;
  text-align: center;
  left: 0px;
  top: 0px !important;
}
.dividerContainer {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dividerClass {
  align-self: center;
  margin-right: 10px;
  margin-left: 10px;
}
.changeRoleBtn {
  font-weight: bold;
  color: white !important;
  background-color: #f68100;
  width: 25%;
  height: 10%;
  border-radius: 12px;
}
.userPart {
  width: 40% !important;
  margin-left: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.topText {
  font-size: 18px;
}
.bottomText {
  font-size: 15px;
  opacity: 0.5;
}
</style>
<style>
@font-face {
  font-family: danaRegular;
  src: url("./assets/fonts/Dana-Regular.ttf");
}
.v-menu > .v-overlay__content > .v-card,
.v-menu > .v-overlay__content > .v-sheet,
.v-menu > .v-overlay__content > .v-list {
  font-family: danaRegular !important;
}
.v-list-item-title {
  font-size: 14px !important;
}
</style>
