<template>
<div>
  <div id="yearOuterWrapper">
    <!-- {{this.collapsed}} -->

    <div class="yearSingle" v-bind:class="{ slideOut: collapsed[index] }" v-for="(year, index) in gradyears">

      <div class="yearNavigation">
        <div>{{gradyears[index].slideoutactive}}</div>
        <span v-on:click="clickPrev(index)" class="left">← Past Year</span>
        <span class="uppercase">Graduation {{year.name}}</span>
        <span v-on:click="clickNext(index)" class="right">Next Year →</span>
      </div>
      <Splashposts v-bind:listpostId="'listPosts'+year.name" v-bind:categorylink="year._links['wp:post_type'][0].href"></Splashposts>
      <Listposts v-bind:id="'listPosts'+year.name" v-bind:index="index" v-bind:categoryyear="year.name" v-bind:categorylink="year._links['wp:post_type'][0].href"></Listposts>
    </div>
  </div>
</div>
</template>

<script>
import Listposts from './Listposts'
import Splashposts from './Splashposts'

export default {
  components: {
    Listposts,Splashposts
  },
  data() {
    return {
      yearWrapperHeight: [],
      gradyears: [],
      collapsed: [],
      ListpostId:'iddd'
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
      this.$SmoothScroll(0, 500);

    },
    clickPrev: function(index) {
      this.$set(this.collapsed, index, true)
      this.$set(this.collapsed, index - 1, false)
      this.$SmoothScroll(0, 500);

    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../scss/globalVars.scss";

.slideOut {
    height: 0 !important;
    overflow: hidden !important;

    .yearNavigation{

      display: none !important;
    }
}
#yearOuterWrapper{
  background: $mainBackgroundPink;
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

        position: fixed;
        z-index: 999999999999999;
        & + * {
          margin-top: $mainHeaderHeight
        }

        background: $mainBackgroundBlack;
        color: $mainBackgroundPink;
        // color: $mainBackground;

        // border-bottom: 1px solid $mainBackground;
        border-bottom: 1px solid $mainBackgroundPink;

        font-size: $secFontSize;

        // background: pink;
        // color: $mainBackgroundBlack;

        height: $mainHeaderHeight;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        // cursor: pointer;
        .left{
          text-align: left;
          padding: $mainPadding;
        }
        .right{
          text-align: right;
          padding: $mainPadding;
        }
    }
    &:not(first-of-type) {
        .yearNavigation {
            .left {
                cursor: pointer;
            }
        }
    }
    &:first-of-type {
        .yearNavigation {
            .left {
                visibility: hidden;
                color: lightgrey;
                pointer-events: none;
                cursor: default;

            }
        }
        // display: none;
    }
    &:not(last-of-type) {
        .yearNavigation {
            .right {
                cursor: pointer;
            }
        }
    }
    &:last-of-type {
        .yearNavigation {
            .right {
                visibility: hidden;
                color: darkgrey;
                pointer-events: none;
                cursor: default;

            }
        }
        // display: none;
    }

}

span {
    width: 33.33333%;
    text-align: center;
    font-size: $secFontSize;
    top:$secFontBaseLineShift;
    position: relative;
}

.left {
    // align-self: left;
    // text-align: right;
    // margin-left: auto;
}
</style>
