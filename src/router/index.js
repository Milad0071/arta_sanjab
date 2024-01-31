// Composables
import { createRouter, createWebHistory } from 'vue-router';
import { useCookies } from "vue3-cookies";

const routes = [
  {
    path: '/',
    name: "SignupLogin",
    component: () => import('@/views/SignupLogin.vue'),
    meta: {
      login: false,
      hideNavbar: true,
      adminNavbar: false,
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
      login: true,
      hideNavbar: false,
      adminNavbar: false,
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
      login: true,
      hideNavbar: false,
      adminNavbar: false,
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
      login: true,
      hideNavbar: true,
      adminNavbar: false,
    }
  },
  {
    path: '/course-shop',
    name: "courseShop",
    component: () => import('@/views/CourseShop.vue'),
    meta: {
      login: true,
      hideNavbar: false,
      adminNavbar: false,
    }
  },
  {
    path: '/player-comp',
    name: "PlayerComp",
    component: () => import('@/views/PlayerComponent.vue'),
    meta: {
      login: true,
      hideNavbar: false,
      adminNavbar: false,
    }
  },
  {
    path: '/quiz-page',
    name: "quizPage",
    component: () => import('@/views/QuizPage.vue'),
    meta: {
      login: true,
      hideNavbar: true,
      adminNavbar: false,
    }
  },
  {
    path: '/admin-dashboard',
    name: "adminDashboard",
    component: () => import('@/views/AdminDashboard.vue'),
    meta: {
      login: true,
      hideNavbar: false,
      adminNavbar: true,
    }
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

const { cookies } = useCookies();

router.beforeEach((to, from, next) => {
  //conditions for showing right item in navigationDrawer component
  if (to.meta.login == true) {
    if (cookies.get('userEntered') == true || cookies.get('userEntered') == 'true') {
      console.log('login true')
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
    } else if (to.name == "ParentsDetails") {
      if (cookies.get('firstTimeParentDetails')) {
        cookies.remove('firstTimeParentDetails');
        return next();
      } else {
        alert('توکن شما منقضی شده است، مجددا وارد شوید!')
        return next({ path: '/' });
      }
    } else {
      alert('توکن شما منقضی شده است، مجددا وارد شوید!')
      return next({ path: '/' });
    }
  } else {
    if (to.name == "SignupLogin") {
      if (cookies.get('userEntered') == 'false' || cookies.set('userEntered') == false) {
        console.log('userEntered false')
        // cookies.remove("userToken");
        // cookies.set('userEntered', false);
        return next();
      } else {
        console.log('userEntered true')
        cookies.set('userEntered', true)
        return next({ name: 'Home'});
      }
    }
  }
  
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
