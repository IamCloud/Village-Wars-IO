class Object {
  constructor(id) {
    this.id = id;
    // this.x = x;
    // this.y = y;
  }

  update(dt) {
    // this.x += dt * this.speed * Math.sin(this.direction);
    // this.y -= dt * this.speed * Math.cos(this.direction);
  }

  distanceTo(object) {
    const dx = this.x - object.x;
    const dy = this.y - object.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  serializeForUpdate() {
    return {
      id: this.id
    };
  }
}

module.exports = Object;
