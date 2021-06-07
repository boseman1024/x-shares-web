<template>
  <div class="login">
  	<div class="content x-card">
      <div v-show="type==0">
       <input class="x-input" type="text" placeholder="账号" v-model="user.username"/>
       <input class="x-input" type="password" placeholder="密码" v-model="user.password"/>
       <div><button class="x-button" @click="login">登录</button></div>
       <div class="others">
         <div><router-link to="/">忘记密码？</router-link></div>
         <div>没有账户？<span class="x-text-button" @click="change(1)">注册</span></div>
       </div>
      </div>
      <div v-show="type==1">
       <input class="x-input" type="text" placeholder="账号" v-model="user.username"/>
       <input class="x-input" type="text" placeholder="昵称" v-model="user.nickname"/>
       <input class="x-input" type="password" placeholder="密码" v-model="user.password"/>
       <input class="x-input" type="password" placeholder="确认密码" v-model="user.password_confirm"/>
       <div><button class="x-button" @click="register">注册</button></div>
       <div class="others">
         <div><span class="x-text-button" @click="change(0)">登录</span></div>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
  	return {
      type:0,
  		user:{
        username:'',
        nickname:'',
        password:'',
        password_confirm:''
      }
  	}
  },
  methods:{
    change(type){
      this.user = {
        username:'',
        nickname:'',
        password:'',
        password_confirm:''
      };
      this.type = type;
    },
    valid(){
      if(this.user.username==''){
        console.log('请输入账号');
        return false;
      }
      if(this.user.password==''){
        console.log('请输入密码');
        return false;
      }
      const reg1 = /^[A-Za-z0-9]{5,30}$/;
      const reg2 = /^[A-Za-z0-9]{6,30}$/;
      if(!reg1.test(this.user.username)||!reg2.test(this.user.password)){
        console.log('账号或密码错误');
        return false;
      }
      return true;
    },
    validRegister(){
      if(!this.valid()){
        return false;
      }
      if(this.user.nickname==''){
        console.log('请输入昵称');
        return false;
      }
      if(this.user.password!=this.user.password_confirm){
        console.log('密码不一致');
        return false;
      }
      return true;
    },
  	login(){
      if(!this.valid()){
        return;
      }
      this.$store.dispatch('login',this.user).then((res)=>{
        if(res){
          this.$router.replace('/');
        }else{
          console.log('账号或密码错误');
        }
      });
    },
    register(){
      if(!this.validRegister()){
        return;
      }
      this.$store.dispatch("register",this.user).then(res=>{
        if(res.state){
          this.type = 0;
          this.user = {
            username:'',
            nickname:'',
            password:'',
            password_confirm:''
          };
        }else{
          console.log(res.msg);
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
 .login{
  display:flex;
  justify-content:center;
  align-items:center;
  height:100%;
  width:100%;
  margin-top: 60px !important;
  .content{
    width:350px;
    margin:0 auto;
    text-align:center;
    input{
      margin:5px 0;
      width:calc(100% - 20px);
    }
    button{
      margin:10px 0;
      width:100%;
    }
    .others{
      font-size:14px;
      a{
        color:#00BFFF;
      }
      div{
        margin:5px 0;
      }
    }
  }
 }
</style>
