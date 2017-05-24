<template>
<div class="singlePostYear">


  <div v-if="!singleLoaded" class="singleLoaded">

    <h1 class="headerElement">Loading</h1>

  </div>


  <div v-bind:style="{'border-color':yearColor}" class="signlePostHeader">
    <span id="description" v-bind:style="{color:yearColor}" class="headerElement"></span>
    <span id="year" v-bind:style="{color:yearColor}" class="headerElement alignCenter">Year<br class="tabletView" /> {{year}}</span>
    <!-- <span v-bind:style="{color:yearColor}" class="headerElement alignRight" v-text=""><router-link to="/">Back</router-link></span> -->

    <span v-bind:style="{color:yearColor}" v-if="showIndexFirst" class="headerElement alignRight" v-text=""><a @click="goBack()">Back</a></span>
    <span v-bind:style="{color:yearColor}" v-else class="headerElement alignRight" v-text=""><a @click="goBackNone()">Back</a></span>
    <!--
    <span  v-bind:style="{color:yearColor}" v-else class="headerElement alignRight" v-text=""><router-link :to="{ path: '/', query: { yearview: yearviewquery }}">Back</router-link></span> -->

  </div>
  <div class="postcontentWrapper">
    <div class="postcontentWrapperInner">
      <div class="left">

        <div class="postcontentWrapperTitle">
<!--
          <p class="splashTitle" v-bind:style="{color:yearColor, 'border-color':yearColor,'transform':'skewX('+yearTitleSkew+'deg) rotate('+yearTitleRotate+'deg)', '-webkit-transform':'skewX('+yearTitleSkew+'deg) rotate('+yearTitleRotate+'deg)', '-ms-transform:':'skewX('+yearTitleSkew+'deg) rotate('+yearTitleRotate+'deg)'}"
            v-html="postJsonTitle"></p> -->


            <p class="splashTitle" v-bind:style="{color:yearColor, 'border-color':yearColor}" v-html="postJsonTitle"></p>

        </div>

        <!-- <p v-bind:style="{color:yearColor}" class="splashExcerpt" v-html="splashExcerpt"></p> -->
        <div v-html="postJsonContentMedia"></div>
      </div>
      <div v-bind:style="{background:yearColor}" class="right" v-html="postJsonContent"></div>
    </div>
    <div v-bind:style="{color:yearColor}" v-if="postJsonContentFullSize" class="postcontentFullSize">
      <div class="fullSizeContent">

        <img v-for="img in postJsonContentFullSize" v-bind:src="img.sizes.large" v-bind:style="{'max-width': img.width/img.height<1 ? '40%':''}" />
        <!-- <img src="http://placehold.it/1920x1080" /> -->

      </div>
    </div>


  </div>
</div>
</template>


<script>
export default {

  props: {
    showIndex: {
      type: Boolean,
      default: true
    },
    showIndexFirst: {
      type: Boolean,
    },
  },


  methods: {

    goBack: function() {
      // alert('hey')
      this.$router.go(-1)

    },


    goBackNone: function() {

      setTimeout(function() {
        window.scrollTo(0, 0)
      }, 500)
      this.$router.push({
        path: '/',
        query: {
          yearview: this.yearviewquery
        }
      })

    },

    getContent: function(yearCategory) {

      this.$http.get('http://meia.pzwart.nl/backend/wp-json/wp/v2/categories?search=' + yearCategory ).then(function(response) {
        this.$http.get(response.body[0]._links['wp:post_type'][1].href).then(function(response) {
          this.postJsonContent = response.body[0].acf.text_field
          this.postJsonTitle = response.body[0].title.rendered
          this.splashExcerpt = response.body[0].acf.excerpt
          this.postJsonContentMedia = response.body[0].acf.media_field
          this.postJsonContentFullSize = response.body[0].acf.full_size
          this.yearTitleSkew = response.body[0].acf.title_skew.toString()
          this.yearTitleRotate = response.body[0].acf.title_rotate.toString()

          window.fitText(this.$el.querySelector('.splashTitle'));



          this.$http.get('http://meia.pzwart.nl/backend/wp-json/wp/v2/categories/' + response.body[0].categories[0]).then(function(response) {
            this.year = response.body.name
            this.yearColor = response.body.acf.yearcolor

            var vm = this
            setTimeout(function() {
              vm.singleLoaded = true;
              // vm.indexLoaded = true
            }, 500)
            this.yearviewquery = this.$route.query.yearview
          })

        })

        // if(this.postJsonContent.length === 0){
        // this.postJsonContent = response.body.content.rendered
        // this.postJsonTitle = response.body.title.rendered

        // }
      })
    }
  },
  created: function() {
    this.getContent(this.$route.params.yearCategory)
  },

  data() {
    return {
      postJsonContent: '',
      postJsonTitle: '',
      postJsonContentMedia: '',
      postJsonContentFullSize: '',
      year: '',
      splashExcerpt: '',
      yearColor: '',
      singleLoaded: false,
      yearviewquery: '',
      yearTitleRotate:'0',
      yearTitleSkew:'0'
    }
  },

}
</script>

<style scoped lang="scss">
@import "../scss/globalVars.scss";

.singleLoaded {
    background-color: $mainBackgroundBlack;
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 99999999999;
    display: flex;
    .headerElement {
        margin: 0;
        color: $mainBackground;
        text-transform: uppercase;
        font-weight: normal;

        width: 33.33333%;
        font-size: $secFontSize;
        @include media("<tablet") {
            font-size: $secFontSizeTablet;
        }

        padding: $mainPadding/1.8 $mainPadding $mainPadding;
        // top: $secFontBaseLineShift;
    }
}

