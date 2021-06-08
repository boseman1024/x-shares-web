<template>
  <div>
    <div class="x-card">
      <div class="shareBox" @click="isVisible = true">
        <img class="share" :src="info.img + '_thumbnail.jpg'" />
      </div>
      <div class="info" v-if="!simple">
        <div class="user">
          <img class="avatar" :src="info.user.avatar" @click="toPersonal" />
          <div class="nickname" @click="toPersonal">
            <div>{{ info.user.nickname }}</div>
            <div class="note">{{ info.user.note }}</div>
          </div>
        </div>
        <div class="op">
          <unicon
            class="pointer"
            name="heart"
            :fill="isHeart == true ? '#FF4500' : '#262626'"
            @click="changeHeart"
          ></unicon>
        </div>
      </div>
      <div class="tags" v-if="!simple">
        <unicon
          class="pointer"
          name="google-hangouts-alt"
          fill="'#FF4500"
          @click="changeHeart"
        ></unicon>
        <span class="pointer">{{ info.category.Name }}</span>
        <!--        <unicon class="pointer" name="ellipsis-h" fill="#262626"></unicon>-->
      </div>
    </div>
    <template v-if="isVisible">
      <xViewer :visible.sync="isVisible" :data="info"></xViewer>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import xViewer from "@/components/x-viewer";
export default {
  props: ["info", "simple"],
  components: { xViewer },
  data() {
    return {
      isVisible: false,
      count: 1
    };
  },
  computed: {
    ...mapGetters({
      user: "getUserInfo",
      heartMap: "getHeartMap"
    }),
    isHeart() {
      return this.count && this.heartMap[this.info.ID];
    }
  },
  methods: {
    toPersonal() {
      this.$router.push("/personal/" + this.info.user.ID);
    },
    changeHeart() {
      let data = {
        userId: this.user.ID,
        shareId: this.info.ID
      };
      this.$store.dispatch("changeHeart", data).then(res => {
        if (res) {
          this.$store.commit("setHeartMap", this.info.ID);
          this.count++;
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.x-card {
  padding: 0;
  .shareBox {
    position: relative;
    &:hover::before {
      content: "查看内容";
      width: 120px;
      height: 70px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      z-index: 31;
      color: #fff;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #fff;
    }
    &:hover::after {
      content: "";
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 30;
      position: absolute;
      top: 0;
      left: 0;
      cursor: pointer;
    }
  }
  .share {
    display: block;
    width: 100%;
    height: 100%;
    min-width: 240px;
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ededed;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 25px;
      margin: 0 15px 0 0;
      cursor: pointer;
    }
    .nickname {
      cursor: pointer;
    }
    .user {
      display: flex;
      align-items: center;
      .note {
        font-size: 14px;
        margin: 3px 0 0 0;
        color: #8f8f8f;
      }
    }
    .op {
    }
  }
  .tags {
    display: flex;
    justify-content: start;
    align-items: center;
    height: 40px;
    padding: 0 20px;
    font-size: 15px;
    span {
      margin-left: 5px;
    }
  }
}
</style>
