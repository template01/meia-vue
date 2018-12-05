<template>
<div id="footer">
  <div class="footerContentWrapper">
    <div class="left">
      <p>ABOUT</p>
      <p v-html="about"></p>
    </div>
    <div class="right">
      <p>COLOPHON</p>
      <p v-html="colophon"></p>
    </div>

  </div>
</div>
</template>

<script>
export default {
  // props: {
  //   name: {
  //     type: String,
  //     default: 'Veeeue!'
  //   }
  // }
  data() {
    return {
      about: '',
      colophon: ''
    }
  },

  methods: {
    getContent: function(yearCategory) {

      this.$http.get(this.$apiUrl+'wp/v2/pages?per_page=100').then(function(response) {
        // this.postJsonTitle = response.body[0].title.rendered
        this.about = response.body[0].acf.about
        this.colophon = response.body[0].acf.colophon
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

}
</script>

<style scoped lang="scss">@import "../scss/globalVars.scss";

#footer {
    background: $mainBackground;
    // padding: $mainPadding;
    p {
        margin: 0;
        color: $mainBackgroundBlack;
        font-size: $secFontSize;
        @include media("<tablet") {
            font-size: $secFontSizeTablet;
        }
    }

    .footerContentWrapper {

        width: 100%;
        clear: both;
        display: inline-block;

        .left {
            @include media("<tablet") {
              width: 100%;
              padding-bottom: 0;

            }
            width: 50%;
            float: left;
            padding: $mainPadding;
            // padding-top: $mainPadding*2;
            // border-right: $mainBorderStyle;
        }
        .right {
            @include media("<tablet") {
              width: 100%;
              padding-top: 0;

            }
            padding: $mainPadding;
            // padding-top: $mainPadding*2;
            width: 50%;
            float: right;
        }

    }

}
</style>
