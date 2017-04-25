<template>
<!-- <div v-bind:style="{'max-height':listHeight+'px'}" class="slideIn listSingle"> -->
<!-- <div class="splashPost" v-on:click="expandSplash()" v-bind:class="{ expanded: showSplash }"> -->
<div class="splashPost" v-bind:class="{ expanded: showSplash }">
  <div class="titleWrap">

    <router-link class="" v-bind:to="{ path: 'year/'+year,         query: {
              yearview: yearviewIndex
            }}">
            <h1 v-bind:style="{color:this.yearColor}" v-html="yearTitle"></h1>
    </router-link>
  </div>
  <div v-bind:style="{color:this.yearColor}" v-html="splashExcerpt" class="blurbWrap">
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
                    <span>Read More</span>
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
            <span>Read More</span>
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
  props: ['categorylink', 'listpostId', 'yearColor', 'year','yearviewIndex'],
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
        this.splashExcerpt = response.body[0].acf.excerpt
        this.splashProgramme = response.body[0].acf.programme

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
<style scoped lang="scss">@import "../scss/globalVars.scss";

.splashPost {
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
        @include media("<tablet") {
            font-size: $thirdFontSizeTablet;
            border-top: 0;


        }
    }

    .titleWrap {
        padding: $mainPadding;
        @include media("<tablet") {
            padding-bottom: 0;
        }

        a{
          text-decoration: none;
        }
        h1 {
            // padding-top: $mainPadding;
            // padding-bottom: $mainPadding;
            // word-break: break-all;
            // color: $mainBackground;

            // color: red;
            font-size: 80px;
            font-weight: 900;
            line-height: 80px;
            @include media("<tablet") {
                font-size: 32px;
                line-height: 32px;
            }
            margin: 0;
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
                &:last-of-type{
                  border-bottom: $mainBorderStyle;

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
        max-height: 3000px;
        border-top: $mainBorderStyle;
        -webkit-transition: max-height 0.5s, border 0.5s;
        -moz-transition: max-height 0.5s, border 0.5s;
        transition: max-height 0.5s, border 0.5s;
    }
}
</style>


<style lang="scss">@import "../scss/globalVars.scss";

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

    clear: both;
    // color: $mainBackground;
    color: red;

    width: 50%;
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
        margin: 0;
    }
}
</style>
