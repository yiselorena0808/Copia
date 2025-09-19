import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'empresas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_empresa').primary()
      table.string('nombre')
      table.string('direccion')
      table.string('nit')
      table.boolean('estado').defaultTo(true)
      table.string('esquema').nullable()
      table.string('alias').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}