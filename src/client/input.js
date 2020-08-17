// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#6-client-input-%EF%B8%8F
import { updateClientPosition } from './render';
import { incrementVillagePoints } from './networking';

function onMouseClick(e) {
    handleClick(e.clientX, e.clientY);
}

function onTouchClick(e) {
  const touch = e.touches[0];
  handleInput(touch.clientX, touch.clientY);
}

function handleClick(x, y) {
  incrementVillagePoints(1);
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

function touchStart(e) {
  isDragging = true;
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
}

function touchEnd(e) {
  isDragging = false;
  startX = 0;
  startY = 0;
}

function touchMove(e) {
  if (isDragging) {
    const touch = e.touches[0];
    updateClientPosition(touch.clientX - startX, touch.clientY - startY);
    startX = touch.clientX;
    startY = touch.clientY;
  }
}


export function startCapturingInput() {
  window.addEventListener('click', onMouseClick)
  window.addEventListener('mousedown', mouseDown);
  window.addEventListener('mouseup', mouseUp);
  window.addEventListener('mousemove', mouseMove);
  window.addEventListener('mouseout', mouseOut);

  window.addEventListener('touchstart', touchStart);
  window.addEventListener('touchend', touchEnd);
  window.addEventListener('touchmove', touchMove);
}

export function stopCapturingInput() {
  window.removeEventListener('click', onMouseClick)
  window.removeEventListener('mousedown', mouseDown);
  window.removeEventListener('mouseup', mouseUp);
  window.removeEventListener('mousemove', mouseMove);
  window.removeEventListener('mouseout', mouseOut);

  window.removeEventListener('touchstart', touchStart);
  window.removeEventListener('touchend', touchEnd);
  window.removeEventListener('touchmove', touchMove);
}
