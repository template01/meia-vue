import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import App from './App'



import swiper from '../node_modules/swiper/dist/js/swiper.min.js'
import singlePost from './components/singlePost'
import singlePostYear from './components/singlePostYear'
import Indexpage from './components/Indexpage'
// import Headermenu from './components/Headermenu'
import Getgradyears from './components/Getgradyears'


// import _ from 'lodash'
// window._ = require('lodash');
// Vue.use(lodash)


var vueSmoothScroll = require('vue-smoothscroll');
Vue.use(vueSmoothScroll);

Vue.use(vueResource)
Vue.use(VueRouter)

import VueLazyload from 'vue-lazyload'

// Vue.use(VueLazyload)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  // loading: 'dist/loading.gif',
  // error:'https://d13yacurqjgara.cloudfront.net/users/82092/screenshots/1073359/spinner.gif',
  // loading:'https://d13yacurqjgara.cloudfront.net/users/82092/screenshots/1073359/spinner.gif',
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: [ 'scroll' ]
})



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
        name: 'work',

        path: 'work/:id',
        component: singlePost,

      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        name: 'year',

        path: 'year/:yearCategory',
        component: singlePostYear,

      },
      // {
      //   // UserPosts will be rendered inside User's <router-view>
      //   // when /user/:id/posts is matched
      //   path: 'profile',
      //   component: singlePost
      // }
    ]
  }
],
scrollBehavior (to, from, savedPosition) {
  console.log(to)
  console.log(from)
  var scrolltop = (window.pageYOffset || document.scrollTop)  - (document.clientTop || 0);
  console.log(scrolltop)

  if(to.name == 'year' || to.name == 'work'){
    window.scrollTo(0,0)
  }

  if(to.name == 'home' ){
    window.scrollTo(0,scrolltop)

  }
//   console.log(savedPosition)
//   if (savedPosition) {
//     return savedPosition
//   } else {
//     // return savedPosition
//
//
//     return { x: 0, y: 0 }
//   }
}

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
