<template>
  <v-locale-provider style="font-family: danaRegular !important;" rtl>
    <v-app-bar class="mainBar" block :elevation="1" scroll-threshold="0">
      <div class="contentBar">
        <!-- notification bell -->
        <div class="adminProfilePart">
          <v-menu>
            <template v-slot:activator="{ props }">
              <div class="notifPart" v-bind="props">
                <span class="notifNum"> 0 </span>
                <v-icon size="large" color="#525355" icon="mdi-bell-outline"></v-icon>
              </div>
            </template>
            <v-list style="width: 200px;">
              <v-list-item v-for="(item, index) in items_2" :key="index" :value="index">
                <v-list-item-title>
                  <p style="font-family: danaRegular !important;">
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
              length="40"
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
                <v-icon size="x-large" color="#525355" icon="mdi-chevron-down"></v-icon>
              </div>
            </template>
            <v-list>
              <v-list-item
              class="profileItems"
              v-for="(item, index) in items" :key="index"
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
        </div>
      </div>
    </v-app-bar>
  </v-locale-provider>
</template>
<script>
import axios from "./../axios.js";

export default {
  emits: ['admin-rerender-drawer'],
  data: () => ({
    currentUserName: null,
    items: [
      {
        id: 1,
        title: "خروج از حساب",
        icon: 'mdi-logout-variant',
      },
    ],
    items_2: [
      { title: "موردی یافت نشد" },
    ],
  }),
  created() {
    this.currentUserName = this.$cookies.get('currentUserName');
    this.currentUserRole = this.$cookies.get('currentUserRole');
  },
  methods: {
    goToItem(id) {
      if (id == 1) {
        var bodyFormData = new FormData();
        JSON.stringify(bodyFormData.append("token", this.$cookies.get("userRefreshToken")));
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
              this.$router.push({ name: "SignupLogin" });
            } else if (response.status == 401 || response.status == 403) {
              this.$cookies.set("userEntered", false);
              this.$cookies.set("adminEntered", false);
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
              this.$router.push({ name: "SignupLogin" });
              this.$swal("مشکلی پیش آمد!", err.message, "error");
              this.verificationBtnLoading = false;
            }
          });
      }
    }
  },
}
</script>
<style scoped>
.mainBar {
  width: 80% !important;
}
.contentBar {
  width: 100% !important;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.adminProfilePart {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 40px !important;
  height: 100%;
}
.notifPart {
  cursor: pointer;
}
.notifNum {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  color: white;
  font-size: 10px;
  text-align: center;
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
.userPart {
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