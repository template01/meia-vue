<template>
  <div class="">
    <singlepostindex v-for="(project, index) in projects" v-bind:index="index" v-bind:id="project.id" v-bind:title="project.title.rendered"></singlepostindex>
  </div>
</template>

<script>
  import Listposts from './Listposts'
  import Singlepostindex from './Singlepostindex'
  import fitText from '../assets/fittext'

  export default {
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
        this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/posts').then(function(response) {
          console.log(response)
          this.projects = response.body
        })
      }

    },
    methods: {
      toggleCheckParent: function(index) {
        console.log('check parent' + index)
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


</style>
