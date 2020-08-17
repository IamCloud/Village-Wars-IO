const ObjectClass = require('./object');
const Constants = require('../shared/constants');

class Village extends ObjectClass {
  constructor(id, x, y) {
    super(id);
    this.x = x;
    this.y = y;
    this.ressources = Constants.VILLAGE_BASE_RESSOURCES;
    this.menAtArms = Constants.VILLAGE_BASE_MEN;
  }

  update(dt) {
    super.update(dt);

    return null;
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      x: this.x,
      y: this.y,
      ressources: this.ressources,
      menAtArms: this.menAtArms
    };
  }
}

module.exports = Village;
