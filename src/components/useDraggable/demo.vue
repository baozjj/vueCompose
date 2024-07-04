<template>
  <div ref="dragDemo1" class='container' @click="console.log(111)">
    <button @click="console.log(222)">按钮</button>
    <br>
    {{ `x: ${dragDemo1Position.x}` }}
    <br>
      {{  `y: ${dragDemo1Position.y}` }}
  </div>

  <div ref="dragDemo2" class="container">312</div>
</template>

<script lang='ts' setup >
import { onUnmounted, ref, watch } from 'vue'
import { useDraggable } from './index'
const dragDemo1 = ref<HTMLElement | null>(null)
const dragDemo2 = ref<HTMLElement | null>(null)

const itemString1 = localStorage.getItem('dragDemo1')
const initPosition1 = itemString1 ? JSON.parse(itemString1) : {x: 0, y: 0}
const itemString2 = localStorage.getItem('dragDemo2')
const initPosition2 = itemString2 ? JSON.parse(itemString2) : {x: 0, y: 0}



const { position: dragDemo1Position } = useDraggable(dragDemo1, { initPosition: initPosition1 })
const { position: dragDemo2Position } = useDraggable(dragDemo2, { initPosition: initPosition2 })

watch(() => [dragDemo1Position.value, dragDemo2Position.value], () => {
  localStorage.setItem('dragDemo1', JSON.stringify(dragDemo1Position.value));
  localStorage.setItem('dragDemo2', JSON.stringify(dragDemo2Position.value));
})
</script>

<style scoped lang='stylus'>
.container 
  width: 100px
  height: 100px
  background: red
</style>