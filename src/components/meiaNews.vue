<template>
  <div v-bind:class="{expanded:expandedActive}" id="meiaNews">
    <div class="newsInner">
    <p>NEWS</p>

    <p>PRETTY FOOTER Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nisi tellus, fermentum finibus lectus quis, interdum molestie leo. Morbi ultrices scelerisque lacus.</p>
    </div>

  </div>

</template>

<script>
export default {
  props: {
    expandedActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "../scss/globalVars.scss";

#meiaNews {
    background:$mainBackgroundGrey;
    // padding: $mainPadding;
    color: $mainBackground;

    max-height: 0px;
    overflow: hidden;
    border-top: 1px solid black;

    -webkit-transition: max-height 0.3s, border 0.9s;
    -moz-transition: max-height 0.3s, border 0.9s;
    transition: max-height 0.3s, border 0.9s;

    // padding-left: $mainPadding;
    // padding-right: $mainPadding;


    &.expanded{
      max-height: 1000px;

      // padding-top: $mainPadding;
      // padding-bottom: $mainPadding;
      border-bottom: $mainBorderStyle;

      -webkit-transition: max-height 0.8s, border 0.1s;
      -moz-transition: max-height 0.8s, border 0.1s;
      transition: max-height 0.8s, border 0.1s;
      // -webkit-transition: padding 0.0ss;
      // -moz-transition: padding 0.0ss;
      // transition: padding 0.0ss;
      // overflow-y:auto;
    }

    .newsInner{
      padding: $mainPadding;
      & p:first-of-type{
        margin-top: 0px
      }
      & p:last-of-type{
        margin-bottom: 0px
      }

    }

}
</style>
