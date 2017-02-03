<template>
<div>
  <div class="listpostsImages">
    <div v-bind:class="{ expanded: showImages }" class="listpostsImagesInner">
      <!-- {{this.featuredimages[0]}} -->
      <div v-bind:class="'swiper-container'+this.categoryyear" class="swiper-container">
        <div class="swiper-wrapper">

          <div v-bind:class="'swiper-slide'+categoryyear" class="swiper-slide" v-for="(featuredimage, index) in featuredimages">
            <img class="swiper-lazy" v-bind:data-src="featuredimage.large" />
            <!-- <img data-src="http://lorempixel.com/1600/1200/nature/1" class="swiper-lazy"> -->
            <!-- <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div> -->
          </div>

        </div>
        <!-- Add Pagination -->
        <div v-bind:class="'swiper-pagination'+this.categoryyear" class="swiper-pagination"></div>
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
  props: ['categoryyear', 'featuredimages'],
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
          onLazyImageReady: function(swiper){
            swiper.updateAutoHeight()
          }
        });
      }
    }

  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../scss/globalVars.scss";

.listpostsImages {

    width: calc(100% - #{$mainHeaderHeight});
    border-top: $mainBorderStyle;

    .listpostsImagesInner {
        // background: red;
        max-height: 0px;
        overflow: hidden;
        border-bottom: 0px solid black;

        -webkit-transition: max-height 0.5s, border 0.5s;
        -moz-transition: max-height 0.5s, border 0.5s;
        transition: max-height 0.5s, border 0.5s;


        &.expanded{
          max-height: 3000px;
          border-bottom: $mainBorderStyle;
          // overflow-y:auto;
          -webkit-transition: max-height 0.5s, border 0.5s;
          -moz-transition: max-height 0.5s, border 0.5s;
          transition: max-height 0.5s, border 0.5s;
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
    width: $mainHeaderHeight;
    /* line-height of .wrapper div:first-child span */
    overflow: hidden;
    white-space: nowrap;
    //  background: red
    border-left: $mainBorderStyle;
    border-bottom: $mainBorderStyle;
    border-top: $mainBorderStyle;
    border-right: $mainBorderStyle;
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
    text-transform:uppercase;
    font-weight: normal;
    font-size: $secFontSize;
    word-spacing: $mainPadding;
    line-height: ($secFontSize*2)+($secFontBaseLineShift*3);
    /* Copy to other locations */
}
</style>
