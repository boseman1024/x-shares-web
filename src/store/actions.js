import userApi from "@/api/user";
import shareApi from "@/api/share";
import followApi from "@/api/follow";
import heartApi from "@/api/heart";
import comment from "@/api/comment";

const actions = {
  async login({ commit }, data) {
    const res = await userApi.login(data);
    if (res.Code != 200) {
      return false;
    }
    localStorage.setItem("_token", res.data.Token);
    localStorage.setItem("_user", JSON.stringify(res.data.User));
    commit("setUserInfo", res.data.User);
    commit("setIsLogin", true);
    return true;
  },
  async logout({ commit }) {
    localStorage.clear();
    commit("setIsLogin", false);
  },
  async register({ commit }, data) {
    const res = await userApi.register(data);
    if (res.Code != 200) {
      return { state: false, msg: res.msg };
    }
    return { state: true };
  },
  async getUser({ commit }, data) {
    const res = await userApi.getUser(data);
    return res.data;
  },
  async initUserDataMap({ dispatch, commit }, data) {
    await dispatch("getFollowList", { type: 0, id: data.ID });
    await dispatch("getHeartList", data.ID);
  },
  async getFollowList({ commit }, data) {
    let params = {};
    if (data.type == 0) {
      params.userId = parseInt(data.id);
    } else {
      params.followingId = parseInt(data.id);
    }
    const res = await followApi.getFollowList(params);
    commit("initFollowMap", res.data);
    return res.data;
  },
  async changeFollow({ commit }, data) {
    const res = await followApi.change(data);
    return res.data;
  },
  async addShare({ commit }, data) {
    const res = await shareApi.add(data);
  },
  async delShare({ commit }, data) {
    const res = await shareApi.del(data);
  },
  async getIndex({ commit }, data) {
    let params = {};
    params.uid = data ? parseInt(data) : data;
    const res = await shareApi.getIndex(params);
    return res.data;
  },
  async getShareList({ commit }, data) {
    let params = {};
    params.uid = data ? parseInt(data) : data;
    const res = await shareApi.getShareList(params);
    return res.data;
  },
  async getHeartList({ commit }, data) {
    let params = {};
    params.userId = data ? parseInt(data) : data;
    const res = await heartApi.getHeartList(params);
    commit("initHeartMap", res.data);
    return res.data;
  },
  async changeHeart({ commit }, data) {
    const res = await heartApi.change(data);
    return res.data;
  },
  async getCommentList({ commit }, data) {
    const res = await comment.getCommentList(data);
    return res.data;
  },
  async addComment({ commit }, data) {
    const res = await comment.add(data);
    return res.data;
  },
  async delComment({ commit }, data) {
    const res = await comment.del(data);
    return res.data;
  }
};

export default actions;
