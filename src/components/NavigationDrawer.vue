<template>
  <v-locale-provider rtl>
    <v-navigation-drawer
      permanent
      location="right"
      :elevation="0"
      style="
        top: 0 !important;
        width: 20%;
        height: 100% !important;
        border-style: none !important;
      "
    >
      <div class="logoPart">
        <DrawerLogo />
      </div>

      <v-list class="drawerList flex_column_class" density="compact" nav>
        <div class="linksClass">
          <v-list-item
            class="homeItem"
            :active="homeActive"
            value="home"
            @click="goTo(1)"
          >
            <Home id="homeIconTag" style="width: 30px" />
            <p
              id="homeText"
              style="color: #8a8b8d; font-weight: bold"
              class="mr-3"
            >
              میز کار
            </p>
          </v-list-item>
          <v-list-item
            :active="parentsDetailsActive"
            class="parentsDetailsItem"
            value="parentsDetails"
            @click="goTo(3)"
          >
            <ParentsDetailsIcon
              id="parentsDetailsIconTag"
              style="width: 30px"
            />
            <p
              id="parentsDetailsText"
              style="color: rgb(160, 168, 176); font-weight: bold"
              class="mr-3"
            >
              تکمیل اطلاعات والدین
            </p>
          </v-list-item>
          <v-list-item
            :active="addChildActive"
            class="newChildItem"
            value="addChild"
            @click="goTo(2)"
          >
            <AddChild id="addChildIconTag" style="width: 30px" />
            <p
              id="newChildText"
              style="color: rgb(160, 168, 176); font-weight: bold"
              class="mr-3"
            >
              ثبت فرزند
            </p>
          </v-list-item>
          <v-list-item
            :active="coursesShopActive"
            class="coursesShopItem"
            value="coursesShop"
            @click="goTo(4)"
          >
            <coursesShopIcon
              id="coursesShopIconTag"
              style="width: 30px"
            ></coursesShopIcon>
            <p
              id="coursesShopText"
              style="color: rgb(160, 168, 176); font-weight: bold"
              class="mr-3"
            >
              خرید دوره
            </p>
          </v-list-item>
        </div>
        <div class="linksClass">
          <v-list-item
            class="exitItem"
            :active="exitActive"
            value="exit"
            @click="goTo(5)"
          >
            <GrayExitAccountNavigationDrawer id="exitIconTag" style="width: 30px" />
            <p
              id="exitText"
              style="color: #8a8b8d; font-weight: bold"
              class="mr-3"
            >
              خروج از حساب
            </p>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
  </v-locale-provider>
</template>

<script>
import axios from "./../axios.js";
import DrawerLogo from "./../assets/svgIcons/DrawerLogo.vue";
import Home from "./../assets/svgIcons/homeIcon.vue";
import AddChild from "./../assets/svgIcons/addChildIcon.vue";
import ParentsDetailsIcon from "./../assets/svgIcons/parentsDetailsIcon.vue";
import coursesShopIcon from "./../assets/svgIcons/coursesShopIcon.vue";
import GrayExitAccountNavigationDrawer from "../assets/svgIcons/GrayExitAccountNavigationDrawer.vue";

