<template>
  <v-app>
    <v-locale-provider rtl>
      <div class="mainContainer flex_column_class">
        <p>(فرزند من شبیه موارد زیر است):</p>
        <div v-for="(question, index) in paginated" :key="index" class="questionMold flex_column_class">
          <div class="titlePart flex_class">
            <p>{{ question.No}} - </p>
            <p class="mr-2">{{ question.question }}</p>
          </div>
          <div class="answersPart">
            <div class="flex_class topPart" style="border-bottom: 1px solid black;">
              <v-radio-group v-model="chosenAnswer[index]">
                <div class="seperatorClass pl-1">
                  <v-radio color="#f68100" label="نمی‌دانم، اطلاعی ندارم!" value="9"></v-radio>
                </div>
                
                <div class="toggleBtn">
                  <v-btn-toggle
                    color="orange"
                    density="compact"
                    divided
                    v-model="chosenAnswer[index]"
                  >
                    <v-btn>۰</v-btn>
                    <v-btn>۱</v-btn>
                    <v-btn>۲</v-btn>
                    <v-btn>۳</v-btn>
                    <v-btn>۴</v-btn>
                    <v-btn>۵</v-btn>
                    <v-btn>۶</v-btn>
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
                <span>کمتر مشاهده شده</span>
                
              </div>
              <div class="divSeperatorClass">
                <span>بیشتر مشاهده شده</span>
                <v-icon
                  start
                  icon="mdi-arrow-left"
                ></v-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="flex_class paginateClass">
          <v-btn v-if="this.showNext" id="nextBtn" class="paginationBtn ml-2" @click="next()">
            صفحه بعدی
          </v-btn>
          <v-btn v-else class="paginationBtn ml-2" disabled>
            صفحه بعدی
          </v-btn>
          <span>{{ current }}</span>
          <v-btn v-if="current != 1" id="prevBtn" class="paginationBtn mr-2" @click="prev()">
            صفحه قبلی
          </v-btn>
          <v-btn v-else class="paginationBtn mr-2" disabled>
            صفحه قبلی
          </v-btn>
        </div>
        <div v-if="!this.showNext" class="endExamBtnContainer flex_class">
          <v-btn id="prevBtn" class="endExamBtn mr-2" @click="endExam()">
            پایان آزمون
          </v-btn>
        </div>
      </div>
    </v-locale-provider>
  </v-app>
</template>
<script>
import questions from "./../assets/temp_files/questions.json"

export default {
  data: () => {
    return {
      showNext: true,
      current: 1,
      pageSize: 10,
      questionsArray: [],
      chosenAnswer: [],
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
      this.questionsArray = questions.questionsFile.questions;
    },
    prev() {
      this.current = this.current - 1;
      this.showNext = true;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
    next() {
      this.current = this.current + 1;
      if (this.questionsArray.slice((this.indexStart + 10), (this.indexEnd + 10)).length == 0) {
        this.showNext = false;
      } else {
        this.showNext = true;
      }
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
    endExam() {
      this.$cookies.remove('examStarted');
      this.$cookies.set('resetPage');
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
.questionMold {
  width: 100٪;
  border: 1px solid black;
  margin-top: 5%;
  padding: 0%;
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
.paginationBtn {
  font-weight: bold;
  color: black !important;
  width: 40%;
}
.paginationBtn:hover {
  border: none;
  color: white !important;
  background-color: #c5c5c6;
  font-weight: bold;
}
.endExamBtnContainer {
  width: 100%;
}
.endExamBtn {
  font-weight: bold;
  color: #f68100 !important;
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
</style>