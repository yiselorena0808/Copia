import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Cargo extends BaseModel {
  public static table = 'cargos'

  @column({ isPrimary: true })
  declare id_cargo: number

  @column()
  declare cargo: String
}