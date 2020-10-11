'use strict'

/*
|--------------------------------------------------------------------------
| BlockSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class BlockSeeder {
  async run () {
    const usersArray = await Factory
    .model('App/Models/Block')
    .createMany(1)
  }
}

module.exports = BlockSeeder
