
<template>
<div id="meiaAll">
  <!-- < -->
  <!-- <div id="header">
    <router-link to="/">Home</router-link>

    <h1>PRETTY HEADER!</h1>
  </div> -->
  <meiaHeader></meiaHeader>

  <router-view></router-view>
  <div v-show="showIndex">
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


export default {
  components: {
    Getgradyears,
    meiaFooter,
    meiaHeader,
  },

  data:function(){
    return{
      showIndex:true
    }
  },

  watch: {

    '$route': function(newRoute, oldRoute) {
      if( this.$route.path.toString() === "/"){
        this.showIndex=true
      }else{
        this.showIndex=false
      }

    },
  },

  name: 'indexpage',

  beforeMount: function() {
    if( this.$route.path.toString() != "/"){
      this.showIndex=false
    }
  },

  methods: {
    alertthis: function() {
      console.log('cereate')
    },

  },
  created: function() {
    this.alertthis()


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  body,html{
    background: ghostwhite;
  }
  #meiaAll{
    background: ghostwhite;
  }

  $fontsize: 30px;

  *{

    font-family: arial
    ;
  }


</style>
