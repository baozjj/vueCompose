import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import type { IPosition, IUseDraggableOptions } from './types';
import { AxisEnum } from './types';
import './style.css'

export const useDraggable = (
  elementRef: Ref<HTMLElement | null>,
  options: IUseDraggableOptions = {}
) => {
  const {
    exact = false,  // 默认不需要精确点击
    preventDefault = false,  // 默认不阻止事件默认行为
    stopPropagation = false,  // 默认不阻止事件传播
    capture = true,  // 默认在捕获阶段派发事件
    draggingElement = window,  // 默认使用 window 绑定事件
    containerElement,
    handle = elementRef,
    pointerTypes = ['mouse', 'touch', 'pen'],  // 默认监听鼠标、触摸和笔
    initialValue = { x: 0, y: 0 },  // 默认初始位置为 (0, 0)
    onStart,
    onMove,
    onEnd,
    axis = AxisEnum.BOTH,  // 默认可以沿 x 和 y 轴拖动
    disabled = false,  // 默认不禁用拖动
    useDefaultStyles = true,  // 默认启用默认样式
  } = options;

  const isDragging = ref(false);  // 是否正在拖动
  const position = ref<IPosition>(initialValue);  // 当前拖动位置
  const offset = ref<IPosition>({ x: 0, y: 0 });  // 拖动起始时的偏移量

  const setElementPosition = (x: number, y: number) => {
    Object.assign(elementRef.value!.style, {
      left: `${x}px`,
      top: `${y}px`,
      position: 'fixed',
    })
  };

  const setStaticStyle = () => {
    if (!useDefaultStyles || !elementRef.value) return
    elementRef.value.classList.remove('use-dragging')
    elementRef.value.classList.add('use-draggable')
  }

  const setActiveStyle = () => {
    if (!useDefaultStyles || !elementRef.value) return
    elementRef.value.classList.add('use-dragging')
  }

  const onPointerDown = (event: PointerEvent) => {
    if (disabled) return;  // 如果禁用拖动，则直接返回
    if (!pointerTypes.includes(event.pointerType)) return;  // 如果指针类型不在监听列表中，则返回

    const target = handle?.value || event.target;  // 如果有句柄，则使用句柄，否则使用事件目标
    if (exact && event.target !== elementRef.value) return;  // 如果需要精确点击且目标不是绑定元素，则返回
    
    setActiveStyle()

    if (preventDefault) event.preventDefault();  // 如果需要阻止默认行为，则阻止
    if (stopPropagation) event.stopPropagation();  // 如果需要阻止事件传播，则阻止

    isDragging.value = true;  // 设置正在拖动
    offset.value = {
      x: event.clientX - position.value.x,
      y: event.clientY - position.value.y,
    };

    if (onStart && onStart(position.value, event) === false) {
      isDragging.value = false;  // 如果 onStart 返回 false，则取消拖动
      return;
    }

    draggingElement?.addEventListener('pointermove', onPointerMove as EventListener, capture);
    draggingElement?.addEventListener('pointerup', onPointerUp as EventListener, capture);
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!isDragging.value) return;  // 如果不在拖动，则返回

    let newX = event.clientX - offset.value.x;
    let newY = event.clientY - offset.value.y;

    if (axis === 'x') {
      newY = position.value.y;  // 如果锁定 x 轴，则 y 坐标不变
    } else if (axis === 'y') {
      newX = position.value.x;  // 如果锁定 y 轴，则 x 坐标不变
    }

    if (containerElement) {
      const boundaryRect = containerElement.value!.getBoundingClientRect();
      const elementRect = elementRef.value!.getBoundingClientRect();

      newX = Math.max(boundaryRect.left, Math.min(boundaryRect.right - elementRect.width, newX));
      newY = Math.max(boundaryRect.top, Math.min(boundaryRect.bottom - elementRect.height, newY));
    }

    position.value = { x: newX, y: newY };

    setElementPosition(newX, newY)

    if (onMove) {
      onMove(position.value, event);  // 调用 onMove 回调
    }
  };

  const onPointerUp = (event: PointerEvent) => {
    if (!isDragging.value) return;  // 如果不在拖动，则返回
    setStaticStyle()

    isDragging.value = false;  // 设置拖动结束
    draggingElement?.removeEventListener('pointermove', onPointerMove as EventListener, capture);
    draggingElement?.removeEventListener('pointerup', onPointerUp as EventListener, capture);

    if (onEnd) {
      onEnd(position.value, event);  // 调用 onEnd 回调
    }
  };

  const initPosition = () => {
    let { x, y } = position.value
    if (containerElement) {
      const boundaryRect = containerElement.value!.getBoundingClientRect();
      const elementRect = elementRef.value!.getBoundingClientRect();
      x = Math.max(boundaryRect.left, Math.min(boundaryRect.right - elementRect.width, x));
      y = Math.max(boundaryRect.top, Math.min(boundaryRect.bottom - elementRect.height, y));
    }

    position.value = { x, y }
    setElementPosition(x, y)
  }

  onMounted(() => {
    handle.value?.addEventListener('pointerdown', onPointerDown, capture);  // 组件挂载时绑定 pointerdown 事件
    handle.value!.style.cursor = 'move'
    setStaticStyle()
    initPosition()
    if (containerElement) {
      window.addEventListener('scroll', initPosition)
    }
  });

  onUnmounted(() => {
    handle.value?.removeEventListener('pointerdown', onPointerDown, capture);  // 组件卸载时解绑 pointerdown 事件
    if (containerElement) {
      window.removeEventListener('scroll', initPosition)
    }
  });

  return {
    isDragging,
    position,
  };
}
