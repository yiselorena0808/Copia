import db from '@adonisjs/lucid/services/db'

export default class CargoService {
  async listar() {
    try {
      return await db.from('cargos').select('*')
    } catch (error) {
      console.error('Error en listar cargos:', error)
      return []
    }
  }

  async crear(data: any) {
    try {
      return await db.table('cargos').insert(data).returning('*')
    } catch (error) {
      console.error('Error en crear cargo:', error)
      throw error
    }
  }

  async actualizar(id: number, data: any) {
    try {
      return await db.from('cargos').where('id_cargo', id).update(data).returning('*')
    } catch (error) {
      console.error('Error en actualizar cargo:', error)
      throw error
    }
  }

  async eliminar(id: number) {
    try {
      return await db.from('cargos').where('id_cargo', id).delete()
    } catch (error) {
      console.error('Error en eliminar cargo:', error)
      throw error
    }
  }

  async productosPorCargo(id: number) {
    try {
      return await db.from('productos').where('id_cargo', id).select('*')
    } catch (error) {
      console.error('Error en productosPorCargo:', error)
      return []
    }
  }
}
