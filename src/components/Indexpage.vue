
<template>
  <div>
    <Listposts></Listposts>
  </div>
</template>

<script>
import Listposts from './Listposts'


export default {
  components: {
    Listposts,
  },

  name: 'indexpage',


  data () {
    return {
      indexmsg: 'Welcome to Index'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
