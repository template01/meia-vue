<template>
  <div class="singlePost">
    <h1 v-text="postJsonTitle"></h1>
    <hr>
    <hr>
    <div v-html="postJsonContent"></div>
  </div>
</template>

<script>
export default {

  props: {
    showIndex: {
      type: Boolean,
      default: true
    }
  },

  methods:{
    getContent: function(yearCategory){

      this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/categories?search=' + yearCategory).then(function(response) {
        this.$http.get(response.body[0]._links['wp:post_type'][0].href+'&tags=13').then(function(response) {
          console.log(response)
          this.postJsonContent = response.body[0].content.rendered
          this.postJsonTitle = response.body[0].title.rendered
        })

        // if(this.postJsonContent.length === 0){
          // this.postJsonContent = response.body.content.rendered
          // this.postJsonTitle = response.body.title.rendered

        // }
      })
    }
  },
  created:function(){
    this.getContent(this.$route.params.yearCategory)
  },

  data () {
    return {
      postJsonContent: '',
      postJsonTitle:''
    }
  },

}
</script>


<style scoped lang="scss">
.singlePost {
    // background: red;

    div{
      // font-size: 10px !important;

    }
}
</style>
