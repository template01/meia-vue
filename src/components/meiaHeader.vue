<template>
  <div id="meiaHeader">
    <h1 class="headerElement">Piet Zwart Insititute</h1>
    <h1 class="headerElement alignCenter"><router-link to="/">MASTER EDUCATION IN ARTS</router-link></h1>
    <span class="headerElement alignRight"><button>NEWS</button>
    <button>ABOUT</button>
  </span>
  </div>

</template>

<script>
export default {
  // props: {
  //   name: {
  //     type: String,
  //     default: 'Veeeue!'
  //   }
  // }
}
</script>

<style scoped lang="scss">
#meiaHeader{
  background: ghostwhite;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  .headerElement{
    width: 33.33333%;
    font-size: 16px;
    padding: 20px;

  }
  h1{
    margin: 0;

  }
  .alignCenter{
    text-align:center;
  }
  .alignRight{
    text-align:right;
  }

}

</style>
