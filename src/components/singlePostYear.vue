<!-- <template>
<div class="singlePost">
  <h1 v-text="postJsonTitle"></h1>
  <hr>
  <hr>
  <div v-html="postJsonContent"></div>
</div>
</template> -->

<template>
<div class="singlePostYear">


  <div v-if="!singleLoaded" class="singleLoaded">

    <h1 class="headerElement">Loading</h1>

  </div>


  <div v-bind:style="{'border-color':yearColor}" class="signlePostHeader">
    <span id="description" v-bind:style="{color:yearColor}" class="headerElement"></span>
    <span id="year" v-bind:style="{color:yearColor}" class="headerElement alignCenter">Year<br class="tabletView" /> {{year}}</span>
    <span v-bind:style="{color:yearColor}" class="headerElement alignRight" v-text=""><router-link to="/">Back</router-link></span>

  </div>
  <div class="postcontentWrapper">
    <div class="postcontentWrapperTitle">
      <p v-bind:style="{color:yearColor}">{{postJsonTitle}}</p>

    </div>
    <div class="postcontentWrapperInner">
      <div class="left">
        <p v-bind:style="{color:yearColor}" class="splashExcerpt" v-html="splashExcerpt"></p>
        <div v-html="postJsonContentMedia"></div>
      </div>
      <div v-bind:style="{background:yearColor}" class="right" v-html="postJsonContent"></div>
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
  },


  methods: {
    getContent: function(yearCategory) {

      this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/categories?search=' + yearCategory).then(function(response) {
        this.$http.get(response.body[0]._links['wp:post_type'][1].href).then(function(response) {
          this.postJsonContent = response.body[0].acf.text_field
          this.postJsonTitle = response.body[0].title.rendered
          this.splashExcerpt = response.body[0].acf.excerpt
          this.postJsonContentMedia = response.body[0].acf.media_field



          this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/categories/' + response.body[0].categories[0]).then(function(response) {
            this.year = response.body.name
            this.yearColor = response.body.acf.yearcolor

            var vm = this
            setTimeout(function() {
              vm.singleLoaded = true;
              // vm.indexLoaded = true
            }, 500)

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
      year: '',
      splashExcerpt: '',
      yearColor: '',
      singleLoaded: false

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

.singlePostYear {
    .signlePostHeader {
        // background: red;

        a {
            text-decoration: none;
            color: inherit;
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
        border-top: $mainBorderStyle;
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
            max-width: 10px;
        }
        width: 100%;
        clear: both;
        display: inline-block;
        @include media("<tablet") {
            overflow-x: hidden;
        }
        .postcontentWrapperTitle {
            background: $mainBackgroundBlack;
            padding: $mainPadding;
            p {
                font-size: 90px;
                margin: 0;
                line-height: 90px;
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

<style lang="scss">@import "../scss/globalVars.scss";
.singlePostYear {

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
            font-size: $thirdFontSize;
            @include media("<tablet") {
                font-size: $thirdFontSizeTablet;
            }
        }

    }

}
</style>
