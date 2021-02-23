<template>
	<scroll-view scroll-y="true" class="recommend" @scrolltolower="handleToLower" v-if="recommends.length>0">
		<!-- 推荐 -->
		<view class="recommend_wrop">
			<!-- <navigator class="recommend_item" v-for="item in recommends" :key="item.id" :url="`../../pages/index/index?id=${item.target}`"> -->
			<navigator class="recommend_item" v-for="(item,index) in recommends" :key="item.id" url="../../pages/index/index">
				<go-detail :list="recommends" :index="index">
					<image :src="item.thumb" mode="widthFix"></image>
				</go-detail>
			</navigator>
		</view>
		<!-- 月份 -->
		<view class="month_wrap">
			<view class="month_title">
				<view class="month_title_info">
					<view class="month_info">
						<text>{{months.DD}}/</text>
						{{months.MM}}月
					</view>
					<view class="month_text">
						{{months.title}}
					</view>
				</view>
				<view class="month_more">
					更多 >
				</view>
			</view>

			<view class="month_content">
				<view class="month_item" v-for="item in months.items" :key="item.id">
						<image :src="item.thumb+item.rule.replace('$<Height>',360)" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<!-- 热门 -->
		<view class="hot">
			<view class="hot_title">
				<text>热门</text>
			</view>
			<view class="hot_content">
				<view class="hot_item" v-for="item in hots" :key="itme.id">
					<image :src="item.thumb" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import moment from "moment";
	import goDetail from"@/components/goDetail/goDetail";
	export default {
		components:{
			goDetail
		},
		data() {
			return {
				// 推荐
				recommends: [],
				months: {},
				// 热门
				hots: [],
				params: {
					limit: 30,
					order: "hot",
					skip: 0
				},
				nextMore: true,
			}
		},
		mounted() {
			uni.setNavigationBarTitle({
				title:"推荐",
			});
			this.getList();
		},
		methods: {
			handleToLower() {
				if (this.nextMore) {
					// 修改请求参数
					this.params.skip += this.params.limit;
					// 重新发送请求
					this.getList();
				} else {
					uni.showToast({
						title: "你到达我的极限了^_^"
					})
				}

			},
			getList() {
				this.require({
					url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
					data: this.params
				}).then(result => {
					if (result.res.vertical === 0) {
						this.nextMore = false;
						return;
					}
					if (this.recommends.length == 0) {
						this.recommends = result.res.homepage[1].items;
						this.months = result.res.homepage[2];
						this.months.MM = moment(this.months.stime).format("MM");
						this.months.DD = moment(this.months.stime).format("DD");
					}
					// 数据叠加
					this.hots = [...this.hots, ...result.res.vertical];
				});
			}
		}
	}
</script>

<style lang="scss">
	.recommend {
		height: 100vh;
	}

	.recommend_wrop {
		display: flex;
		flex-wrap: wrap;

		.recommend_item {
			width: 50%;
			border: 5rpx solid #fff;
		}
	}

	.month_wrap {
		margin-top: 10rpx;

		.month_title {
			justify-content: center;
			display: flex;
			justify-content: space-between;

			.month_title_info {
				color: #d52a7e;
				font-size: 30rpx;
				display: flex;

				.month_info {
					text {
						font-size: 36rpx;

						font-weight: 600;
					}
				}

				.month_text {
					color: #d6d7dc;
					font-size: 34rpx;
				}
			}

			.month_more {
				font-size: 24rpx;
				color: #d52a7e;
			}
		}

		.month_content {
			display: flex;
			flex-wrap: wrap;

			.month_item {
				width: 33.33%;
				border: 4rpx solid #fff;

				image {}
			}
		}
	}

	// 热门
	.hot {
		margin-top: 20rpx;

		.hot_title {
			border-left: 15rpx solid #d52a7e;
			margin-left: 10rpx;

			text {
				padding-left: 20rpx;
				font-size: 35rpx;
				font-weight: 600;
			}
		}

		.hot_content {
			display: flex;
			flex-wrap: wrap;
			margin-top: 10rpx;

			.hot_item {
				width: 33%;
				border-left: 5rpx solid #FFFFFF;
			}
		}
	}
</style>
