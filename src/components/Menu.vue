<template>
  <div class="menu">
    <div class="x-card">
    	<nav>
    		<router-link to="/"><div class="item">首页</div></router-link>
    		<router-link to="/explore"><div class="item">探索</div></router-link>
    		<router-link :to="{ name: 'personal', params: { id: user.ID }}"><div class="item">我的</div></router-link>
        <div class="item">设置</div>
        <div class="item" @click="logout">登出</div>
<!--     		<div class="item" @click="more=!more">{{more?'关闭':'更多'}}</div>
        <div class="others" v-show="more">
          <div class="item">设置</div>
          <div class="item" @click="logout">登出</div>
        </div> -->
    	</nav>
    </div>
    <router-link to="/create"><div class="btn">发布</div></router-link>
  </div>
</template>

<script>
export default {
  name: "Menu",
  props: ['user'],
  data(){
    return{
      more:false
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('logout').then((res)=>{
        this.$router.replace('/login');
      });
    }
  }
};
</script>

<style scoped lang="less">
 .menu{
 	width:240px;
 	padding: 0 20px 0 20px;
 	text-align:center;
  .x-card{
    border-bottom-right-radius:0;
    border-bottom-left-radius:0;
   	nav{
      position:relative;
   		.item{
   			height:45px;
   			line-height:45px;
   			margin: 7px 0;
        cursor:pointer;
   		}
   		.item:hover{
   			background-color:#000;
   			color:#fff;
   		}
      .others{
        position:absolute;
        top:-7px;
        width:100%;
        background-color:#fff;
      }
   	}
  }
  .btn{
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    background-color:#000;
    width:100%;
    height:40px;
    color:#fff;
  }
 }
@media screen and (max-width: 1440px) {
  .menu {
    width: 120px;
  }
}
@media screen and (max-width: 1280px) {
  .menu {
    display: none;
  }
}
</style>
