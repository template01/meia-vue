<template>
<!-- <div v-bind:style="{'max-height':listHeight+'px'}" class="slideIn listSingle"> -->
<div id="listPostWrapper" class="slideIn listSingle">
  <!-- <ListpostsImages v-bind:workids="this.workids" v-bind:worktitles="this.worktitles" v-bind:workstudents="this.workstudents" v-bind:featuredimages="this.featuredimages" v-bind:categoryyear="this.categoryyear" v-on:emittoggleHidePostList="toggleHidePostList()"></ListpostsImages> -->
  <!-- <div v-bind:style="{'max-height':postsListHeight+'px'}" v-show="this.hideSinglePosts"> -->
  <div class="listPostsWrapper" v-bind:class="{ collapsed: hidePostList }">
    <singlepostindex v-bind:yearview=yearview  v-bind:collapseAll=collapseAll  v-bind:yearColor="yearColor" v-for="(project, index) in projects" v-bind:index="indexGradyears" v-bind:workstudent="workstudents[index]" v-bind:projectslength="projects.length" v-bind:id="project.id" v-bind:title="project.acf.shorttitle" v-bind:fulltitle="project.title.rendered"></singlepostindex>
  </div>
</div>
</template>

<script>
import Listposts from './Listposts'
import Singlepostindex from './Singlepostindex'
// import ListpostsImages from './ListpostsImages'

export default {
  props: ['categoryyear', 'categorylink', 'indexGradyears', 'yearColor','parentId', 'collapseAll','yearview'],
  components: {
    Listposts,
    Singlepostindex,
    // ListpostsImages
  },
  data() {
    return {
      hidePostList: false,
      // listHeight: 0,
      // postsListHeight:0,
      projects: [],
      featuredimages: [],
      worktitles: [],
      workids: [],
      workstudents: []
    }
  },
  created: function() {


    // console.log(this.categorylink)
    // EXCLUDE YEAR SPLASH (ID=13) TAGS!

    if (this.projects.length === 0) {
      this.$http.get(this.categorylink).then(function(response) {
        // console.log(response)
        this.projects = response.body

        for (var i = 0; i < this.projects.length; i++) {

          this.workids.push(this.projects[i].id)


          if (this.projects[i].acf) {


            this.worktitles.push(this.projects[i].title.rendered)
            this.workstudents.push(this.projects[i].acf.student_name)
            // console.log(this.projects[i].acf.featuredimage)
            if (this.projects[i].acf.featuredimage) {

              this.featuredimages.push({
                large: this.projects[i].acf.featuredimage.sizes.large
              })
            }

          }
        }

      })
    }




  },

  mounted:function() {
    this.attachExtraStyle()

    this.$emit('stopIndexLoad')
  },


  methods: {
    toggleHidePostList: function() {
      this.hidePostList = !this.hidePostList
    },



    attachExtraStyle: function() {

      var vm = this

      // console.log(this.$el.getAttribute('id'))
      document.head.insertAdjacentHTML('beforeend',
        `<style>
              #`+this.$el.getAttribute('id')+` .single:first-child .singleRealTitle:hover {
                          border-top: 1px solid `+ this.yearColor+`;
              }
              #`+this.$el.getAttribute('id')+` .single:first-child .singleRealName:hover {
                          border-top: 1px solid `+ this.yearColor+`;
              }

              #`+this.$el.getAttribute('id')+` .single .singleRealTitle:hover {
                          color:`+ this.yearColor+`;
              }
              #`+this.$el.getAttribute('id')+` .single .singleRealName:hover {
                          color:`+ this.yearColor+`;
              }

              #`+this.$el.getAttribute('id')+` .singleContent .singleContentInnerLeftLink:hover {
                          color:`+ this.yearColor+`;
              }

              #`+this.$el.getAttribute('id')+` .singleContent .singleContentInnerLink:hover {
                          color:`+ this.yearColor+`;
              }

          </style>`
      );
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
.listPostsWrapper {
    // max-height: 3000px;
    overflow: hidden;
    -webkit-transition: max-height 0.5s;
    -moz-transition: max-height 0.5s;
    transition: max-height 0.5s;
    &.collapsed {
        max-height: 0;

    }
}
</style>
