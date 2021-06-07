const getters = {
	getIsLogin:function(state){
		return state.isLogin;
	},
	getUserInfo:function(state){
		return state.userInfo
	},
	getFollowMap:function(state){
		return state.followMap
	},
	getHeartMap:function(state){
		return state.heartMap
	}
}
export default getters;