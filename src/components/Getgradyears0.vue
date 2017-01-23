<template>
<div>
  <div id="yearOuterWrapper">

    <div v-for="(year, index) in gradyears">

      <div id="yearNavigation">
        <span v-on:click="clickNext" class="left">-</span>
        <span>{{year.name}}</span>
        <span v-on:click="clickPrev" class="right">+</span>
      </div>
      <!-- photo[':original'] -->
      <Listposts v-bind:categorylink="year._links['wp:post_type'][0].href"></Listposts>
    </div>
  </div>
  <!-- <h1>hello</h1> -->
</template>

<script>
import Listposts from './Listposts'
// import Singlepostindex from './Singlepostindex'
// import fitText from '../assets/fittext'

export default {
  components: {
    Listposts
  },
  data() {
    return {
      gradyears: [],
    }
  },
  created: function() {
    if (this.gradyears.length === 0) {
      this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/categories?parent=8').then(function(response) {
        console.log(response)
        this.gradyears = response.body
      })
    }

  },
  methods: {

    clickNext: function() {
      console.log('next')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #yearNavigation{
    background: darkgrey;
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

  }
  span{
    width: 33.33333%;
    text-align: center
  }

  .left{
    // align-self: left;
    // text-align: right;
    // margin-left: auto;
  }
</style>
