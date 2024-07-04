

import { ref, onMounted, onUnmounted, computed } from 'vue'; 
import type { Ref } from 'vue' 
import type { IPosition, IOptions, IUseDraggableRes } from './types';
import './style.css';
  
export const useDraggable = (elementRef: Ref<HTMLElement | null>, options: IOptions) : IUseDraggableRes => {  

  const {
    initPosition,
    isDefaultStyle = true,
  } = options;
  const position = ref<IPosition>(
    initPosition ?? { x: 0, y: 0 },
  )
  const pressedDelta = ref<IPosition>()

  const isDragging = ref(false);  

  const setElementPosition = (x: number, y: number) => {
      Object.assign(elementRef.value!.style, {
        left: `${x}px`,
        top: `${y}px`,
        position: 'fixed',
      })
  }

  const setStaticStyle = () => {
    if (!isDefaultStyle || !elementRef.value) return
    elementRef.value!.classList.remove('use-dragging')
    elementRef.value.classList.add('use-draggable')
  }
  const setActiveStyle = () => {
    if (!isDefaultStyle || !elementRef.value) return
    elementRef.value!.classList.remove('use-draggable')
    elementRef.value.classList.add('use-dragging')
  }

  const mouseenter = (event: MouseEvent) => {
    if (event.target !== elementRef.value) return
    elementRef.value!.style.cursor = 'move'
  }
  
  const updatePosition = (event: MouseEvent) => {  
    if (!isDragging.value || !elementRef.value) return;  
    if (!pressedDelta.value) return

    let { x, y } = position.value

    x = event.clientX - pressedDelta.value.x
    y = event.clientY - pressedDelta.value.y
  
    position.value = {
      x,
      y,
    }
    setActiveStyle()
    setElementPosition(x, y)
  };  
  
  const startDrag = (event: MouseEvent) => {  
    if (!elementRef.value) return 
    if (event.target !== elementRef.value) return

    event.preventDefault(); // 阻止默认行为  
    event.stopPropagation()

    isDragging.value = true;  

    const rect = elementRef.value!.getBoundingClientRect();  
    const x = event.clientX - rect.left;  
    const y = event.clientY - rect.top;  
    pressedDelta.value = { x, y }

    document.addEventListener('mousemove', updatePosition);  
    document.addEventListener('mouseup', stopDrag);  
    document.addEventListener('mouseleave', stopDrag);  
  };  
  
  const stopDrag = () => {  
    isDragging.value = false;  
    setStaticStyle()
    document.removeEventListener('mousemove', updatePosition);  
    document.removeEventListener('mouseup', stopDrag);  
    document.removeEventListener('mouseleave', stopDrag);  
  };

  onMounted(() => {  
    if (elementRef.value) {  
      const { x, y} = position.value
      setElementPosition(x, y)
      setStaticStyle()
      elementRef.value.addEventListener('mousedown', startDrag);  
      elementRef.value.addEventListener('mouseenter', mouseenter);  
    }  
  });  
  
  onUnmounted(() => {  
    if (elementRef.value) {  
      elementRef.value.removeEventListener('mousedown', startDrag);  
      elementRef.value.removeEventListener('mouseenter', mouseenter);  
    }  
  });  
  
  return { 
    position,
   };  
}