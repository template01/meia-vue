<template>
  <div class="">
    <a><router-link to="/">home</router-link></a>
    <a><router-link to="/hello">Test</router-link></a>
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      header: 'Welcome to Index'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
