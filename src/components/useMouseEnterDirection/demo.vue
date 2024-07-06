<template>
  <Card class="card-content">
    <div ref="demo" class="box">
      <div ref="topBox" class="content top-box"> 我进来了喔 </div>
      <div ref="bottomBox" class="content bottom-box">下方溜进来！👻</div>
      <div ref="leftBox" class="content left-box">左边登场！</div>
      <div ref="rightBox" class="content right-box">右边闪现！✨</div>
    </div>
  </Card>
</template>

<script lang='ts' setup >
import { ref } from 'vue'
import { Card } from 'ant-design-vue';
import { useMouseEnterDirection } from './index';

const demo = ref(null)
const topBox = ref<HTMLElement | null>(null)
const bottomBox = ref<HTMLElement | null>(null)
const leftBox = ref<HTMLElement | null>(null)
const rightBox = ref<HTMLElement | null>(null)

const {
  topFun,
  bottomFun,
  leftFun,
  rightFun,
  topLeaveFun,
  bottomLeaveFun,
  leftLeaveFun,
  rightLeaveFun,
  leaveFun
} = useMouseEnterDirection(demo)

// topFun(() => showBox('0%', '50%'));
// bottomFun(() => showBox('100%', '50%'));
// leftFun(() => showBox('50%', '0%'));
// rightFun(() => showBox('50%', '100%'));
topFun(() => {
  if(!topBox.value) return
  topBox.value.classList.add('top-box-enter');
});
bottomFun(() => {
  if (!bottomBox.value) return
  bottomBox.value.classList.add('bottom-box-enter');
});
leftFun(() => {
  if (!leftBox.value) return
  leftBox.value.classList.add('left-box-enter');
});
rightFun(() => {
  if (!rightBox.value) return
  rightBox.value.classList.add('right-box-enter');
});

// topLeaveFun(() => {
//   if (!topBox.value) return
//   topBox.value.classList.remove('top-box-enter');
// })
// bottomLeaveFun(() => {
//   if (!bottomBox.value) return
//   bottomBox.value.classList.remove('bottom-box-enter');
// });
// leftLeaveFun(() => {
//   if (!leftBox.value) return
//   leftBox.value.classList.remove('left-box-enter');
// });
// rightLeaveFun(() => {
//   if (!rightBox.value) return
//   rightBox.value.classList.remove('right-box-enter');

// });


leaveFun(() => {
  topBox.value!.classList.remove('top-box-enter');
  bottomBox.value!.classList.remove('bottom-box-enter');
  leftBox.value!.classList.remove('left-box-enter');
  rightBox.value!.classList.remove('right-box-enter');
});

</script>

<style scoped lang='stylus'>

.card-content
  display: flex
  justify-content: center
  align-items: center
  background-color var(--vp-c-bg)
  color: #fff

.box
  width: 200px;
  height: 200px;
  border-radius 10px
  background-color var(--vp-c-border)
  position: relative
  overflow hidden


.content 
  width: 200px;
  height: 200px;
  background-color: var(--vp-c-sponsor);
  transition: all 0.3s ease;
  position: absolute;
  display: flex
  justify-content: center
  align-items: center

.top-box 
  top: 0;
  left: 50%;
  transform: translate(-50%, -100%);

.bottom-box 
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 100%); 

.left-box 
  left: 0;
  top: 50%;
  transform: translate(-100%, -50%);

.right-box 
  right: 0;
  top: 50%;
  transform: translate(100%, -50%);

.top-box-enter 
  top: 50%;
  transform: translate(-50%, -50%);

.bottom-box-enter 
  bottom: 50%;
  transform: translate(-50%, 50%);

.left-box-enter 
  left: 50%;
  transform: translate(-50%, -50%);

.right-box-enter 
  right: 50%;
  transform: translate(50%, -50%);
</style>