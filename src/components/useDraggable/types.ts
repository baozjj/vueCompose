import type { Ref } from 'vue'

export interface IPosition {
  x: number;
  y: number;
}

export interface IOptions {
  initPosition?: IPosition;
  isDefaultStyle?: boolean;
}

export interface IUseDraggableRes {
  position: Ref<IPosition>;
}