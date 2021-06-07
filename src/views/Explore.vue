<template>
  <div class="explore">
    <div class="result">
      <xCardImg class="item" v-for="i in list" :info="i" :simple="true"></xCardImg>
    </div>
  </div>
</template>

<script>
import xCardImg from '@/components/x-card-img';
export default {
  name: "explore",
  components: {xCardImg},
  data(){
  	return{
  		list:[],
      cur:{},
      isShow:false
  	}
  },
  methods:{

  },
  mounted(){
    this.$store.dispatch("getShareList",null).then(res=>{
      this.list = res;
    });
  }
};
</script>
<style scoped lang="less">
.explore{
  .result{
    column-count: 3;
    column-gap: 0;
    .item{
      width:285px;
      box-sizing: border-box;
      break-inside: avoid;
      margin:0 0 15px 0;
    }
  }
}
</style>
