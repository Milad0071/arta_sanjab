<template>
  <v-app @click.right.prevent @copy.prevent @paste.prevent>
    <v-locale-provider rtl>
      <div class="mainContainer flex_column_class">
        <div class="pointsDiscription">
          <h3>راهنمای گزینه‌ها:</h3>
          <div
          v-for="(point, index) in pointsArray"
          :key="index"
          class="pointsClass"
          >
            <p>گزینه {{ point.option }}: </p>
            <p class="mr-2">{{ point.meaning }}</p>
          </div>
        </div>
        <h2>(فرزند من شبیه موارد زیر است):</h2>
        <div v-for="(question, index) in paginated" :key="index" class="questionMold flex_column_class">
          <div class="titlePart flex_class mr-2">
            <h3>{{ index+1 }} - </h3>
            <h3 class="mr-2">{{ question.question }}</h3>
          </div>
          <div class="answersPart">
            <div class="flex_class topPart" style="border-bottom: 1px solid black;">
              <v-radio-group v-model="chosenAnswer[question.no]">
                <div class="seperatorClass pl-1">
                  <v-radio class="radioClass" color="#1b1c1c" label="مطمئن نیستم یا نمی‌دانم" value="9"></v-radio>
                </div>
                
                <div class="toggleBtn">
                  <v-btn-toggle
                    color="#f68100"
                    density="compact"
                    divided
                    v-model="chosenAnswer[question.no]"
                  >
                    <v-btn><h3>۰</h3></v-btn>
                    <v-btn><h3>۱</h3></v-btn>
                    <v-btn><h3>۲</h3></v-btn>
                    <v-btn><h3>۳</h3></v-btn>
                    <v-btn><h3>۴</h3></v-btn>
                    <v-btn><h3>۵</h3></v-btn>
                    <v-btn><h3>۶</h3></v-btn>
                  </v-btn-toggle>
                </div>
              </v-radio-group>
            </div>
            <div class="textPart">
              <div class="divSeperatorClass">
                <v-icon
                  end
                  icon="mdi-arrow-right"
                ></v-icon>
                <span><h3>کمتر مشاهده شده</h3></span>
                
              </div>
              <div class="divSeperatorClass">
                <span><h3>بیشتر مشاهده شده</h3></span>
                <v-icon
                  start
                  icon="mdi-arrow-left"
                ></v-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="flex_class paginateClass">
          <v-pagination
            v-model="current"
            :length="totalPages"
            total-visible="3"
          ></v-pagination>
        </div>
        <div v-if="this.showNext" class="endExamBtnContainer flex_class">
          <v-btn id="prevBtn" class="endExamBtn mr-2 mb-3" @click="endExam()">
            پایان آزمون
          </v-btn>
        </div>
      </div>
    </v-locale-provider>
  </v-app>
</template>
<script>
import axios from './../axios.js';
// import questions from "./../assets/temp_files/questions.json";

export default {
  data: () => {
    return {
      showNext: true,
      scrollVal: true,
      current: 1,
      pageSize: 10,
      totalPages: null,
      questionsArray: [],
      chosenAnswer: [],
      pointsArray: [
        {
          id: 1,
          option: 'مطمئن نیستم یا نمی‌دانم',
          meaning: 'به رفتار فرزند توجه نکرده‌اید!'
        },
        {
          id: 2,
          option: '0',
          meaning: 'هرگز!'
        },
        {
          id: 3,
          option: '1',
          meaning: 'به ندرت!'
        },
        {
          id: 4,
          option: '2',
          meaning: 'تا حدودی!'
        },
        {
          id: 5,
          option: '3',
          meaning: 'بعضی اوقات!'
        },
        {
          id: 6,
          option: '4',
          meaning: 'به میزان قابل توجه!'
        },
        {
          id: 7,
          option: '5',
          meaning: 'تقریبا همیشه!'
        },
        {
          id: 8,
          option: '6',
          meaning: 'همیشه!'
        },
      ],
    }
  },
  watch: {
    current(newVal) {
      if (newVal) {
        this.scroll();
      }
    }
  },
  computed: {
    indexStart() {
      return (this.current - 1) * this.pageSize;
    },
    indexEnd() {
      return this.indexStart + this.pageSize;
    },
    paginated() {
      return this.questionsArray.slice(this.indexStart, this.indexEnd);
    }
  },
  created() {
    this.setQuestions();
  },
  methods: {
    setQuestions() {
      axios({
        method: "GET",
        url: `exam/qs-list/${this.$cookies.get('courseId')}/${this.$cookies.get('examId')}/?session=${this.$cookies.get('sessionId')}`,
        header: "application/json",
        headers: {
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {
          for (let j = 0; j < response.data[0].content.questions.length; j++) {
            this.questionsArray.push({
              no: response.data[0].content.questions[j].id,
              question: response.data[0].content.questions[j].question
            })
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
      // this.questionsArray = questions.questionsFile.questions;
      this.totalPages = Math.ceil(this.questionsArray.length / this.pageSize);
    },
    scroll() {
      if (this.current == this.totalPages) {
        this.showNext = false;
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.showNext = true;
      }
    },
    endExam() {
      this.$cookies.remove('examStarted');
      this.$cookies.set('resetPage');
      this.$cookies.remove('stay');
      this.$router.push({ name: "Home" });
    },
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
.mainContainer {
  width: 100%;
  height: 100%;
  padding: 0%;
}
.pointsDiscription {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: flex-start;
  border: 1px solid black;
  border-radius: 7px;
  padding: 10px;
  margin-bottom: 10px;
}
.pointsClass {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f68100;
  margin-top: 10px;
  padding: 10px;
  border-radius: 7px;
}
.questionMold {
  width: 100٪;
  border: 1px solid black;
  margin-top: 5%;
  padding: 0%;
}
.titlePart {
  align-self: flex-start;
}
.answersPart {
  border-top: 1px solid black;
  width: 100%;
  
}
.seperatorClass {
  width: auto;
  border-left: 1px solid black;
  padding-left: 0px;
  margin-left: 0px;
}
.textPart {
  background-color: #e2e2e3;
  display: flex;
  justify-content: flex-end;
}
.divSeperatorClass {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 45%;
}
.paginateClass {
  margin: 20px 0px;
}
.endExamBtnContainer {
  width: 100%;
}
.endExamBtn {
  font-weight: bold;
  color: #f68100 !important;
  border: 1px solid #f68100 !important;
  width: 40%;
}
.endExamBtn:hover {
  border: none;
  color: white !important;
  background-color: #f68100;
  font-weight: bold;
}
</style>
<style>
.v-selection-control-group {
  flex-flow: row !important;
  flex-direction: row !important;
}
.v-selection-control .v-label {
  white-space: nowrap !important;
}
.answersPart > .v-input__details {
  display: none;
}
.topPart > .v-radio-group .v-input__details {
  display: none;
}
.toggleBtn > .v-btn-group--density-compact.v-btn-group {
  height: 40px !important;
}
.v-selection-control .v-label {
  font-weight: bold !important;
}
</style>