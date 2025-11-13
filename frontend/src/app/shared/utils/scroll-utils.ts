export function getScrollSign(wheelEvent: WheelEvent) {
  return wheelEvent.deltaY > 0 ? 1 : -1;
}
