<template>
<!-- <div v-bind:style="{'max-height':listHeight+'px'}" class="slideIn listSingle"> -->
<!-- <div class="splashPost" v-on:click="expandSplash()" v-bind:class="{ expanded: showSplash }"> -->


<div class="splashPost" v-bind:class="{ expanded: showSplash }">

  <div class="splashTextContentWrap">


    <div class="titleWrap">

      <router-link class="" v-bind:to="{ path: 'year/'+year,         query: {
              yearview: yearviewIndex
            }}">
        <h1 class="splashTitle" v-bind:style="{color:this.yearColor, 'border-color':this.yearColor,'transform':'skewX('+yearTitleSkew+'deg) rotate('+yearTitleRotate+'deg)', '-webkit-transform':'skewX('+yearTitleSkew+'deg) rotate('+yearTitleRotate+'deg)', '-ms-transform:':'skewX('+yearTitleSkew+'deg) rotate('+yearTitleRotate+'deg)'}"
          v-html="yearTitle"></h1>
      </router-link>
    </div>

    <div v-if="featuredimageSplash" v-bind:style="{color:this.yearColor}" v-html="splashExcerpt" class="blurbWrap">
    </div>

  </div>

  <div class="splashImage">

    <!-- <div v-bind:style="{color:this.yearColor}" v-html="splashExcerpt" class="blurbWrap">
        </div> -->
    <div v-if="!featuredimageSplash" v-bind:style="{color:this.yearColor}" v-html="splashExcerpt" class="blurbWrap">
    </div>
    <div v-if="featuredimageSplash" class="splashImageInner">
      <img v-bind:src="featuredimageSplash.sizes.large" />
    </div>
  </div>

  <div v-bind:style="{color:this.yearColor, 'border-color':this.yearColor}" class="navigationWrap">
    <div v-bind:style="{'border-color':this.yearColor}" class="border-right singleContentInnerLinkOuter" v-on:click="goToGraduates()">
      <!-- <span>Graduates ↓</span> -->
      <span>Graduates</span>
    </div>
    <div v-bind:style="{color:this.yearColor, 'border-color':this.yearColor}" class="singleContentInnerLinkOuter">
      <template v-if="this.splashProgramme">
        <div @click="expandedProgramme=!expandedProgramme" class="singleContentInnerLink border-right" v-bind:style="{'border-color':this.yearColor}">
          <div>
            <span><span>Programme</span></span>
          </div>
        </div>
        <div class="singleContentInnerLink">
          <!-- <router-link v-bind:to="'year/'+year">
            <div>
              <span><span>Read More</span></span>
            </div>
          </router-link> -->

          <router-link class="" v-bind:to="{ path: 'year/'+year,         query: {
                    yearview: yearviewIndex
                  }}">
                  <div>
                    <span>To Graduation Page</span>
                  </div>
          </router-link>

        </div>
</template>
      <template  v-else>
<div class="">
  <router-link class="" v-bind:to="{ path: 'year/'+year,         query: {
            yearview: yearviewIndex
          }}">
          <div>
            <span>To Graduation Page</span>
          </div>
  </router-link>

</div>
</template>
    </div>

  </div>
  <div v-if="expandedProgramme" class="splashProgramme" v-bind:style="{'color':this.yearColor, 'border-color':this.yearColor}" v-html="splashProgramme">

  </div>

</div>
</template>

