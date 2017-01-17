<template>
  <div class="single" >
  <div class="singleTitle" v-on:click="expandSingle(id)" >
    <h1><span>{{ pickRandomName }}</span><span>{{title}}</span></h1>
  </div>

  <div class="singleContent" v-html="postJsonContent"></div>
  <!-- </div> -->
</div>
</template>

<script>
  export default {
    name: 'singlepostindex',
    props: ['title', 'index', 'checked','id'],
    data() {
      return {
        projects: [],
        postJson:[],
        postJsonContent:"",
        name: ['Shemeka Mccullar','Craig Falgout','Pia Kos','Trish Staten','Dionna Gerber','Lilian Sano','Emmitt Casebeer','Jeanine Mollica','Preston Rouleau']

      }
    },
    methods:{
      expandSingle: function(id){
        // alert('expaaand')
        this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/posts/'+id).then(function(response) {
          console.log(response)
          this.postJsonContent = response.body.content.rendered
          this.postJson = response.body
        })

      }
    },
    computed: {
      // a computed getter
      pickRandomName: function () {
        // `this` points to the vm instance
        name = this.name[Math.floor(Math.random()*this.name.length)];
        return name



      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .active{
    background:red;
  }

  .single h1{
    margin: 0px;
    border-top: 1px solid black;
    border-left: 1px solid black;
    border-right: 1px solid black;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 100px;
    line-height: 100px;
    /*padding: 20px*/

  }

  .single:last-child h1{
    border-bottom: 1px solid black;
  }

  .singleContent{
    border-top: 1px solid black;

  }

  .singleContent:empty{
    display: none;
  }

  h1 span{

    padding-left: 20px;
    padding-right: 20px;
    padding-top: 100px;
    padding-bottom: 100px;
    /*display: inline-block;*/

  }

  h1 span:nth-child(2){
    border-left: 1px solid black;
    /*width: 12em;*/
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
  }

  /*.single:not(.active){
    background: blue;
  }*/
  /*.not*/
</style>
