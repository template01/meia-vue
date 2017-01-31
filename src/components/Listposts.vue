<template>
<!-- <div v-bind:style="{'max-height':listHeight+'px'}" class="slideIn listSingle"> -->
<div class="slideIn listSingle">
  <ListpostsImages v-on:emitSetImageHeight="function(input){setListHeight('image',input)}" v-bind:featuredimages="this.featuredimages" v-bind:categoryyear="this.categoryyear" v-on:emittoggleHideSinglePosts="toggleHideSinglePosts()"></ListpostsImages>
  <!-- <div v-bind:style="{'max-height':postsListHeight+'px'}" v-show="this.hideSinglePosts"> -->
  <div v-bind:class="{ overflowHidden: !hideSinglePosts }">
    <singlepostindex v-on:emitSetListHeight="setListHeight()" v-for="(project, index) in projects" v-bind:index="index" v-bind:projectslength="projects.length" v-bind:id="project.id" v-bind:title="project.title.rendered"></singlepostindex>
  </div>
</div>
</template>

<script>
import Listposts from './Listposts'
import Singlepostindex from './Singlepostindex'
import ListpostsImages from './ListpostsImages'
import fitText from '../assets/fittext'

export default {
  props: ['categoryyear', 'categorylink', 'index'],
  components: {
    Listposts,
    Singlepostindex,
    ListpostsImages
  },
  data() {
    return {
      hideSinglePosts: true,
      // listHeight: 0,
      // postsListHeight:0,
      projects: [],
      featuredimages: []
    }
  },
  created: function() {
    if (this.projects.length === 0) {
      this.$http.get(this.categorylink).then(function(response) {
        // console.log(response)
        this.projects = response.body

        for (var i = 0; i < this.projects.length; i++) {
          if (this.projects[i].acf) {


            this.featuredimages.push({
              large: this.projects[i].acf.featuredimage.sizes.large
            })
          }
        }

        // this.setListHeight()

      })
    }

  },

  methods: {
    toggleHideSinglePosts: function() {
      this.hideSinglePosts = !this.hideSinglePosts
      if (this.hideSinglePosts) {

          this.setListHeight()

      } else {
        this.setListHeight('image')
      }
    },
    setListHeight: function(input, height) {

      if (input === 'image') {
        this.$emit('emitSetListHeight', height)
      } else {
        // setTimeout(function() {
        var vm = this
        setTimeout(function() {
          var listHeight = vm.$el.offsetHeight
          vm.$emit('emitSetListHeight', listHeight)
        }, 1)
      }
    }
  },
  // mounted: function() {
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.listSingle {
    position: relative;
    overflow: hidden;
    -webkit-transition: max-height 0.8s;
    -moz-transition: max-height 0.8s;
    transition: max-height 0.8s;
}
//
.overflowHidden {
    background: red;
    overflow: hidden;
    height: 0;
}

/*
  .listSingle{

  	transition-property: all;
  	transition-duration: .5s;
  	transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  }
  .slideIn{
    margin-left: -100vw
  }
*/
</style>
