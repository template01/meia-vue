<template>
<div class="singlePost">



  <div v-if="!singleLoaded" class="singleLoaded">

    <h1 class="headerElement">Loading</h1>

  </div>

  <div class="signlePostHeader" v-bind:style="{background:yearColor}">
    <!-- <h1 class="headerElement" v-text="postJsonStudent"></h1> -->
    <span class="headerElement">Work</span>
    <span class="headerElement alignCenter">Year<br class="tabletView" /> {{year}}</span>

    <span v-if="showIndexFirst" class="headerElement alignRight" v-text=""><a @click="goBack()">Back</a></span>
    <span v-else="showIndexFirst" class="headerElement alignRight" v-text=""><a @click="goBackNone()">Back</a></span>
    <!-- <span v-else class="headerElement alignRight" v-text=""><router-link :to="{ path: '/', query: { yearview: yearviewquery }}">Back</router-link></span> -->


  </div>
  <div class="postcontentWrapper" v-bind:style="{background:yearColor}">
    <div class="left" v-bind:style="{background:yearColor}">
      <p class="postcontentWrapperTitle"><span v-html="postJsonStudent"></span><br /><span v-html="postJsonTitle"></span></p>
      <div class="notTabletView" v-html="postJsonContentMedia"></div>
    </div>
    <div class="right" v-bind:style="{background:yearColor}">
      <div v-html="postJsonContent">
      </div>
      <div v-if="postJsonAttachedField" class="attachments">
        <p class="title">
          Attachments:
        </p>
        <ul>
          <li v-for="file in postJsonAttachedField">
            <span class="attachmentInner">
            <span v-html="file.prettytitle"></span>
            <span>
              <a v-bind:href="file.attachments.url">Download</a>
            </span>
            <span class="description" v-html="file.description"></span>
            </span>
          </li>
        </ul>
      </div>

      <div class="tabletView paddedTop" v-html="postJsonContentMedia"></div>

    </div>
  </div>
</div>
</template>

<script>
export default {

  props: ['showIndex','loaded','showIndexFirst'],

  methods: {

    goBack: function(){
      // alert('hey')
      this.$router.go(-1)

    },

    goBackNone: function(){

      setTimeout(function(){
        window.scrollTo(0,0)
      },500)
      this.$router.push({ path: '/', query: { yearview: this.yearviewquery }})

    },
    getContent: function(id) {

      this.$http.get('http://meia.pzwart.nl/backend/wp-json/wp/v2/yearpost/' + id + '?per_page=100&per_page=100').then(function(response) {
        if (this.postJsonContent.length === 0) {
          this.postJsonContent = response.body.acf.text_field
          this.postJsonTitle = response.body.title.rendered
          this.postJsonStudent = response.body.acf.student_name
          this.postJsonContentMedia = response.body.acf.media_field
          this.postJsonAttachedField = response.body.acf.attachment_field
          this.$http.get('http://meia.pzwart.nl/backend/wp-json/wp/v2/categories/' + response.body.categories[0] + '?per_page=100').then(function(response) {
            this.year = response.body.name
            this.yearColor = response.body.acf.yearcolor
            var vm = this
            setTimeout(function() {
              vm.singleLoaded = true;
              // vm.indexLoaded = true
            }, 500)

            this.yearviewquery = this.$route.query.yearview
            // console.log(this.$router)
          })
        }
      })
    }
  },
  created: function() {

    this.getContent(this.$route.params.id)
  },

  data() {
    return {
      postJsonContent: '',
      postJsonTitle: '',
      postJsonStudent: '',
      postJsonContentMedia: '',
      postJsonAttachedField: [],
      yearviewquery:'',
      year: '',
      yearColor: '',
      singleLoaded: false
      // postJsonYear: '',
    }
  },

}
</script>


<style scoped lang="scss">@import "../scss/globalVars.scss";





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

