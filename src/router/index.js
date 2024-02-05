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
  {
    path: '/admin-courses',
    name: "adminCourses",
    component: () => import('@/views/AdminCourses.vue'),
    meta: {
      login: true,
      hideNavbar: false,
      adminNavbar: true,
    }
  },
  {
    path: '/admin-registered',
    name: "adminRegistered",
    component: () => import('@/views/AdminRegistered.vue'),
    meta: {
      login: true,
      hideNavbar: false,
      adminNavbar: true,
    }
  },
  {
    path: '/admin-finance',
    name: "adminFinance",
    component: () => import('@/views/AdminFinance.vue'),
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
    console.log('hi login true')
    if (cookies.get('userEntered') == true || cookies.get('userEntered') == 'true') {
      console.log(cookies.get('userEntered'), to.name)
      if (to.name == "Home") {
        cookies.set('homeActive', true);
        cookies.remove('addChildActive');
        cookies.remove('parentsDetailsActive');
      } else if (to.name == "AddChild") {
        cookies.set('addChildActive',true);
        cookies.remove('homeActive');
        cookies.remove('parentsDetailsActive');
      } else if (to.name == "ParentsDetails") {
        cookies.set('parentsDetailsActive', true);
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
    } else if (cookies.get('adminEntered') == true || cookies.get('adminEntered') == 'true') {
      if (to.name == "adminDashboard") {
        cookies.set('adminHomeActive', true);
        cookies.remove('coursesListActive');
        cookies.remove('registeredListActive');
        cookies.remove('financeProcessActive');
      } else if (to.name == "adminCourses") {
        cookies.set('coursesListActive', true);
        cookies.remove('adminHomeActive');
        cookies.remove('registeredListActive');
        cookies.remove('financeProcessActive');
      } else if (to.name == "adminRegistered") {
        cookies.set('registeredListActive', true);
        cookies.remove('adminHomeActive');
        cookies.remove('coursesListActive');
        cookies.remove('financeProcessActive');
      }
      else if (to.name == "adminFinance") {
        cookies.set('financeProcessActive', true);
        cookies.remove('adminHomeActive');
        cookies.remove('coursesListActive');
        cookies.remove('registeredListActive');
      }
      return next();
    } else {
      alert('توکن شما منقضی شده است، مجددا وارد شوید!')
      return next({ path: '/' });
    }
  } else {
    if (to.name == "SignupLogin") {
      console.log(cookies.get('userEntered'), 'userEntered')
      console.log(cookies.get('adminEntered'), 'adminEntered')
      console.log(cookies.get('userToken'), 'userToken')
      if ((cookies.get('userEntered') == 'false' && cookies.get('adminEntered') == 'false') || 
      (cookies.get('userEntered') == 'false' && cookies.get('adminEntered') == null)) {
        return next();
      } else if (cookies.get('userEntered') == 'true' && cookies.get('adminEntered') == 'false') {
        if (cookies.get("userToken") == undefined || cookies.get("userToken") == null || cookies.get("userToken") == '') {
          cookies.set("userEntered", false);
          return next()
        } else {
          cookies.set("userEntered", true);
          return next({ name: 'Home' });
        }
      } else if (cookies.get('adminEntered') == 'true' && cookies.get('userEntered') == 'false') {
        if (cookies.get("userToken") == undefined || cookies.get("userToken") == null || cookies.get("userToken") == '') {
          cookies.set("adminEntered", false);
          return next();
        } else {
          cookies.set("adminEntered", true);
          return next({ name: 'adminDashboard' });
        }
      }
    }
  }
});

export default router
