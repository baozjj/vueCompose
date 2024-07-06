export type CallbackType = (
  callback: Function
) => void;

export interface IMouseEnterRes {
  topFun: CallbackType
  bottomFun: CallbackType
  leftFun: CallbackType
  rightFun: CallbackType
  topLeaveFun: CallbackType;
  bottomLeaveFun: CallbackType;
  leftLeaveFun: CallbackType;
  rightLeaveFun: CallbackType;
  leaveFun: CallbackType;
}
