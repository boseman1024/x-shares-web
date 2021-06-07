import axios from "axios";

const share = {
  async getIndex(data) {
    const res = await axios.post("/index", data);
    return res.data;
  },
  async add(data) {
    const params = new FormData();
    params.append("file", data.file);
    params.append("userId", data.user.ID);
    params.append("tags", JSON.stringify(data.tags));
    const config = {
      headers: { "Content-Type": "multipart/form-data" }
    };
    const res = await axios.post("/share/add", params, config);
    return res.data;
  },
  async getShareList(data) {
    const res = await axios.post("/share/list", data);
    return res.data;
  },
  async del(data) {
    const res = await axios.delete("/share/del/" + data);
    return res.data;
  }
};

export default share;
