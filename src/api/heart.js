import axios from "axios";

const heart = {
	async getHeartList(data){
		const res = await axios.post('/heart/list',data);
		return res.data;
	},
	async change(data){
		const res = await axios.post('/heart/change',data);
		return res.data;
	}
}

export default heart;