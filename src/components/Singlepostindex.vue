<template>
<div class="single">
  <div class="singleTitle" v-on:click="expandSingle(id)">
    <h1 v-bind:id="id"><span>{{ pickRandomName }}</span><span v-bind:class="addTitleLengthClass">{{title}}</span></h1>
  </div>

  <div v-show="showSingle" class="singleContent">
    <!-- </div> -->
    <button v-on:click="collapseSingle">-</button>
    <div class="singleContentInner" v-html="postJsonContent"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'singlepostindex',
  props: ['title', 'index', 'id'],
  data() {
    return {
      showSingle: false,
      postJsonContent: "",
      name: ['Shemeka Mccullar', 'Craig Falgout', 'Pia Kos', 'Trish Staten', 'Dionna Gerber', 'Lilian Sano', 'Emmitt Casebeer', 'Jeanine Mollica', 'Preston Rouleau']
    }
  },
  methods: {
    expandSingle: function(id) {
      // alert('expaaand')
      this.showSingle = !this.showSingle
      this.$http.get('http://api-placeholder.template-studio.nl/wp-json/wp/v2/posts/' + id).then(function(response) {
        // console.log(this.postJsonContent.length)
        if(this.postJsonContent.length === 0){
          this.postJsonContent = response.body.content.rendered

        }
      })
    },

    collapseSingle: function() {
      this.showSingle = !this.showSingle
      // this.postJsonContent = ''
    }

  },
  computed: {
    // a computed getter
    pickRandomName: function() {
      // `this` points to the vm instance
      name = this.name[Math.floor(Math.random() * this.name.length)];
      return name
    },

    addTitleLengthClass: function() {

      if (this.title.length <= 20) {
        return 'large'
      }
      if (this.title.length < 50 && this.title.length > 20) {
        return 'mid'
      }
      if (this.title.length > 50) {
        return 'small'
      }
    }
  },
  // mounted: function() {
  //    window.fitText( document.getElementById(this.id),2 );
  //   // console.log('ready')
  //
  // }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.active {
    background: red;
}

.single {
    width: calc(100% - 40px);

    h1 {
        margin: 0;
        border-top: 1px solid black;
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        height: 100px;
        line-height: 100px;

        span {
            padding: 100px 20px;
            &:nth-child(2) {
                border-left: 1px solid black;
            }
            &.small {
                font-size: 3vw;
            }
            &.mid {
                font-size: 5vw;
            }
            &.large {
                font-size: 7vw;
            }
        }
    }
    &:last-child h1 {
        border-bottom: 1px solid black;
    }
    &:first-child h1 {
        border-top: 0;
    }

}

.singleContent {
    border-top: 1px solid black;
    &:empty {
        display: none;
    }
}
</style>
