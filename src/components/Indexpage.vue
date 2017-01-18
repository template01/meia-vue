
<template>
  <div>
    <Getgradyears></Getgradyears>
  </div>
</template>

<script>
import Getgradyears from './Getgradyears'


export default {
  components: {
    Getgradyears,
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
