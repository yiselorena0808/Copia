import db from '@adonisjs/lucid/services/db'

export default class ProductoService {
  async listar() {
    try {
      return await db.from('productos').select('*')
    } catch (error) {
      console.error('Error en listar productos:', error)
      return []
    }
  }

  async crear(data: any) {
    try {
      return await db.table('productos').insert(data).returning('*')
    } catch (error) {
      console.error('Error en crear producto:', error)
      throw error
    }
  }

  async actualizar(id: number, data: any) {
    try {
      return await db.from('productos').where('id_producto', id).update(data).returning('*')
    } catch (error) {
      console.error('Error en actualizar producto:', error)
      throw error
    }
  }

  async eliminar(id: number) {
    try {
      return await db.from('productos').where('id_producto', id).delete()
    } catch (error) {
      console.error('Error en eliminar producto:', error)
      throw error
    }
  }

  async getByCargo(id: number) {
    try {
      return await db.from('productos').where('id_cargo', id).select('*')
    } catch (error) {
      console.error('Error en getByCargo:', error)
      return []
    }
  }

  async getByCargoNombre(nombre: string) {
    try {
      return await db.from('productos')
        .join('cargos', 'productos.id_cargo', 'cargos.id_cargo')
        .where('cargos.cargo', nombre)
        .select('productos.*')
    } catch (error) {
      console.error('Error en getByCargoNombre:', error)
      return []
    }
  }
}
