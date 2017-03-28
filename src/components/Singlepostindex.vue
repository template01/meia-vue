<template>
<div class="single">
  <div class="singleTitle" v-on:click="expandSingle(id)">
    <h1 class="singleRealName" v-html="workstudent"></h1>
    <h1 v-bind:id="id" class="singleRealTitle" v-bind:style="{ width: 'calc(100% - '+ nameWidth + 'px)' }" v-html="title" v-bind:class="addTitleLengthClass"></h1>
    <!-- <h1><span>{{ pickRandomName }}</span><span v-bind:id="id" v-bind:class="addTitleLengthClass">{{title}}</span></h1> -->
    <!-- <h1 v-bind:id="id"><span>{{title}}</h1> -->
  </div>

  <div v-bind:class="{ expanded: showSingle }" class="singleContent">
    <!-- </div> -->
    <router-link class="singleContentInnerLeftLink" v-if="postJsonContentFeaturedImage" v-bind:style="{ 'height': linkLineHeight+'px' }" v-bind:to="{ path: 'work/'+id}"><span>Read More</span></router-link>


    <div class="singleContentInner">

      <div class="singleContentInnerFeatured">
        <img class="" v-if="postJsonContentFeaturedImage" v-bind:src="postJsonContentFeaturedImage" />


      </div>
      <router-link class="singleContentInnerLink" v-if="!postJsonContentFeaturedImage" v-bind:to="{ path: 'work/'+id}"><span>Read More</span></router-link>
      <!-- <router-link class="singleContentInnerLink" v-bind:to="{ path: 'work/'+id, query: { year: 'private' }}"><span>→</span></router-link> -->
      <div class="singleContentInnerRenderedWrapper">
        <!-- <img v-bind:src="postJsonContentFeaturedImage"/> -->

        <div class="singleContentInnerRendered" v-html="postJsonContent">
        </div>

      </div>
    </div>
  </div>
</div>
</template>

<script>
import fitText from '../assets/fittext.js'

import alertTest from '../assets/alert.js'


