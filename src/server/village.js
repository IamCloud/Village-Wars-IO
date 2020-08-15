const ObjectClass = require('./object');
const Constants = require('../shared/constants');

class Village extends ObjectClass {
  constructor(id, x, y, points) {
    super(id);
    this.x = x;
    this.y = y;
    this.points = points;
  }

  update(dt) {
    super.update(dt);

    return null;
  }

  incrementPoint() {
    this.points++;
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      x: this.x,
      y: this.y,
      points: this.points
    };
  }
}

module.exports = Village;
