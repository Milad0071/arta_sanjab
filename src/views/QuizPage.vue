<template>
  <v-app>
    <v-locale-provider rtl>
      <div class="mainContainer flex_class">
        <v-card v-if="goToQuestions == false" elevation="16" class="flex_column_class cardClass">
          <div  class="discriptionPart">
          <!-- title -->
            <div class="flex_column_class mb-2" style="width: 100%;">
              <div class="flex_column_class" style="width: 100%;">
                <p class="dateClass">تاریخ: {{ todayDate }}</p>
                <v-card-title>
                  چک‌لیست در مسیر شناخت فرزندم
                </v-card-title>
              </div>
              <v-card-subtitle style="font-weight: bold; font-size: 16px;">
                کودکان (۷-۴)
              </v-card-subtitle>
              </div>
              <!-- information table -->
              <div class="infoClass flex_column_class">
              <div class="partItems1">
                <p>نام و نام خانوادگی کودک: {{ childName }}</p>
                <p>جنسیت: {{ gender }}</p>
                <p>سن: {{ age }}</p>
              </div>
              <div class="partItems1">
                <p>استان: {{ province }}</p>
                <p>شهر: {{ city }}</p>
                <p>منطقه شهرداری: {{ RegionalMunicipality }}</p>
              </div>
              <div class="partItems2">
                <p>شغل پدر: {{ province }}</p>
                <p>تحصیلات پدر: {{ city }}</p>
                <p>شغل مادر: {{ RegionalMunicipality }}</p>
                <p>تحصیلات مادر: {{ RegionalMunicipality }}</p>
              </div>
            </div>
            <!-- discriptions -->
            <div class="textClass" style="width: 100%;">
              <h4>والدین محترم و گرامی!</h4>
              <h4>با سلام و احترام؛</h4>
              <p>این چک‌لیست برای به دست آوردن ارزیابی شما از ویژگی‌های فرزندتان در زمینه استعداد‌های <span style="font-weight: bold;">کلامی، ریاضی، فضایی، علوم،  موسیقی، ورزشی و اجتماعی</span> طراحی شده است. با استفاده از این چک‌لیست هر مورد را با در نظر گرفتن سن او، نشان دهید که چقدر فکر می‌کنید فرزند شما شبیه به موارد ذکر شده است. هر گویه یا عبارت را به دقت بخوانید و میزانی که شما از وجود یا عدم وجود هر ویژگی مشاهده کرده‌اید را با توجه به  وضعیت فعلی فرزند خود متناسب با  نظام درجه‌بندی زیر در جای مناسب علامت بزنید. </p>
              <ul>
                <li class="mt-2">صفر(۰) را علامت بزنید: اگر شما این ویژگی را <span class="underlineText">هرگز</span> مشاهده نکرده‌اید.</li>
                <li class="mt-1">۱ را علامت بزنید: اگر شما این ویژگی را <span class="underlineText">به ندرت</span> مشاهده کرده‌اید.</li>
                <li class="mt-1">۲ علامت بزنید: اگر شما این ویژگی را <span class="underlineText">تاحدودی</span> مشاهده کرده‌اید.</li>
                <li class="mt-1">۳ را علامت بزنید: اگر شما این ویژگی را <span class="underlineText">بعضی اوقات</span> مشاهده می‌کنید.</li>
                <li class="mt-1">۴ را علامت بزنید: اگر شما این ویژگی را <span class="underlineText">به میزان قابل‌توجهی</span> مشاهده می‌کنید.</li>
                <li class="mt-1">۵ را علامت بزنید: اگر شما این ویژگی را <span class="underlineText">تقریباً همیشه</span> مشاهده می‌کنید.</li>
                <li class="mt-1">۶ را علامت بزنید: اگر شما این ویژگی را <span class="underlineText">همیشه</span> مشاهده می‌کنید.</li>
                <li class="mt-1">اگر گویه یا عبارتی نیز برای شما <span class="underlineText">مبهم است یا تاکنون به فرزند  خود در این زمینه توجه نکرده‌اید</span> گزینه <span style="font-weight: bold;">مطمئن نیستم یا نمی‌دانم</span> را انتخاب کنید.</li>
              </ul>
              <p class="mt-2">سعی کنید رویدادها یا تجربه های فرزند خود را یادآوری کنید. <span style="font-weight: bold;">دقت کنید که پاسخ های حقیقی خود را بنویسید (نه پاسخ های مورد علاقه خود را).</span></p>
              <div class="flex_class mt-2">
                <p style="color: red; font-weight: bold; tex-aligh: center;">هدف از این ارزیابی «مقایسه استعداد يا استعدادهاي برتر فرزند شما در مقايسه با ساير استعدادهاي خود او است»</p>
              </div>
              <!-- start key -->
              <div class="btnContainer flex_class">
                <v-btn
                  color="#525355"
                  class="text-none submitBtn"
                  size="large"
                  min-width="200"
                  variant="outlined"
                  @click="goToQuestionsFunc()"
                >
                  آغاز آزمون
                </v-btn>
              </div>
            </div>
          </div>
        </v-card>
        <v-card v-else elevation="16" class="flex_column_class questionsCardClass">
          <!-- questions component -->
          <QuestionsComp ></QuestionsComp>
        </v-card>
      </div>
    </v-locale-provider>
  </v-app>
