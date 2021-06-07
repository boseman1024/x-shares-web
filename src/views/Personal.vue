<template>
  <div class="personal">
    <Userinfo :userId="$route.params.id" :count="count"></Userinfo>
    <xTab :tabs="tabs" :curTab="curTab" @changeTab="changeTab"></xTab>
    <Wall :userId="$route.params.id" :type="0" v-show="curTab == 0"></Wall>
    <Wall :userId="$route.params.id" :type="1" v-show="curTab == 1"></Wall>
    <List
      :userId="$route.params.id"
      :type="0"
      v-show="curTab == 2"
      @count="setFollowCount"
    ></List>
    <List
      :userId="$route.params.id"
      :type="1"
      v-show="curTab == 3"
      @count="setFanCount"
    ></List>
  </div>
</template>

<script>
import Userinfo from "@/components/Userinfo";
import Wall from "@/components/Wall";
import List from "@/components/List";
import xTab from "@/components/x-tab";
export default {
  name: "Personal",
  components: { Userinfo, xTab, Wall, List },
  data() {
    return {
      curTab: 0,
      tabs: [
        {
          index: 0,
          name: "分享",
          icon: "camera"
        },
        {
          index: 1,
          name: "收藏",
          icon: "heart"
        },
        {
          index: 2,
          name: "关注",
          icon: "smile-squint-wink-alt"
        },
        {
          index: 3,
          name: "粉丝",
          icon: "sun"
        }
      ],
      count: {
        shareCount: 0,
        followCount: 0,
        fanCount: 0
      }
    };
  },
  computed: {},
  methods: {
    changeTab(val) {
      this.curTab = val;
    },
    setSharesCount(i) {
      this.count.shareCount = i;
    },
    setFollowCount(i) {
      this.count.followCount = i;
    },
    setFanCount(i) {
      this.count.fanCount = i;
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less"></style>
