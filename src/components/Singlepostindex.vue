<template>
<div v-bind:id="id" class="single">
  <div class="singleTitle" v-on:click="expandSingle(id)">
    <template v-if="!showSingle">
      <h1  v-bind:style="{}"  class="singleRealName" v-html="workstudent"></h1>
      <h1 v-bind:id="'title'+id" v-bind:style="{width: 'calc(100% - '+ nameWidth + 'px)'}" class="singleRealTitle" v-html="title" v-bind:class="addTitleLengthClass"></h1>
</template>
    <template v-else>
<h1 v-bind:style="{'border-top':'1px solid '+yearColor, color: yearColor}" class="singleRealName singleExpanded" v-html="workstudent"></h1>
<h1 v-bind:style="{'border-top':'1px solid '+yearColor, color: yearColor, 'border-left':'1px solid '+yearColor, width: 'calc(100% - '+ (nameWidth+closeWidth)  + 'px)'}" v-bind:id="'title'+id" class="singleRealTitle singleExpanded" v-html="title" v-bind:class="addTitleLengthClass"></h1>
<div class="close">

</div>
</template>
    <!-- <h1><span>{{ pickRandomName }}</span><span v-bind:id="id" v-bind:class="addTitleLengthClass">{{title}}</span></h1> -->
    <!-- <h1 v-bind:id="id"><span>{{title}}</h1> -->
  </div>

  <div v-bind:class="{ expanded: showSingle }" class="singleContent">
    <!-- </div> -->
    <!-- <router-link class="singleContentInnerLeftLink" v-if="postJsonContentFeaturedImage" v-bind:cameFromIndex=true v-bind:style="{ 'height': linkLineHeight+'px' }" v-bind:to="{ path: 'work/'+id,         query: {
              yearview: index
            }}"><span>Read More</span></router-link> -->


            <div class="singleContentInnerLeftLink" v-if="postJsonContentFeaturedImage" v-bind:cameFromIndex=true v-bind:style="{ 'height': linkLineHeight+'px' }" >
              <router-link v-bind:to="{ path: 'work/'+id,         query: {
                        yearview: index
                      }}"><span>Read More</span></router-link>
            </div>


    <div class="singleContentInner">

      <div class="singleContentInnerFeatured">
        <!-- <img class="" v-if="postJsonContentFeaturedImage" v-bind:src="postJsonContentFeaturedImage" /> -->

        <img v-bind:style="{ 'height': featuredImageCalculatedHeight }" v-if="postJsonContentFeaturedImage" v-lazy="postJsonContentFeaturedImage" />
        <!-- <p class="loadingText" v-show="!postJsonContentFeaturedImageLoaded">loading</p> -->
        <!-- <p class="loadingText" >loading</p> -->
        <div v-show="!postJsonContentFeaturedImageLoaded" v-if="postJsonContentFeaturedImage" class="loadingText">
          <span>
            LOADING
          </span>
        </div>

      </div>
      <router-link v-bind:style="{'border-top-color':yearColor}" class="singleContentInnerLink" v-if="!postJsonContentFeaturedImage" v-bind:to="{ path: 'work/'+id, query: {
                yearview: index
              }}"><span>Read More</span></router-link>
      <!-- <router-link class="singleContentInnerLink" v-bind:to="{ path: 'work/'+id, query: { year: 'private' }}"><span>→</span></router-link> -->
      <template v-if="postJsonContentFeaturedImage">
<div class="singleContentInnerRenderedWrapper" v-bind:style="{ 'margin-bottom': linkLineHeight+'px' }">
  <p class="singleContentInnerRenderedFullTitle">
    <span v-html="workstudent"></span>
    <br />
    <span v-html="fulltitle"></span>
  </p>
  <div class="singleContentInnerRendered" v-bind:style="{background:yearColor}" v-html="postJsonContent">
  </div>

</div>
</template>
      <template v-else>
<div class="singleContentInnerRenderedWrapper">
  <p class="singleContentInnerRenderedFullTitle">
    <span v-html="workstudent"></span>
    <br />
    <span v-html="fulltitle"></span>
  </p>
  <div class="singleContentInnerRendered" v-html="postJsonContent">
  </div>
