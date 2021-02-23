<template>
	<view class="tab">
		<view class="tab_title">
			<view class="title_inner">
				<!-- 分段器，实现tab栏效果 -->
				<!-- <uni-segmented-control :current="current" :values="tab_title.map(v=>v.title)" @clickItem="onItem" styleType="text" activeColor="#d4237a">
				</uni-segmented-control> -->
				<uni-segmented-control :current="current" :values="tab_title.map(v=>v.title)" @clickItem="onItem" styleType="text" activeColor="#d4237a"></uni-segmented-control>
			</view>
			<view class="iconsearch">
				<text class="iconfont icon-sousuo"></text>
			</view>
		</view>
		<view class="content">
				<view v-show="current === 0">
					<homeRecommend></homeRecommend>
					
				</view>
				<view v-show="current === 1">
					<homeCategory></homeCategory>
				</view>
				<view v-show="current === 2">
					<homeNew></homeNew>
				</view>
				<view v-show="current === 3">
					<homeAlbum></homeAlbum>
				</view>
				
		</view>	
			<!-- 图片展示 -->
	</view>
</template>

<script>
	import homeAlbum from "./home_album/home_album.vue";
	import homeCategory from "./home_category/home_category.vue";
	import homeNew from "./home_new/home_new.vue";
	import homeRecommend from "./home_recommend/home_recommend.vue";
	export default {
		data() {
			return {
				tab_title:[{
					title:"推荐"
				},
				{
					title:"分类"
				},
				{
					title:"最新"
				},
				{
					title:"专辑"
				}],
				current:0,
			}
		},
		methods: {
			onItem(e){
				if(this.current!=e.currentIndex){
					this.current=e.currentIndex;
				}
			}
		},
		components:{
			homeAlbum ,
			homeCategory ,
			homeNew ,
			homeRecommend
		}
	}
</script>
 
<style lang="less">
.tab{
	.tab_title{
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
		}
		
	}
	.content{
		
	}
}
</style>
