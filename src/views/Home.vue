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
            @click="this.dialog = true"
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
                <div class="choseChild" v-for="(child, index) in children" :key="index" @click="chooseCourse(child.national_code)">
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
import axios from 'axios';

export default {
  data: () => {
    return {
      parentsData: null,
      show: 1,
      dialog: false,
      children: [],
    }
  },
  created() {
    if (this.$cookies.get('showModal')) {
      this.dialog = true;
    }
  },
  methods: {
    goTo(num) {
      if (num == 1) {
        //parents choosed
        this.show = 1;
        this.getData();
        this.dialog = false;
      } else if (num == 2) {
        //nothing yet
        console.log('2')
      } else if (num == 3) {
        //children choosed
        this.show = 3;
        this.getData();
      }
    },
    getData() {
      axios({
        method: "GET",
        url: "http://194.9.56.86/api/v1/dashboard/",
        header: "application/json",
        headers: {
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {
          console.log(response);
          this.children = response.data.children;
          for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].type == 1) {
              this.children[i].type = '۷-۴ سال';
            } else if (this.children[i].type == 2) {
              this.children[i].type = '۱۱-۸ سال';
            } else {
              this.children[i].type = '۱۵-۱۲ سال';
            }
          }
        })
        .catch((err) => {
          console.log(err);
          this.$swal("مشکلی پیش آمد!", err.message, "error");
        });
    },
    chooseCourse(nCOde) {
        axios({
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.$cookies.get("userToken")}`,
            'Content-Type': 'application/json',
          },
          url: `http://194.9.56.86/api/v1/dashboard/change-child-user/${nCOde}/?session=${this.$cookies.get('sessionId')}`,
        })
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.log(err);
            this.$swal(err.response.data.message, "", "error");
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
  height: 500px;
}
.btnContainer {
  width: 100%;
  display: flex;
  justify-content: center;
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
