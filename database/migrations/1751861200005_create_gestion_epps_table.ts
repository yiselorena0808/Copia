// database/migrations/xxxx_gestion_epp.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'gestion_epp'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_usuario').unsigned().references('id').inTable('usuarios')
        .onDelete('CASCADE').onUpdate('CASCADE').notNullable()
      table.string('nombre')
      table.string('apellido')
      table.string('cedula')
      table.integer('id_cargo').unsigned().references('id_cargo').inTable('cargos')
        .onDelete('CASCADE').onUpdate('CASCADE').notNullable()
      table.string('productos')
      table.string('importancia')
      table.string('estado').nullable()
      table.integer('id_empresa').unsigned().references('id_empresa').inTable('empresas')
        .onDelete('CASCADE').onUpdate('CASCADE').notNullable()
      table.integer('id_area').unsigned().references('id_area').inTable('area')
        .onDelete('CASCADE').onUpdate('CASCADE').notNullable()
      table.date('fecha_creacion').defaultTo(this.now())
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