.singlePost {
    .signlePostHeader {
        // background: red;

        a {
            text-decoration: none;
            color: inherit;
            cursor: pointer;
            &:hover {
                border-bottom: 1px solid $mainBackgroundBlack;
            }
        }
        position: fixed;
        width: 100%;
        z-index: 999;
        & + * {
            margin-top: $mainHeaderHeight;
        }

        color: $mainBackgroundBlack;

        display: flex;
        align-items: center;
        justify-content: center;
        height: $mainHeaderHeight;
        border-top: $mainBorderStyle;

        .headerElement {
            color: $mainBackgroundBlack;
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

        .paddedTop {
            padding-top: $mainPadding;
        }
        img {
            max-width: 10px;
        }
        width: 100%;
        clear: both;
        @include media("<tablet") {
            display: block;
            overflow-x: hidden;
            padding-bottom: 0;
        }
        display: box;
        display: -moz-box;
        -moz-box-orient: horizontal;
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        box-orient: horizontal;
        padding-bottom: $mainPadding*2;
        padding-top: $mainPadding;

        .attachments {
            margin-top: $mainPadding;
            border-top: $mainBorderStyle;
            @include media("<tablet") {
                border-bottom: $mainBorderStyle;
                // margin-bottom: $mainPadding;

            }
            .title {
                text-transform: uppercase;
                font-weight: normal;
                margin-top: $mainPadding;
                margin-bottom: $mainPadding;
                font-size: $secFontSize;
                @include media("<tablet") {
                    font-size: $secFontSizeTablet;

                }
            }

            .attachmentInner {}

            a {
                text-decoration: none;
                color: inherit;
                border-bottom: 1px solid $mainBackgroundBlack;
            }

            ul {
                padding-left: $mainPadding*2;
                list-style-type: circle;
            }

            li {
                margin-top: 0;
                font-size: $thirdFontSize;
                @include media("<tablet") {
                    font-size: $thirdFontSizeTablet;
                }

                @include media(">desktop") {
                    font-size: $desktopFontSize;
                }
                text-indent: 0;
                padding-left: 0;
                margin-bottom: $mainPadding;
            }

            .description {
                margin-top: $mainPadding/2;
                display: block;
            }
        }

        .left {
            width: 50%;
            @include media("<tablet") {
                width: 100%;
                border-right: 0;

            }

            -moz-box-flex: 1.0;
            -webkit-box-flex: 1.0;
            -ms-flex: 1.0;
            box-flex: 1.0;
            padding: $mainPadding*2 $mainPadding $mainPadding;
            border-right: $mainBorderStyle;

            .postcontentWrapperTitle {
                font-size: $thirdFontSize;
                @include media(">desktop") {
                    font-size: $desktopFontSize;
                }

                @include media("<tablet") {
                    font-size: $thirdFontSizeTablet;
                    margin-bottom: 0;
                    margin-top: $mainPadding;
                }
                span:not(:first-of-type){
                  text-transform: uppercase;
                }
                margin-bottom: $mainPadding*2;
            }
        }
        .right {
            padding: $mainPadding*2 $mainPadding $mainPadding;
            width: 50%;
            @include media("<tablet") {
                width: 100%;
                padding-top: 0;
            }
            -moz-box-flex: 1.0;
            -webkit-box-flex: 1.0;
            -ms-flex: 1.0;
            box-flex: 1.0;
        }

    }

}
</style>

<style lang="scss">@import "../scss/globalVars.scss";
.singlePost {
    .postcontentWrapper {

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

          @include media(">desktop") {
              font-size: $desktopFontSize;
          }

            font-size: $thirdFontSize;
            @include media("<tablet") {
                font-size: $thirdFontSizeTablet;
            }
        }

    }

    .wp-video{
      width: 100% !important;
    }

    video,audio,iframe{
      background: $mainBackgroundBlack;

      margin: 0 auto;
      display: block;
      max-width: 100%;
    }


}
</style>
