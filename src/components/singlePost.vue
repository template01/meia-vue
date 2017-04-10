<template>


<div class="singlePost">

  <div v-if="!singleLoaded" class="singleLoaded">

      <h1 class="headerElement">Loading</h1>

  </div>

  <div class="signlePostHeader" v-bind:style="{background:yearColor}">
    <h1 class="headerElement" v-text="postJsonStudent"></h1>
    <h1 class="headerElement alignCenter">Graduation {{year}}</h1>
    <h1 class="headerElement alignRight" v-text="">Index</h1>

  </div>
  <div class="postcontentWrapper" v-bind:style="{background:yearColor}">
    <div class="left" v-bind:style="{background:yearColor}">
      <p class="postcontentWrapperTitle">{{postJsonTitle}}</p>
      <div v-html="postJsonContentMedia"></div>
    </div>
    <div class="right" v-bind:style="{background:yearColor}">
      <div v-html="postJsonContent">
      </div>
      <div class="attachedFiled">
        <li v-for="file in postJsonAttachedField">

          <a v-bind:href="file.attachments.url">{{file.attachments.title}}</a>
        </li>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {

  props: ['showIndex'],

  methods: {
    getContent: function(id) {

      this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/yearpost/' + id).then(function(response) {
        if (this.postJsonContent.length === 0) {
          this.postJsonContent = response.body.acf.text_field
          this.postJsonTitle = response.body.title.rendered
          this.postJsonStudent = response.body.acf.student_name
          this.postJsonContentMedia = response.body.acf.media_field
          this.postJsonAttachedField = response.body.acf.attachment_field
          this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/categories/' + response.body.categories[0]).then(function(response) {
            this.year = response.body.name
            this.yearColor = response.body.acf.yearcolor
            var vm = this
            setTimeout(function(){
              vm.singleLoaded = true;
              // vm.indexLoaded = true
            },500)
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
      postJsonContentMedia: '',
      postJsonAttachedField: [],
      year: '',
      yearColor:'',
      singleLoaded:false
      // postJsonYear: '',
    }
  },

}
</script>


<style scoped lang="scss">@import "../scss/globalVars.scss";

.singleLoaded{
  background-color: $mainBackgroundBlack;
  position: fixed;
  height: 100%;
  width: 100%;
  z-index:99999999999;
  display: flex;
  .headerElement {
    margin: 0;
    color: $mainBackground;
    text-transform: uppercase;
    font-weight: normal;

      width: 33.33333%;
      font-size: $secFontSize;
      padding: $mainPadding;
      padding-top: $mainPadding/1.8;
      // top: $secFontBaseLineShift;
  }
}


.singlePost {
    .signlePostHeader {
        // background: red;

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
        padding-bottom: $mainPadding*2;

        .left {
            width: 50%;
            -moz-box-flex: 1.0;
            -webkit-box-flex: 1.0;
            -ms-flex: 1.0;
            box-flex: 1.0;
            padding: $mainPadding*2 $mainPadding $mainPadding;
            border-right: $mainBorderStyle;

            .postcontentWrapperTitle {
                font-size: $thirdFontSize;
                text-transform: uppercase;
                margin-bottom: $mainPadding*2;
            }
        }
        .right {
            padding: $mainPadding*2 $mainPadding $mainPadding;
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
