<template>
  <div ref="box" class="box">
    <div ref="dragDemo1" class='container' @click="console.log(111)">
      <button @click="console.log(222)">按钮</button>
      <button ref="btn" >按钮123</button>
      <br>
      {{ `x: ${dragDemo1Position.x}` }}
      <br>
        {{  `y: ${dragDemo1Position.y}` }}
    </div>
  </div>


</template>

<script lang='ts' setup >
import { onUnmounted, ref, watch } from 'vue'
import { useDraggable } from './index'
import type { IPosition } from './types'
const dragDemo1 = ref<HTMLElement | null>(null)
const box = ref<HTMLElement | null>(null)
const btn = ref<HTMLElement | null>(null)

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


</script>

<style scoped lang='stylus'>
.box 
  margin-left: 200px;
  margin-top: 200px;
  width: 200px
  height: 200px
  border: 1px solid red
.container 
  width: 100px
  height: 100px
  background: red
</style>