const mutations = {
	setIsLogin(state,isLogin){
		state.isLogin = isLogin;
		console.log(state);
	},
	setUserInfo(state,user){
		state.userInfo = user;
	},
	initFollowMap(state,data){
		state.followMap = {}
		data.forEach(i=>{
			state.followMap[i.followingid] = true;
		});
	},
	initHeartMap(state,data){
		state.heartMap = {}
		data.forEach(i=>{
			state.heartMap[i.share.ID] = true;
		});
	},
	setFollowMap(state,data){
		state.followMap[data] = !state.followMap[data];
	},
	setHeartMap(state,data){
		state.heartMap[data] = !state.heartMap[data];
	}
}

export default mutations;