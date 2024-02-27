<template>
  <v-app style="margin-right: 20%; font-family: danaRegular !important">
    <v-locale-provider rtl>
      <v-container class="flex_column_class">
        <!-- users section -->
        <div class="tableSections" style="margin-top: 10%">
          <div class="upperTableSection">
            <div class="titlePart">
              <div class="titleShape"></div>
              <h2>اطلاعات کاربران</h2>
            </div>
            <div class="filter_part">
              <v-select
                :items="filterList"
                density="comfortable"
                class="input_1"
                variant="plain"
                label="فیلتر کاربران"
                placeholder="نوع فیلتر را انتخاب نمایید"
                item-text="title"
                item-value="value"
                v-model="filterValue"
              ></v-select>
            </div>
            <div id="searchBox" class="searchContainer">
              <v-text-field
                label="جستجو"
                class="input_1"
                placeholder="جستجو نمایید"
                variant="plain"
                v-model="search"
              >
              </v-text-field>
            </div>
          </div>
          <UsersTable
            class="componentsClass"
            :key="userComponentKey"
            :users="usersArray"
            :hasUser="hasUser"
            :search="search"
            :filter="filterValue"
          >
          </UsersTable>
        </div>
      </v-container>
    </v-locale-provider>
  </v-app>
</template>
<script>
import axios from "./../axios.js";
import UsersTable from "./../components/UsersTable.vue";

export default {
  emits: ["admin-rerender-drawer", "reset-app"],
  components: { UsersTable },
  data: () => {
    return {
      search: "",
      filterValue: 1,
      hasUser: true,
      userComponentKey: 0,
      usersArray: [],
      filterList: [
        {
          value: 1,
          title: "همه کاربران",
        },
        {
          value: 2,
          title: "مدیران",
        },
        {
          value: 3,
          title: "کاربران عادی",
        },
      ],
    };
  },
  watch: {
    search(newVal) {
      this.search = this.toFarsiNumber(newVal);
    },
    filterValue(newVal) {
      this.filterValue = newVal;
    },
  },
  created() {
    this.getUsersData();
    this.$emit("admin-rerender-drawer", 2);
  },
  mounted() {
    if (this.usersArray.length === 0) {
      this.hasUser = false;
    }
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
    getUsersData() {
      axios({
        method: "GET",
        url: `admin-dashboard/users/`,
        headers: {
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.data.length > 0) {
            this.hasUser = true;
          }
          this.usersArray = response.data;
          this.userComponentKey += 1;
        })
        .catch((err) => {
          console.log("3");
          this.$swal("مشکلی پیش آمد!", err.message, "error");
          if (err.response.status == 401) {
            this.$cookies.set('userEntered', false);
            this.$cookies.set('adminEntered', false);
            this.$router.push({ name: "SignupLogin" });
          }
        });
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
.tableSections {
  width: 100% !important;
  margin: 0% 5% 5% 5%;
  padding: 10px;
  border: 1px solid #525355;
  border-radius: 7px;
}
.upperTableSection {
  display: flex;
  justify-content: space-between;
  padding-left: 30px;
  padding-top: 30px;
}
.titlePart {
  display: flex;
  margin-top: 10px;
  margin-right: -10px;
}
.titlePart h2 {
  margin-right: 10px;
  color: #6d6e71;
}
.titleShape {
  border-left: 10px solid #6d6e71;
  border-radius: 7px 0 0 7px;
}
.filter_part {
  display: flex;
  flex-direction: column;
  width: 30%;
  padding: 0% 1%;
}
.searchContainer {
  width: 40%;
}
.input_1 {
  width: 100%;
  padding-top: 0 !important;
  max-height: 50px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 7px;
  border: 2px solid white;
  box-shadow: 1px 0px 10px 0px #525355;
  font-family: danaRegular !important;
}
.componentsClass {
  height: 100%;
  background-color: transparent !important;
}
</style>