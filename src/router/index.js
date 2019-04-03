import Vue from "vue";
import Router from "vue-router";
import App from "../App";

const home = r =>
  require.ensure([], () => r(require("../page/home/home")), "home");

const city = r =>
  require.ensure([], () => r(require("../page/city/city")), "city");

const msite = r =>
  require.ensure([], () => r(require("../page/msite/msite")), "msite");

const search = r =>
  require.ensure([], () => r(require("../page/search/search")), "search");

const login = r =>
  require.ensure([], () => r(require("../page/login/login")), "login");

const profile = r =>
  require.ensure([], () => r(require("../page/profile/profile")), "profile");

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: App, //顶级路由
      children: [
        {
          path: "/",
          redirect: "/home"
        },
        //首页城市列表
        {
          path: "/home",
          component: home
        },
        //当前选择城市页
        {
          path: "/city/:cityid",
          component: city
        },

        //所有商铺列表页
        {
          path: "/msite",
          component: msite
        },

        //搜索页
        {
          path: "/search/:geohash",
          component: search
        },

        //登录注册页
        {
          path: "/login",
          component: login
        },

        //个人信息页
        {
          path: '/profile',
          component: profile,
          children:[

          ]
        }
      ]
    }
  ]
});