</div>
</template>
</div>
</div>
</div>
</template>

<script>
import fitText from '../assets/fittext.js'
import _ from 'lodash'

import offset from 'document-offset'


import alertTest from '../assets/alert.js'


export default {
  name: 'singlepostindex',
  props: ['title', 'fulltitle', 'index', 'projectslength', 'id', 'workstudent', 'yearColor', 'collapseAll', 'yearview'],
  data() {
    return {
      showSingle: false,
      nameWidth: 0,
      closeWidth: 0,
      postJsonContent: "",
      linkLineHeight: 40,
      postJsonContentFeaturedImageWidth: 0,
      postJsonContentFeaturedImage: "",
      postJsonContentFeaturedImageLoaded: false,
      featuredImageCalculatedHeight: '',
      name: ['Shemeka Mccullar', 'Craig Falgout', 'Pia Kos', 'Trish Staten', 'Dionna Gerber', 'Lilian Sano', 'Emmitt Casebeer', 'Jeanine Mollica', 'Preston Rouleau']
    }
  },
  methods: {
    expandSingle: function(id) {
      // alert('expaaand')


      this.showSingle = !this.showSingle



      this.$http.get(this.$apiUrl+'wp/v2/yearpost/' + id +'?per_page=100').then(function(response) {

        // if (this.postJsonContent.length === 0) {

        this.postJsonContent = response.body.acf.excerpt_field
        if (response.body.acf.featuredimage) {
          this.postJsonContentFeaturedImage = response.body.acf.featuredimage.sizes.large
          this.postJsonContentFeaturedImageWidth = this.$el.querySelector('.singleContentInnerFeatured').clientWidth
          this.postJsonContentFeaturedImageRelation = response.body.acf.featuredimage.sizes['large-height'] / response.body.acf.featuredimage.sizes['large-width']
        }
        if (this.showSingle) {
          console.log(offset(document.getElementById(this.id)).top)

          this.closeWidth = this.$el.getElementsByClassName('close')[0].clientWidth + 1
          console.log(this.closeWidth)
          if (this.closeWidth < 100) {

            this.$SmoothScroll(offset(this.$el).top - this.closeWidth - 3, 500);
          } else {
            this.$SmoothScroll(offset(this.$el).top - this.closeWidth + 35, 500);

          }


          if(this.postJsonContentFeaturedImage){
            this.lazyLoadHandleLoaded()
            this.lazyLoadHandleLoading()
          }


        }
        // }
      })

    },

    fitReadmore: function() {
      var vm = this
      if (window.innerWidth > 800) {
        setTimeout(function() {
          vm.linkLineHeight = vm.$el.querySelector('.singleContent').clientHeight - vm.$el.querySelector('.singleContentInnerRenderedWrapper').clientHeight - 1
        }, 1000)
      }
    },

    collapseSingle: function() {
      this.showSingle = !this.showSingle
      // this.postJsonContent = ''
    },

    lazyLoadHandleLoaded: function() {
      var vm = this


      this.$Lazyload.$once('loaded', function({
        bindType,
        el,
        naturalHeight,
        naturalWidth,
        $parent,
        src,
        loading,
        error
      }, formCache) {
        // console.log(el)
        vm.fitReadmore()
        vm.postJsonContentFeaturedImageLoaded = true
        setTimeout(function() {
          vm.postJsonContentFeaturedImageLoaded = true
        }, 100)
        setTimeout(function() {
          vm.postJsonContentFeaturedImageLoaded = true
        }, 250)
        setTimeout(function() {
          vm.postJsonContentFeaturedImageLoaded = true
        }, 500)

        // console.log('LOADED')
        // console.log(naturalHeight)
        vm.featuredImageCalculatedHeight = 'initial'


      })
    },

    lazyLoadHandleLoading: function() {
      var vm = this

      this.$Lazyload.$once('loading', function({
        bindType,
        el,
        naturalHeight,
        naturalWidth,
        $parent,
        src,
        loading,
        error
      }, formCache) {
        // console.log('just loading')
        // console.log(el)
        // console.log(vm.postJsonContentFeaturedImageRelation)

        vm.featuredImageCalculatedHeight = vm.postJsonContentFeaturedImageRelation * vm.postJsonContentFeaturedImageWidth + 'px'
        // postJsonContentFeaturedImageRelation*postJsonContentFeaturedImageWidth+'px'
      })
    },

    fitTitles: function() {
      // console.log(this.$el.getElementsByClassName('singleRealName')[0].clientWidth)
      // console.log(this.$el.getElementsByClassName('singleRealName')[0].offsetWidth)
      this.nameWidth = this.$el.getElementsByClassName('singleRealName')[0].clientWidth + 1
      var vm = this
      setTimeout(function() {
        if (vm.title.length <= 14) {
          window.fitText(document.getElementById('title' + vm.id), vm.title.length / 20);

        }

        if (vm.title.length > 14 && vm.title.length <= 18) {
          window.fitText(document.getElementById('title' + vm.id), vm.title.length / 14);

        }

        if (vm.title.length > 18 && vm.title.length <= 24) {
          window.fitText(document.getElementById('title' + vm.id), vm.title.length / 9);

        }
        if (vm.title.length > 24 && vm.title.length <= 32) {
          window.fitText(document.getElementById('title' + vm.id), vm.title.length / 7);

        }

        if (vm.title.length > 32 && vm.title.length <= 40) {
          window.fitText(document.getElementById('title' + vm.id), vm.title.length / 6);

        }

        if (vm.title.length > 40 && vm.title.length <= 60) {
          window.fitText(document.getElementById('title' + vm.id), vm.title.length / 4);

        }

        if (vm.title.length > 60) {
          window.fitText(document.getElementById('title' + vm.id), vm.title.length / 2);

        }

      }, 1)
    },

    handleResize: _.throttle(function() {
      this.fitTitles()
      if (this.$el.getElementsByClassName('close')[0] != null) {
        this.closeWidth = this.$el.getElementsByClassName('close')[0].clientWidth + 1

      }

    }, 0)

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

    var vm = this
    window.addEventListener('resize', function() {
      vm.handleResize()
    });

  },

  watch: {

    collapseAll: function() {
      if (this.collapseAll === this.yearview) {
        this.showSingle = false
      }
    },
    '$route' (to, from) {

      if (to.path === '/') {
        this.fitTitles()
        var vm = this

        window.setTimeout(function() {
          vm.fitTitles()
          window.setTimeout(function() {
            vm.fitTitles()
            window.setTimeout(function() {
              vm.fitTitles()
            }, 500)
          }, 500)
        }, 500)

      }
    }
  },
  created: function() {


  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../scss/globalVars.scss";

.single {

    color: $mainBackgroundBlack;

    // width: calc(100% - #{$mainHeaderHeight});
    width: 100%;

    .singleTitle {
        width: 100%;
        clear: both;
        cursor: pointer;
    }

    .singleExpanded {
        background: $mainBackgroundBlack;
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

    .close {
        // color: red;
        // border-top: $mainBorderStyle;
        // border-left: $mainBorderStyle;

        -webkit-box-shadow: inset 0 1px 0 0 $mainBackgroundBlack, -1px 0 0 0 $mainBackgroundBlack;
        -moz-box-shadow: inset 0 1px 0 0 $mainBackgroundBlack, -1px 0 0 0 $mainBackgroundBlack;
        box-shadow: inset 0 1px 0 0 $mainBackgroundBlack, -1px 0 0 0 $mainBackgroundBlack;

        border: 0;

        text-align: center;
        float: right;
        position: absolute;
        right: 1px;
        // top:-1px;
        margin-left: -3px;
        margin-top: 1px;
        height: 110px;
        width: 110px;
        line-height: 110px;
        font-size: 48px;
        // margin-top: 5px;
        &.close:after,
        &.close:before {
            position: absolute;
            content: ' ';
            height: 110px;
            width: 1px;
            background-color: $mainBackgroundBlack;
        }
        &.close:before {
          transform: rotate(45deg);
          -webkit-transform: rotate(45deg);
        }
        &.close:after {
          transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
        }
        @include media("<tablet") {
            height: 72px;
            width: 72px;

            line-height: 72px;
            &.close:after,
            &.close:before {
                height: 72px;
            }

        }
    }

    h1 {
        margin: 0;
        border-top: $mainBorderStyle;
        font-size: 32px;
        @include media("<tablet") {
            font-size: 12px;
        }
        // width: 100%;
        font-family: $mainFont;
        font-weight: $mainFontHeavy;
        float: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        height: 110px;
        line-height: 110px;
        @include media("<tablet") {
            height: 72px;
            line-height: 72px;
        }
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
            @include media("<tablet") {
                &.small {
                    font-size: 1.5vw;
                }
                &.mid {
                    font-size: 2.5vw;
                }
                &.large {
                    font-size: 3.5vw;
                }
            }

        }
    }
    &:last-child {

        .close{

                  -webkit-box-shadow: inset 0 -1px 0 0 $mainBackgroundBlack, inset 0 1px 0 0 $mainBackgroundBlack, -1px 0 0 0 $mainBackgroundBlack;
                  -moz-box-shadow: inset 0 -1px 0 0 $mainBackgroundBlack, inset 0 1px 0 0 $mainBackgroundBlack, -1px 0 0 0 $mainBackgroundBlack;
                  box-shadow: inset 0 -1px 0 0 $mainBackgroundBlack, inset 0 1px 0 0 $mainBackgroundBlack, -1px 0 0 0 $mainBackgroundBlack;
                  // margin-top: 0;
                  // margin-bottom: -2px;
                  height: 109px;
                  line-height: 109px;
                  @include media("<tablet") {
                      height: 71px;
                      line-height: 71px;
                  }

        }
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
    &:first-child {

        .close {
            -webkit-box-shadow: inset 0 0 0 0 $mainBackground;
            -moz-box-shadow: inset 0 0 0 0 $mainBackground;
            box-shadow: inset 0 0 0 0 $mainBackground;

        }
        .singleRealTitle {
            &:hover {
                border-top: 1px solid $mainBackground;
            }
        }

        .singleRealName {
            &:hover {
                border-top: 1px solid $mainBackground;
            }

        }


    }
    &:not(:first-child) {

        .singleExpanded {
            // border-top: 1px solid $mainBackgroundBlack !important;
        }
    }

}

.singleContent {
    max-height: 0;
    overflow: hidden;
    border-top: 0 solid $mainBackgroundBlack;
    width: 100%;
    -webkit-transition: max-height 0.5s, border 0.5s;
    -moz-transition: max-height 0.5s, border 0.5s;
    transition: max-height 0.5s, border 0.5s;
    position: relative;
    &.expanded {
        max-height: 2000px;
        border-top: $mainBorderStyle;
        -webkit-transition: max-height 0.8s, border 0.8s;
        -moz-transition: max-height 0.8s, border 0.8s;
        transition: max-height 0.8s, border 0.8s;
        transition-delay: 0.1s;

        .singleContentInnerLink {
            border-top: $mainBorderStyle;
            @include media("<tablet") {
                border-top-color: $mainBackgroundBlack !important;
            }

        }

    }

    .singleContentInnerLeftLink {
        display: flex;
        // align-items: center;
        justify-content: center;
        position: absolute;
        height: 100%;
        width: 50%;
        @include media("<tablet") {
            width: 100%;
            align-items: center;

        }

        line-height: $mainHeaderHeight;
        border-top: $mainBorderStyle;

        -webkit-box-shadow: 1px 0 0 0 $mainBackgroundBlack;
        -moz-box-shadow: 1px 0 0 0 $mainBackgroundBlack;
        box-shadow: 1px 0 0 0 $mainBackgroundBlack;

        color: $mainBackgroundBlack;
        font-size: $secFontSize;
        @include media("<tablet") {
            font-size: $secFontSizeTablet;
        }

        text-align: center;

        bottom: 0;

        -webkit-transition: height 0.4s, background-color 0s;
        -moz-transition: height 0.4s, background-color 0s;
        transition: height 0.4s, background-color 0s;
        &:hover {
            color: $mainBackgroundBlack !important;
            background: inherit !important;
            // transition-delay: 0.15s;
        }

        a {
            text-decoration: none;
            color: inherit;

        }

        span {
            &:hover {
                // color: $mainBackground !important;
                background: $mainBackgroundBlack !important;
                // transition-delay: 0.15s;
            }

        }
        @include media(">tablet") {

            span {
                left: 0;
                border-bottom: $mainBorderStyle;
                position: absolute;
                width: 100%;

            }
        }

    }

    .singleContentInner {
        // padding: $mainPadding;
        position: relative;
        .singleContentInnerRenderedWrapper {
            -webkit-box-shadow: 1px 0 0 0 $mainBackgroundBlack;
            -moz-box-shadow: 1px 0 0 0 $mainBackgroundBlack;
            box-shadow: 1px 0 0 0 $mainBackgroundBlack;
            padding: $mainPadding;
            // background: $mainBackground;
            // width: calc(50% + #{$mainHeaderHeight/2});
            z-index: 9;
            width: 50%;
            @include media("<tablet") {
                width: 100%;
                margin-bottom: 40px;
            }
            // float: left;
            // display: inline-block;
            p {
                font-size: 30px;
            }

            .singleContentInnerRenderedFullTitle {
                margin: 0 0 $mainPadding;
                font-size: $thirdFontSize;
                span:not(:first-of-type) {
                    text-transform: uppercase;
                }
                @include media(">desktop") {
                    font-size: $desktopFontSize;
                }
                @include media("<tablet") {
                    font-size: $thirdFontSizeTablet;
                }
            }

        }

        .singleContentInnerLink {

            display: flex;
            align-items: center;
            justify-content: center;
            width: 50%;
            @include media("<tablet") {
                width: 100%;
                height: 40px;
                margin-bottom: -40px;
                bottom: 0;
                border-left: 0;
                border-top: 1px solid $mainBackgroundBlack;
            }
            position: absolute;
            height: 100%;
            right: 0;
            border-left: $mainBorderStyle;
            text-decoration: none;
            color: $mainBackgroundBlack;
            font-size: $secFontSize;
            @include media("<tablet") {
                font-size: $secFontSizeTablet;
            }
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
            // position: absolute;

            // display: flex;
            // align-items: center;
            // justify-content: center;
            width: 50%;
            @include media("<tablet") {
                width: 100%;
                border-left: 0;

            }
            // position: absolute;
            // height: 100%;
            position: relative;
            float: right;
            right: 0;
            border-left: $mainBorderStyle;
            text-decoration: none;
            color: $mainBackgroundBlack;
            font-size: $thirdFontSize;
            @include media("<tablet") {
                font-size: $thirdFontSizeTablet;
            }
            @include media(">desktop") {
                font-size: $desktopFontSize;
            }

            img {
                width: calc(100% - #{$mainPadding*0});
                padding: $mainPadding;
                display: block;
                margin: 0;
            }

            img[lazy=loading] {
                /*your style here*/
                // background: $mainBackgroundBlack;

            }

            .loadingText {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: $secFontSize;
                @include media("<tablet") {
                    font-size: $secFontSizeTablet;
                }

                // -webkit-animation: fadeIn 0.8s infinite alternate;
                // animation: fadeIn 0.1s infinite alternate;
            }
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
            }

        }

    }
    &:empty {
        display: none;
    }
}
</style>

<style lang="scss">
@import "../scss/globalVars.scss";

.singleContentInnerRendered {
    p {
        margin: 0;
        font-size: $thirdFontSize;
        @include media("<tablet") {
            font-size: $thirdFontSizeTablet;
        }
        @include media(">desktop") {
            font-size: $desktopFontSize;
        }

    }
    // padding-left: $mainHeaderHeight*4;
    // padding-right: $mainHeaderHeight*4;
}
</style>
