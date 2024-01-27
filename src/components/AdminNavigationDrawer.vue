<template>
  <v-locale-provider rtl>
    <v-navigation-drawer
      permanent
      location="right"
      :elevation="1"
      style="top: 0 !important; width: 20%; height: 100% !important"
    >
      <div class="logoPart">
        <v-img
          src="./../assets/sanjabTextLogo.png"
          alt="mainLogo"
          style="width: 250px; height: 250px; padding: 10px !important"
        ></v-img>
      </div>
      <v-list class="drawerList" density="compact" nav open-on-hover>
        <v-list-item
          class="homeItem"
          :key="activeKey"
          :active="homeActive"
          value="home"
          @click="goTo(1)"
          
        >
          <Home id="homeIconTag" style="width: 30px" />
          <p
            id="homeText"
            style="color: rgb(160, 168, 176); font-weight: bold"
            class="mr-3"
          >
            داشبورد
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
            دوره‌ها
          </p>
        </v-list-item>
        <v-menu
          open-on-hover
        >
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
            >
              Dropdown
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-list-item
        :active="parentsDetailsActive"
        class="parentsDetailsItem"
        value="parentsDetails"
        @click="goTo(3)"
        >
          <ParentsDetailsIcon id="parentsDetailsIconTag" style="width: 30px" />
          <p
            id="parentsDetailsText"
            style="color: rgb(160, 168, 176); font-weight: bold"
            class="mr-3"
          >
            لیست ثبت‌نامی‌ها
          </p>
        </v-list-item>
        <v-list-item
        :active="coursesShopActive"
        class="coursesShop"
        value="coursesShop"
        @click="goTo(4)"
        >
          <coursesShopIcon id="coursesShopIconTag" style="width: 30px"></coursesShopIcon>
          <p
            id="coursesShopText"
            style="color: rgb(160, 168, 176); font-weight: bold"
            class="mr-3"
          >
            تراکنش مالی
          </p>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-locale-provider>
</template>
<script>

