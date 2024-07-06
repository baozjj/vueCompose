import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import type { IMouseEnterRes } from './types';

// 定义 useMouseEnterDirection 函数，接受一个 Ref<HTMLElement | null> 类型的参数 element
export const useMouseEnterDirection = (
    element: Ref<HTMLElement | null>
): IMouseEnterRes => {

    // 用于存储回调函数
    const topCallback = ref<Function | null>(null);
    const bottomCallback = ref<Function | null>(null);
    const leftCallback = ref<Function | null>(null);
    const rightCallback = ref<Function | null>(null);
    const topLeaveCallback = ref<Function | null>(null);
    const bottomLeaveCallback = ref<Function | null>(null);
    const leftLeaveCallback = ref<Function | null>(null);
    const rightLeaveCallback = ref<Function | null>(null);
    const leaveCallback = ref<Function | null>(null);

    // 定义鼠标进入事件处理函数
    const handleMouseEnter = (event: MouseEvent) => {
        if (!element.value) return;
        const rect = element.value.getBoundingClientRect();
        if (!rect) return;
        const theta = Math.atan2(rect.height, rect.width); // 计算矩形的斜角

        const w = event.offsetX - rect.width / 2; // 计算鼠标位置相对于元素中心的水平偏移
        const h = rect.height / 2 - event.offsetY; // 计算鼠标位置相对于元素中心的垂直偏移
        const angle = Math.atan2(h, w); // 计算鼠标位置与元素中心的夹角

        // 判断鼠标进入方向，并调用相应的回调函数
        if (angle < theta && angle >= -theta) {
            rightCallback.value?.(); // 鼠标从右侧进入
        } else if (angle < -theta && angle >= -Math.PI + theta) {
            bottomCallback.value?.(); // 鼠标从下方进入
        } else if (angle >= theta && angle < Math.PI - theta) {
            topCallback.value?.(); // 鼠标从上方进入
        } else if (angle >= Math.PI - theta || angle <= -Math.PI + theta) {
            leftCallback.value?.(); // 鼠标从左侧进入
        }
    };

    // 定义鼠标移出事件处理函数
    const handleMouseLeave = (event: MouseEvent) => {
        if (!element.value) return;
        const rect = element.value.getBoundingClientRect();
        const w = event.clientX - rect.left - rect.width / 2;
        const h = rect.top + rect.height / 2 - event.clientY;
        const angle = Math.atan2(h, w);

        const theta = Math.atan2(rect.height, rect.width);

        // 判断鼠标移出方向，并调用相应的回调函数
        if (angle >= -theta && angle < theta) {
            rightLeaveCallback.value?.();
        } else if (angle >= theta && angle < Math.PI - theta) {
            topLeaveCallback.value?.();
        } else if (angle >= -Math.PI + theta && angle < -theta) {
            bottomLeaveCallback.value?.();
        } else {
            leftLeaveCallback.value?.();
        }

        leaveCallback.value?.();
    };

    onMounted(() => {
        if (element.value) {
            element.value.addEventListener('mouseenter', handleMouseEnter);
            element.value.addEventListener('mouseleave', handleMouseLeave);
        }
    });

    onUnmounted(() => {
        if (element.value) {
            element.value.removeEventListener('mouseenter', handleMouseEnter);
            element.value.removeEventListener('mouseleave', handleMouseLeave);
        }
    });

    return {
        topFun: (callback: Function) => {
            topCallback.value = callback; // 设置顶部回调函数
        },
        bottomFun: (callback: Function) => {
            bottomCallback.value = callback; // 设置底部回调函数
        },
        leftFun: (callback: Function) => {
            leftCallback.value = callback; // 设置左侧回调函数
        },
        rightFun: (callback: Function) => {
            rightCallback.value = callback; // 设置右侧回调函数
        },
        topLeaveFun: (callback: Function) => {
            topLeaveCallback.value = callback; // 设置顶部移出回调函数
        },
        bottomLeaveFun: (callback: Function) => {
            bottomLeaveCallback.value = callback; // 设置底部移出回调函数
        },
        leftLeaveFun: (callback: Function) => {
            leftLeaveCallback.value = callback; // 设置左侧移出回调函数
        },
        rightLeaveFun: (callback: Function) => {
            rightLeaveCallback.value = callback; // 设置右侧移出回调函数
        },
        leaveFun: (callback: Function) => {
            leaveCallback.value = callback; // 设置移出回调函数
        }
    };
};
