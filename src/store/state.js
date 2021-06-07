const userInfo = localStorage.getItem("_user")?JSON.parse(localStorage.getItem("_user")):null;

let state = {
	isLogin:userInfo?true:false,
	userInfo:userInfo,
	followMap:null,
	heartMap:null
};

export default state;