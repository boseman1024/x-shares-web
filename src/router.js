import Vue from "vue";
import Router from "vue-router";
import store from "./store";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue")
    },{
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    },{
      path: "/explore",
      name: "explore",
      component: () => import("./views/Explore.vue")
    },{
      path: "/personal/:id",
      name: "personal",
      component: () => import("./views/Personal.vue")
    },{
      path: "/create",
      name: "create",
      component: () => import("./views/Create.vue")
    }
  ]
});

router.beforeEach((to,from,next)=>{
  if(to.path!="/login"&&!store.state.isLogin){
    next('/login');
    return;
  }
  if(store.state.isLogin&&(store.state.followMap==null||store.state.heartMap==null)){
    store.dispatch('initUserDataMap',store.state.userInfo).then((res)=>{
      next();
    });
  }else{
    next();
  }
});

export default router;