.singlePostYear {
    .signlePostHeader {
        // background: red;

        a {
            text-decoration: none;
            color: inherit;
            cursor: pointer;
            &:hover {
                border-bottom: 1px solid;
                border-color: inherit;
            }
        }

        position: fixed;
        width: 100%;
        z-index: 999;
        & + * {
            margin-top: $mainHeaderHeight;
        }

        // color: $mainBackgroundBlack;

        // background: $mainBackground;
        display: flex;
        align-items: center;
        justify-content: center;
        height: $mainHeaderHeight;
        // border-top: $mainBorderStyle;
        border-bottom: 1px solid $mainBackground;
        height: $mainHeaderHeight;
        background: $mainBackgroundBlack;

        .headerElement {
            color: $mainBackground;
            text-transform: uppercase;
            font-weight: normal;
            margin: 0;
            width: 33.33333%;
            font-size: $secFontSize;
            @include media("<tablet") {
                font-size: $secFontSizeTablet;
                top: $secFontBaseLineShiftTablet;
            }
            padding: $mainPadding;
            top: $secFontBaseLineShift;
            position: relative;
        }

        #description {
            &:after {
                content: "Graduation description";
            }
            @include media("<tablet") {
                &:after {
                    content: "Outline";
                }
            }
        }

        // #year {
        //     &:after {
        //         content: "Graduation";
        //     }
        //     @include media("<tablet") {
        //         &:before {
        //             content: "Year";
        //         }
        //     }
        // }

        .alignCenter {
            text-align: center;
            padding: 0;

        }
        .alignRight {
            text-align: right;
        }

        div {
            // font-size: 10px !important;

        }
    }

    .postcontentWrapper {
        img {
            // max-width: 10px;
        }
        width: 100%;
        clear: both;
        display: inline-block;
        @include media("<tablet") {
            overflow-x: hidden;
        }
        .postcontentWrapperTitle {


            background: $mainBackgroundBlack;
            padding-bottom: $mainPadding*2;
            padding-top: $mainPadding;

            @include media("<tablet") {
                padding-top: $mainPadding*2;
            }

            // p {
            //     width: 75%;
            //     margin: 0 auto;
            //     text-align: center;
            //     margin-top: $mainPadding;
            //     padding-top: $mainPadding*4.5;
            //     padding-bottom: $mainPadding*4;
            //     padding-left: 9%;
            //     padding-right: 10%;
            //     border: $mainBorderStyle;
            //     border-color: blue;
            //     border-radius: 100%;
            //     font-size: 64px;
            //     line-height: 64px;
            //     font-weight: 900;
            //     @include media("<tablet") {
            //         font-size: 32px;
            //         line-height: 32px;
            //         margin-bottom: 0;
            //
            //     }
            //     color: $mainBackground;
            //
            // }

            p {
                font-size: 64px;
                line-height: 64px;
                font-weight: 900;
                @include media("<tablet") {
                    font-size: 32px;
                    line-height: 32px;
                    margin-bottom: 0;

                }

                color: $mainBackground;

            }


        }

        .postcontentWrapperInner {
            // width:100px;
            display: box;
            display: -moz-box;
            -moz-box-orient: horizontal;
            display: -webkit-box;
            -webkit-box-orient: horizontal;
            box-orient: horizontal;
            @include media("<tablet") {
                display: block;
            }
            .splashExcerpt {
                padding-bottom: $mainPadding;
                margin-bottom: 0;
            }

            .left {
                width: 50%;
                @include media("<tablet") {
                    width: 100%;
                    padding-top: 0;
                }
                -moz-box-flex: 1.0;
                -webkit-box-flex: 1.0;
                -ms-flex: 1.0;
                box-flex: 1.0;
                padding: $mainPadding;
                border-right: $mainBorderStyle;
                background: $mainBackgroundBlack;
                color: $mainBackground;

            }
            .right {
                background: $mainBackground;
                padding: $mainPadding;
                width: 50%;
                @include media("<tablet") {
                    width: 100%;
                    padding-top: $mainPadding;

                }
                -moz-box-flex: 1.0;
                -webkit-box-flex: 1.0;
                -ms-flex: 1.0;
                box-flex: 1.0;
            }

        }

    }

}
</style>

<style lang="scss">
@import "../scss/globalVars.scss";
.singlePostYear {

    .postcontentWrapper {

        .postcontentFullSize {
            width: 100%;
            background: $mainBackgroundBlack;
            padding: $mainPadding;
            img {
                max-width: 100%;
                margin: 0 auto;
                display: block;
                @include media(">desktop") {
                    max-width: 65%;

                }
            }

        }
        color: $mainBackgroundBlack;

        .left {
            p:first-of-type {
                margin-top: 0;
            }
            p:last-of-type {
                margin-bottom: 0;
            }
        }
        .right {
            p:first-of-type {
                margin-top: 0;
            }
            p:last-of-type {
                margin-bottom: 0;
            }
        }
        img {
            max-width: 100%;
            height: auto;
            margin: 0 auto;
            display: block;
            padding-bottom: $mainPadding;
            &:last-of-type {
                padding-bottom: 0;
            }
        }

        p {
            font-size: $thirdFontSize;
            @include media("<tablet") {
                font-size: $thirdFontSizeTablet;
            }
            @include media(">desktop") {
                font-size: $desktopFontSize;
            }
        }

    }

    .wp-video {
        width: 100% !important;
    }

    audio,
    iframe,
    video {
        background: $mainBackgroundBlack;
        margin: 0 auto;
        display: block;
        max-width: 100%;
    }

}
</style>
