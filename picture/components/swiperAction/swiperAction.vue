<template>
	<view>
			<view
			@touchstart="handleTouchstart"
			@touchend="handleTouchend" class="a">
			<slot></slot>
			</view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				starttime:0,
				startX:0,
				startY:0
			}
		},
		methods: {
			handleTouchstart(e){
				this.starttime=Date.now();
				this.startX=e.changedTouches[0].clientX;
				this.startY=e.changedTouches[0].clientY;
			},
			handleTouchend(e){
				const endtime=Date.now();
				const endX=e.changedTouches[0].clientX;
				const endY=e.changedTouches[0].clientY;
				if(endtime-this.starttime>2000){
					return;
				}
				// 滑动方向
				let direction="";
				if(Math.abs(endX-this.startX)>10 && Math.abs(endY-this.startY)<10){
					direction=endX-this.startX>0?"right":"left";
				}else{
					return;
				};
				this.$emit("swiperAction",{direction});
			}
		}
	}
</script>

<style lang="less">
.a{
	width: 100%;
	background-color: #0000FF;
}
</style>
