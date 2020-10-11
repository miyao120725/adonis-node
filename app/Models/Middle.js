'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Middle extends Model {
    lists () {
        return this
        .belongsToMany('App/Models/List')
        .pivotModel('App/Models/ListBlock')
        // .belongsToMany('App/Models/List')
        // .belongsToMany('App/Models/Nav')
        .withPivot(['block_title'])
        .pivotTable('middles')
    }
}

module.exports = Middle
