---
category: Elements
---

<script setup lang="ts">
import demo from './demo.vue'
</script>

# useDraggable

使元素可拖动。

## Usage

<demo/>

```vue
<template>
  <div ref="box" class="box">
    <div ref="dragEl" class="container">
      {{ `x: ${Number(position.x).toFixed(2)}` }}
      <br />
      {{ `y: ${Number(position.y).toFixed(2)}` }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDraggable } from "@/components/useDraggable/index.ts";

const dragEl = ref<HTMLElement | null>(null);
const { position } = useDraggable(dragEl, {
  initialValue: { x: 40, y: 40 },
});
</script>
```

```vue
<template>
  <div ref="box" class="box">
    <div ref="dragEl" class="container">
      {{ `x: ${Number(position.x).toFixed(2)}` }}
      <br />
      {{ `y: ${Number(position.y).toFixed(2)}` }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDraggable } from "@/components/useDraggable/index.ts";

const dragEl = ref<HTMLElement | null>(null);
const { position } = useDraggable(dragEl, {
  initialValue: { x: 40, y: 40 },
});
</script>
```

```vue
<template>
  <div ref="box" class="box">
    <div ref="dragEl" class="container">
      {{ `x: ${Number(position.x).toFixed(2)}` }}
      <br />
      {{ `y: ${Number(position.y).toFixed(2)}` }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDraggable } from "@/components/useDraggable/index.ts";

const dragEl = ref<HTMLElement | null>(null);
const { position } = useDraggable(dragEl, {
  initialValue: { x: 40, y: 40 },
});
</script>
```

```vue
<template>
  <div ref="box" class="box">
    <div ref="dragEl" class="container">
      {{ `x: ${Number(position.x).toFixed(2)}` }}
      <br />
      {{ `y: ${Number(position.y).toFixed(2)}` }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDraggable } from "@/components/useDraggable/index.ts";

const dragEl = ref<HTMLElement | null>(null);
const { position } = useDraggable(dragEl, {
  initialValue: { x: 40, y: 40 },
});
</script>
```

```vue
<template>
  <div ref="box" class="box">
    <div ref="dragEl" class="container">
      {{ `x: ${Number(position.x).toFixed(2)}` }}
      <br />
      {{ `y: ${Number(position.y).toFixed(2)}` }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDraggable } from "@/components/useDraggable/index.ts";

const dragEl = ref<HTMLElement | null>(null);
const { position } = useDraggable(dragEl, {
  initialValue: { x: 40, y: 40 },
});
</script>
```
