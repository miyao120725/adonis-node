'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ListBlock extends Model {
    static boot () {
        super.boot()
        this.addHook('beforeCreate', (listBlock) => {
            listBlock.is_current_owner = true
        })
    }
}

module.exports = ListBlock
