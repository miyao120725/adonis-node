'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Nav extends Model {
    middles () {
        return this.belongsToMany('App/Models/List')
    }
}

module.exports = Nav
