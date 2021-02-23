<template>
	<view>
		
		<!-- 用户信息 -->
		<view class="user_info">
			<view class="user_icon">
				<image :src="imgDetail.thumb" mode="widthFix"></image>
			</view>
			<view class="user_desc">
				<view class="user_name">
					<!-- {{imgDetail.user.name}} -->
				</view>
				<view class="user_time">
					{{imgDetail.atime}}
				</view>
			</view>
		</view>
		<!-- 高清大图 -->
		<view class="high_img">
			<swiper-action @swiperAction="handleSwiperAction">
				<image :src="imgDetail.thumb" mode="widthFix"></image>
			</swiper-action>
		</view>
		<!-- 点赞 -->
		<view class="user_rank">
			<view class="rank">
				<text></text>
			</view>
		</view>
		<!-- 专辑开始 -->
		<view class="album_wrap" v-if="album.length>0">
			<view class="album_title">
				相关
			</view>
			<view class="album_list">
				<view class="album_item" v-for="item in album" :key="item.id">
					<view class="album_cover">
						<image :src="item.cover" mode="aspectFill"></image>
					</view>
					<view class="album_info">
						<view class="album_info_text">
							专辑
						</view>
						<view class="album_name">
							{{item.name}}
						</view>
						<text class="iconfont">></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 最热评论 -->
		<view class="comment_hot">
			<view class="comment_title">
				<text class="icon-huo iconfont "></text>
				<text class="comment_text">最热评论</text>
			</view>
			<view class="comment_list">
				<view class="comment_item" v-for="item in hot" :key="item.id">
					<!-- //用户信息 -->
					<view class="comment_user">
						<!-- 用户头像 -->
						<view class="user_icon">
							<image :src="item.user.avatar" mode="widthFix"></image>
						</view>
						<view class="user_name">
							<view class="user_nickname">
								{{item.user.name}}
							</view>
							<view class="user_time">
								{{item.atime}}
							</view>
						</view>
						<view class="user_badge">
							<image v-for="item2 in item.user.title" :key="item2.icon" :src="item2.icon"></image>
						</view>
					</view>
					<!-- 评论数量 -->
					<view class="comment_desc">
						<view class="comment_content">
							{{item.content}}
						</view>
						<view class="comment_link">
							<text class="icondianzan icon-dianzan iconfont"></text>
							<text class="iconfont">{{item.size}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 下载 -->
		<view class="download">
			<view class="download_btn" @click="handleDownload">
				下载图片
			</view>
		</view>
	</view>
</template>

<script>
	import moment from "moment";
	import swiperAction from "@/components/swiperAction/swiperAction";
	moment.locale("zh-cn");
	export default {
		data() {
			return {
				imgDetail:{},
				album:[],
				hot:[],
				comment:[],
				imgIndex:0
			}
		},
		methods: {
			getComents(id){
				this.require({
					// url:`http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
					url:"http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/5a13d879e7bce743777223e4/comment"
				}).then(result=>{
					this.album=result.res.album;
					this.hot=result.res.hot;
					this.comment=result.res.comment;
				});
			},
			handleSwiperAction(e){
				const {imgList}=getApp().globalData;
				if(e.direction==="left"&&this.imgIndex<imgList.length-1){
					this.imgIndex++;
					this.getData();
				}else if(e.direction==="right"&& this.imgIndex>0){
					this.imgIndex--;
					this.getData();
				}else{
					uni.showToast({
						title:"没有更多数据了",
						icon:"none"
					});
				}
			},
			getData(){
				const {imgList,imgIndex}=getApp().globalData;
				this.imgDetail=imgList[this.imgIndex];
				// 时间格式处理
				this.imgDetail.atime=moment(this.imgDetail.atime*1000).fromNow();
				this.getComents(this.imgDetail.id);
			},
			// 下载图片
			async handleDownload(){
				// 将远程文件下载到程序内存
				const result1=await uni.downloadFile({
					url:this.imgDetail.img
				});
				const tempFilePath=result1[1];
				const result2=await uni.saveImageToPhotosAlbum({
					filePath:tempFilePath
				});
				uni.showToast({
					title:"下载成功"
				})
			}
		},
		onLoad() {
			const {imgIndex}=getApp().globalData;
			this.imgIndex=imgIndex;
			this.getData();
		},
		components:{
			swiperAction
		}
	}
</script>

<style lang="less">
	.user_info{
		display: flex;
		padding: 20rpx;
		.user_icon{
			padding: 0 20rpx;
			image{
				width: 88rpx;
				border-radius: 50%;
			}
		}
		.user_desc{
			.user_name{
				color: #000;
				font-weight: 600;
			}
			.user_time{
				color: #ccc;
				font-size: 24rpx;
				padding: 10rpx 0;
			}
		}
	}
	// 专辑
	.album_wrap{
		padding: 20rpx;
		.album_title{
			padding: 10rpx 0;
		}
		.album_list{
			.album_item{
				display: flex;
				padding:10rpx 0 ;
				border-bottom: 10rpx solid #eee;
				.album_cover{
					flex: 1;
					image{
						width: 180rpx;
						height: 180rpx;
					}
				}
				.album_info{
					flex: 3;
					padding-left: 20rpx;
					position: relative;
					.album_info_text{
						width: 100rpx;
						height: 50rpx;
						background-color: #FF5A5F;
						color: #fff;
						display: flex;
						justify-content: center;
						align-items: center;
					}
					.album_name{
						padding: 10rpx 0;
						color: #888;
					}
					.iconfont{
						font-size: 40rpx;
						position: absolute;
						top: 50%;
						transform: translate(-50%);
						right: 10%;
						color: #333333;
					}
				}
			}
		}
	}
	// 最热评论
	.comment_hot{
		.comment_title{
			padding: 15rpx;
			.comment_text{
				font-weight: 600;
				font-size: 28rpx;
				color: #666;
				margin-left: 10rpx;
			}
			.icon-huo{
				color: #DD524D;
			}
		}
		// 数据列表
		.comment_list{
			.comment_item{
				border-bottom: 15rpx solid #eee;
				.comment_user{
					display: flex;
					padding: 20rpx 0;
					.user_icon{
						width: 15%;
						// width: 100rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						image{
							width: 90%;
						}
					}
					.user_name{
						flex: 1;
						.user_nickname{
							color: #777;
						}
						.user_time{
							color: #ccc;
							font-size: 23rpx;
							padding: 5rpx;
						}
					}
					.user_badge{
						image{
							width: 40rpx;
							height: 40rpx;
						}
					}
				}
				.comment_desc{
					display: flex;
					padding: 30rpx 0;
					.comment_content{
						flex: 1;
						padding-left:15%;
						color:#333333;
					}
					.comment_link{
						text-align: center;
						.icondianzan{
							margin-right: 10rpx;
							color: #ced4dc;
						}
					}
				}
			}
		}
	}
	// 下载
	.download{
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.download_btn{
			width: 90%;
			height: 85%;
			background-color: #d52a7e;
			color: #fff;
			font-size: 50rpx;
			font-weight: 600;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
