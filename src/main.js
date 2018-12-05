import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import App from './App'

import swiper from '../node_modules/swiper/dist/js/swiper.min.js'
import singlePost from './components/singlePost'
import singlePostYear from './components/singlePostYear'
import Indexpage from './components/Indexpage'
import Getgradyears from './components/Getgradyears'

//GLOBAL VARS
Vue.prototype.$apiUrl = 'http://83.96.162.31/backend/wp-json/'


var vueSmoothScroll = require('vue-smoothscroll');
Vue.use(vueSmoothScroll);

Vue.use(vueResource)
Vue.use(VueRouter)

import VueLazyload from 'vue-lazyload'

// Vue.use(VueLazyload)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  listenEvents: ['scroll']
})



const router = new VueRouter({
  mode: 'history',
  // base: __dirname,
  routes: [{
    path: '/',
    name: 'home',

    component: Indexpage,

    children: [{
        name: 'work',
        path: 'work/:id',
        component: singlePost,

      },
      {
        name: 'year',
        path: 'year/:yearCategory',
        component: singlePostYear,

      },

      {
        name: 'yearview',

        path: 'yearview/:years',
        component: Indexpage,

      },
    ],

  }],



  scrollBehavior(to, from) {
    var scrolltop = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
    console.log(scrolltop)
    if (to.name == 'year' || to.name == 'work') {
      window.scrollTo(0, 0)
      console.log('not home')
    }
  }

})

new Vue({
  router,
  components: {
    // Headermenu
  },
  template: `
    <div id="app">
      <router-view></router-view>
    </div>
  `
}).$mount('#app')
