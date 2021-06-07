import axios from "axios";

const share = {
  async add(data) {
    const res = await axios.post("/comment/add", data);
    return res.data;
  },
  async getCommentList(data) {
    const res = await axios.post("/comment/list", data);
    return res.data;
  },
  async del(data) {
    const res = await axios.post("/comment/del", data);
    return res.data;
  }
};

export default share;
