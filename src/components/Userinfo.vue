<template>
  <div class="Userinfo">
    <img class="avatar" :src="userinfo.avatar" />
    <div class="msg">
      <div class="nickname">{{ userinfo.nickname }}</div>
      <div class="countArea">
        <span class="count"
          ><span class="b">{{ count.shareCount }} </span>分享</span
        >
        <span class="count"
          ><span class="b">{{ count.fanCount }} </span>粉丝</span
        >
        <span class="count"
          >正在关注 <span class="b">{{ count.followCount }}</span></span
        >
      </div>
      <div class="note">{{ userinfo.note }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Userinfo",
  props: ["userId", "count"],
  data() {
    return {
      userinfo: {
        nickname: "",
        avatar: "",
        note: ""
      }
    };
  },
  mounted() {
    this.$store.dispatch("getUser", this.userId).then(res => {
      this.userinfo = res;
    });
  },
  methods: {}
};
</script>

<style scoped lang="less">
.Userinfo {
  width: 100%;
  padding: 80px 0 50px 0;
  display: flex;
  justify-content: center;
  cursor: default;
  .avatar {
    width: 150px;
    height: 150px;
    border-radius: 75px;
    border: 1px solid #ededed;
    box-shadow: 5px 5px 5px #ededed;
    margin-right: 60px;
  }
  .msg {
    width: 450px;
    .nickname {
      font-size: 30px;
    }
    .countArea {
      margin: 15px 0;
      .count {
        margin-right: 50px;
        font-size: 16px;
      }
    }
    .tags {
      margin: 10px 0;
      span {
        margin: 0 10px 0 0;
      }
    }
  }
}
</style>
