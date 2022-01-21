const Potion = require('../lib/Potion');

function Player(name = '') {
  this.name = name;

  this.health = Math.floor(Math.random() * 10 + 95);
  this.strength = Math.floor(Math.random() * 5 + 7);
  this.agility = Math.floor(Math.random() * 5 + 7);

  this.inventory = [new Potion('health'), new Potion()];
}

// returns an object with various player properties
Player.prototype.getStats = function() {
  return {
    potions: this.inventory.length,
    health: this.health,
    strength: this.strength,
    agility: this.agility
  };
};
// returns the inventory array or false if empty
Player.prototype.getInventory = function() {
  if (this.inventory.length) {
    return this.inventory;
  }
  return false;
};
// returns the name and health
Player.prototype.getHealth = function() {
  return `${this.name}'s health is now ${this.health}!`;
};
// function for checking if player is alive
Player.prototype.isAlive = function() {
  if (this.health === 0) {
    return false;
  }
  return true;
};
// function for taking damage
Player.prototype.reduceHealth = function(health) {
  this.health -= health;

  if (this.health < 0) {
    this.health = 0;
  }
};
// returns the attack value
Player.prototype.getAttackValue = function() {
  const min = this.strength - 5;
  const max = this.strength + 5;

  return Math.floor(Math.random() * (max - min) + min);
};
// Adds potion to inventory
Player.prototype.addPotion = function(potion) {
  this.inventory.push(potion);
};
// function for using a potion
Player.prototype.usePotion = function(index) {
  // removes one potion from inventory
  const potion = this.getInventory().splice(index, 1)[0];
  // checks for potion name
  switch (potion.name) {
    // when agility
    case 'agility':
      this.agility += potion.value;
      break;
      // when health
    case 'health':
      this.health += potion.value;
      break;
      // when strength
    case 'strength':
      this.strength += potion.value;
      break;
  }
};

module.exports = Player;
