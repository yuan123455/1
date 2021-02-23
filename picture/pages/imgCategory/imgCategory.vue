<template>
	<view class="category">
		<view class="category_title">
			<view class="title_inner">
				<!-- 分段器，实现tab栏效果 -->
				<uni-segmented-control :current="current" :values="items.map(v=>v.title)" @clickItem="onItem" styleType="text" activeColor="#d4237a">
				</uni-segmented-control>
			</view>
			<view class="iconsearch">
				<text class="iconfont icon-sousuo"></text>
			</view>
		</view>
		<scroll-view scroll-y="true" class="content" enable-flex @scrolltolower="handleScrolltolower">
				<view class="cate_item" v-for="item in vertical" :key="item.id">
					<image :src="item.thumb" mode="widthFix"></image>
				</view>
		</scroll-view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items:[{title:"最新",order:"new"},{title:"热门",order:"hot"}],
				currentIndex:0,
				params:{
					limit:30,
					skip:0,
					order:"new"
				},
				id:0,
				vertical:[],
				hasMore:true,
			}
		},
		methods: {
			onItem(e){
				if(this.currentIndex!=e.currentIndex){
					this.currentIndex=e.currentIndex;
				}else{
					return;
				};
				this.params.order=this.items[e.currentIndex].order;
				this.params.skip=0;
				this.vertical=[];
				this.getList();
			},
			getList(){
				this.require({
					url:`http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
					data:this.params
				}).then(result=>{
					if(result.res.vertical.length===0){
						this.hasMore=false;
						uni.showToast({
							title:"没有更多了",
							icon:"none"
						});
						return;
					}
					this.vertical=[...this.vertical,...result.res.vertical];
					this.vertical=result.res.vertical;
					console.log(result.res.vertical);
				});
			},
			// // 获取分页数据
			handleScrolltolower(){
				if(this.hasMore){
					this.params.skip+=this.params.limit;
					this.getList();
				}else{
					uni.showToast({
						title:"没有更多数据了",
						icon:"none"
					})
				}
			}
		},
		onLoad(options) {
			this.id=options.id;
			this.getList();
		}
		
	}
</script>

<style lang="less">
.category{
	.category_title{
		position: relative;
		.title_inner{
			width: 60%;
			margin: 0 auto;
		}
		.iconsearch{
			position: absolute;
			top: 50%;
			transform: translate(-50%);
			right: 5%;
			color: #b7b7ff;
		}
		
	}
	.content{
		display: flex;
		flex-wrap: wrap;
		height: 1200px;
		.cate_item{
			width: 33.33%;
			border: 5rpx solid #fff;
			image{
				
			}
		}
	}
}
</style>