export default {
  data: () => ({
    activeKey: 1,
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
      console.log(this.renderToken)
      if (this.renderToken == 1) {
        this.$cookies.set('addChildActive');
      } else if (this.renderToken == 2) {
        this.$cookies.set('parentsDetailsActive');
      } else if (this.renderToken == 3) {
        this.$cookies.set('coursesShopActive');
      }
      if (this.pageNum == 1 && this.$cookies.get('homeActive')) {
        this.homeActive = true;
        this.addChildActive = false;
        this.parentsDetailsActive = false;
        document.getElementById("homeText").classList.add("chosenLink");
        document.getElementById("homeIconTag").classList.add("chosenIcon");
        document.getElementById("newChildText").classList.remove("chosenLink");
        document.getElementById("addChildIconTag").classList.remove("chosenIcon");
        document.getElementById("parentsDetailsText").classList.remove("chosenLink");
        document.getElementById("parentsDetailsIconTag").classList.remove("chosenIcon");
        document.getElementById("coursesShopText").classList.remove("chosenLink");
        document.getElementById("coursesShopIconTag").classList.remove("chosenIcon");
      }
      if (this.renderToken == 1 || this.$cookies.get('addChildActive')) {
        this.homeActive = false;
        this.addChildActive = true;
        this.parentsDetailsActive = false;
        this.coursesShopActive = false;
        document.getElementById("homeText").classList.remove("chosenLink");
        document.getElementById("homeIconTag").classList.remove("chosenIcon");
        document.getElementById("newChildText").classList.add("chosenLink");
        document.getElementById("addChildIconTag").classList.add("chosenIcon");
        document.getElementById("parentsDetailsText").classList.remove("chosenLink");
        document.getElementById("parentsDetailsIconTag").classList.remove("chosenIcon");
        document.getElementById("coursesShopText").classList.remove("chosenLink");
        document.getElementById("coursesShopIconTag").classList.remove("chosenIcon");
      } else if (this.renderToken == 2 || this.$cookies.get('parentsDetailsActive')) {
        this.homeActive = false;
        this.addChildActive = false;
        this.coursesShopActive = false;
        this.parentsDetailsActive = true;
        document.getElementById("homeText").classList.remove("chosenLink");
        document.getElementById("homeIconTag").classList.remove("chosenIcon");
        document.getElementById("newChildText").classList.remove("chosenLink");
        document.getElementById("addChildIconTag").classList.remove("chosenIcon");
        document.getElementById("coursesShopText").classList.remove("chosenLink");
        document.getElementById("coursesShopIconTag").classList.remove("chosenIcon");
        document.getElementById("parentsDetailsText").classList.add("chosenLink");
        document.getElementById("parentsDetailsIconTag").classList.add("chosenIcon");
      } else if (this.renderToken == 3 || this.$cookies.get('coursesShopActive')) {
        this.homeActive = false;
        this.addChildActive = false;
        this.parentsDetailsActive = false;
        this.coursesShopActive = true;
        document.getElementById("homeText").classList.remove("chosenLink");
        document.getElementById("homeIconTag").classList.remove("chosenIcon");
        document.getElementById("newChildText").classList.remove("chosenLink");
        document.getElementById("addChildIconTag").classList.remove("chosenIcon");
        document.getElementById("parentsDetailsText").classList.remove("chosenLink");
        document.getElementById("parentsDetailsIconTag").classList.remove("chosenIcon");
        document.getElementById("coursesShopText").classList.add("chosenLink");
        document.getElementById("coursesShopIconTag").classList.add("chosenIcon");
      }
    },
    changeDecoration(num) {
      this.homeActive = null;
      this.addChildActive = null;
      this.parentsDetailsActive = null;
      this.coursesShopActive = null;
      if (num == 1) {
        this.$cookies.remove('addChildActive');
        this.$cookies.remove('parentsDetailsActive');
        this.$cookies.remove('coursesShopActive');
        document.getElementById("homeText").classList.add("chosenLink");
        document.getElementById("homeIconTag").classList.add("chosenIcon");
        document.getElementById("newChildText").classList.remove("chosenLink");
        document.getElementById("addChildIconTag").classList.remove("chosenIcon");
        document.getElementById("parentsDetailsText").classList.remove("chosenLink");
        document.getElementById("parentsDetailsIconTag").classList.remove("chosenIcon");
        document.getElementById("coursesShopText").classList.remove("chosenLink");
        document.getElementById("coursesShopIconTag").classList.remove("chosenIcon");
      } else if (num == 2) {
        this.$cookies.set('addChildActive');
        this.$cookies.remove('parentsDetailsActive');
        this.$cookies.remove('coursesShopActive');
        document.getElementById("newChildText").classList.add("chosenLink");
        document.getElementById("addChildIconTag").classList.add("chosenIcon");
        document.getElementById("homeText").classList.remove("chosenLink");
        document.getElementById("homeIconTag").classList.remove("chosenIcon");
        document.getElementById("parentsDetailsText").classList.remove("chosenLink");
        document.getElementById("parentsDetailsIconTag").classList.remove("chosenIcon");
        document.getElementById("coursesShopText").classList.remove("chosenLink");
        document.getElementById("coursesShopIconTag").classList.remove("chosenIcon");
      } else if (num == 3) {
        this.$cookies.set('parentsDetailsActive');
        this.$cookies.remove('addChildActive');
        this.$cookies.remove('coursesShopActive');
        document.getElementById("newChildText").classList.remove("chosenLink");
        document.getElementById("addChildIconTag").classList.remove("chosenIcon");
        document.getElementById("homeText").classList.remove("chosenLink");
        document.getElementById("homeIconTag").classList.remove("chosenIcon");
        document.getElementById("parentsDetailsText").classList.add("chosenLink");
        document.getElementById("parentsDetailsIconTag").classList.add("chosenIcon");
        document.getElementById("coursesShopText").classList.remove("chosenLink");
        document.getElementById("coursesShopIconTag").classList.remove("chosenIcon");
        
      }
      else if (num == 4) {
        this.$cookies.set('coursesShopActive');
        this.$cookies.remove('addChildActive');
        this.$cookies.remove('parentsDetailsActive');
        document.getElementById("newChildText").classList.remove("chosenLink");
        document.getElementById("addChildIconTag").classList.remove("chosenIcon");
        document.getElementById("homeText").classList.remove("chosenLink");
        document.getElementById("homeIconTag").classList.remove("chosenIcon");
        document.getElementById("parentsDetailsText").classList.remove("chosenLink");
        document.getElementById("parentsDetailsIconTag").classList.remove("chosenIcon");
        document.getElementById("coursesShopText").classList.add("chosenLink");
        document.getElementById("coursesShopIconTag").classList.add("chosenIcon");
      }
      
    },
    goTo(numPage) {
      this.changeDecoration(numPage);
      if (numPage == 1) {
        this.$router.push({ name: "Home" });
      } else if (numPage == 2) {
        this.$router.push({ name: "AddChild" });
      } else if (numPage == 3) {
        this.$router.push({ name: "ParentsDetails" });
      } else if (numPage == 4) {
        this.$router.push({ name: "courseShop" });
      }
    },
  },
}
</script>
<style scoped>
.logoPart {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.drawerList {
  font-size: 15px !important;
  font-weight: bold;
}
.homeItem:hover p {
  color: rgb(94, 89, 255) !important;
}
.homeItem:hover #homeIconTag {
  stroke: rgb(94, 89, 255) !important;
}
.newChildItem:hover p {
  color: rgb(94, 89, 255) !important;
}
.newChildItem:hover #addChildIconTag {
  stroke: rgb(94, 89, 255) !important;
}
.parentsDetailsItem:hover p {
  color: rgb(94, 89, 255) !important;
}
.parentsDetailsItem:hover #parentsDetailsIconTag {
  stroke: rgb(94, 89, 255) !important;
}

</style>
<style>
@font-face {
    font-family: iranSansRegular;
    src: url('./../assets/fonts/IRANSansX-Regular.ttf');
}
.homeItem > .v-list-item-title {
  font-size: 18px !important;
}
</style>
