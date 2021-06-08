<template>
  <div class="x-viewer" v-if="visible">
    <div class="modalBg" @click="close"></div>
    <div class="modalContent">
      <div class="img">
        <img :src="data.img" />
        <div
          v-show="showTag"
          v-for="(tag, index) in data.sharetag"
          :key="index"
          class="imgTag"
          :style="{ top: tag.Y + 'px', left: tag.X + 'px' }"
        >
          <unicon name="tag-alt" fill="#000"></unicon>
          <div class="tagInfo">
            <div>
              <span class="tagInfoLabel">标签</span>
              <p>{{ tag.name }}</p>
            </div>
            <div class="divider"></div>
            <div>
              <span class="tagInfoLabel">描述</span>
              <p>{{ tag.description }}</p>
            </div>
            <div class="divider"></div>
            <div>
              <span class="tagInfoLabel">链接</span>
              <p class="pointer">{{ tag.url }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="info">
        <div class="user">
          <img :src="data.user.avatar" @click="toPersonal(data.user.ID)" />
          <span @click="toPersonal">{{ data.user.nickname }}</span>
          <span
            class="x-text-button follow"
            v-if="isNotMy"
            @click="changeFollow"
            >{{ isFollow }}</span
          >
          <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
        <div class="comment">
          <div class="content" :style="'height:400px'">
            <div class="contentItem" v-for="item in commentList" :key="item.id">
              <div class="contentItemHeader">
                <div class="contentItemAvatar">
                  <img
                    @click="toPersonal(item.creator.ID)"
                    :src="item.creator.avatar"
                  />
                </div>
                <div class="contentItemNickname">
                  <span
                    @click="toPersonal(item.creator.ID)"
                    class="x-text-button"
                    >{{ item.creator.nickname }}</span
                  >
                </div>
              </div>
              <div class="contentItemBody">
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>
          <div class="op">
            <unicon
              class="opItem pointer"
              name="tag-alt"
              :fill="showTag ? '#FF4500' : '#262626'"
              @click="showTag = !showTag"
            ></unicon>
            <unicon
              v-if="isNotMy"
              class="opItem pointer"
              name="heart"
              :fill="isHeart ? '#FF4500' : '#262626'"
              @click="changeHeart"
            ></unicon>
            <div class="opItem-r">
              <unicon
                class="pointer"
                name="google-hangouts-alt"
                fill="'#FF4500"
                @click="changeHeart"
              ></unicon>
              <span>{{ data.category.Name }}</span>
            </div>
          </div>
          <div class="send">
            <input
              v-model="comment"
              type="text"
              class="x-input-clear"
              placeholder="添加评论"
            />
            <span class="x-text-button" @click="sendComment">发布</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["data", "visible"],
  components: {},
  data() {
    return {
      followCount: 1,
      heartCount: 1,
      comment: "",
      commentList: [],
      showTag: true
    };
  },
  computed: {
    ...mapGetters({
      user: "getUserInfo",
      heartMap: "getHeartMap",
      followMap: "getFollowMap"
    }),
    isNotMy() {
      return this.data.user.ID != this.user.ID;
    },
    isHeart() {
      return this.heartCount && this.heartMap[this.data.ID];
    },
    isFollow() {
      return this.followCount && this.followMap[this.data.user.ID]
        ? "取消关注"
        : "关注";
    }
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
    },
    toPersonal(id) {
      this.$router.push("/personal/" + id);
    },
    changeFollow() {
      let data = {
        userId: this.user.ID,
        followingId: this.data.user.ID
      };
      this.$store.dispatch("changeFollow", data).then(res => {
        if (res) {
          this.$store.commit("setFollowMap", this.data.user.ID);
          this.followCount++;
        }
      });
    },
    changeHeart() {
      let data = {
        userId: this.user.ID,
        shareId: this.data.ID
      };
      this.$store.dispatch("changeHeart", data).then(res => {
        if (res) {
          this.$store.commit("setHeartMap", this.data.ID);
          this.heartCount++;
        }
      });
    },
    getComment() {
      let data = {
        shareRef: this.data.ID
      };
      this.$store.dispatch("getCommentList", data).then(res => {
        this.commentList = res;
      });
    },
    sendComment() {
      let data = {
        shareRef: this.data.ID,
        creatorRef: this.user.ID,
        description: this.comment
      };
      this.$store.dispatch("addComment", data).then(res => {
        this.getComment();
        this.comment = "";
      });
    }
  },
  mounted() {
    this.getComment();
  }
};
</script>
<style scoped lang="less">
.x-viewer {
  z-index: 9997;

  &,
  .modalBg {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .modalBg {
    z-index: 9998;
    background: rgba(0, 0, 0, 0.5);
  }
  &,
  .modalContent {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modalContent {
    position: relative;
    z-index: 9999;
    flex-wrap: wrap;
    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      width: 20px;
      height: 20px;
      img {
        width: 100%;
      }
    }
    .img,
    .info {
      height: 600px;
      background: #fff;
    }
    .img {
      width: 600px;
      height: 600px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      img {
        max-width: 100%;
        max-height: 100%;
      }
      .imgTag {
        position: absolute;
        z-index: 1;
        &:hover {
          z-index: 9999;
        }
        .divider {
          height: 0.5px;
          width: 100%;
          background: rgba(255, 255, 255, 0.5);
          margin: 5px 0;
        }
        .tagInfo {
          background: rgba(0, 0, 0, 0.4);
          padding: 10px 20px;
          border-radius: 5px;
          text-align: left;
          color: #fff;
          max-height: 200px;
          overflow-y: auto;
          .tagInfoLabel {
            color: #eaeaea;
            font-size: 12px;
            margin-right: 10px;
          }
          p {
            width: 200px;
            word-break: break-all;
            white-space: break-spaces;
            font-size: 13px;
          }
        }
      }
    }
    .info {
      width: 350px;
      border-left: 1px solid #ededed;
      z-index: 2;
      .user {
        height: 70px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #ededed;
        span {
          cursor: pointer;
        }
        .follow {
          width: 80px;
          text-align: center;
        }
        img {
          width: 50px;
          height: 50px;
          cursor: pointer;
          border-radius: 25px;
        }
      }
      .comment {
        position: relative;
        height: 530px;
        .content {
          overflow-y: auto;
          white-space: break-spaces;
          word-break: break-all;
          padding: 10px;
          .contentItem {
            margin-bottom: 10px;
            .contentItemHeader {
              display: flex;
              justify-content: start;
              align-items: center;
              height: 50px;
              .contentItemAvatar {
                width: 60px;
                text-align: center;
                img {
                  width: 40px;
                  height: 40px;
                  cursor: pointer;
                  border-radius: 25px;
                }
              }
              .contentItemNickname {
                font-size: 14px;
                text-align: left;
              }
            }
            .contentItemBody {
              margin-left: 60px;
              font-size: 14px;
              text-align: left;
            }
          }
        }
        .send,
        .op {
          width: 100%;
          display: flex;
          align-items: center;
        }
        .op {
          height: 50px;
          position: absolute;
          bottom: 60px;
          border-top: 1px solid #ededed;
          .opItem {
            margin-left: 20px;
          }
          .opItem-r{
            margin-left: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            span{
              margin-left: 5px;
              font-size: 14px;
            }
          }
        }
        .send {
          height: 60px;
          position: absolute;
          bottom: 0;
          border-top: 1px solid #ededed;
          input {
            width: 100%;
          }
          span {
            display: block;
            font-size: 14px;
            text-align: center;
            width: 80px;
            height: 100%;
            line-height: 60px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  .x-viewer {
    .modalContent {
      .info {
        height: 140px;
        width: 600px;
        border-top: 1px solid #ededed;
        border-left: 0px solid #ededed;
        .comment {
          height: 70px;
          .op {
            position: relative;
            bottom: 0;
            border-bottom: 0px solid #ededed;
          }
          .content,
          .send {
            display: none;
          }
        }
      }
    }
  }
}
</style>
