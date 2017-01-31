<template>
<div>
  <div v-show="showImages" class="listpostsImages">
    <div class="listpostsImagesInner">
      <!-- {{this.featuredimages[0]}} -->
      <div v-bind:class="'swiper-container'+this.categoryyear" class="swiper-container">
        <div class="swiper-wrapper">

          <div v-bind:class="'swiper-slide'+categoryyear" class="swiper-slide" v-for="(featuredimage, index) in featuredimages">
            <img v-bind:src="featuredimage.large" />
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
      this.$emit('emittoggleHideSinglePosts')
      this.showImages = !this.showImages
      if (this.showImages) {
        console.log('gio')
        var savedThis = this

        // savedThis.runSlider()
        setTimeout(function() {
          savedThis.runSlider()
        }, 1);

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
          onInit: function(swiper) {
            var containerHeight = vm.$el.getElementsByClassName("swiper-wrapper")[0].offsetHeight
            vm.$emit('emitSetImageHeight', containerHeight)
          },
          onTransitionEnd: function(swiper) {
            var containerHeight = vm.$el.getElementsByClassName("swiper-wrapper")[0].offsetHeight
            vm.$emit('emitSetImageHeight', containerHeight)
          }
        });
      } else {
        var containerHeightInit = vm.$el.getElementsByClassName("swiper-wrapper")[0].offsetHeight
        vm.$emit('emitSetImageHeight', containerHeightInit)

      }
    }

  },


  //   watch: {
  //   sliderHeight: function (sliderHeight) {
  //     console.log(sliderHeight)
  //     this.$emit('emitSetListHeight')
  //     // this.$emit('emitSetListHeight',[1, 100])
  //     // this.$emit('emitSetListHeight',[2, 100])
  //     // this.$emit('emitSetListHeight',[3, 100])
  //
  //   },
  //   setheight: function (setheight) {
  //     console.log('change')
  //
  //   }
  //
  // },

  // mounted: function() {
  // this.runSlider()
  // }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.listpostsImages {
    width: calc(100% - 40px);
    .listpostsImagesInner {
        // background: red;
        border-bottom: 1px solid black;

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
    width: 40px;
    /* line-height of .wrapper div:first-child span */
    overflow: hidden;
    white-space: nowrap;
    //  background: red
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
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
    font-weight: bold;
    font-size: 1em;
    line-height: 2em;
    /* Copy to other locations */
}
</style>
