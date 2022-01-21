const Player = require('../lib/Player.js');
const Potion = require('../lib/Potion.js');

jest.mock('../lib/Potion.js');

// Test for the player object 
test('creates a player object', () => {
  const player = new Player('Dave');

  expect(player.name).toBe('Dave');
  expect(player.health).toEqual(expect.any(Number));
  expect(player.strength).toEqual(expect.any(Number));
  expect(player.agility).toEqual(expect.any(Number));

  expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]));
});
// Test for all of player stats
test("gets player's stats as an object", () => {
  const player = new Player('Dave');

  expect(player.getStats()).toHaveProperty('potions');
  expect(player.getStats()).toHaveProperty('health');
  expect(player.getStats()).toHaveProperty('strength');
  expect(player.getStats()).toHaveProperty('agility');
});
// Test for player inventory
test('gets inventory from player or returns false', () => {
  const player = new Player('Dave');

  expect(player.getInventory()).toEqual(expect.any(Array));

  player.inventory = [];

  expect(player.getInventory()).toEqual(false);
});
// Test for player's health 
test("gets player's health value", () => {
  const player = new Player('Dave');

  expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});
// Test for checking if player is alive
test('checks if player is alive or not', () => {
  const player = new Player('Dave');

  expect(player.isAlive()).toBeTruthy();

  player.health = 0;

  expect(player.isAlive()).toBeFalsy();
});
// Test for taking damage
test("subtracts from player's health", () => {
  const player = new Player('Dave');
  const oldHealth = player.health;

  player.reduceHealth(5);

  expect(player.health).toBe(oldHealth - 5);

  player.reduceHealth(99999);

  expect(player.health).toBe(0);
});