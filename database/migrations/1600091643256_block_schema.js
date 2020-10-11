'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BlockSchema extends Schema {
  up () {
    this.create('blocks', (table) => {
      table.increments()
      table.integer('nav_id').unsigned().references('id').inTable('navs').comment('绑定nav表的ID')
      // table.integer('nav_id').unsigned().notNullable().comment('绑定nav表的ID')
      table.string('block_title').notNullable().comment('区块名')
      table.timestamps()
    })
  }

  down () {
    this.drop('blocks')
  }
}

module.exports = BlockSchema
