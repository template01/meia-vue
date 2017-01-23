<template>
  <div class="slideIn listSingle">
    <singlepostindex v-for="(project, index) in projects" v-bind:index="index" v-bind:id="project.id" v-bind:title="project.title.rendered"></singlepostindex>
  </div>
</template>

<script>
  import Listposts from './Listposts'
  import Singlepostindex from './Singlepostindex'
  import fitText from '../assets/fittext'

  export default {
    props:['categorylink'],
    components: {
      Listposts,Singlepostindex,
    },
    data() {
      return {
        checked: true,
        projects: [],
      }
    },
    created: function() {
      if(this.projects.length === 0){
        this.$http.get(this.categorylink).then(function(response) {
          // console.log(response)
          this.projects = response.body
        })
      }

    },
    methods: {
      toggleCheckParent: function(index) {
        // console.log('check parent' + index)
        this.$set(this.projectsChecked, index, this.toggleChecked(index))
      },
      toggleChecked: function(index) {
        return this.projectsChecked[index] = !this.projectsChecked[index]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