<script>
export default {
  props: ['categorylink', 'listpostId', 'yearColor', 'year', 'yearviewIndex'],
  components: {
    // Listposts,
    // Splashposts
    // Singlepostindex,
    // ListpostsImages
  },

  data() {
    return {
      hidePostList: false,
      yearTitle: '',
      yearTitleSkew: '0',
      yearTitleRotate: '0',
      featuredimageSplash: '',
      splashExcerpt: '',
      splashProgramme: '',
      showSplash: true,
      expandedProgramme: false,
      // yearColor:''
    }
  },
  created: function() {
    // console.log(this.categorylink)
    // INCLUDE YEAR SPLASH (ID=13) TAGS!
    //
    this.$http.get(this.categorylink).then(function(response) {
      if (response.body.length > 0) {
        this.yearTitle = response.body[0].title.rendered
        this.yearTitleSkew = response.body[0].acf.title_skew.toString()
        this.yearTitleRotate = response.body[0].acf.title_rotate.toString()
        this.featuredimageSplash = response.body[0].acf.featuredimage
        this.splashExcerpt = response.body[0].acf.excerpt
        this.splashProgramme = response.body[0].acf.programme
        window.fitText(this.$el.querySelector('.splashTitle'));
      }

    })

  },


  methods: {
    expandSplash: function(id) {
      this.showSplash = !this.showSplash
    },

    collapseSplash: function() {
      this.showSplash = !this.showSplash
      // this.postJsonContent = ''
    },
    goToGraduates: function() {
      this.$SmoothScroll(document.getElementById(this.listpostId).offsetTop - 79, 250);
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/globalVars.scss";

.splashPost {
    position: relative;
    background: $mainBackgroundBlack;
    // color: $mainBackground;
    color: $mainBackgroundBlack;

    max-height: 0;
    overflow: hidden;
    // border-top: 0 solid black;
    width: 100%;
    -webkit-transition: max-height 0.5s, border 0.5s;
    -moz-transition: max-height 0.5s, border 0.5s;
    transition: max-height 0.5s, border 0.5s;

    .splashProgramme {
        padding: $mainPadding;
        border-top: $mainBorderStyle;
        color: $mainBackgroundBlack;
        clear: both;
        margin: 0;
        p {
            margin: 0;

        }
        font-size: $thirdFontSize;
        @include media(">desktop") {
            font-size: $desktopFontSize;
        }
        @include media("<tablet") {
            font-size: $thirdFontSizeTablet;
            border-top: 0;

        }
    }

    .splashImage {
        width: 50%;
        @include media("<tablet") {
            width: 100%;

        }
        position: relative;
        // position: absolute;
        float: right;
        //
        .splashImageInner {
            // position: absolute;
            // height: 100%;
            // width: 100%;
            margin: $mainPadding;

            width: calc(100% - 40px);
            img {
                width: 100%;
            }

            //   background: url("http://api-placeholder.template-studio.nl/wp-content/uploads/2017/04/Opening1-1024x683.jpg");
            //   background-size: cover;
            //   background-repeat: no-repeat;
            //   background-position: 50% 50%;

        }
    }

    .splashTextContentWrap {
        width: 50%;
        float: left;
        @include media("<tablet") {
            width: 100%;

        }
    }

    .titleWrap {
        width: 100%;
        padding: $mainPadding;
        @include media("<tablet") {
            // padding-bottom: 0;
            padding-bottom: $mainPadding*2;

        }

        a {
            text-decoration: none;
        }
        h1 {
            // text-transform: uppercase;
            width: 75%;
            margin: 0 auto;
            text-align: center;
            margin-top: $mainPadding;
            margin-bottom: $mainPadding;
            padding: $mainPadding*4.5 10% $mainPadding*4 9%;
            border: $mainBorderStyle;
            border-color: blue;
            border-radius: 100%;
            // word-break: break-all;
            // color: $mainBackground;

            // color: red;
            font-size: 64px;
            font-weight: 900;
            line-height: 64px;
            @include media("<tablet") {
                font-size: 32px;
                line-height: 32px;
            }
            // width: 50%;
            // float: right;

        }

        p {
            // color: $mainBackground;
            color: $mainBackgroundBlack;

            margin: 0;
            font-size: $secFontSize;
            @include media("<tablet") {
                font-size: $secFontSizeTablet;
            }
            // width: 50%;
            float: left;
        }
    }

    .navigationWrap {
        cursor: pointer;
        width: 100%;
        clear: both;
        font-size: $secFontSize;
        @include media("<tablet") {
            font-size: $secFontSizeTablet;
        }
        border-top: 1px solid $mainBackgroundBlack;
        // border-top: 1px solid $mainBackground;
        height: $mainHeaderHeight;
        line-height: $mainHeaderHeight;
        .border-right {
            // border-right: 1px solid $mainBackground;
            border-right: 1px solid $mainBackgroundBlack;

        }

        a {
            color: inherit;
            text-decoration: none;
        }

        .singleContentInnerLinkOuter {

            text-align: center;

            width: 50%;
            float: left;
            @include media("<tablet") {
                width: 100%;
                &.border-right {
                    border-right: 0 !important;
                    border-bottom: $mainBorderStyle;
                }
                &:last-of-type {
                    border-bottom: 0;

                }

            }
        }

        .singleContentInnerLink {
            text-align: center;
            width: 50%;
            float: left;
            span {
                margin: 0;
                text-align: center;
            }

        }
    }

    &.expanded {
        max-height: 10000px;
        // border-top: $mainBorderStyle;
        -webkit-transition: max-height 0.5s, border 0.5s;
        -moz-transition: max-height 0.5s, border 0.5s;
        transition: max-height 0.5s, border 0.5s;
    }
}
</style>


<style lang="scss">
@import "../scss/globalVars.scss";

.splashProgramme {
    p:first-of-type {
        margin-top: 0;
    }
    p:last-of-type {
        margin-bottom: 0;
    }
}
.blurbWrap {
    padding: $mainPadding;
    // padding-top: $mainPadding;

    clear: both;
    // color: $mainBackground;
    // width: 50%;
    // margin-top: $mainPadding;
    @include media("<tablet") {
        width: 100%;
        padding-top: 0;
    }
    p {
        font-size: $thirdFontSize;
        @include media("<tablet") {
            font-size: $thirdFontSizeTablet;
        }
        @include media(">desktop") {
            font-size: $desktopFontSize;
        }

        margin: 0;
    }
}
</style>
