<template>
<!-- <div v-bind:style="{'max-height':listHeight+'px'}" class="slideIn listSingle"> -->
<!-- <div class="splashPost" v-on:click="expandSplash()" v-bind:class="{ expanded: showSplash }"> -->
<div class="splashPost" v-bind:class="{ expanded: showSplash }">
  <div class="titleWrap">
    <h1 v-bind:style="{color:this.yearColor}">{{yearTitle}}</h1>
  </div>
  <div v-bind:style="{color:this.yearColor}" v-html="splashExcerpt" class="blurbWrap">
  </div>
  <div v-bind:style="{color:this.yearColor, 'border-color':this.yearColor}" class="navigationWrap">
    <div v-bind:style="{'border-color':this.yearColor}" class="border-right" v-on:click="goToGraduates()">
      <!-- <span>Graduates ↓</span> -->
      <span>Graduates</span>
    </div>
    <router-link class="singleContentInnerLink" v-bind:to="'year/'+year">
      <div>
        <span><span>Read More</span></span>
      </div>
    </router-link>
  </div>

</div>
</template>

<script>
export default {
  props: ['categorylink', 'listpostId', 'yearColor','year'],
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
      splashExcerpt: '',
      showSplash: true,
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
        this.splashExcerpt = response.body[0].acf.excerpt

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
      this.$SmoothScroll(document.getElementById(this.listpostId).offsetTop-79, 250);
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">@import "../scss/globalVars.scss";

.splashPost {
    background: $mainBackgroundBlack;
    // color: $mainBackground;
    color: red;


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
            // word-break: break-all;
            // color: $mainBackground;

            // color: red;
            font-size: 90px;
            font-weight: 900;
            line-height: 90px;
            margin: 0;
            // width: 50%;
            // float: right;

        }

        p {
            // color: $mainBackground;
            color: $mainBackgroundBlack;

            margin: 0;
            font-size: $secFontSize;
            // width: 50%;
            float: left;
        }
    }

    .navigationWrap {
        cursor: pointer;
        width: 100%;
        clear: both;
        font-size: $secFontSize;
        border-top: 1px solid red;
        // border-top: 1px solid $mainBackground;
        height: $mainHeaderHeight;
        line-height: $mainHeaderHeight;
        .border-right {
          // border-right: 1px solid $mainBackground;
          border-right: 1px solid red;


        }

        a {
            color: inherit;
            text-decoration: none;
        }

        div {

            // word-spacing: $mainPadding;

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
    // color: $mainBackground;
    color: red;

    width: 50%;
    // margin-top: $mainPadding;

    p {
        font-size: $thirdFontSize;

        margin: 0;
    }
}
</style>
