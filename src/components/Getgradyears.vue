<template>
  <!-- <div class="">
    <singlepostindex v-for="(project, index) in projects" v-bind:index="index" v-bind:id="project.id" v-bind:title="project.title.rendered"></singlepostindex>
  </div> -->

  <Listposts></Listposts>

  <!-- <h1>hello</h1> -->
</template>

<script>
  import Listposts from './Listposts'
  // import Singlepostindex from './Singlepostindex'
  // import fitText from '../assets/fittext'

  export default {
    components: {
      Listposts
    },
    data() {
      return {
        gradyears: [],
      }
    },
    created: function() {
      if(this.gradyears.length === 0){
        this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/categories?parent=8').then(function(response) {
          console.log(response)
          this.gradyears = response.body
        })
      }

    },
    methods: {

      clickNext: function() {
        console.log('next')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
