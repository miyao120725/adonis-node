'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ListSchema extends Schema {
  up () {
    this.create('lists', (table) => {
      table.increments()
      table.integer('block_id').unsigned().references('id').inTable('blocks').comment('绑定区块表的ID')
      // table.integer('block_id').unsigned().notNullable().comment('绑定区块表的ID')
      table.string('title',250).notNullable().comment('标题')
      table.string('desc',255).notNullable().comment('描述')
      table.string('img_url',255).notNullable().comment('icon图片地址')
      table.timestamps()
    })
  }

  down () {
    this.drop('lists')
  }
}

module.exports = ListSchema
