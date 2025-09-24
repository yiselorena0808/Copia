import { DateTime } from 'luxon'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import GestionEpp from '#models/gestion_epp'
import { BaseModel, belongsTo, column} from '@adonisjs/lucid/orm'
import type { BelongsTo} from '@adonisjs/lucid/types/relations'
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
  declare cargo_asignado: string

  @column()
  declare estado: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Cargo, {
    foreignKey: 'id_cargo',
  })
  declare cargos: BelongsTo<typeof Cargo>
}
