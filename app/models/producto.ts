import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Cargo from './cargo.js'

export default class Producto extends BaseModel {
  public static table = 'productos'

  @column({ isPrimary: true })
  declare id_producto: number

  @column()
  declare nombre: string

  @column()
  declare descripcion: string | null

  @column()
  declare id_cargo: number

  @column()
  declare estado: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relación: un producto pertenece a un cargo
  @belongsTo(() => Cargo, {
    foreignKey: 'id_cargo',
  })
  declare cargo: BelongsTo<typeof Cargo>
}
