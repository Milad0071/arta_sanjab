<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app class="appClass">
    <v-locale-provider rtl>
      <div class="mainPart">
        <!-- desctop contents -->
        <div class="logoPart">
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
          <v-img
            src="./../assets/sanjabTextLogo.png"
            alt="mainLogo"
            style="width: 250px; height: 250px; padding: 10px !important"
          ></v-img>
        </div>
        <!-- child form dialog -->
          <v-dialog v-model="dialog" persistent width="auto" style="z-index: 1 !important;">
            <v-card class="mainCard text-center mx-auto ma-4 pa-4" style="right: 20%;" min-width="1020">
              <!-- close cross icon -->
              <div class="closeCross" @click="this.dialog = false">
                <v-btn
                  class="ma-2"
                  color="#f68100"
                  icon="mdi-close"
                ></v-btn>
              </div>
              <!-- back icon -->
              <div class="backIcon">
                <v-btn
                  v-if="show == 2 || show == 3"
                  class="ma-2"
                  color="orange-darken-2"
                  @click="backFunc(show)"
                >
                  بازگشت  
                  <v-icon
                    end
                    icon="mdi-arrow-left"
                  ></v-icon>
                </v-btn>
              </div>
              <!-- text part -->
              <h3 v-if="show == 1" class="fontClass mb-5">لطفا انتخاب کنید تحت عنوان چه نقشی مایل به ادامه مراحل هستید:</h3>
              <h3 v-if="show == 2" class="fontClass mb-5">لطفا مشخص کنید به عنوان کدام یک از والدین مایل به ادامه مراحل هستید:</h3>
              <h3 v-if="show == 3" class="fontClass mb-5">لطفا نام کودک را انتخاب نمایید:</h3>
              <!-- choose role part -->
              <div v-if="show == 1" class="flex_class">
                <div class="parentsPart flex_column_class mt-7" @click="goTo(1)">
                  <v-img
                    width="300"
                    :aspect-ratio="1"
                    src="./../assets/parents.png"
                    cover
                  ></v-img>
                  <h2 class="fontClass">والدین</h2>
                </div>
                <div class="childPart flex_column_class mt-7" @click="goTo(3)">
                  <v-img
                    width="300"
                    :aspect-ratio="1"
                    src="./../assets/children.png"
                    
                  ></v-img>
                  <h2 class="fontClass">کودک</h2>
                </div>
              </div>
              <!-- choose child -->
              <div v-if="show == 3" class="chooseChildContainer">
                <div class="choseChild mt-2" v-for="(child, index) in children" :key="index" @click="chooseCourse(child.first_name, child.national_code)">
                  <h2>{{ child.first_name }}</h2>
                  <h2>{{ child.last_name }}</h2>
                  <h2>{{ child.type }}</h2>
                </div>
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
  emits: ['rerender-drawer', 'reset-app'],
  data: () => {
    return {
      parentsData: null,
      show: 1,
      dialog: false,
      children: [],
    }
  },
  created() {
    this.$cookies.remove('currentUserName');
    this.$cookies.remove('currentUserRole');
    if (this.$cookies.get('showModal')) {
      this.getData();
      this.dialog = true;
    }
  },
  methods: {
    backFunc() {
      if (this.show == 3) {
        this.show = 1;
      }
    },
    showModalFunc() {
      this.getData();
      this.dialog = true;
    },
    goTo(num) {
      if (num == 1) {
        //parents choosed
        this.show = 1;
        this.dialog = false;
        this.getData(1);
      } else if (num == 2) {
        //nothing yet
      } else if (num == 3) {
        //children choosed
        if (this.children.length > 0) {
          this.show = 3;
        } else {
          this.$swal('هنوز اطلاعات کودک را وارد نکرده‌اید!', "", 'warning').then((result) => {
            if (result.isConfirmed) {
              this.$emit("rerender-drawer", 1);
              this.$cookies.remove('addChildActive');
              this.$cookies.remove('parentsDetailsActive');
              this.$cookies.remove('coursesShopActive');
              // this.$emit("reset-app");
              this.$router.push({ path: "/add-child" });
            }
          });
          
        }
        
      }
    },
    getData(perm) {
      if (perm == 1) {
        axios({
          method: "GET",
          url: `dashboard/?session=${this.$cookies.get('sessionId')}`,
          headers: {
            Authorization: `Bearer ${this.$cookies.get("userToken")}`,
            'Content-Type': 'application/json'
          },
        })
          .then((response) => {
            if (response.status == 200) {
              this.$cookies.set('currentUserName', response.data.first_name);
              this.$cookies.set('currentUserRole', 'والد');
              this.$emit("rerender-drawer", 3);
              this.$cookies.remove('addChildActive');
              this.$cookies.remove('parentsDetailsActive');
              this.$cookies.remove('coursesShopActive');
              // this.$emit("reset-app");
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
          url: `dashboard/?session=${this.$cookies.get('sessionId')}`,
          header: "application/json",
          headers: {
            Authorization: `Bearer ${this.$cookies.get("userToken")}`,
            'Content-Type': 'application/json'
          },
        })
          .then((response) => {
            if (response.status == 200) {
              this.$cookies.set('currentUserName', response.data.first_name);
              this.$cookies.set('currentUserRole', 'والد');
              this.children = response.data.children;
              for (let i = 0; i < this.children.length; i++) {
                if (this.children[i].type == 1) {
                  this.children[i].type = '۴-۷ سال';
                } else if (this.children[i].type == 2) {
                  this.children[i].type = '۸-۱۱ سال';
                } else {
                  this.children[i].type = '۱۲-۱۵ سال';
                }
              }
            } else {
              this.$swal("مشکلی پیش آمد!", response.message, "error");
              if (response.status == 401) {
                this.$router.push({ name: "SignupLogin" });
              }
            }
            
          })
          .catch((err) => {
            this.$swal("مشکلی پیش آمد!", err.message, "error");
            if (err.response.status == 401) {
              this.$router.push({ name: "SignupLogin" });
            }
          });
      }
    },
    chooseCourse(first_name, nCOde) {
      this.$cookies.set('currentUserName', first_name);
      this.$cookies.set('currentUserRole', 'فرزند');
      this.$cookies.set('childNationalCode', nCOde);
        axios({
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.$cookies.get("userToken")}`,
            'Content-Type': 'application/json',
          },
          url: `dashboard/change-child-user/${nCOde}/?session=${this.$cookies.get('sessionId')}`,
        })
          .then(() => {
            this.$emit("rerender-drawer", 3);
            this.$cookies.remove('addChildActive');
            this.$cookies.remove('parentsDetailsActive');
            this.$cookies.remove('coursesShopActive');
            // this.$emit("reset-app");
            this.$router.push({ name: "courseShop" });
          })
          .catch((err) => {
            this.$swal("مشکلی پیش آمد!", err.message, "error");
            if (err.response.status == 401) {
              this.$router.push({ name: "SignupLogin" });
            }
          });
    }
  }
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
.fontClass {
  font-family: iranSansRegular !important;
}
.appClass {
  font-family: iranSansRegular !important;
  width: 100%;
  height: 100%;
}
.mainPart {
  font-family: iranSansRegular !important;
  width: 80%;
  height: 91.8%;
  margin-top: 3.85%;
  margin-left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logoPart {
  width: 80%;
  height: 91.8%;
  margin-top: 3.85%;
  margin-left: 0px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.mainCard {
  position: relative;
  height: 500px;
}
.closeCross {
  position: absolute;
  top: 0;
  right: 0;
}
.backIcon {
  position: absolute;
  top: 0;
  left: 0;
}

.changeRoleBtn {
  font-weight: bold;
  color: #f68100;
  width: 500px;
  height: 50px;
}
.changeRoleBtn:hover {
  border: none;
  color: white !important;
  background-color: #f68100;
  font-weight: bold;
}
.parentsPart {
  font-family: iranSansRegular !important;
}
.parentsPart:hover {
  background-color: #f68100 !important;
  color: white !important;
  cursor: pointer;
}
.childPart {
  font-family: iranSansRegular !important;
}
.childPart:hover {
  background-color: #f68100 !important;
  color: white !important;
  cursor: pointer;
}
.chooseChildContainer {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.choseChild {
  width: 500px;
  height: 50px;
  background-color: white;
  color: #f68100;
  border: 1px solid #f68100;
  border-radius: 7px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.choseChild:hover {
  background-color: #f68100;
  color: white;
  cursor: pointer;
}
</style>
