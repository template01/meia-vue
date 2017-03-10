<template>
<div id="meiaHeader">
  <h1 class="headerElement">Piet Zwart Insititute</h1>
  <h1 class="headerElement alignCenter"><router-link to="/">MASTER EDUCATION IN ARTS</router-link></h1>
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
      this.$SmoothScroll(document.getElementById('footer'), 500);
      // window.scrollTo({ top: 1000, left: 0, behavior: 'smooth' });
    }
  }
}
</script>


<style lang="scss">@import "../scss/globalVars.scss";

#meiaHeader + *{
  margin-top: $mainHeaderHeight;
}

</style>
<style scoped lang="scss">@import "../scss/globalVars.scss";


#meiaHeader {

    position: fixed;
    top: 0;
    width: 100%;
    z-index: 99999999999999;


    color: $mainBackgroundBlack;

    background: $mainBackground;
    display: flex;
    align-items: center;
    justify-content: center;
    height: $mainHeaderHeight;
    .headerElement {
      color: $mainBackgroundBlack;
      text-transform: uppercase;
      font-weight: normal;

        width: 33.33333%;
        font-size: $secFontSize;
        padding: $mainPadding;
        top: $secFontBaseLineShift;
        position: relative;
    }

    button {
        font-size: $secFontSize;
        background: none;
        border: none;
        margin: 0;
        padding: 0;
        color: $mainBackgroundBlack;

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
