// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#5-client-rendering
import { debounce } from 'throttle-debounce';
import { getAsset } from './assets';
import { getCurrentState } from './state';

const Constants = require('../shared/constants');

const { VILLAGE_BASE_POINTS, VILLAGE_MAX_HP, VILLAGE_RADIUS, MAP_SIZE } = Constants;

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
setCanvasDimensions();

function setCanvasDimensions() {
  // On small screens (e.g. phones), we want to "zoom out" so players can still see at least
  // 800 in-game units of width.
  const scaleRatio = Math.max(1, 800 / window.innerWidth);
  canvas.width = scaleRatio * window.innerWidth;
  canvas.height = scaleRatio * window.innerHeight;
}

window.addEventListener('resize', debounce(40, setCanvasDimensions));

function render() {
  const { me, others } = getCurrentState(); //Fix getCurrentState not ok when gameupdate
  if (!me) {
    return;
  }

  // Draw background
  if (Array.isArray(me.villages)) {
    renderBackground(me.villages[0].x, me.villages[0].y);

      // Draw boundaries
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.strokeRect(canvas.width / 2 - me.villages[0].x, canvas.height / 2 - me.villages[0].y, MAP_SIZE, MAP_SIZE);

    renderPlayer(me, me);
    others.forEach(renderPlayer.bind(null, me));
  }
  
}

function renderBackground(x, y) {
  const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
  const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;
  const backgroundGradient = context.createRadialGradient(
    backgroundX,
    backgroundY,
    MAP_SIZE / 10,
    backgroundX,
    backgroundY,
    MAP_SIZE / 2,
  );
  backgroundGradient.addColorStop(0, 'grey');
  backgroundGradient.addColorStop(1, 'brown');
  context.fillStyle = backgroundGradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

// Renders a village at a given location
function renderPlayer(me, player) {
  // Render villages
  for(var i = 0; i < player.villages.length; i++){
    var currentVillage = player.villages[i];
    const canvasX = canvas.width / 2 + currentVillage.x - me.villages[i].x;
    const canvasY = canvas.height / 2 + currentVillage.y - me.villages[i].y;

    // Draw village
    context.save();
    context.translate(canvasX, canvasY);
    context.drawImage(
      getAsset('ship.svg'),
      -VILLAGE_RADIUS,
      -VILLAGE_RADIUS,
      VILLAGE_RADIUS * 2,
      VILLAGE_RADIUS * 2,
    );
    context.restore();

    // Draw health bar
    context.fillStyle = 'black';
    context.fillRect(
      canvasX - VILLAGE_RADIUS,
      canvasY + VILLAGE_RADIUS + 8,
      VILLAGE_RADIUS * 2,
      2,
    );
    context.fillStyle = 'red';
    context.fillRect(
      canvasX - VILLAGE_RADIUS + VILLAGE_RADIUS * 2 * currentVillage.points / VILLAGE_MAX_HP,
      canvasY + VILLAGE_RADIUS + 8,
      VILLAGE_RADIUS * 2 * (1 - currentVillage.points / VILLAGE_MAX_HP),
      2,
    );
  }
}

function renderBullet(me, bullet) {
  const { x, y } = bullet;
  context.drawImage(
    getAsset('bullet.svg'),
    canvas.width / 2 + x - me.x - BULLET_RADIUS,
    canvas.height / 2 + y - me.y - BULLET_RADIUS,
    BULLET_RADIUS * 2,
    BULLET_RADIUS * 2,
  );
}

function renderMainMenu() {
  const t = Date.now() / 7500;
  const x = MAP_SIZE / 2 + 800 * Math.cos(t);
  const y = MAP_SIZE / 2 + 800 * Math.sin(t);
  renderBackground(x, y);
}

let renderInterval = setInterval(renderMainMenu, 1000 / 60);

// Replaces main menu rendering with game rendering.
export function startRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(render, 1000 / 60);
}

// Replaces game rendering with main menu rendering.
export function stopRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(renderMainMenu, 1000 / 60);
}
