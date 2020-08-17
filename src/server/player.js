const ObjectClass = require('./object');
const Village = require('./village');
const Constants = require('../shared/constants');

class Player extends ObjectClass {
  constructor(id, username, firstVillage) {
    super(id);
    this.username = username;
    let secondVillage = new Village(2, firstVillage.x + 150, firstVillage.y)
    this.villages = [firstVillage, secondVillage];
  }

  update(dt) {
    super.update(dt);

    for (var i =0; i < this.villages.length; i++) {
      this.villages[i].update(dt);
    }    
    return null;
  }

  isDead() {
    return this.villages.length <= 0;
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      username: this.username,
      villages: JSON.stringify(this.villages)
    };
  }
}

module.exports = Player;
