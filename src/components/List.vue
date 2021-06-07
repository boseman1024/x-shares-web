<template>
  <div class="List">
    <div class="count">{{count}}</div>
    <ul>
      <li v-for="i in list">
        <div class="userinfo" @click="toPersonal(i)">
          <img class="avatar" :src="i.avatar"/>
          <div>{{i.nickname}}</div>
        </div>
        <div class="op">操作</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "List",
  props: ['userId','type'],
  data(){
    return {
      list:[]
    }
  },
  computed:{
    count(){
      this.$emit("count",this.list.length);
      if(this.type==0){
          return '关注数：'+this.list.length;
      }
      return '粉丝数：'+this.list.length;
    }
  },
  methods:{
    toPersonal(i){
      this.$router.push("/personal/"+i.ID);
    },
  },
  mounted(){
    this.$store.dispatch("getFollowList",{type:this.type,id:this.userId}).then(res=>{
      this.list = [];
      res.filter((data)=>{
        if(this.type==0){
          this.list.push(data.user);
        }else{
          this.list.push(data.follower);
        }
      });
    });
  }
};
</script>

<style scoped lang="less">
.List{
  .count{
    text-align:center;
    margin:10px 0;
    font-size:13px;
    color:#666666;
  }
  ul li{
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:30px;
    border-bottom:1px solid #ededed;
    .userinfo{
      display:flex;
      align-items:center;
      cursor:pointer;
      .avatar{
        width:100px;
        height:100px;
        border-radius:50px;
        margin-right:30px;
      }
    }
    &:hover{
      box-shadow:0px 0px 5px #ededed;
    }
  }
  
}
</style>
