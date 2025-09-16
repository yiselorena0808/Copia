import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Usuario from '#models/usuario'
import Empresa from '#models/empresa'
import Area from '#models/area'
import Cargo from './cargo.js'

export default class GestionEpp extends BaseModel {
  public static table = 'gestion_epp'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare id_usuario: number

  @column()
  declare nombre: string

  @column()
  declare apellido: string

  @column()
  declare cedula: string

  @column()
  declare id_cargo: number

  @column()
  declare productos: string

  @column()
  declare importancia: string

  @column()
  declare estado: string | null

  @column()
  declare id_empresa: number

  @column()
  declare id_area: number

  @column()
  declare fecha_creacion: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Usuario)
  declare usuario: BelongsTo<typeof Usuario>

  @belongsTo(() => Empresa)
  declare empresa: BelongsTo<typeof Empresa>

  @belongsTo(() => Area)
  declare area: BelongsTo<typeof Area>

  @belongsTo(() => Cargo, {
    foreignKey: 'id_cargo',
  })
  declare cargo: BelongsTo<typeof Cargo>
}
