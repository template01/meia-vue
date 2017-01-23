<template>
<div>
  <div id="yearOuterWrapper">
    <!-- {{this.collapsed}} -->

    <div class="yearSingle" v-bind:class="{ slideOut: collapsed[index] }" v-for="(year, index) in gradyears">

      <div class="yearNavigation">
        <div>{{gradyears[index].slideoutactive}}</div>
        <span v-on:click="clickPrev(index)" class="left">-</span>
        <span>{{year.name}}</span>
        <span v-on:click="clickNext(index)" class="right">+</span>
      </div>
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
      collapsed: []
    }
  },
  created: function() {
    if (this.gradyears.length === 0) {
      this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/categories?parent=8').then(function(response) {
        console.log(response)
        this.gradyears = response.body
        this.attachExtras()
      })
    }

  },
  methods: {
    attachExtras: function() {
      var vueInstance = this

      for (var i = 0; i < this.gradyears.length; i++) {
        if (i != this.gradyears.length-1){
          this.collapsed.push(true);
        }else{
          this.collapsed.push(false);

        }
      }
    },

    clickNext: function(index) {
      this.$set(this.collapsed, index, true)
      this.$set(this.collapsed, index+1, false)
    },
    clickPrev: function(index) {
      this.$set(this.collapsed, index, true)
      this.$set(this.collapsed, index-1, false)
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.slideOut {
    display: none;
}

.slideOutPosts{
  margin-left: -100vw;
  background: red;
  display: none;
}

.yearSingle{

  .yearNavigation {
      background: darkgrey;
      height: 40px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

  }

  &:last-of-type{
    .yearNavigation {
      .right{
        visibility: hidden;
      }
    }
  }
  &:first-of-type{
    .yearNavigation {
      .left{
        visibility: hidden;
      }
    }
  }
}


span {
    width: 33.33333%;
    text-align: center;
}

.left {
    // align-self: left;
    // text-align: right;
    // margin-left: auto;
}
</style>
