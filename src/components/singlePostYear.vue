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
  <div class="signlePostHeader">
    <h1 class="headerElement">Graduation description</h1>
    <h1 class="headerElement alignCenter">Graduation {{year}}</h1>
    <h1 class="headerElement alignRight" v-text="">Index</h1>
  </div>
  <div class="postcontentWrapper">
    <div class="postcontentWrapperTitle">
      <p>{{postJsonTitle}}</p>

    </div>
    <div class="postcontentWrapperInner">
      <div class="left">
        <p class="splashExcerpt" v-html="splashExcerpt"></p>
        <div v-html="postJsonContentMedia"></div>
      </div>
      <div class="right" v-html="postJsonContent"></div>
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
    }
  },

  methods: {
    getContent: function(yearCategory) {

      this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/categories?search=' + yearCategory).then(function(response) {
        this.$http.get(response.body[0]._links['wp:post_type'][0].href + '&tags=13').then(function(response) {
          console.log(response)
          this.postJsonContent = response.body[0].content.rendered
          this.postJsonTitle = response.body[0].title.rendered
          this.splashExcerpt = response.body[0].acf.excerpt
          this.postJsonContentMedia = response.body[0].acf.media_field



          this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/categories/' + response.body[0].categories[0]).then(function(response) {
            this.year = response.body.name
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
      splashExcerpt: ''

    }
  },

}
</script>

<style scoped lang="scss">@import "../scss/globalVars.scss";

.singlePostYear {
    .signlePostHeader {
        // background: red;

        position: fixed;
        width: 100%;
        z-index: 999999999999999;
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
        border-bottom: 1px solid $mainBackgroundPink;
        height: $mainHeaderHeight;
        background: $mainBackgroundBlack;

        .headerElement {
            color: $mainBackgroundPink;
            text-transform: uppercase;
            font-weight: normal;
            margin: 0;
            width: 33.33333%;
            font-size: $secFontSize;
            padding: $mainPadding;
            top: $secFontBaseLineShift;
            position: relative;
        }

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

        .postcontentWrapperTitle {
            background: $mainBackgroundBlack;
            padding: $mainPadding;
            p {
                font-size: 90px;
                margin: 0;
                line-height: 90px;
                font-weight: 900;
                color: $mainBackgroundPink;
                margin-bottom: $mainPadding;

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

            .splashExcerpt {
                padding-bottom: $mainPadding;
                margin-bottom: 0;
            }

            .left {
                width: 50%;
                -moz-box-flex: 1.0;
                -webkit-box-flex: 1.0;
                -ms-flex: 1.0;
                box-flex: 1.0;
                padding: $mainPadding*2 $mainPadding $mainPadding;
                border-right: $mainBorderStyle;
                background: $mainBackgroundBlack;
                color: $mainBackgroundPink;

            }
            .right {
              background: $mainBackgroundPink;
                padding: $mainPadding*2 $mainPadding $mainPadding;
                width: 50%;
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
        }
        .right {
            p:first-of-type {
                margin-top: 0;
            }

        }
        img {
            max-width: 100%;
            height: auto;
            margin: 0 auto;
            display: block;
            padding-bottom: $mainPadding;
        }

        p {
            font-size: $thirdFontSize;
        }

    }

}
</style>