export default {
  name: 'singlepostindex',
  props: ['title', 'index', 'projectslength', 'id', 'workstudent'],
  data() {
    return {
      showSingle: false,
      nameWidth: 0,
      postJsonContent: "",
      linkLineHeight: 40,
      postJsonContentFeaturedImage: "",
      name: ['Shemeka Mccullar', 'Craig Falgout', 'Pia Kos', 'Trish Staten', 'Dionna Gerber', 'Lilian Sano', 'Emmitt Casebeer', 'Jeanine Mollica', 'Preston Rouleau']
    }
  },
  methods: {
    expandSingle: function(id) {
      // alert('expaaand')
      this.showSingle = !this.showSingle
      this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/posts/' + id).then(function(response) {

        // if (this.postJsonContent.length === 0) {

        this.postJsonContent = response.body.excerpt.rendered
        this.postJsonContentFeaturedImage = response.body.acf.featuredimage.sizes.large

        if (this.showSingle) {
          // console.log(this.postJsonContentFeaturedImage)
          this.fitReadmore()

        }
        // }
      })

    },

    fitReadmore: function() {
      var vm = this
      setTimeout(function() {
        vm.linkLineHeight = vm.$el.querySelector('.singleContent').clientHeight - vm.$el.querySelector('.singleContentInnerRenderedWrapper').clientHeight - 1
      }, 1000)
    },

    collapseSingle: function() {
      this.showSingle = !this.showSingle
        // this.postJsonContent = ''
    },

    fitTitles: function() {
      // console.log(this.$el.getElementsByClassName('singleRealName')[0].clientWidth)
      // console.log(this.$el.getElementsByClassName('singleRealName')[0].offsetWidth)
      this.nameWidth = this.$el.getElementsByClassName('singleRealName')[0].clientWidth + 1
      var vm = this
      setTimeout(function() {
        if (vm.title.length <= 14) {
          window.fitText(document.getElementById(vm.id), vm.title.length / 16);

        }

        if (vm.title.length > 14 && vm.title.length <= 24) {
          window.fitText(document.getElementById(vm.id), vm.title.length / 14);

        }
        if (vm.title.length > 24 && vm.title.length <= 40) {
          window.fitText(document.getElementById(vm.id), vm.title.length / 12);

        }
        if (vm.title.length > 40 && vm.title.length <= 60) {
          window.fitText(document.getElementById(vm.id), vm.title.length / 10);

        }

        if (vm.title.length > 60) {
          window.fitText(document.getElementById(vm.id), vm.title.length / 8);

        }

      }, 1)
    }

  },
  computed: {
    // a computed getter
    pickRandomName: function() {
      // `this` points to the vm instance
      name = this.name[Math.floor(Math.random() * this.name.length)];
      return name
    },

    addTitleLengthClass: function() {

      if (this.title.length <= 20) {
        return 'large'
      }
      if (this.title.length < 50 && this.title.length > 20) {
        return 'mid'
      }
      if (this.title.length > 50) {
        return 'small'
      }
    }
  },
  mounted: function() {
    // console.log('mounted')
    this.fitTitles()
    var vm = this
    window.addEventListener("load", function load(event) {
      window.removeEventListener("load", load, false); //remove listener, no longer needed
      vm.fitTitles()
    }, false);
    window.setTimeout(function() {
      vm.fitTitles()
      window.setTimeout(function() {
        vm.fitTitles()
        window.setTimeout(function() {
          vm.fitTitles()
        }, 500)
      }, 500)
    }, 500)



  },

  created: function() {


  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>@import "../scss/globalVars.scss";

.single {

    color: $mainBackgroundBlack;

    // width: calc(100% - #{$mainHeaderHeight});
    width: 100%;

    .singleTitle {
        width: 100%;
        clear: both;
        cursor: pointer;
    }
    .singleRealTitle {
        width: 80%;
        border-left: $mainBorderStyle;
        padding-left: $mainPadding;
        padding-right: $mainPadding;

        &:hover {
            color: $mainBackground;
            background: $mainBackgroundBlack;
        }
    }

    .singleRealName {
        // width: 20%;
        padding-left: $mainPadding;
        padding-right: $mainPadding;

        &:hover {
            color: $mainBackground;
            background: $mainBackgroundBlack;
        }

    }

    h1 {
        margin: 0;
        border-top: $mainBorderStyle;
        // width: 100%;
        font-family: $mainFont;
        font-weight: $mainFontHeavy;
        float: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        height: 130px;
        line-height: 130px;

        span {
            padding: 100px $mainPadding;
            &:nth-child(2) {
                border-left: $mainBorderStyle;
            }
            &.small {
                font-size: 3vw;
            }
            &.mid {
                font-size: 5vw;
            }
            &.large {
                font-size: 7vw;
            }
        }
    }
    &:last-child {
        h1 {
            border-bottom: $mainBorderStyle;
        }
        .singleContent {
            &.expanded {
                border-bottom: $mainBorderStyle;
                border-top: 0;
                // background: blue;

            }
        }
    }
    &:first-child h1 {
        border-top: 0;
    }

    &:first-child{
      .singleRealTitle {

          &:hover {
            border-top: 1px solid $mainBackgroundPink;
          }
      }

      .singleRealName {

          &:hover {
            border-top: 1px solid $mainBackgroundPink;
          }

      }
    }

}

.singleContent {
    max-height: 0;
    overflow: hidden;
    border-top: 0 solid black;
    width: 100%;
    -webkit-transition: max-height 0.5s, border 0.5s;
    -moz-transition: max-height 0.5s, border 0.5s;
    transition: max-height 0.5s, border 0.5s;
    position: relative;
    &.expanded {
        max-height: 1000px;
        border-top: $mainBorderStyle;
        -webkit-transition: max-height 0.8s, border 0.8s;
        -moz-transition: max-height 0.8s, border 0.8s;
        transition: max-height 0.8s, border 0.8s;
        transition-delay: 0.1s;

    }

    .singleContentInnerLeftLink {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        height: 100%;
        width: 50%;
        line-height: $mainHeaderHeight;
        border-top: $mainBorderStyle;
        color: $mainBackgroundBlack;
        font-size: $secFontSize;
        text-align: center;
        text-decoration: none;
        bottom: 0;

        -webkit-transition: height 0.4s, background-color 0s;
        -moz-transition: height 0.4s, background-color 0s;
        transition: height 0.4s, background-color 0s;
        &:hover {
            color: $mainBackground;
            background: $mainBackgroundBlack;
            // transition-delay: 0.15s;
        }

    }

    .singleContentInner {
        // padding: $mainPadding;
        position: relative;
        .singleContentInnerRenderedWrapper {
            padding: $mainPadding;
            background: $mainBackgroundPink;
            // width: calc(50% + #{$mainHeaderHeight/2});
            z-index: 9;
            width: 50%;
            // float: left;
            // display: inline-block;
            p {
                font-size: 30px;
            }

        }

        .singleContentInnerLink {

            display: flex;
            align-items: center;
            justify-content: center;
            width: 50%;
            position: absolute;
            height: 100%;
            right: 0;
            border-left: $mainBorderStyle;
            text-decoration: none;
            color: $mainBackgroundBlack;
            font-size: $secFontSize;
            &:hover {
                color: $mainBackground;
                background: $mainBackgroundBlack;
                // transition-delay: 0.15s;
            }
        }
        .singleContentInnerFeatured {

            // display: flex;
            // align-items: center;
            // justify-content: center;
            width: 50%;
            // position: absolute;
            // height: 100%;
            float: right;
            right: 0;
            border-left: $mainBorderStyle;
            text-decoration: none;
            color: $mainBackgroundBlack;
            font-size: $thirdFontSize;

            img {
                width: calc(100% - #{$mainPadding*0});
                padding: $mainPadding;
                display: block;
                margin: 0;
            }
        }

    }
    &:empty {
        display: none;
    }
}
</style>

<style lang="scss">@import "../scss/globalVars.scss";

.singleContentInnerRendered {
    p {
        margin: 0;
        font-size: $thirdFontSize;
    }
    // padding-left: $mainHeaderHeight*4;
    // padding-right: $mainHeaderHeight*4;
}
</style>
