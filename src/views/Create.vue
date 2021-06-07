<template>
  <div class="create">
    <div class="share">
      <input v-show="hasImg" class="upload" type="file" @change="chooseFile" />
      <img
        v-show="!hasImg"
        class="img"
        :src="img"
        draggable="false"
        @click="add"
      />
      <div v-show="!hasImg" class="close" @click="close">
        <unicon name="times" fill="#ffffff"></unicon>
      </div>
      <div
        v-show="!hasImg"
        v-for="(tag, index) in tags"
        :key="index"
        class="imgTag"
        :style="{ top: tag.y + 'px', left: tag.x + 'px' }"
        @mousedown="tabDown($event, tag)"
      >
        <unicon name="tag-alt" fill="#000"></unicon>
        <div v-show="tag.show" class="tagInfo">
          <div>
            <span class="tagInfoLabel">标签</span
            ><input v-model="tag.name" placeholder="请输入标签" />
          </div>
          <div class="divider"></div>
          <div>
            <span class="tagInfoLabel">描述</span
            ><input v-model="tag.description" placeholder="请输入描述" />
          </div>
          <div class="divider"></div>
          <div>
            <span class="tagInfoLabel">链接</span
            ><input v-model="tag.url" placeholder="请输入链接" />
          </div>
        </div>
      </div>
    </div>
    <div class="tools">
      <div class="add" @click="create">发布</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "create",
  components: {},
  data() {
    return {
      hasImg: true,
      show: false,
      img: "",
      file: {},
      curTag: {},
      tags: [],
      currentX: 0,
      currentY: 0
    };
  },
  computed: {
    ...mapGetters({
      user: "getUserInfo"
    })
  },
  methods: {
    create() {
      let data = {
        file: this.file,
        user: this.user,
        tags: this.tags
      };
      this.$store.dispatch("addShare", data).then(res => {});
    },
    chooseFile(e) {
      this.file = e.target.files[0];
      this.img = window.URL.createObjectURL(e.target.files[0]);
      console.log(e.target.files[0]);
      this.hasImg = false;
      this.show = true;
      e.target.value = "";
    },
    close() {
      this.img = "";
      this.show = false;
      this.hasImg = true;
    },
    add(event) {
      console.log(event);
      this.tags.push({
        index: 1,
        show: true,
        name: "名",
        url: "链接",
        description: "",
        x: event.layerX,
        y: event.layerY
      });
    },
    tabDown(e, tag) {
      this.curTag = tag;
      this.currentX = tag.x;
      this.currentY = tag.y;
      this.show = false;
      let that = this;
      document.onmousemove = function(_e) {
        let x = _e.clientX - e.clientX + that.currentX;
        let y = _e.clientY - e.clientY + that.currentY;
        that.curTag.x = x < 0 ? 0 : x > 585 ? 585 : x;
        that.curTag.y = y < 0 ? 0 : y > 585 ? 585 : y;
      };
      document.onmouseup = function() {
        that.show = true;
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  },
  mounted() {}
};
</script>
<style scoped lang="less">
.create {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .share {
    position: relative;
    width: 600px;
    height: 600px;
    border-left: 1px solid #ededed;
    border-right: 1px solid #ededed;
    border-top: 1px solid #ededed;
    background: #fff;
    .img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      max-width: 100%;
      max-height: 100%;
    }
    .imgTag {
      position: absolute;
      cursor: pointer;
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
        .tagInfoLabel {
          color: #eaeaea;
          font-size: 12px;
          margin-right: 10px;
        }
        input {
          background: none;
          outline: none;
          border: none;
          color: #fff;
        }
        input:focus {
          border: none;
        }
      }
    }
    .upload {
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    .close {
      position: absolute;
      top: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.4);
      width: 40px;
      height: 40px;
      color: #fff;
      border-radius: 0px 0px 0px 100px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .tools {
    width: 600px;
    border-left: 1px solid #ededed;
    border-right: 1px solid #ededed;
    border-bottom: 1px solid #ededed;
    background: #ffffff;
    .tag {
      background: #000;
      color: #fff;
      padding: 10px 20px;
      margin-bottom: 10px;
    }
    .add {
      background: #000;
      color: #fff;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
