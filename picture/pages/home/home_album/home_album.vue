<template>
	<scroll-view class="album_scroll" scroll-y="true" @scrolltolower="handleToLower">
		<!-- 轮播图 -->
		<view class="album_swiper">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="item in banner" :key="item.id">
					<image :src="item.thumb"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 列表 -->
		<view class="album_list">
			<!-- 传递id?id=${item.id} -->
			<navigator class="album_item" v-for="item in album" :key="item.id" :url="`../../pages/index/index`">
			<!-- <navigator class="album_item" v-for="item in album" :key="item.id" > -->
				<view class="album_img">
					<image :src="item.cover"mode="aspectFill" ></image>
				</view>
				<view class="album_info">
					<view class="album_name">
						{{item.name}}
					</view>
					<view class="album_desc">
						{{item.desc}}
					</view>
					<view class="album_btn">
						<view class="album_attention">
							关注
						</view>
					</view>
				</view>
			</navigator>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				banner:[],
				album:[],
				params:{
					limit:30,
					order:"new",
					skip:0
				},
				next:true,
			}
		},
		methods: {
			getList(){
				this.require({
					url:"http://157.122.54.189:9088/image/v1/wallpaper/album",
					data:this.params
				}).then(result=>{
					if(result.res.album.length===0){
						this.next=false;
						return;
					}
					if(this.banner.length===0){
						this.banner=result.res.banner;
					}
					// 数据叠加
					this.album=[...this.album,...result.res.album];
				});
			},
			handleToLower(){
					if(this.next){
						//修改参数
						this.params.skip+=this.params.limit;
						// 重新请求
						this.getList();
					}else{
						uni.showToast({
							title:"你到达了我的极限^_^"
						})
					}
			}
			
		},
		mounted() {
			uni.setNavigationBarTitle({
				title:"专辑",
				fail() {
					console.log("成功修改");
				}
			})
			this.getList();
		}
	}
</script>

<style lang="less">
.album_swiper{
	swiper{
		height: calc(750rpx/2.3);
		swiper-item{
			image{
				width: 100%;
			}
		}
	}
}
// 列表
.album_list{
	padding: 10rpx;
	.album_item{
		padding: 10rpx 0;
		display: flex;
		.album_img{
			flex: 1;
			padding: 10rpx;
			border-bottom: 1rpx solid #F4F4F5;
			image{
				width: 200rpx;
				height: 200rpx;
			}
		}
		.album_info{
			flex: 2;
			padding:0 10rpx ;
			overflow: hidden;
			.album_name{
				font-size: 30rpx;
				color: #000;
				padding: 10rpx 0;
			}
			.album_desc{
				padding: 10rpx 0;
				font-size: 24rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			.album_btn{
				padding: 10rpx;
				display: flex;
				justify-content: flex-end;
				.album_attention{
					color: #d52a7e;
					border: 1rpx solid #d52a7e;
					padding: 10rpx;
				}
			}
		}
	}
}
.album_scroll{
	height: 100vh;
}
</style>
