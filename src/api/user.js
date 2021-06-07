import axios from "axios";

const user = {
	async login(data){
		const res = await axios.post('/user/login',data);
		return res.data;
	},
	async register(data){
		const res = await axios.post('/user/register',data);
		return res.data;
	},
	async getUser(data){
		const res = await axios.get('/user/get/'+data);
		return res.data;
	}
}

export default user;