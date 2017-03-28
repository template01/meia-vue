<template>
<div class="singlePost">
  <div class="signlePostHeader">
    <h1 class="headerElement" v-text="postJsonStudent"></h1>
    <h1 class="headerElement alignCenter" >Graduation {{year}}</h1>
    <h1 class="headerElement alignRight" v-text="">Index</h1>

  </div>
  <div class="postcontentWrapper">
    <div class="left">
      <p class="postcontentWrapperTitle" >{{postJsonTitle}}</p>

      <div v-html="postJsonContentMedia"></div>
    </div>
    <div class="right" v-html="postJsonContent"></div>



  </div>
</div>
</template>

<script>
export default {

  props: ['showIndex'],

  methods: {
    getContent: function(id) {

      this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/posts/' + id).then(function(response) {
        if (this.postJsonContent.length === 0) {
          this.postJsonContent = response.body.content.rendered
          this.postJsonTitle = response.body.title.rendered
          this.postJsonStudent = response.body.acf.student_name
          this.postJsonContentMedia = response.body.acf.media_field
          this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/categories/' + response.body.categories[0]).then(function(response) {
            this.year = response.body.name
          })
        }
      })
    }
  },
  created: function() {
    // this.year = this.$route.query.year

    this.getContent(this.$route.params.id)
  },

  data() {
    return {
      postJsonContent: '',
      postJsonTitle: '',
      postJsonStudent: '',
      postJsonContentMedia:'',
      year: ''
        // postJsonYear: '',
    }
  },

}
</script>


<style scoped lang="scss">@import "../scss/globalVars.scss";

.singlePost {
    .signlePostHeader {
        // background: red;

        position: fixed;
        width: 100%;
        z-index: 999999999999999;
        & + * {
          margin-top: $mainHeaderHeight
        }

        color: $mainBackgroundBlack;

        background: $mainBackgroundPink;
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

        display: box;
        display: -moz-box;
        -moz-box-orient: horizontal;
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        box-orient: horizontal;
        background: $mainBackgroundPink;
        padding-bottom:  $mainPadding*2;


        .left {
          background: $mainBackgroundPink;
            width: 50%;
            -moz-box-flex: 1.0;
            -webkit-box-flex: 1.0;
            -ms-flex: 1.0;
            box-flex: 1.0;
            padding: $mainPadding;
            padding-top: $mainPadding*2;
            border-right: $mainBorderStyle;

            .postcontentWrapperTitle{
              font-size: $thirdFontSize;
              text-transform: uppercase;
              margin-bottom: $mainPadding*2;
            }
        }
        .right {
          background: $mainBackgroundPink;
          padding: $mainPadding;
          padding-top: $mainPadding*2;
            width: 50%;
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
                p:first-of-type{
                  margin-top: 0;
                }
              }
              .right {
                p:first-of-type{
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

        p{
          font-size: $thirdFontSize
        }

    }

}
</style>
