 <template >
<div>

  <div v-if="!indexLoaded" class="indexLoaded">

    <h1 class="headerElement">Loading</h1>

  </div>
  <div v-bind:style="" id="yearOuterWrapper">
    <!-- <div v-for="(color, index) in yearColors">{{color}}</div> -->
    <div v-bind:style="{color:year.acf.yearcolor}" class="yearSingle" v-bind:class="{ slideOut: collapsed[index] }" v-for="(year, index) in gradyears">
      <div v-bind:style="{'border-color':year.acf.yearcolor}" class="yearNavigation">
        <div>{{gradyears[index].slideoutactive}}</div>
        <span v-on:click="clickPrev(index)" class="left">← Past</span>
        <span class="uppercase">Year<br class="tabletView" /> {{year.name}}</span>
        <span v-on:click="clickNext(index)" class="right">Future →</span>
      </div>


      <Splashposts v-bind:yearviewIndex=index v-bind:yearColor="year.acf.yearcolor" v-bind:year="year.name" v-bind:listpostId="'listPosts'+year.name" v-bind:categorylink="year._links['wp:post_type'][1].href"></Splashposts>
      <Listposts v-on:stopIndexLoad="stopIndexLoad()" v-bind:yearColor="year.acf.yearcolor" v-bind:style="{'background':year.acf.yearcolor}" v-bind:id="'listPosts'+year.name" v-bind:indexGradyears="index" v-bind:categoryyear="year.name" v-bind:categorylink="year._links['wp:post_type'][2].href"></Listposts>
    </div>
  </div>
</div>
</template>

<script>
import Listposts from './Listposts'
import Splashposts from './Splashposts'

export default {
  components: {
    Listposts,
    Splashposts
  },
  data() {
    return {
      yearWrapperHeight: [],
      gradyears: [],
      collapsed: [],
      ListpostId: 'iddd',
      indexLoaded: false,
      homeVisited: false
    }
  },
  created: function() {

    if (this.gradyears.length === 0) {
      this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/categories?parent=8').then(function(response) {
        this.gradyears = response.body
        this.attachExtras()
        this.goToYear(parseInt(this.$route.query.yearview))


      })

      // year._links['wp:post_type'][1].href
    }


  },
  computed: {
    listHeightText: function() {

    }
  },

  watch: {
    '$route' (to, from) {


      if (to.path === '/' && this.homeVisited === false && from.path !== '/') {
        this.indexLoaded = false
        this.stopIndexLoad()

      }

        if (to.path === '/'){
          this.goToYear(parseInt(to.query.yearview))

        }


      if (from.path === '/') {
        // console.log(from.path)
        this.homeVisited = true
      }
      // console.log(from.path)

    }
  },

  methods: {

    goToYear: function(id){
      // alert('hey')
      if(this.$route.query.yearview){
        for (var i = 0; i < this.gradyears.length; i++) {
          if (i === id){
            this.$set(this.collapsed, i, false)

          }else{

            this.$set(this.collapsed, i, true)
          }
        }
      }

    },

    stopIndexLoad: function() {
      var vm = this
      setTimeout(function() {
        vm.indexLoaded = true
      }, 500)
    },
    attachExtras: function() {
      var vueInstance = this

      for (var i = 0; i < this.gradyears.length; i++) {
        if (i != this.gradyears.length - 1) {
          this.collapsed.push(true);
        } else {
          this.collapsed.push(false);

        }
      }
    },

    clickNext: function(index, yearNumber) {
      this.$set(this.collapsed, index, true)
      this.$set(this.collapsed, index + 1, false)
      this.$SmoothScroll(0, 500);

      this.$router.push({
        query: {
          yearview: index+1
        }
      })

    },
    clickPrev: function(index, yearNumber) {

      this.$set(this.collapsed, index, true)
      this.$set(this.collapsed, index - 1, false)
      this.$SmoothScroll(0, 500);


      this.$router.push({
        query: {
          yearview: index-1
        }
      })



    },




    // _.throttle(() => {
    //   console.log('I get fired every two seconds!')
    // }, 2000)

  },

  // watch: {
  //   '$route': function(newRoute) {
  //
  //     console.log(newRoute)
  //     // this.$set(this.collapsed, index, true)
  //     // this.$set(this.collapsed, index - 1, false)
  //   }
  // },
  mounted: function() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>@import "../scss/globalVars.scss";

.indexLoaded {
    background-color: $mainBackgroundBlack;
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 99999999999;
    display: flex;
    .headerElement {
        margin: 0;
        color: $mainBackground;
        text-transform: uppercase;
        font-weight: normal;

        width: 33.33333%;
        font-size: $secFontSize;
        @include media("<tablet") {
            font-size: $secFontSizeTablet;
        }
        padding: $mainPadding/1.8 $mainPadding $mainPadding;
        // top: $secFontBaseLineShift;

        // @include media("<tablet") {
        //     font-size: $secFontSizeTablet;
        // }
    }
}

.slideOut {
    height: 0 !important;
    overflow: hidden !important;

    .yearNavigation {

        display: none !important;
    }
}
#yearOuterWrapper {
    background: $mainBackground;
}
.yearSingle {

    overflow: hidden;

    -webkit-transition: all 160ms cubic-bezier(0.250, 0.100, 0.250, 1.000);
    -moz-transition: all 160ms cubic-bezier(0.250, 0.100, 0.250, 1.000);
    -o-transition: all 160ms cubic-bezier(0.250, 0.100, 0.250, 1.000);
    transition: all 160ms cubic-bezier(0.250, 0.100, 0.250, 1.000);
    /* ease (default) */

    -webkit-transition-timing-function: cubic-bezier(0.250, 0.100, 0.250, 1.000);
    -moz-transition-timing-function: cubic-bezier(0.250, 0.100, 0.250, 1.000);
    -o-transition-timing-function: cubic-bezier(0.250, 0.100, 0.250, 1.000);
    transition-timing-function: cubic-bezier(0.250, 0.100, 0.250, 1.000);
    /* ease (default) */
    .yearNavigation {

        position: fixed;
        z-index: 999;
        & + * {
            margin-top: $mainHeaderHeight;
        }
        background: $mainBackgroundBlack;
        border-bottom: 1px solid $mainBackground;
        font-size: $secFontSize;
        @include media("<tablet") {
            font-size: $secFontSizeTablet;
            // color: red;
        }

        height: $mainHeaderHeight;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        // cursor: pointer;
        .left {
            text-align: left;
            padding: $mainPadding;
        }
        .right {
            text-align: right;
            padding: $mainPadding;
        }
    }
    &:not(first-of-type) {
        .yearNavigation {
            .left {
                cursor: pointer;
            }
        }
    }
    &:first-of-type {
        .yearNavigation {
            .left {
                visibility: hidden;
                color: lightgrey;
                pointer-events: none;
                cursor: default;

            }
        }
        // display: none;
    }
    &:not(last-of-type) {
        .yearNavigation {
            .right {
                cursor: pointer;
            }
        }
    }
    &:last-of-type {
        .yearNavigation {
            .right {
                visibility: hidden;
                color: darkgrey;
                pointer-events: none;
                cursor: default;

            }
        }
        // display: none;
    }

}

span {
    width: 33.33333%;
    text-align: center;
    // font-size: $secFontSize;
    top: $secFontBaseLineShift;
    @include media("<tablet") {
        top: $secFontBaseLineShiftTablet;
    }

    position: relative;
}
</style>
