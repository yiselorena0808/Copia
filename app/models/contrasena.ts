import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Contrasena extends BaseModel {
  public static table = 'contrasenas'
  @column({ isPrimary: true })
  public id?: number

  @column()
  public user_id?: number

  @column()
  public token?: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}