export default {
  props: { renderToken: Number },
  components: {
    DrawerLogo,
    Home,
    AddChild,
    ParentsDetailsIcon,
    coursesShopIcon,
    GrayExitAccountNavigationDrawer,
  },
  data: () => ({
    homeActive: false,
    addChildActive: false,
    parentsDetailsActive: false,
    coursesShopActive: false,
  }),
  mounted() {
    this.showChosenPage();
  },
  methods: {
    showChosenPage() {
      //highligh the chosen page name
      if (this.renderToken == 1) {
        this.$cookies.set("addChildActive", true);
      } else if (this.renderToken == 2) {
        this.$cookies.set("parentsDetailsActive", true);
      } else if (this.renderToken == 3) {
        this.$cookies.set("coursesShopActive", true);
      }
      if (
        this.renderToken == 0 &&
        (this.$cookies.get("homeActive") == "true" ||
          this.$cookies.get("homeActive") == true)
      ) {
        this.homeActive = true;
        this.addChildActive = false;
        this.parentsDetailsActive = false;
        document.getElementById("homeText").classList.add("chosenLink");
        document.getElementById("homeIconTag").children[0].style.fill =
          "#ff9635";
        document.getElementById("newChildText").classList.remove("chosenLink");
        document
          .getElementById("addChildIconTag")
          .classList.remove("chosenIcon");
        document
          .getElementById("parentsDetailsText")
          .classList.remove("chosenLink");
        document
          .getElementById("parentsDetailsIconTag")
          .classList.remove("chosenIcon");
        document
          .getElementById("coursesShopText")
          .classList.remove("chosenLink");
        document
          .getElementById("coursesShopIconTag")
          .classList.remove("chosenIcon");
      }
      if (
        this.renderToken == 1 ||
        this.$cookies.get("addChildActive") == "true" ||
        this.$cookies.get("addChildActive") == true
      ) {
        this.homeActive = false;
        this.addChildActive = true;
        this.parentsDetailsActive = false;
        this.coursesShopActive = false;
        document.getElementById("homeText").classList.remove("chosenLink");
        document.getElementById("homeIconTag").classList.remove("chosenIcon");
        document.getElementById("newChildText").classList.add("chosenLink");
        document.getElementById("addChildIconTag").children[0].style.fill =
          "#ff9635";
        document.getElementById("addChildIconTag").children[1].style.fill =
          "#ff9635";
        document.getElementById("addChildIconTag").children[2].style.fill =
          "#ff9635";
        document.getElementById("addChildIconTag").children[3].style.fill =
          "#ff9635";
        document
          .getElementById("parentsDetailsText")
          .classList.remove("chosenLink");
        document
          .getElementById("parentsDetailsIconTag")
          .classList.remove("chosenIcon");
        document
          .getElementById("coursesShopText")
          .classList.remove("chosenLink");
        document
          .getElementById("coursesShopIconTag")
          .classList.remove("chosenIcon");
      } else if (
        this.renderToken == 2 ||
        this.$cookies.get("parentsDetailsActive") == "true" ||
        this.$cookies.get("parentsDetailsActive") == true
      ) {
        this.homeActive = false;
        this.addChildActive = false;
        this.coursesShopActive = false;
        this.parentsDetailsActive = true;
        document.getElementById("homeText").classList.remove("chosenLink");
        document.getElementById("homeIconTag").classList.remove("chosenIcon");
        document.getElementById("newChildText").classList.remove("chosenLink");
        document
          .getElementById("addChildIconTag")
          .classList.remove("chosenIcon");
        document
          .getElementById("coursesShopText")
          .classList.remove("chosenLink");
        document
          .getElementById("coursesShopIconTag")
          .classList.remove("chosenIcon");
        document
          .getElementById("parentsDetailsText")
          .classList.add("chosenLink");
        document.getElementById(
          "parentsDetailsIconTag"
        ).children[0].style.fill = "#ff9635";
        document.getElementById(
          "parentsDetailsIconTag"
        ).children[1].style.fill = "#ff9635";
      } else if (
        this.renderToken == 3 ||
        (this.$cookies.get("coursesShopActive") == "true" &&
          this.$cookies.get("coursesShopActive") == true)
      ) {
        this.homeActive = false;
        this.addChildActive = false;
        this.parentsDetailsActive = false;
        this.coursesShopActive = true;
        document.getElementById("homeText").classList.remove("chosenLink");
        document.getElementById("homeIconTag").classList.remove("chosenIcon");
        document.getElementById("newChildText").classList.remove("chosenLink");
        document
          .getElementById("addChildIconTag")
          .classList.remove("chosenIcon");
        document
          .getElementById("parentsDetailsText")
          .classList.remove("chosenLink");
        document
          .getElementById("parentsDetailsIconTag")
          .classList.remove("chosenIcon");
        document.getElementById("coursesShopText").classList.add("chosenLink");
        document.getElementById("coursesShopIconTag").children[0].style.fill =
          "#ff9635";
        document.getElementById("coursesShopIconTag").children[1].style.fill =
          "#ff9635";
      }
    },
    changeDecoration(num) {
      this.homeActive = null;
      this.addChildActive = null;
      this.parentsDetailsActive = null;
      this.coursesShopActive = null;
      if (num == 1) {
        this.$cookies.remove("addChildActive");
        this.$cookies.remove("parentsDetailsActive");
        this.$cookies.remove("coursesShopActive");
        document.getElementById("homeText").classList.add("chosenLink");
        document.getElementById("homeIconTag").classList.add("chosenIcon");
        document.getElementById("newChildText").classList.remove("chosenLink");
        document
          .getElementById("addChildIconTag")
          .classList.remove("chosenIcon");
        document
          .getElementById("parentsDetailsText")
          .classList.remove("chosenLink");
        document
          .getElementById("parentsDetailsIconTag")
          .classList.remove("chosenIcon");
        document
          .getElementById("coursesShopText")
          .classList.remove("chosenLink");
        document
          .getElementById("coursesShopIconTag")
          .classList.remove("chosenIcon");
      } else if (num == 2) {
        this.$cookies.set("addChildActive", true);
        this.$cookies.remove("parentsDetailsActive");
        this.$cookies.remove("coursesShopActive");
        document.getElementById("newChildText").classList.add("chosenLink");
        document.getElementById("addChildIconTag").classList.add("chosenIcon");
        document.getElementById("homeText").classList.remove("chosenLink");
        document.getElementById("homeIconTag").classList.remove("chosenIcon");
        document
          .getElementById("parentsDetailsText")
          .classList.remove("chosenLink");
        document
          .getElementById("parentsDetailsIconTag")
          .classList.remove("chosenIcon");
        document
          .getElementById("coursesShopText")
          .classList.remove("chosenLink");
        document
          .getElementById("coursesShopIconTag")
          .classList.remove("chosenIcon");
      } else if (num == 3) {
        this.$cookies.set("parentsDetailsActive", true);
        this.$cookies.remove("addChildActive");
        this.$cookies.remove("coursesShopActive");
        document.getElementById("newChildText").classList.remove("chosenLink");
        document
          .getElementById("addChildIconTag")
          .classList.remove("chosenIcon");
        document.getElementById("homeText").classList.remove("chosenLink");
        document.getElementById("homeIconTag").classList.remove("chosenIcon");
        document
          .getElementById("parentsDetailsText")
          .classList.add("chosenLink");
        document
          .getElementById("parentsDetailsIconTag")
          .classList.add("chosenIcon");
        document
          .getElementById("coursesShopText")
          .classList.remove("chosenLink");
        document
          .getElementById("coursesShopIconTag")
          .classList.remove("chosenIcon");
      } else if (num == 4) {
        this.$cookies.set("coursesShopActive", true);
        this.$cookies.remove("addChildActive");
        this.$cookies.remove("parentsDetailsActive");
        document.getElementById("newChildText").classList.remove("chosenLink");
        document
          .getElementById("addChildIconTag")
          .classList.remove("chosenIcon");
        document.getElementById("homeText").classList.remove("chosenLink");
        document.getElementById("homeIconTag").classList.remove("chosenIcon");
        document
          .getElementById("parentsDetailsText")
          .classList.remove("chosenLink");
        document
          .getElementById("parentsDetailsIconTag")
          .classList.remove("chosenIcon");
        document.getElementById("coursesShopText").classList.add("chosenLink");
        document
          .getElementById("coursesShopIconTag")
          .classList.add("chosenIcon");
      }
    },
    goTo(numPage) {
      this.changeDecoration(numPage);
      if (numPage == 1) {
        this.$cookies.remove("btnClicked");
        this.$router.push({ name: "Home" });
      } else if (numPage == 2) {
        this.$cookies.remove("btnClicked");
        this.$router.push({ name: "AddChild" });
      } else if (numPage == 3) {
        this.$cookies.remove("btnClicked");
        this.$router.push({ name: "ParentsDetails" });
      } else if (numPage == 4) {
        this.$cookies.remove("btnClicked");
        this.$router.push({ name: "courseShop" });
      } else if (numPage == 5) {
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
  },
};
</script>
<style scoped>
.flex_column_class {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 80%;
  width: 100%;
}
.chosenLink {
  color: #ff9635 !important;
}
.chosenIcon {
  fill: #ff9635 !important;
}
.logoPart {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
}
.drawerList {
  font-size: 15px !important;
  font-weight: bold;
}
.linksClass {
  width: 100%;
}
.homeItem:hover p {
  color: #ff9635 !important;
}
.homeItem:hover #homeIconTag {
  stroke: #ff9635 !important;
}
.newChildItem:hover p {
  color: #ff9635 !important;
}
.newChildItem:hover #addChildIconTag {
  stroke: #ff9635 !important;
}
.parentsDetailsItem:hover p {
  color: #ff9635 !important;
}
.parentsDetailsItem:hover #parentsDetailsIconTag {
  stroke: #ff9635 !important;
}
.coursesShopItem:hover p {
  color: #ff9635 !important;
}
.coursesShopItem:hover #coursesShopIconTag {
  stroke: #ff9635 !important;
}
</style>
<style>
@font-face {
  font-family: danaRegular;
  src: url("./assets/fonts/Dana-Regular.ttf");
}
.homeItem > .v-list-item-title {
  font-size: 18px !important;
}
.v-list-item__content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.v-list-item--active > .v-list-item__overlay,
.v-list-item[aria-haspopup="menu"][aria-expanded="true"]
  > .v-list-item__overlay {
  opacity: 0.1;
}
.v-list-item--variant-text .v-list-item__overlay {
  background: #ff9635;
}
</style>
