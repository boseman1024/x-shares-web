<template>
  <div class="x-tabs">
    <div class="x-tab" v-for="x in tabs" :class="cur==x.index?'active':''" @click="change(x.index)"><unicon :name="x.icon" width="18px" height="18px" :fill="cur==x.index?'#FF4500':'#262626'"></unicon><span>{{x.name}}</span></div>
  </div>
</template>

<script>

export default {
  props:['tabs','curTab'],
  components: {
    
  },
  computed:{
    cur:{
      set(val){
        this.$emit('changeTab',val);
      },
      get(){
        return this.curTab;
      }
    }
  },
  data(){
  	return{
  		
  	}
  },
  methods:{
    change(val){
      this.cur = val;
    }
  }
};
</script>
<style scoped lang="less">
.x-tabs{
  width:100%;
  display:flex;
  justify-content:center;
  border-top:1px solid #ededed ;
  span{
    margin-left:5px;
  }
  .active{
    border-top:1px solid #FF4500 !important;
    color:#FF4500;
  }
  .x-tab{
    transition: all .3s ease-out;
    border-top:1px solid rgba(0,0,0,0);
    cursor:pointer;
    padding:10px 20px;
    margin:0 10px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:14px;
  }
}
</style>
