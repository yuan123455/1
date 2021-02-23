<template>
	<view @click="handleClick">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			handleClick(){
				getApp().globalData.imgList=this.list;
				getApp().globalData.imgIndex=this.index;
				uni.navigateTo({
					url:"../../pages/imgDetail/imgDetail"
				})
			}
		},
		props:{
			list:Array,
			index:Number
		},
	}
</script>

<style>

</style>
