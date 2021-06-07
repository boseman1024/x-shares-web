<template>
  <div class="home">
    <xCardImg class="item" v-for="i in list" :info="i" :simple="false"></xCardImg>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import xCardImg from '@/components/x-card-img';
export default {
  name: "home",
  components: {xCardImg},
  data(){
  	return{
  		title:'首页',
  		list:[]
  	}
  },
  computed:{
    ...mapGetters({
      user:'getUserInfo'
    }),
  },
  mounted(){
    this.$store.dispatch("getIndex",this.user.ID).then(res=>{
      this.list = res;
    });
  }
};
</script>
<style scoped lang="less">
.home{
	margin:0 auto;
	width:600px;
  .item{
    margin-bottom:30px;
  }
}
</style>
