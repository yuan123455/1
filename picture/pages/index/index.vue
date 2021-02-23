<template>
	<view>
		<view class="album_bg">
			<image :src="album.img" mode="widthFix"></image>
			<view class="album_info">
				<view class="album_name">
					{{album.name}}
				</view>
				<view class="album_btn">
					关注专辑
				</view>
			</view>
		</view>
		<view class="album_author">
			<view class="album_author_info">
				<!-- <image mode="widthFix" :src="album.user.avatar"></image> -->
				<image mode="widthFix" :src="album.img"></image>
				<view class="author_name">
					<!-- {{album.user.name}} -->
				</view>
			</view>
			<view class="album_author_desc">
				<text>{{album_desc}}</text>
			</view>
		</view>
		<view class="album_list">
			<view class="album_item" v-for="item in wallpaper" :key="item.id">
				<!-- <image mode="widthFix" :src="item.thumb+item.rule.replace('$<Height>',360)"></image> -->
				<image mode="widthFix" :src="item.img"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// params: {
				// 	limit: 30,
				// 	order: "new",
				// 	skip: 0,
				// 	first: 1
				// },
				params:{
					"count":"10"
				},
				id: -1,
				// id:5e5cf679e7bce739db1281e4,
				album: [],
				wallpaper: [] 
			}
		},
		methods: {
			getList() {
				// this.require({
				// 	url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/walpaper`,
				// 	data: this.params
				// }).then(result => {
				// 	this.album = result.res.album;
				// 	this.wallpaper = result.res.wallpaper;
				// });
				this.require({
					url:"https://api.apiopen.top/getImages",
					data:this.params
				}).then(reasult=>{
					this.album=reasult.result[0];
					this.wallpaper=reasult.result;
				});
			}
			
		},
		onLoad(options) {
			this.id = options.id;
			// this.id="5e26b92bce739af7644b3";
			this.getList();
		}
	}
	
</script>

<style lang="less">
	.album_bg {
		position: relative;

		image {}

		.album_info {
			position: absolute;
			width: 100%;
			left: 0;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			height: 80rpx;
			align-items: center;
			color: #fff;
			padding: 0 15rpx;

			.album_name {
				font-size: 40rpx;
			}

			.album_btn {
				background-color: #d52a7e;
				width: 152rpx;
				height: 50rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 10rpx;
			}
		}
	}

	.album_author {
		padding: 10rpx;

		.album_author_info {
			padding: 10rpx 0;
			display: flex;

			image {
				width: 50rpx;
			}

			.author_name {
				color: #000;
				margin-left: 15rpx;
			}
		}

		.album_author_desc {}
	}

	.album_list {
		display: flex;
		flex-wrap: wrap;
		.album_item {
			width: 33.33%;
			border: 3rpx solid #fff;
			margin-top: 2rpx;
			image {
				width:200rpx;
				height: 200rpx;
			}
		}
	}
</style>
