<template>
<div id="meiaHeader">

  <a class="headerElement" href="http://www.pzwart.nl/master-education-in-arts/"><h1 id="pzi" class=""></h1></h1></a>

  <router-link class="headerElement alignCenter" to="/"><h1 id="meia" ></h1></router-link>
  <span class="headerElement alignRight">
    <!-- <button v-on:click="emitToggleNews()">NEWS</button> -->
    <button v-on:click="goToBottom()">ABOUT</button>
  </span>
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

  methods: {
    emitToggleNews: function() {
      this.$emit('emitToggleNews')
    },
    goToBottom: function() {
      // console.log(this.smoothscroll)
      // console.log(window.smoothscroll)
      // console.log(window.scroll)
      // console.log(window.scroll())
      // this.$SmoothScroll(target,duration,callback,context);
      this.$SmoothScroll(document.getElementById('footer').offsetTop - 40, 500);
      // window.scrollTo({ top: 1000, left: 0, behavior: 'smooth' });
    }
  }
}
</script>


<style lang="scss">@import "../scss/globalVars.scss";
@import "../../node_modules/include-media/dist/_include-media.scss";
#meiaHeader + * {
    margin-top: $mainHeaderHeight;
}
</style>
<style scoped lang="scss">@import "../scss/globalVars.scss";

@include media(">phone","<tablet") {
  }

#meiaHeader {

    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;

    color: $mainBackgroundBlack;

    background: $mainBackground;
    display: flex;
    align-items: center;
    justify-content: center;
    height: $mainHeaderHeight;
    .headerElement {
        cursor: pointer;
        color: $mainBackgroundBlack;
        text-transform: uppercase;
        font-weight: normal;

        width: 33.33333%;
        font-size: $secFontSize;
        padding: $mainPadding;
        top: $secFontBaseLineShift;
        position: relative;
        @include media("<tablet") {
            font-size: $secFontSizeTablet;
        }


        h1{
          font-size: inherit;
          font-weight: inherit;
          display: inline-block;
          &:hover{
            border-bottom: 1px solid $mainBackgroundBlack;
          }

        }

    }

    #pzi {
        &:after {
            content: "Piet Zwart Insititute";
        }
        @include media("<tablet") {
            &:after {
                content: "PZI";
            }
        }
    }


    #meia {
        &:after {
            content: "MASTER EDUCATION IN ARTS";
        }
        @include media("<tablet") {
            &:after {
                content: "MEIA";
            }
        }
    }

    button {
        font-size: $secFontSize;
        @include media("<tablet") {
            font-size: $secFontSizeTablet;
        }
        background: none;
        border: none;
        margin: 0;
        padding: 0;
        color: $mainBackgroundBlack;

        &:hover{
          border-bottom: 1px solid $mainBackgroundBlack;
        }

        &:first-of-type {
            // padding-right: $mainPadding;
        }
        &:focus {
            outline: none;
        }
    }
    a {
        text-decoration: none;
        color: $mainBackgroundBlack;

    }
    h1 {
        margin: 0;
        color: $mainBackgroundBlack;

    }
    .alignCenter {
        text-align: center;
    }
    .alignRight {
        text-align: right;
    }

}
</style>
