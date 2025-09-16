import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Usuarios extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 100).notNullable()
      table.string('apellido', 100).notNullable()
      table.string('nombre_usuario', 100).unique().notNullable()
      table.string('correo_electronico', 150).unique().notNullable()
      table.string('cargo', 100)
      table.text('contrasena').notNullable()
      table
        .integer('id_empresa')
        .unsigned()
        .notNullable()
        .references('id_empresa')
        .inTable('empresas')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table
        .integer('id_area')
        .unsigned()
        .notNullable()
        .references('id_area')
        .inTable('area')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
