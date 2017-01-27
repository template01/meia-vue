<template>
<div class="slideIn listSingle">
  <ListpostsImages v-bind:featuredimages="this.featuredimages" v-bind:categoryyear="this.categoryyear" v-on:emittoggleHideSinglePosts="toggleHideSinglePosts"></ListpostsImages>
  <!-- <transition name="slide-fade"> -->
  <div v-show="this.hideSinglePosts">
    <singlepostindex v-for="(project, index) in projects" v-bind:index="index" v-bind:id="project.id" v-bind:title="project.title.rendered"></singlepostindex>
  </div>
<!-- </transition> -->
</div>
</template>

<script>
import Listposts from './Listposts'
import Singlepostindex from './Singlepostindex'
import ListpostsImages from './ListpostsImages'
import fitText from '../assets/fittext'

export default {
  props: ['categoryyear', 'categorylink'],
  components: {
    Listposts,
    Singlepostindex,
    ListpostsImages
  },
  data() {
    return {
      hideSinglePosts: true,
      projects: [],
      featuredimages:[]
    }
  },
  created: function() {
    if (this.projects.length === 0) {
      this.$http.get(this.categorylink).then(function(response) {
        // console.log(response)
        this.projects = response.body
        var savedThis = this

        for (var i = 0; i < this.projects.length; i++) {
          if(this.projects[i].acf){
            // console.log(this.projects[i].acf.featuredimage.sizes.large);
            // this.featuredimages.push({large:this.projects[i].acf.featuredimage.sizes.large})
            console.log(i)
            console.log(this.projects[i].acf)
            this.featuredimages.push({large:this.projects[i].acf.featuredimage.sizes.large})
            // this.$set(this.featuredimages)
            // this.featuredimages = Object.assign({}, this.featuredimages, {type:"xxxxxxxxxxxxx", model:"50dasdddddddddddddddddddddddd0", color:"white"})
            // this.featuredimages.$set( {type:"ass", model:"500", color:"white"});
          }else{
            // this.featuredimages.push({large:''})

          }
          // console.log(savedThis.featuredimages[1])
            //Do something
        }

        // this.featuredimages = Object.assign({}, this.featuredimages, {type:"asasdsds", model:"500", color:"white"})


        // console.log(this.featuredimages[0].large)
// log( response.body )
        //
        // for (i < this.projects.length) {
        //   console.log('maan')
        // }
      })
    }

  },
  methods: {
    toggleHideSinglePosts: function() {
      this.hideSinglePosts = !this.hideSinglePosts
    }

    // toggleCheckParent: function(index) {
    //   // console.log('check parent' + index)
    //   this.$set(this.projectsChecked, index, this.toggleChecked(index))
    // },
    // toggleChecked: function(index) {
    //   return this.projectsChecked[index] = !this.projectsChecked[index]
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.listSingle {
  position: relative;
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
