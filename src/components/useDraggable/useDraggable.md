---
category: Elements
---

<script setup lang="ts">
import demo from './demo.vue'
</script>

# useDraggable

`useDraggable` 是一个用于在 Vue 3 项目中使元素实现拖动功能的组合式 API。

## 使用

在你的组件中导入并使用 useDraggable：
<demo/>

```vue
<template>
  <div ref="container" class="container">
    <div ref="dragEl1" class="box1">
      {{ `x: ${Number(dragEl1Position.x).toFixed(2)}` }}
      <br />
      {{ `y: ${Number(dragEl1Position.y).toFixed(2)}` }}
    </div>
  </div>

  <div ref="dragEl2" class="box2">
    {{ `x: ${Number(dragEl2Position.x).toFixed(2)}` }}
    <br />
    {{ `y: ${Number(dragEl2Position.y).toFixed(2)}` }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDraggable } from "@/components/useDraggable/index.ts";

const container = ref<HTMLElement | null>(null);
const dragEl1 = ref<HTMLElement | null>(null);
const dragEl2 = ref<HTMLElement | null>(null);

const { position: dragEl1Position } = useDraggable(dragDemo1, {
  initialValue: { x: 250, y: 250 },
  containerElement: container,
});
const { position: dragEl2Position, setDisabled } = useDraggable(dragDemo2, {
  initialValue: { x: 300, y: 300 },
});
</script>
```

## 配置选项

`useDraggable` 提供了多种配置选项，使得你可以根据需要灵活地实现拖动功能。

| 配置项             | 类型                                                                         | 默认值           | 说明                                                           |
| ------------------ | ---------------------------------------------------------------------------- | ---------------- | -------------------------------------------------------------- |
| `exact`            | `boolean`                                                                    | `false`          | 仅在直接点击元素时才开始拖动。                                 |
| `containerElement` | `Ref<HTMLElement \| null>`                                                   | `null`           | 用于计算边界的元素。如果未设置，则拖动范围不受限制。           |
| `handle`           | `Ref<HTMLElement \| null>`                                                   | `null`           | 指定一个元素作为拖动的区域，只有通过这个区域才能触发拖动效果。 |
| `initialValue`     | `{ x: number, y: number }`                                                   | `{ x: 0, y: 0 }` | 设置元素的初始位置。                                           |
| `onStart`          | `(position: { x: number, y: number }, event: PointerEvent) => void \| false` | -                | 拖动开始时的回调函数。如果返回 `false`，则阻止拖动。           |
| `onMove`           | `(position: { x: number, y: number }, event: PointerEvent) => void`          | -                | 拖动进行中的回调函数。                                         |
| `onEnd`            | `(position: { x: number, y: number }, event: PointerEvent) => void`          | -                | 拖动结束时的回调函数。                                         |
| `axis`             | `'x' \| 'y' \| 'both'`                                                       | `'both'`         | 指定拖动的方向。可以设置为 `'x'`、`'y'` 或 `'both'`。          |
| `useDefaultStyle`  | `boolean`                                                                    | `true`           | 是否启用默认样式。                                             |

## 解构结果

`useDraggable` 会返回以下几个值：

| 解构结果      | 类型                            | 说明                           |
| ------------- | ------------------------------- | ------------------------------ |
| `position`    | `Ref<{ x: number, y: number }>` | 拖动元素的当前位置。           |
| `isDragging`  | `Ref<boolean>`                  | 表示当前是否正在拖动的状态。   |
| `setDisabled` | `(disabled: boolean) => void`   | 用于启用或禁用拖动功能的函数。 |
