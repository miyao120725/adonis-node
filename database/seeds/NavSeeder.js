'use strict'

/*
|--------------------------------------------------------------------------
| NavSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class NavSeeder {
  async run () {
    await Factory
    .model('App/Models/Nav')
    .create()
  //   .model('App/Models/User')
  // .createMany(5)
  //   console.log(1111,usersArray)
  // }
  }
}

module.exports = NavSeeder
