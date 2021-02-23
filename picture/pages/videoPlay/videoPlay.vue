<template>
	<view class="video_play">
		<image :src="videoObj.img" mode=""></image>
		<!-- 工具栏 -->
		<view class="video_tool">
			<view :class="['iconfont',muted?'icon-silence-fill':'icon-icon-']" @click="handleMuted">
			</view>
			<view class="iconfont icon-zhuanfaxing">
				<button open-type="share"></button>
			</view>
		</view>
		<!-- 视频 -->
		<view class="video_wrap">
			<video :src="videoObj.video" controls objectFit="fill" :muted="muted"></video>
		</view>
		<!-- 下载 -->
		<view class="download">
			<view class="download_btn" @click="handleDownload">
				下载高清
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoObj:{},
				// 是否静音
				muted:false,
			}
		},
		methods: {
			handleMuted(){
				this.muted=!this.muted;
			},
			async handleDownload(){
				await uni.showLoading({
					title:"下载中"
				});
				const {template}=(await uni.downloadFile({
					url:this.videoObj.video
				}))[1];
				await uni.saveVideoToPhotosAlbum({
					filePath:template
				});
				uni.hideLoading();
				uni.showToast({
					title:"下载完成"
				});
			}
		},
		onLoad() {
			this.videoObj=getApp().globalData.video;
		}
	}
</script>

<style lang="less">
.video_play{
	position: relative;
	image{
		position: absolute;
		width: 100vw;
		height: 100vh;
		z-index: -1;
		// 滤镜
		filter: blur(20px);
	}
	.video_tool{
		height: 80rpx;
		display: flex;
		justify-content: flex-end;
		.iconfont{
			width: 80rpx;
			color: #fff;
			border-radius: 40rpx;
			background-color: rgba(0,0,0,0.2);
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 20rpx;
			
		}
		.icon-zhuanfaxing{
			position: relative;
			button{
				position: absolute;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
		}
	}
	.video_wrap{
		display: flex;
		justify-content: center;
		video{
			width: 360rpx;
			height: 600rpx;
		}
	}
	.download{
		display: flex;
		justify-content: center;
		margin-top: 30rpx;
		.download_btn{
			width: 360rpx;
			height: 80rpx;
			border-radius: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			border: 1rpx solid #fff;
			background-color: rgba(0,0,0,0.6);
		}
	}
	
}
</style>
