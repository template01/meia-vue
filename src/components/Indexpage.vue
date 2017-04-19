
<template>
<div id="meiaAll">
  <!-- < -->
  <!-- <div id="header">
    <router-link to="/">Home</router-link>

    <h1>PRETTY HEADER!</h1>
  </div> -->
  <meiaHeader v-on:emitToggleNews="toggleNews()"></meiaHeader>

  <router-view v-bind:loaded=loaded v-bind:showIndexFirst=showIndexFirst></router-view>
  <div v-show="showIndex">
    <!-- <meiaNews v-bind:expandedActive="showNews"></meiaNews> -->
    <Getgradyears></Getgradyears>
  </div>

  <meiaFooter></meiaFooter>

  <!-- <div id="footer">
    <h1>PRETTY FOOTER Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nisi tellus, fermentum finibus lectus quis, interdum molestie leo. Morbi ultrices scelerisque lacus.</h1>
  </div> -->

</div>
</template>

<script>
import Getgradyears from './Getgradyears'
import meiaFooter from './meiaFooter'
import meiaHeader from './meiaHeader'
import meiaNews from './meiaNews'


export default {
  components: {
    Getgradyears,
    meiaFooter,
    meiaHeader,
    meiaNews
  },

  data: function() {
    return {
      showIndex: true,
      showNews: false,
      loaded: false,
      showIndexFirst: false
    }
  },

  watch: {

    '$route': function(newRoute, oldRoute) {
      if (this.$route.path.toString() === "/") {
        this.showIndex = true
        this.showIndexFirst = true
      } else {
        this.showIndexFirst = true
        this.showIndex = false
      }



    },
  },

  name: 'indexpage',

  beforeMount: function() {
    if (this.$route.path.toString() != "/") {
      this.showIndex = false
    }
  },

  methods: {
    alertthis: function() {
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    },
    toggleNews: function(){
      this.showNews = !this.showNews
    }
  },
  created: function() {
    // this.alertthis()
    this.loaded = true


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">@import "../scss/globalVars.scss";

#meiaAll {
    background: $mainBackground;
}
</style>
