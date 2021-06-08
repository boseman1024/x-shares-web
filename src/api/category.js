import axios from "axios";

const category = {
  async getCategoryList(data) {
    const res = await axios.post("/category/list", data);
    return res.data;
  }
};

export default category;
