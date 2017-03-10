<template>
<div>
  <div class="listpostsImages">
    <div v-bind:class="{ expanded: showImages }" class="listpostsImagesInner">
      <!-- {{this.featuredimages[0]}} -->
      <div v-bind:class="'swiper-container'+this.categoryyear" class="swiper-container">
        <div class="swiper-wrapper">

          <div v-bind:class="'swiper-slide'+categoryyear" class="swiper-slide" v-for="(featuredimage, index) in featuredimages">
            <router-link v-bind:to="'work/'+workids[index]">

              <img class="swiper-lazy" v-bind:data-src="featuredimage.large" />
            </router-link>

            <!-- <img data-src="http://lorempixel.com/1600/1200/nature/1" class="swiper-lazy"> -->
            <!-- <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div> -->
            <div class="swiper-title">
              <div class="swiper-titleInner">
                <router-link v-bind:to="'work/'+workids[index]">
                  <div class="swiper-titleText">
                    <p><span v-html="workstudents[index]"></span><br>&mdash;<br><span v-html="worktitles[index]"></span></p>
                  </div>
                </router-link>
              </div>
            </div>

          </div>

        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination-wrapper">
          <div v-bind:class="'swiper-pagination'+this.categoryyear" class="swiper-pagination"></div>
        </div>
      </div>

    </div>
  </div>
  <div v-on:click="this.expandImages" class="listpostsImagesEvent">
    <!-- <h1>In Images</h1> -->
    <h1 v-if="this.showImages">In Text</h1>
    <h1 v-else>In Images</h1>
  </div>
</div>
</template>

<script>
export default {
  name: 'listpostsImages',
  props: ['categoryyear', 'featuredimages', 'worktitles', 'workstudents', 'workids'],
  data() {
    return {
      showImages: false,
      swiperObject: {},
      sliderHeight: 0
    }
  },
  methods: {
    expandImages: function(id) {
      // alert('expaaand')
      this.$emit('emittoggleHidePostList')
      this.showImages = !this.showImages
      if (this.showImages) {
        this.runSlider()
      }

    },

    collapseImages: function() {

    },

    runSlider: function() {
      var vm = this


      if (Object.keys(this.swiperObject).length === 0) {
        this.swiperObject = new Swiper('.swiper-container' + this.categoryyear, {
          pagination: '.swiper-pagination' + this.categoryyear,
          paginationClickable: true,
          autoHeight: true,
          lazyLoading: true,
          preloadImages: false,
          lazyLoadingInPrevNext: true,
          // lazyLoadingOnTransitionStart: true,
          lazyLoadingClass: 'swiper-lazy',
          onLazyImageReady: function(swiper) {
            swiper.updateAutoHeight()
          }
        });
      }
    }

  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>@import "../scss/globalVars.scss";

.listpostsImages {

    width: 100%;
    // width: calc(100% - #{$mainHeaderHeight});
    border-top: $mainBorderStyle;

    .listpostsImagesInner {

        // background: red;
        max-height: 0;
        overflow: hidden;
        border-bottom: 0 solid black;

        -webkit-transition: max-height 0.5s, border 0.5s, padding 0.2s;
        -moz-transition: max-height 0.5s, border 0.5s, padding 0.2s;
        transition: max-height 0.5s, border 0.5s, padding 0.2s;
        .swiper-container {
            .swiper-title {
                pointer-events: none;
                position: absolute;
                height: 100%;
                width: 50%;
                top: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                .swiper-titleInner {
                    pointer-events: default;
                    max-width: $mainHeaderHeight*6;
                    border: $mainBorderStyle;
                    p {
                        margin: 0;
                        text-align: center;
                    }

                    a {
                        text-decoration: none;
                    }
                    .swiper-titleText {
                        background: $mainBackground;
                        padding: $mainPadding;

                    }

                }

            }

        }

        &.expanded {
            padding-top: $mainPadding;
            padding-bottom: $mainPadding;
            max-height: 3000px;
            border-bottom: $mainBorderStyle;
            // overflow-y:auto;
            -webkit-transition: max-height 0.5s, border 0.5s, padding 0.5s;
            -moz-transition: max-height 0.5s, border 0.5s, padding 0.5s;
            transition: max-height 0.5s, border 0.5s, padding 0.5s;
        }

        img {
            margin: 0 auto;
            display: block;
            max-height: 80vh;
            width: auto;
        }
    }
}

.listpostsImagesEvent {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background: $mainBackgroundPink;
    width: $mainHeaderHeight+1;
    /* line-height of .wrapper div:first-child span */
    overflow: hidden;
    white-space: nowrap;
    //  background: red
    border-left: $mainBorderStyle;
    border-bottom: $mainBorderStyle;
    border-top: $mainBorderStyle;
    // border-right: $mainBorderStyle;
}
.listpostsImagesEvent h1 {
    -moz-transform-origin: 0 50%;
    -moz-transform: rotate(-90deg) translate(-50%, 50%);
    -webkit-transform-origin: 0 50%;
    -webkit-transform: rotate(-90deg) translate(-50%, 50%);
    -o-transform-origin: 0 50%;
    -o-transform: rotate(-90deg) translate(-50%, 50%);
    -ms-transform-origin: 0 50%;
    -ms-transform: rotate(-90deg) translate(-50%, 50%);
    transform-origin: 0 50%;
    transform: rotate(-90deg) translate(-50%, 50%);
    position: absolute;
    top: 0;
    bottom: 0;
    height: 2em;
    /* line-height of .wrapper div:first-child span */
    margin: auto;
    text-transform: uppercase;
    font-weight: normal;
    font-size: $secFontSize;
    word-spacing: $mainPadding;
    line-height: ($secFontSize*2)+($secFontBaseLineShift*3);
    /* Copy to other locations */
}
</style>

<style lang="scss">@import "../scss/globalVars.scss";

.swiper-pagination-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    // width: 40px;
    width: $mainHeaderHeight*2;
    height: 100%;
    position: absolute;
    top: 0;
    right: $mainHeaderHeight;
}

.swiper-pagination-bullet {
    clear: both;
    display: block;
    margin: 4px !important;
    width: 40px;
    height: 40px;
    background: transparent;
    border: $mainBorderStyle;
    opacity: 1;
    &.swiper-pagination-bullet-active {
        background: $mainBackgroundBlack;

    }
}

.swiper-lazy-loaded {
    }
</style>
