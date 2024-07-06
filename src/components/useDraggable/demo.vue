<template>
  <Card class="card-content">
    <div ref="box" class="box">
      <div ref="dragDemo1" class='container'>
        {{ `x: ${Number(dragDemo1Position.x).toFixed(2)}` }}
        <br>
        {{  `y: ${Number(dragDemo1Position.y).toFixed(2)}` }}
      </div>
    </div>
  </Card>


  <div ref="dragDemo2" class='container' />


</template>

<script lang='ts' setup >
import { ref } from 'vue'
import { Card } from 'ant-design-vue';
import { useDraggable } from './index'
import type { IPosition } from './types'
const dragDemo1 = ref<HTMLElement | null>(null)
const dragDemo2 = ref<HTMLElement | null>(null)
const box = ref<HTMLElement | null>(null)

const onStart = () => {
  console.log('onStart')
}
const onMove = () => {
  console.log('onMove')
}
const onEnd = (position: IPosition, event: PointerEvent) => {
  console.log('onEnd - position', position)
  console.log('onEnd - event', event)
}

const { position: dragDemo1Position } = useDraggable(dragDemo1, {
  onStart, 
  onMove, 
  onEnd,
  initialValue: {
    x: 250,
    y: 250
  },
  containerElement: box,
  // handle: btn
})
useDraggable(dragDemo2, {
  initialValue: {
    x: 250,
    y: 250
  },
})


</script>

<style scoped lang='stylus'>
.card-content
  display: flex
  justify-content: center
  align-items: center
.box 
  width: 400px
  height: 400px
  border: 2px solid #c1c1c1
.container 
  display: flex
  justify-content: center
  align-items: center
  width: 100px
  height: 100px
  padding: 10px
  border-radius: 5px;
  font-size: 14px
  background-color #fff
</style>