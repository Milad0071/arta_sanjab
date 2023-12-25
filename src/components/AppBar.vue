<template>
  <v-locale-provider style="font-family: iranSansRegular !important;" rtl>
    <v-app-bar class="mainBar" block :elevation="1" scroll-threshold="0">
      <div class="contentBar">
        <!-- submit new child BTN -->
        <div class="btnContainer">
          <v-btn
            color="#f68100"
            class="text-none childBtn"
            size="large"
            min-width="200"
            variant="outlined"
            @click="goToAddChild()"
          >
            ثبت فرزند
          </v-btn>
        </div>
        <!-- notification bell -->
        <div class="userProfilePart">
          <v-menu>
            <template v-slot:activator="{ props }">
              <div class="notifPart" v-bind="props">
                <span class="notifNum"> 9 </span>
                <v-icon size="large" color="#525355" icon="mdi-bell-outline"></v-icon>
              </div>
            </template>
            <v-list style="width: 200px;">
              <v-list-item v-for="(item, index) in items_2" :key="index" :value="index">
                <v-list-item-title>
                  <p style="font-family: iranSansRegular !important;">
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
                  style="width: 70px !important"
                  class="ml-2 mr-5 space-y-0.5 text-right"
                >
                  <p class="topText">مهمان</p>
                  <p class="bottomText">کاربر مهمان</p>
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
export default {
  emits: ['rerender-drawer'],
  data: () => ({
    admin: false,
    items: [
      {
        id: 1,
        title: "تکمیل اطلاعات والدین",
        icon: 'mdi-account-details-outline',
      },
      {
        id: 2,
        title: "خرید دوره",
        icon: 'mdi-basket-plus-outline',
      },
      {
        id: 3,
        title: "خروج از حساب کاربری",
        icon: 'mdi-logout',
      },

    ],
    items_2: [
      { title: "Click Me 5" },
      { title: "Click Me 6" },
      { title: "Click Me 7" },
      { title: "Click Me 8" },
    ],
  }),
  created() {
    if (this.$cookies.set('admin')) {
      this.admin = true;
    }
  },
  methods: {
    goToAddChild() {
      this.$emit("rerender-drawer", 1);
      this.$cookies.remove('addChildActive');
      this.$cookies.remove('parentsDetailsActive');
      this.$router.push({ name: "AddChild" });
    },
    goToItem(id) {
      if (id == 1) {
        this.$emit("rerender-drawer", 2);
        this.$cookies.remove('addChildActive');
        this.$cookies.remove('parentsDetailsActive');
        this.$router.push({ name: "ParentsDetails" });
      } else if (id == 2) {
        this.$emit("rerender-drawer", 3);
        this.$cookies.remove('addChildActive');
        this.$cookies.remove('parentsDetailsActive');
        this.$cookies.remove('coursesShopActive');
        this.$router.push({ name: "courseShop" });
      } else if (id == 3) {
        if (this.admin == true) {
          this.admin = false;
          this.$cookies.remove('admin');
        }
        this.$router.push({ name: "SignupLogin" });
      }
    }
  },
};
</script>
<style scoped>
.mainBar {
  width: 80% !important;
}
.contentBar {
  width: 100% !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btnContainer {
  width: 100%;
  display: flex;
  justify-content: center;
}
.childBtn {
  font-weight: bold;
  color: #f68100;
}
.childBtn:hover {
  border: none;
  color: white !important;
  background-color: #f68100;
  font-weight: bold;
}
.userProfilePart {
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
<style>
@font-face {
    font-family: iranSansRegular;
    src: url('./../assets/fonts/IRANSansX-Regular.ttf');
}
.v-menu > .v-overlay__content > .v-card, .v-menu > .v-overlay__content > .v-sheet, .v-menu > .v-overlay__content > .v-list {
  font-family: iranSansRegular !important;
}
.v-list-item-title {
  font-size: 14px !important;
}
</style>
