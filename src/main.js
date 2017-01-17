import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import App from './App'

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
new Vue({
  router,
  components: {
    Headermenu
  },
  template: `
    <div id="app">
      <headermenu></headermenu>
      <router-view></router-view>
    </div>
  `,
}).$mount('#app')
