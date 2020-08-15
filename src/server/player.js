const ObjectClass = require('./object');
const Village = require('./village');
const Constants = require('../shared/constants');

class Player extends ObjectClass {
  constructor(id, username, firstVillage) {
    super(id);
    this.username = username;
    this.score = 0;
    this.villages = [firstVillage];
  }

  update(dt) {
    super.update(dt);

    return null;
  }

  incrementPoints() {
    this.points++;
  }

  isDead() {
    return this.villages.length <= 0;
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      username: this.username,
      score: this.score,
      villages: JSON.stringify(this.villages)
    };
  }
}

module.exports = Player;
