export default(params)=>{
	uni.showLoading({
		title:"加载中"
	});
	return new Promise((resolve,reject)=>{
		wx.request({
			...params,
			success(res) {
				resolve(res.data);
			},
			header:{
				'content-type':'application/json'
			},
			fail(err) {
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		});
		
	});
}