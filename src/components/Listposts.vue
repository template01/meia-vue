<template>
<!-- <div v-bind:style="{'max-height':listHeight+'px'}" class="slideIn listSingle"> -->
<div class="slideIn listSingle">
  <ListpostsImages v-bind:featuredimages="this.featuredimages" v-bind:categoryyear="this.categoryyear" v-on:emittoggleHidePostList="toggleHidePostList()"></ListpostsImages>
  <!-- <div v-bind:style="{'max-height':postsListHeight+'px'}" v-show="this.hideSinglePosts"> -->
  <div class="listPostsWrapper" v-bind:class="{ collapsed: hidePostList }">
    <singlepostindex v-for="(project, index) in projects" v-bind:index="index" v-bind:projectslength="projects.length" v-bind:id="project.id" v-bind:title="project.title.rendered"></singlepostindex>
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
      hidePostList: false,
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
            // console.log(this.projects[i].acf.featuredimage)
            if(this.projects[i].acf.featuredimage){
              this.featuredimages.push({
                large: this.projects[i].acf.featuredimage.sizes.large
              })
            }

          }
        }

      })
    }

  },


  methods: {
    toggleHidePostList: function() {
      this.hidePostList = !this.hidePostList
    },
  },
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
.listPostsWrapper{
  max-height: 3000px;
  overflow: hidden;
  -webkit-transition: max-height 0.5s;
  -moz-transition: max-height 0.5s;
  transition: max-height 0.5s;
  &.collapsed{
    max-height: 0px;

  }
}

</style>
