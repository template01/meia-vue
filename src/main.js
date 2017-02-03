import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import App from './App'

import swiper from '../node_modules/swiper/dist/js/swiper.min.js'
import singlePost from './components/singlePost'
import Indexpage from './components/Indexpage'
// import Headermenu from './components/Headermenu'
import Getgradyears from './components/Getgradyears'


var vueSmoothScroll = require('vue-smoothscroll');
Vue.use(vueSmoothScroll);

Vue.use(vueResource)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  // base: __dirname,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Indexpage,
    //   beforeEnter: (to, from, next) => {
    //    alert('next')
    // },
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: 'work/:id',
        component: singlePost,


      },
      // {
      //   // UserPosts will be rendered inside User's <router-view>
      //   // when /user/:id/posts is matched
      //   path: 'profile',
      //   component: singlePost
      // }
    ]
  }
  ]
})

// router.beforeEach((to, from, next) => {

  // console.log('next')// ...
// })
new Vue({
  router,
  components: {
    // Headermenu
  },
  template: `
    <div id="app">
      <!--<headermenu></headermenu>-->
      <router-view></router-view>
    </div>
  `
}).$mount('#app')
