const Constants = require('../shared/constants');
const Player = require('./player');
const applyCollisions = require('./collisions');
const Village = require('./village');

class Game {
  constructor() {
    this.sockets = {};
    this.players = {};
    this.lastUpdateTime = Date.now();
    this.shouldSendUpdate = false;
    setInterval(this.update.bind(this), 1000 / 60);
  }

  addPlayer(socket, username) {
    this.sockets[socket.id] = socket;

    // Generate a position to start this player at.
    const x = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    const y = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    this.players[socket.id] = new Player(socket.id, username, new Village(1, x, y));
  }

  removePlayer(socket) {
    delete this.sockets[socket.id];
    delete this.players[socket.id];
  }

  handleInput(socket, addedPoints) {
    if (this.players[socket.id]) {
       this.players[socket.id].villages[0].ressources += addedPoints;
     }
  }

  update() {
    // Calculate time elapsed
    const now = Date.now();
    const dt = (now - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = now;

    // Update each bullet
    // const bulletsToRemove = [];
    // this.bullets.forEach(bullet => {
    //   if (bullet.update(dt)) {
    //     // Destroy this bullet
    //     bulletsToRemove.push(bullet);
    //   }
    // });
    // this.bullets = this.bullets.filter(bullet => !bulletsToRemove.includes(bullet));

    // Update each player
    Object.keys(this.sockets).forEach(playerID => {
      const player = this.players[playerID];
      player.update(dt);
    });

    // Apply collisions, give players score for hitting bullets
    // const destroyedBullets = applyCollisions(Object.values(this.players), this.bullets);
    // destroyedBullets.forEach(b => {
    //   if (this.players[b.parentID]) {
    //     this.players[b.parentID].onDealtDamage();
    //   }
    // });
    //this.bullets = this.bullets.filter(bullet => !destroyedBullets.includes(bullet));

    // Check if any players are dead
    Object.keys(this.sockets).forEach(playerID => {
      const socket = this.sockets[playerID];
      const player = this.players[playerID];
      if (player.isDead()) {
        socket.emit(Constants.MSG_TYPES.GAME_OVER);
        this.removePlayer(socket);
      }
    });

    // Send a game update to each player every other time
    if (this.shouldSendUpdate) {
      const leaderboard = this.getLeaderboard();
      Object.keys(this.sockets).forEach(playerID => {
        const socket = this.sockets[playerID];
        const player = this.players[playerID];
        socket.emit(Constants.MSG_TYPES.GAME_UPDATE, this.createUpdate(player, leaderboard));
      });
      this.shouldSendUpdate = false;
    } else {
      this.shouldSendUpdate = true;
    }
  }

  getLeaderboard() {
    return Object.values(this.players)
      .sort((p1, p2) => p2.score - p1.score)
      .slice(0, 5)
      .map(p => ({ username: p.username, score: Math.round(p.villages.length) }));
  }

  createUpdate(player, leaderboard) {
    const otherPlayers = Object.values(this.players).filter(
      p => p !== player
    );

    return {
      t: Date.now(),
      me: player.serializeForUpdate(),
      others: otherPlayers.map(p => p.serializeForUpdate()),
      villages: player.villages.map(v => v.serializeForUpdate()),
      leaderboard,
    };
  }
}

module.exports = Game;
