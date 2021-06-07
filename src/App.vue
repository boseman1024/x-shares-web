<template>
  <div id="app" onselectstart="javascript:return false;">
    <div id="content">
      <div id="menu" v-if="isLogin">
        <Menu :user="user"></Menu>
      </div>
      <div id="main">
        <Header v-if="isLogin"></Header>
        <router-view :key="key" style="margin-top:65px;"/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Menu from "@/components/Menu.vue";
import Header from "@/components/Header.vue";
export default {
  name: "app",
  components: {Menu,Header},
  data(){
    return{
      
    }
  },
  computed:{
    ...mapGetters({
      isLogin:'getIsLogin',
      user:'getUserInfo'
    }),
    key(){
      return this.$route.name?this.$route.name+new Date():this.$route+ new Date();
    }
  },
  mounted(){
    console.log(this.user)
  }
};
</script>

<style lang="less">
#app {
  #content{
    width:900px;
    margin:0 auto;
    padding:0 20px;
    height:100%;
    #menu{
      margin:5px 0 0 0;
      position:fixed;
      top:65px;
      left:0;
    }
    #main{
      height:100%;
      width:100%;
    }
  }
}
@media screen and (max-width: 970px) {
#app {
  #content{
    width:600px;
  }
}
}
</style>
