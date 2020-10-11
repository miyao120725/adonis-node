'use strict'

/*
|--------------------------------------------------------------------------
| ListSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class ListSeeder {
  async run () {
    const users = await Database.table('csdn')
    console.log(users);
    // const usersArray = await Factory
    // .model('App/Models/List')
    // .createMany(5)
  }
}

module.exports = ListSeeder
