<template>
<div class="single">
  <div class="singleTitle" v-on:click="expandSingle(id)">
    <h1 class="singleRealName">{{ pickRandomName }}</h1>
    <h1 v-bind:id="id" class="singleRealTitle" v-bind:style="{ width: 'calc(100% - '+ nameWidth + 'px)' }" v-bind:class="addTitleLengthClass">{{title}}</h1>
    <!-- <h1><span>{{ pickRandomName }}</span><span v-bind:id="id" v-bind:class="addTitleLengthClass">{{title}}</span></h1> -->
    <!-- <h1 v-bind:id="id"><span>{{title}}</h1> -->
  </div>

  <div v-bind:class="{ expanded: showSingle }" class="singleContent">
    <!-- </div> -->

    <div class="singleContentInner">
      <div class="singleContentInnerLink">
        <router-link v-bind:to="'work/'+id">link</router-link>
      </div>
      <!-- <button v-on:click="collapseSingle">-</button> -->
      <div class="singleContentInnerRendered" v-html="postJsonContent">
      </div>

    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'singlepostindex',
  props: ['title', 'index', 'projectslength', 'id'],
  data() {
    return {
      showSingle: false,
      nameWidth: 0,
      postJsonContent: "",
      name: ['Shemeka Mccullar', 'Craig Falgout', 'Pia Kos', 'Trish Staten', 'Dionna Gerber', 'Lilian Sano', 'Emmitt Casebeer', 'Jeanine Mollica', 'Preston Rouleau']
    }
  },
  methods: {
    expandSingle: function(id) {
      // alert('expaaand')
      this.showSingle = !this.showSingle
      this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/posts/' + id).then(function(response) {

        if (this.postJsonContent.length === 0) {
          this.postJsonContent = response.body.excerpt.rendered
        }
      })
    },

    collapseSingle: function() {
      this.showSingle = !this.showSingle
        // this.postJsonContent = ''
    }

  },
  computed: {
    // a computed getter
    pickRandomName: function() {
      // `this` points to the vm instance
      name = this.name[Math.floor(Math.random() * this.name.length)];
      return name
    },

    addTitleLengthClass: function() {

      if (this.title.length <= 20) {
        return 'large'
      }
      if (this.title.length < 50 && this.title.length > 20) {
        return 'mid'
      }
      if (this.title.length > 50) {
        return 'small'
      }
    }
  },
  mounted: function() {
    // var listHeight = this.$el.offsetHeight
    // this.$emit('emitSetListHeight')
    console.log(this.$el.getElementsByClassName('singleRealName')[0].clientWidth)
    console.log(this.$el.getElementsByClassName('singleRealName')[0].offsetWidth)
    this.nameWidth = this.$el.getElementsByClassName('singleRealName')[0].clientWidth + 1
    var vm = this
    setTimeout(function() {
      if (vm.title.length <= 14) {
        window.fitText(document.getElementById(vm.id), vm.title.length / 12);

      }

      if (vm.title.length > 14 && vm.title.length <= 24) {
        window.fitText(document.getElementById(vm.id), vm.title.length / 12);

      }
      if (vm.title.length > 24 && vm.title.length <= 50) {
        window.fitText(document.getElementById(vm.id), vm.title.length / 16);

      }
      if (vm.title.length > 50) {
        window.fitText(document.getElementById(vm.id), vm.title.length / 20);

      }

    }, 1)

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>@import "../scss/globalVars.scss";

.single {
    width: calc(100% - #{$mainHeaderHeight});

    .singleTitle {
        width: 100%;
        clear: both;
    }
    .singleRealTitle {
        width: 80%;
        border-left: $mainBorderStyle;
        padding-left: $mainPadding;
        padding-right: $mainPadding;

    }

    .singleRealName {
        // width: 20%;
        padding-left: $mainPadding;
        padding-right: $mainPadding;
    }

    h1 {
        margin: 0;
        border-top: $mainBorderStyle;
        // width: 100%;
        float: left;
        // white-space: nowrap;
        // text-overflow: ellipsis;
        overflow: hidden;
        height: 120px;
        line-height: 120px;

        span {
            padding: 100px $mainPadding;
            &:nth-child(2) {
                border-left: $mainBorderStyle;
            }
            &.small {
                font-size: 3vw;
            }
            &.mid {
                font-size: 5vw;
            }
            &.large {
                font-size: 7vw;
            }
        }
    }
    &:last-child h1 {
        border-bottom: $mainBorderStyle;
    }
    &:first-child h1 {
        border-top: 0;
    }

}

.singleContent {
    max-height: 0;
    overflow: hidden;
    border-top: 0 solid black;
    width: 100%;
    -webkit-transition: max-height 0.5s, border 0.5s;
    -moz-transition: max-height 0.5s, border 0.5s;
    transition: max-height 0.5s, border 0.5s;

    // padding-left: $mainPadding;
    // padding-right: $mainPadding;

    &.expanded {
        max-height: 3000px;
        border-top: $mainBorderStyle;
        // padding-top: $mainPadding;
        // padding-bottom: $mainPadding;

        -webkit-transition: max-height 0.5s, border 0.5s;
        -moz-transition: max-height 0.5s, border 0.5s;
        transition: max-height 0.5s, border 0.5s;
        // -webkit-transition: padding 0.0ss;
        // -moz-transition: padding 0.0ss;
        // transition: padding 0.0ss;
        // overflow-y:auto;
    }

    .singleContentInner {
        padding: $mainPadding;
        .singleContentInnerLink{
          background: $mainBackgroundGrey;
        }
    }
    &:empty {
        display: none;
    }
}
</style>
