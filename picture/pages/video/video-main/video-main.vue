<template>
	<scroll-view scroll-y="true" enable-flex class="viedo_main" @scrolltolower="handleScrolltolower">
		<view class="video_item" v-for="item in videowp" :key="item.id" @click="handleGoVideo(item)">
			<image :src="item.img" mode="widthFix"></image>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				videowp:[],
				hasMore:true,
			}
		},
		methods: {
			getList(){
				this.require({
					url:this.urlobj.url,
					data:this.urlobj.parmas
				}).then(result=>{
					if(result.res.videowp.length===0){
						this.hasMore=false;
						uni.showToast({
							title:"我到底了^_^",
							icon:"none"
						});
						return;
					}
					this.videowp=[...this.videowp,...result.res.videowp];
				});
			},
			handleScrolltolower(){
				if(this.hasMore){
					this.urlobj.parmas.skip+=this.urlobj.parmas.limit;
					console.log(this.urlobj.parmas.skip);
					this.getList();
				}else{
					uni.showToast({
						title:"到极限了",
						icon:"none",
					});
				}
			},
			handleGoVideo(item){
				getApp().globalData.video=item;
				uni.navigateTo({
					url:"../../pages/videoPlay/videoPlay"
				});
			}
		},
		props:{
			urlobj:Object
		},
		watch:{
			urlobj(){
				this.videowp=[];
				this.getList();
			}
		},
		mounted() {
			this.getList();
			
		}
	}
</script>

<style lang="less">
.viedo_main{
	display: flex;
	flex-wrap: wrap;
	height:calc(100vh - 36px );
	.video_item{
		width: 33.33%;
		border: 5rpx solid #fff;
	}
}
</style>
