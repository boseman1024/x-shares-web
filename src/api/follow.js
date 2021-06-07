import axios from "axios";

const follow = {
	async getFollowList(data){
		const res = await axios.post('/follow/list',data);
		return res.data;
	},
	async change(data){
		const res = await axios.post('/follow/change',data);
		return res.data;
	}
}

export default follow;