<template>
	<view class="video">
			<view class="video_title">
				<view class="title_inner">
					<!-- 分段器，实现tab栏效果 -->
					<uni-segmented-control :current="current" :values="tab_title.map(v=>v.title)" @clickItem="onItem" styleType="text" activeColor="#d4237a">
					</uni-segmented-control>
				</view>
				<view class="iconsearch">
					<text class="iconfont icon-sousuo"></text>
				</view>
			</view>
			<view class="content">
					<view v-show="current < 4">
						<video-main :urlobj="{url:tab_title[current].url,parmas:tab_title[current].parmas}"></video-main>
					</view>
					
			</view>	
				<!-- 图片展示 -->
		</view>
</template>

<script>
	import videoMain from  "./video-main/video-main";
	export default {
		data() {
			return {
				tab_title:[{
					title:"推荐",
					url:"http://157.122.54.189:9088/videoimg/v1/videowp/featured",
					parmas:{
						limit:30,
						skip:0,
						order:"hot"
					}
				},
				{
					title:"娱乐",
					url:"http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",
					parmas:{
						limit:30,
						skip:0,
						order:"new"
					}
				},
				{
					title:"最新",
					url:"http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
					parmas:{
						limit:30,
						skip:0,
						order:"new"
					}
				},
				{
					title:"热门",
					url:"http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
					parmas:{
						limit:30,
						skip:0,
						order:"hot"
					}
				}
				// ,{
				// 	title:"分类",
				// 	url:"http://157.122.54.189:9088/videoimg/v1/videowp/category",
				// 	parmas:{
						
				// 	}
				// },
				],
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
			videoMain,
		}
	}
</script>

<style lang="less">
.video{
	.video_title{
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
