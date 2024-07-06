---
category: Elements
---

<script setup lang="ts">
import demo from './demo.vue'
</script>

# useMouseEnterDirection

`useMouseEnterDirection` 是一个自定义组合式函数，用于检测鼠标从哪个方向进入指定元素，并触发相应的回调函数。

## 使用

在你的组件中导入并使用 useMouseEnterDirection：
<demo/>

```vue
<template>
  <div ref="demo" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useMouseEnterDirection } from "@/components/useMouseEnterDirection/index.ts";

const demo = ref<HTMLElement | null>(null);

const {
  topFun,
  bottomFun,
  leftFun,
  rightFun,
  topLeaveFun,
  bottomLeaveFun,
  leftLeaveFun,
  rightLeaveFun,
  leaveFun,
} = useMouseEnterDirection(demo);

topFun(() => console.log("top 进入"));
bottomFun(() => console.log("buttoom 进入"));
leftFun(() => console.log("left 进入"));
rightFun(() => console.log("right 进入"));
topLeaveFun(() => console.log("top 离开"));
bottomLeaveFun(() => console.log("buttoom 离开"));
leftLeaveFun(() => console.log("left 离开"));
rightLeaveFun(() => console.log("right 离开"));
leaveFun(() => console.log("离开"));
</script>
```

## 参数

| 参数      | 类型                       | 说明                           |
| --------- | -------------------------- | ------------------------------ |
| `element` | `Ref<HTMLElement \| null>` | 监听鼠标进入事件的元素的引用。 |

## 返回值

| 返回值           | 类型                           | 说明                             |
| ---------------- | ------------------------------ | -------------------------------- |
| `topFun`         | `(callback: Function) => void` | 设置从上方进入时触发的回调函数。 |
| `bottomFun`      | `(callback: Function) => void` | 设置从下方进入时触发的回调函数。 |
| `leftFun`        | `(callback: Function) => void` | 设置从左侧进入时触发的回调函数。 |
| `rightFun`       | `(callback: Function) => void` | 设置从右侧进入时触发的回调函数。 |
| `topLeaveFun`    | `(callback: Function) => void` | 设置从上方离开时触发的回调函数。 |
| `bottomLeaveFun` | `(callback: Function) => void` | 设置从下方离开时触发的回调函数。 |
| `leftLeaveFun`   | `(callback: Function) => void` | 设置从左侧离开时触发的回调函数。 |
| `rightLeaveFun`  | `(callback: Function) => void` | 设置从右侧离开时触发的回调函数。 |
| `leaveFun`       | `(callback: Function) => void` | 设置离开时触发的回调函数。       |
