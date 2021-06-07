<template>
  <div class="Wall">
    <div class="count">{{ count }}</div>
    <div class="shareBox">
      <div class="share" v-for="i in list" :key="'type' + i.ID">
        <template>
          <img v-if="i.img" class="img" :src="i.img + '_thumbnail.jpg'" />
          <div v-else>已失效</div>
        </template>
        <div class="info">
          <div
            class="pointer"
            style="margin-right: 40px;"
            @click="showDetail(i)"
          >
            <div><unicon name="eye" fill="#ffffff"></unicon></div>
            <div>查看</div>
          </div>
          <div class="pointer" @click="delItem(i.ID)">
            <div>
              <unicon class="pointer" name="trash-alt" fill="#ffffff"></unicon>
            </div>
            <div>删除</div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="isVisible">
      <xViewer :visible.sync="isVisible" :data="info"></xViewer>
    </template>
  </div>
</template>

<script>
import xViewer from "@/components/x-viewer";
export default {
  name: "Wall",
  props: ["userId", "type"],
  components: { xViewer },
  data() {
    return {
      icon: {
        like: require("@/assets/icon/icon_like2.svg"),
        comment: require("@/assets/icon/icon_comment.svg")
      },
      list: [],
      info: {},
      isVisible: false
    };
  },
  computed: {
    count() {
      this.$emit("count", this.list.length);
      if (this.type == 0) {
        return "分享数：" + this.list.length;
      }
      return "收藏数：" + this.list.length;
    }
  },
  methods: {
    getData() {
      if (this.type == 0) {
        this.$store.dispatch("getShareList", this.userId).then(res => {
          this.list = res;
        });
      } else {
        this.$store.dispatch("getHeartList", this.userId).then(res => {
          this.list = [];
          res.filter(data => {
            this.list.push(data.share);
          });
        });
      }
    },
    showDetail(info) {
      this.info = info;
      this.isVisible = true;
    },
    delItem(id) {
      if (this.type == 0) {
        this.$store.dispatch("delShare", id).then(res => {
          this.getData();
        });
      } else {
        let data = {
          userId: parseInt(this.userId),
          shareId: id
        };
        this.$store.dispatch("changeHeart", data).then(res => {
          this.getData();
        });
      }
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped lang="less">
.Wall {
  .count {
    text-align: center;
    margin: 10px 0;
    font-size: 13px;
    color: #666666;
  }
  .shareBox {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .share {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 280px;
      height: 280px;
      margin: 10px;
      .img {
        position: absolute;
        max-width: 100%;
        max-height: 100%;
      }
      .info {
        position: absolute;
        z-index: 999;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.3);
        opacity: 0;
        color: #fff;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
