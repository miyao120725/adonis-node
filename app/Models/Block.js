'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Block extends Model {
    lists () {
        return this.belongsToMany('App/Models/List')
        // .belongsToMany('App/Models/Nav')
    }
}

module.exports = Block
