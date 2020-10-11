'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NavSchema extends Schema {
  up () {
    this.create('navs', (table) => {
      table.increments()
      table.string('nav_title').notNullable().unique().comment('导航名')
      table.timestamps()
    })
  }

  down () {
    this.drop('navs')
  }
}

module.exports = NavSchema
