// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#6-client-input-%EF%B8%8F
import { updateClientPosition } from './render';

function onMouseInput(e) {
    handleInput(e.clientX, e.clientY);
}

function onTouchInput(e) {
  const touch = e.touches[0];
  handleInput(touch.clientX, touch.clientY);
}

function handleInput(x, y) {
  updateClientPosition(x, y);
}

var isDragging = false;
var startX = 0;
var startY = 0;
function mouseDown(e) {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
}

function mouseUp(e) {
  isDragging = false;
  startX = 0;
  startY = 0;
}

function mouseOut(e) {
  isDragging = false;
  startX = 0;
  startY = 0;
}

function mouseMove(e) {
  if (isDragging) {
    updateClientPosition(e.clientX - startX, e.clientY - startY);
    startX = e.clientX;
    startY = e.clientY;
  }
}


export function startCapturingInput() {
  window.addEventListener('mousedown', mouseDown);
  window.addEventListener('mouseup', mouseUp);
  window.addEventListener('mousemove', mouseMove);
  window.addEventListener('mouseout', mouseOut);
  window.addEventListener('touchstart', onTouchInput);
  window.addEventListener('touchmove', onTouchInput);
}

export function stopCapturingInput() {
  window.removeEventListener('mousedown', mouseDown);
  window.removeEventListener('mouseup', mouseUp);
  window.removeEventListener('mousemove', mouseMove);
  window.removeEventListener('mouseout', mouseOut);
  window.removeEventListener('touchstart', onTouchInput);
  window.removeEventListener('touchmove', onTouchInput);
}
