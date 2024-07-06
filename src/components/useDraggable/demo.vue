<template>
  <Card class="card-content">
    <Space >
      <Switch 
          v-model:checked="disabled"
          checked-children="开" 
          un-checked-children="关"
          @change="switchChange"
          />

        <span>禁止拖拽灰色方块</span>
    </Space>
    <div ref="container" class="container">
      <div ref="dragDemo1" class='box'>
        <span> {{ `x: ${Number(dragDemo1Position.x).toFixed(2)}` }}</span>
        <span> {{ `y: ${Number(dragDemo1Position.y).toFixed(2)}` }}</span>
      </div>
    </div>

    <div ref="dragDemo2" class='box box2' >
      <span> {{ `x: ${Number(dragDemo2Position.x).toFixed(2)}` }}</span>
      <span> {{ `y: ${Number(dragDemo2Position.y).toFixed(2)}` }}</span>
    </div>

  </Card>
</template>

<script lang='ts' setup >
import { ref } from 'vue'
import { Card, Switch, Space } from 'ant-design-vue';
import { useDraggable } from './index'
import type { IPosition } from './types'
const dragDemo1 = ref<HTMLElement | null>(null)
const dragDemo2 = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)

const disabled = ref(false)

const onStart = () => {
  console.log('onStart')
}
const onMove = () => {
  console.log('onMove')
}
const onEnd = (position: IPosition, event: PointerEvent) => {
  console.log('onEnd - position', position)
}

const { position: dragDemo1Position } = useDraggable(dragDemo1, {
  onStart, 
  onMove, 
  onEnd,
  initialValue: {
    x: 250,
    y: 250
  },
  containerElement: container,
  // handle: btn
})
const { position: dragDemo2Position, isDragging, setDisabled } = useDraggable(dragDemo2, {
  initialValue: {
    x: 300,
    y: 300
  },
})

const switchChange = (val: boolean, event: Event) => {
  console.log(val);
  setDisabled(val)
}


</script>

<style scoped lang='stylus'>
.card-content
  display: flex
  justify-content: center
  align-items: center
  background-color var(--vp-c-bg)
  color: var(--vp-c-text-2)

.container 
  width: 400px
  height: 400px
  border: 2px solid var(--vp-c-border)
  margin-top: 10px

.box 
  display: flex
  justify-content: center
  align-items: center
  width: 100px
  height: 100px
  padding: 10px
  border-radius: 5px;
  font-size: 14px
  background-color var(--vp-c-bg)
  flex-direction: column
  color: var(--vp-c-text-2)

.box2
  background-color var(  --vp-c-gray-3)


</style>