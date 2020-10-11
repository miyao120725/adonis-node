'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

// Factory.blueprint('App/Models/User', (faker) => {
//   return {
//     username: faker.username()
//   }
// })
Factory.blueprint('App/Models/User', async (faker) => {
    console.log()
    return {
      username: faker.username(),
      email: faker.email(),
      password: await Hash.make(faker.password())
    }
  })

// Factory.blueprint('App/Models/List', async (faker,i,data) => {
// return {
//     block_id: faker.block_id(),
//     title: faker.title(),
//     desc: faker.desc(),
//     img_url: faker.img_url(),
// }
// })
Factory.blueprint('App/Models/Nav', async (faker) => {
    return {
        nav_title: '开放平台'
    }
})

Factory.blueprint('App/Models/Block', async (faker,i,data) => {
    console.log(faker,i,data)
    return {
        nav_id: 1,
        block_title: 'Ai智能'
    }
})
