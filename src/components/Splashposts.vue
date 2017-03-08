<template>
<!-- <div v-bind:style="{'max-height':listHeight+'px'}" class="slideIn listSingle"> -->
<div class="splashPost" v-on:click="expandSplash()" v-bind:class="{ expanded: showSplash }">
  <div class="titleWrap">
    <p>Graduation</p>
    <h1>{{yearTitle}}</h1>
  </div>
  <div v-html="splashContent" class="blurbWrap">
  </div>
  <div class="navigationWrap">
    <div>
      <span>↓</span>
      <span>Graduates</span>
      <span>↓</span>
    </div>
    <div>
      <!-- <span>→</span>
      <span>Read More</span>
      <span>→</span> -->
      <span>Read More →</span>
    </div>
  </div>

</div>
</template>

<script>
export default {
  props: ['categorylink'],
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
      splashContent: '',
      showSplash: true
        // listHeight: 0,
        // postsListHeight:0,
    }
  },
  created: function() {
    // console.log(this.categorylink)
    // INCLUDE YEAR SPLASH (ID=13) TAGS!
    //
    this.$http.get(this.categorylink + '&tags=13').then(function(response) {
      if (response.body.length > 0) {
        // console.log('go')
        // console.log( response.body[0].id)
        // this.yearSplash=response.body[0]
        this.yearTitle = response.body[0].title.rendered
        this.splashContent = response.body[0].content.rendered

      }

    })

  },


  methods: {
    expandSplash: function(id) {
      // alert('expaaand')
      this.showSplash = !this.showSplash
        // this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/posts/' + id).then(function(response) {
        //
        //   if (this.postJsonContent.length === 0) {
        //
        //     this.postJsonContent = response.body.excerpt.rendered
        //   }
        // })
    },

    collapseSplash: function() {
      this.showSplash = !this.showSplash
        // this.postJsonContent = ''
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">@import "../scss/globalVars.scss";

.splashPost {
    background: $mainBackgroundBlack;
    color: $mainBackground;

    max-height: 0;
    overflow: hidden;
    // border-top: 0 solid black;
    width: 100%;
    -webkit-transition: max-height 0.5s, border 0.5s;
    -moz-transition: max-height 0.5s, border 0.5s;
    transition: max-height 0.5s, border 0.5s;

    .titleWrap {
        padding: $mainPadding;

        h1 {
            // padding-top: $mainPadding;
            padding-bottom: $mainPadding;
            word-break: break-all;
            color: $mainBackground;
            font-size: 120px;
            font-weight: 900;
            line-height: 120px;
            margin: 0;
            // width: 50%;
            float: right;

        }

        p {
            color: $mainBackground;
            margin: 0;
            font-size: $thirdFontSize;
            // width: 50%;
            float: left;
        }
    }

    .navigationWrap {
        width: 100%;
        clear: both;
        font-size: $thirdFontSize;
        border-top: 1px solid $mainBackground;
        height: $mainHeaderHeight;
        line-height: $mainHeaderHeight;

        div:first-of-type{
          border-right: 1px solid $mainBackground;

        }

        div {

            word-spacing: $mainPadding;
            
            text-align: center;

            // -ms-box-orient: horizontal;
            // display: -webkit-box;
            // display: -moz-box;
            // display: -ms-flexbox;
            // display: -moz-inline-flex;
            // display: -webkit-inline-flex;
            // display: inline-flex;

            width: 50%;
            float: left;

            // -webkit-justify-content: space-around;
            // justify-content: space-around;
            span {
                margin: 0;
                text-align: center;
            }

        }
    }

    &.expanded {
        max-height: 3000px;
        border-top: $mainBorderStyle;
        -webkit-transition: max-height 0.5s, border 0.5s;
        -moz-transition: max-height 0.5s, border 0.5s;
        transition: max-height 0.5s, border 0.5s;
    }
}
</style>


<style lang="scss">@import "../scss/globalVars.scss";
.blurbWrap {
    padding: $mainPadding;

    clear: both;
    color: $mainBackground;
    width: 50%;
    margin-top: $mainPadding;

    p {
        font-size: $thirdFontSize;

        margin: 0;
    }
}
</style>
