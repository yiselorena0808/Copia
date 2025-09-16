import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'actividades_ludicas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_usuario').unsigned().notNullable()
        .references('id').inTable('usuarios')
        .onDelete('CASCADE')  
        .onUpdate('CASCADE')
      table.string('nombre_usuario')
      table.string('nombre_actividad')
      table.date('fecha_actividad')
      table.text('descripcion')
      table.text('imagen_video')
      table.integer('id_empresa').references('id_empresa').inTable('empresas')
        .onDelete('CASCADE').onUpdate('CASCADE')
        .notNullable()
      table.text('archivo_adjunto')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
