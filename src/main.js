import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import App from './App'

import swiper from '../node_modules/swiper/dist/js/swiper.min.js'
// import swiper from '../node_modules/swiper/dist/css/swiper.min.css'
import Hello from './components/Hello'
import Indexpage from './components/Indexpage'
import Headermenu from './components/Headermenu'




Vue.use(vueResource)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path:'/', component: Indexpage},
    {path:'/hello', component: Hello},
    // {path: '/test', component: Test}
  ],
});

/* eslint-disable no-new */
// 
// var vm = new Vue({
//     methods: {
//         foo: function() {
//             console.log('bar');
//         }
//     }
// });
//
// vm.foo(); // prints 'bar'




new Vue({
  router,
  components: {
    Headermenu
  },
  template: `
    <div id="app">
      <!--<headermenu></headermenu>-->
      <router-view></router-view>
    </div>
  `
}).$mount('#app')
