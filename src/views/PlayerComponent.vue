<template>
  <v-app style="margin-right: 20%;" @click.right.prevent @copy.prevent @paste.prevent>
    <v-locale-provider rtl>
      <div class="mainContainer flex_column_class">
        <v-expansion-panels variant="popout">
          <v-expansion-panel
            v-for="(video, index) in videoArray"
            :key="index"
          >
            <v-expansion-panel-title @click="removeQuestions()">{{video.name}}</v-expansion-panel-title>
            <v-expansion-panel-text>
              <p v-if="video.description">{{ video.description }}</p>
              <div v-else>نمونه سوالات مربوط به این محتوا:</div>
              <a v-if="video.url" :href="video.url" target="_blank" @click="makeDone(video.videoId, video.objectId)">
                برای مشاهده ویدئو، کلیک نمایید.
              </a>
              <v-btn
              v-else-if="video.examWritable == false"
              id="questionBtn"
              color="#525355"
              class="text-none submitBtn"
              style="margin-top: 8%"
              size="large"
              min-width="200"
              variant="outlined"
              @click="
                showQuestions()
              "
            >
              مشاهده نمونه سوالات
            </v-btn>
            <v-btn
            v-else-if="video.examWritable == true"
              color="#525355"
              class="text-none submitBtn"
              style="margin-top: 8%"
              size="large"
              min-width="200"
              variant="outlined"
              @click="
                goToExam()
              "
            >
              ورود به آزمون
            </v-btn>
            <!-- sample questions -->
            <div v-if="!video.url" class="quesionsContainer flex_column_class">
              <div v-for="(question, index) in questions" :key="index" class="questionClass flex_class">
                <p>{{ question.no }}-</p>
                <p class="mr-2">{{ question.question }}</p>
              </div>
            </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <!-- <video width="450" controls :src="video"></video> -->
        
      </div>
    </v-locale-provider>
  </v-app>
</template>
<script>
import axios from './../axios.js';

export default {
  emits: ["reset-app"],
  data: () => {
    return {
      courseId: null,
      examContentId: null,
      videoContentId: null,
      item: null,
      nextItem: null,
      video: "./../../../../Arta_Pardaz/sanjab-arta/src/assets/example.mp4",
      videoArray: [],
      purchasedCourses: [],
      questions: [],
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      //get courses that have been purchased before
      axios({
        method: "GET",
        url: `dashboard/my-courses/?session=${this.$cookies.get('sessionId')}`,
        headers: {
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            this.courseId = response.data[i].id;
            this.$cookies.set('courseId', this.courseId);
            this.purchasedCourses.push({
              id: response.data[i].id,
              name: response.data[i].course.name,
              description: response.data[i].course.description,
              price: response.data[i].course.price,
              startDate: response.data[i].created_at,
              expireDate: response.data[i].expire_at,
            })
          }
          this.getContent(this.courseId);
          if (this.purchasedCourses.length > 0) {
            this.showCourses = true;
          } else {
            this.showCourses = false;
          }
        })
        .catch((err) => {
          this.$swal("مشکلی پیش آمد!", err.message, "error");
        });
    },
    getContent(id) {
      axios({
        method: "GET",
        url: `dashboard/my-course/${id}/?session=${this.$cookies.get('sessionId')}`,
        header: "application/json",
        headers: {
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            this.item = response.data[i];
            this.videoArray.push({
              name: this.item.content.name,
              description: this.item.content.description,
              url: this.item.content.url,
              examWritable: this.item.is_exam_writeable,
              videoId: this.item.id,
              objectId: this.item.object_id,
            })
            if (this.item.content_type === 6) {
              this.examContentId = this.item.id;
              this.$cookies.set('examId', this.examContentId);
            }
            if (this.item.content_type == 24) {
              this.videoContentId = this.item.id;
            }
          }
          this.videoArray.sort(function(a, b) { 
            return a.videoId - b.videoId;
          });
        })
        .catch((err) => {
          this.$swal("مشکلی پیش آمد!", err.message, "error");
        });
    },
    removeQuestions() {
      this.questions = [];
    },
    showQuestions() {
      document.getElementById("questionBtn").style.display = 'none';
      axios({
        method: "GET",
        url: `exam/qs-list/${this.courseId}/${this.examContentId}/?session=${this.$cookies.get('sessionId')}`,
        header: "application/json",
        headers: {
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {
          for (let j = 0; j < response.data[0].content.questions.length; j++) {
            this.questions.push({
              no: response.data[0].content.questions[j].id,
              question: response.data[0].content.questions[j].question
            })
          }
        })
        .catch((err) => {
          this.$swal("مشکلی پیش آمد!", err.message, "error");
        });
    },
    goToExam() {
      this.$emit("reset-app");
      this.$router.push({ name: "quizPage"})
    },
    makeDone(videoId, objectId) {
      axios({
        method: "GET",
        url: `courses/content/${this.courseId}/${videoId}/${objectId}/?session=${this.$cookies.get('sessionId')}`,
        header: "application/json",
        headers: {
          Authorization: `Bearer ${this.$cookies.get("userToken")}`,
          'Content-Type': 'application/json'
        },
      })
        .then(() => {
        })
        .catch((err) => {
          this.$swal("مشکلی پیش آمد!", err.message, "error");
        });
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
  padding: 10%;
  background-image: url('./../assets/quiz_background.jpg');
  background-size: cover;
}
.btnContainer {
  width: 100%;
  margin-top: 10%;
}
.submitBtn {
  font-weight: bold;
  background-color: white;
  color: #6d6e71 !important;
  width: 26%;
}
.submitBtn:hover {
  border: none;
  color: white !important;
  background-color: #6d6e71;
  font-weight: bold;
}
.quesionsContainer {
  border: 1px solid #6d6e71;
  padding: 10px;
}
.quesionsContainer div {
  align-self: flex-start;
}
.questionClass {
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #6d6e71;
  box-shadow: 1px 0px 10px 0px #f68100;
}
</style>