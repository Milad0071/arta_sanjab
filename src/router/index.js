// Composables
import { createRouter, createWebHistory } from 'vue-router';
import { useCookies } from "vue3-cookies";

const routes = [
  {
    path: '/',
    name: "SignupLogin",
    component: () => import('@/views/SignupLogin.vue'),
    meta: {
      hideNavbar: true,
    }
  },
  {
    path: '/home',
    name: "Home",
    props: {
      pageNum: true,
    },
    component: () => import('@/views/Home.vue'),
    meta: {
      hideNavbar: false,
    }
  },
  {
    path: '/add-child',
    name: "AddChild",
    props: {
      pageNum: true,
    },
    component: () => import('@/views/newChild.vue'),
    meta: {
      hideNavbar: false,
    }
  },
  {
    path: '/parents-details',
    name: "ParentsDetails",
    props: {
      pageNum: true,
    },
    component: () => import('@/views/ParentsDetails.vue'),
    meta: {
      hideNavbar: true,
    }
  },
  {
    path: '/course-shop',
    name: "courseShop",
    component: () => import('@/views/CourseShop.vue'),
    meta: {
      hideNavbar: false,
    }
  },
  {
    path: '/player-comp',
    name: "PlayerComp",
    component: () => import('@/views/PlayerComponent.vue'),
    meta: {
      hideNavbar: false,
    }
  },
  {
    path: '/quiz-page',
    name: "quizPage",
    component: () => import('@/views/QuizPage.vue'),
    meta: {
      hideNavbar: true,
    }
  },
  {
    path: '/admin-dashboard',
    name: "adminDashboard",
    component: () => import('@/views/AdminDashboard.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

const { cookies } = useCookies();

router.beforeEach((to, from, next) => {
  //conditions for showing right item in navigationDrawer component
  if (to.name == "Home") {
    cookies.set('homeActive');
    cookies.remove('addChildActive');
    cookies.remove('parentsDetailsActive');
  } else if (to.name == "AddChild") {
    cookies.set('addChildActive');
    cookies.remove('homeActive');
    cookies.remove('parentsDetailsActive');
  } else if (to.name == "ParentsDetails") {
    cookies.set('parentsDetailsActive');
    cookies.remove('homeActive');
    cookies.remove('addChildActive');
  }
  return next();
  // if (to.meta.login) {
  //   // if (isActive == true) {
  //   //   alert("ابتدا باید وارد شوید")
  //   // } else {
  //   //   alert("شما فعال نیستید!")
  //   // }
  //   return next({ path: '/' });
  // } else {
  //   return next();
  // }
});

export default router
