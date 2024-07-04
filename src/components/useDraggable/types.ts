import type { Ref } from 'vue'

export interface IPosition {
  x: number;
  y: number;
}

export enum AxisEnum {
  X = 'x',
  Y = 'y',
  BOTH = 'both'
}

export interface IUseDraggableOptions {
  exact?: boolean;  // 仅在直接点击元素时才开始拖动
  preventDefault?: boolean;  // 阻止事件的默认行为
  stopPropagation?: boolean;  // 阻止事件传播
  capture?: boolean;  // 是否在捕获阶段派发事件
  draggingElement?: HTMLElement | Window | Document | null | undefined;  // 用于绑定事件的元素
  containerElement?: Ref<HTMLElement | null>;  // 用于计算边界的元素
  handle?: Ref<HTMLElement | null>;  // 触发拖动事件的句柄
  pointerTypes?: string[];  // 监听的指针类型
  initialValue?: IPosition;  // 元素的初始位置
  onStart?: (position: IPosition, event: PointerEvent) => void | false;  // 拖动开始时的回调函数
  onMove?: (position: IPosition, event: PointerEvent) => void;  // 拖动过程中的回调函数
  onEnd?: (position: IPosition, event: PointerEvent) => void;  // 拖动结束时的回调函数
  axis?: AxisEnum;  // 拖动的轴向
  disabled?: boolean;  // 禁用拖动
  useDefaultStyles?: boolean // 默认启用默认样式

}

export interface IUseDraggableRes {
  position: Ref<IPosition>;
}

