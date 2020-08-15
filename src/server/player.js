const ObjectClass = require('./object');
const Village = require('./village');
const Constants = require('../shared/constants');

class Player extends ObjectClass {
  constructor(id, username, firstVillage) {
    super(id);
    this.username = username;
    this.score = 0;
    let secondVillage = new Village(2, firstVillage.x + 100, firstVillage.y + 100, 10)
    this.villages = [firstVillage, secondVillage];
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
