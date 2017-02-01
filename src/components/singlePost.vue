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
    getContent: function(id){

      this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/posts/' + id).then(function(response) {
        if(this.postJsonContent.length === 0){
          this.postJsonContent = response.body.content.rendered
          this.postJsonTitle = response.body.title.rendered

        }
      })
    }
  },
  created:function(){
    this.getContent(this.$route.params.id)
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
