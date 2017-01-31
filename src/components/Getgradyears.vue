<template>
<div>
  <div id="yearOuterWrapper">
    <!-- {{this.collapsed}} -->

    <div class="yearSingle" v-bind:style="{'height':yearWrapperHeight[index]+'px'}" v-bind:class="{ slideOut: collapsed[index] }" v-for="(year, index) in gradyears">

      <div class="yearNavigation">
        <div>{{gradyears[index].slideoutactive}}</div>
        <span v-on:click="clickPrev(index)" class="left">-</span>
        <span>{{year.name}}</span>
        <span v-on:click="clickNext(index)" class="right">+</span>
      </div>

      <Listposts v-on:emitSetListHeight="function(input){setYearHeight(input,index)}" v-bind:index="index" v-bind:categoryyear="year.name" v-bind:categorylink="year._links['wp:post_type'][0].href"></Listposts>
    </div>
  </div>
  <div id="footer">
    <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nisi tellus, fermentum finibus lectus quis, interdum molestie leo. Morbi ultrices scelerisque lacus. Phasellus id odio laoreet, varius risus ac, dictum lorem. Etiam ut condimentum magna. Cras pulvinar odio a nunc luctus aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas sit amet convallis dui. Maecenas cursus, mauris ac mattis rutrum, arcu eros commodo purus, ut tristique augue mauris eget nisi.

Vivamus fermentum rutrum sem ac aliquam. Fusce sed maximus libero. Proin imperdiet ante non efficitur gravida. Donec nunc nisi, dictum nec tempus ac, imperdiet sit amet nulla. Phasellus dapibus bibendum eros quis mattis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras in lacus vel f</h1>
  </div>
</div>
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
      yearWrapperHeight: [],
      gradyears: [],
      collapsed: []
    }
  },
  created: function() {
    if (this.gradyears.length === 0) {
      this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/categories?parent=8').then(function(response) {
        // console.log(response)
        this.gradyears = response.body
        this.attachExtras()
      })
    }

  },
  computed: {
    listHeightText: function() {

    }
  },
  methods: {
    attachExtras: function() {
      var vueInstance = this

      for (var i = 0; i < this.gradyears.length; i++) {
        if (i != this.gradyears.length - 1) {
          this.collapsed.push(true);
        } else {
          this.collapsed.push(false);

        }
      }
    },

    clickNext: function(index) {
      this.$set(this.collapsed, index, true)
      this.$set(this.collapsed, index + 1, false)
    },
    clickPrev: function(index) {
      this.$set(this.collapsed, index, true)
      this.$set(this.collapsed, index - 1, false)
    },

    setYearHeight: function(data, index) {
        this.$set(this.yearWrapperHeight, index, data + 40)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.slideOut {
    height: 0px !important;
    overflow: hidden !important;
}

#footer {
    background: red;
    h1 {
        margin: 0;
    }
}

.yearSingle {

    overflow: hidden;

    -webkit-transition: all 160ms cubic-bezier(0.250, 0.100, 0.250, 1.000);
    -moz-transition: all 160ms cubic-bezier(0.250, 0.100, 0.250, 1.000);
    -o-transition: all 160ms cubic-bezier(0.250, 0.100, 0.250, 1.000);
    transition: all 160ms cubic-bezier(0.250, 0.100, 0.250, 1.000);
    /* ease (default) */

    -webkit-transition-timing-function: cubic-bezier(0.250, 0.100, 0.250, 1.000);
    -moz-transition-timing-function: cubic-bezier(0.250, 0.100, 0.250, 1.000);
    -o-transition-timing-function: cubic-bezier(0.250, 0.100, 0.250, 1.000);
    transition-timing-function: cubic-bezier(0.250, 0.100, 0.250, 1.000);
    /* ease (default) */
    .yearNavigation {
        background: darkgrey;
        height: 40px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

    }
    &:last-of-type {
        .yearNavigation {
            .right {
                visibility: hidden;
            }
        }
        // display: none;
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
