import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Producto from './producto.js'

export default class Cargo extends BaseModel {
  public static table = 'cargos'

  @column({ isPrimary: true })
  declare id_cargo: number

  @column()
  declare cargo: string

  // Relación: un cargo tiene muchos productos
  @hasMany(() => Producto, {
    foreignKey: 'id_cargo', // clave en productos
  })
  declare productos: HasMany<typeof Producto>
}