</template>
<script>
import QuestionsComp from "./../components/QustionsComp.vue";
import axios from './../axios.js';

export default {
  components: {QuestionsComp},
  data: () => {
    return {
      children: [],
      goToQuestions: false,
      chosenChild: null,
      todayDate: null,
      childName: '',
      gender: '',
      age: '',
      province: '',
      city: '',
      RegionalMunicipality: '',
      dadJob: '',
      dadEducation: '',
      momJob: '',
      momEducation: '',
    }
  },
  created() {
    this.getData();
    this.setJalaliDate();
    if (this.$cookies.get('examStarted')) {
      this.goToQuestions = true;
    }
  },
  methods: {
    getData() {
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
            console.log(response)
            this.children = response.data.children;
            for (let i = 0; i < this.children.length; i++) {
              if (this.children[i].type == 1) {
                this.children[i].type = '۴-۷ سال';
              } else if (this.children[i].type == 2) {
                this.children[i].type = '۸-۱۱ سال';
              } else {
                this.children[i].type = '۱۲-۱۵ سال';
              }
              // if (this.children[i].national_code == this.$cookies.get('childNationalCode')) {
              //   this.chosenChild = {
              //     name: this.children[i].first_name,
              //     lastName: this.children[i].last_name,
              //     lastName: this.children[i].last_name,
              //   }
              // }
            }
            console.log(this.children)
          })
          .catch((err) => {
            this.$swal("مشکلی پیش آمد!", err.message, "error");
          });
    },
    setJalaliDate() {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
      this.todayDate = new Date().toLocaleDateString('fa-IR', options);
    },
    goToQuestionsFunc() {
      this.$cookies.set('examStarted');
      this.goToQuestions = true;
    }
  },
}
</script>
<style scoped>
.flex_class {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex_column_class {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.underlineText {
  text-decoration: underline;
  text-underline-position: under;
}
.mainContainer {
  background-image: url("./../assets/quiz_background.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
  padding: 1%;
}
.cardClass {
  width: 70%;
  background-color: rgb(255, 255, 255);
  align-self: flex-start;
  padding: 1% 1% 0 1%;
}
.questionsCardClass {
  width: 50%;
  background-color: rgb(255, 255, 255);
  align-self: flex-start;
  padding: 1% 1% 0 1%;
}
.discriptionPart {
  width: 100%
}
.dateClass {
  align-self: flex-start !important;
}
.infoClass {
  width: 100%;
  border: 2px solid black;
  border-radius: 7px;
}
.partItems1 {
  width: 100%;
  padding: 0.5%;
  display: grid;
  grid-gap: 0%;
  grid-template-columns: repeat(4, minmax(350px, 1fr));
  text-align: justify;
  text-justify: inter-word;
  border-bottom: 2px solid black;
}
.partItems2 {
  width: 100%;
  padding: 0.5%;
  display: grid;
  grid-gap: 0%;
  grid-template-columns: repeat(4, minmax(280px, 1fr));
  text-align: justify;
  text-justify: inter-word;
  border-bottom: 2px solid black;
}
.textClass {
  width: 100%;
  padding: 2%;
  text-align: justify;
  text-justify: inter-word;
}
.btnContainer {
  width: 100%;
  margin-top: 1%;
}
.submitBtn {
  font-weight: bold;
  color: #f68100 !important;
  width: 26%;
}
.submitBtn:hover {
  border: none;
  color: white !important;
  background-color: #f68100;
  font-weight: bold;
}
</style>