import GestionEpp from "#models/gestion_epp"

export default class GestionEppService {
  // Crear
  async crearGestionEpp(data: Partial<GestionEpp>) {
    return await GestionEpp.create(data)
  }

  // Listar SOLO por empresa
  async listarGestiones(empresaId: number) {
    return await GestionEpp.query()
      .where('id_empresa', empresaId)
      .preload('cargo')
      .preload('usuario')
      .preload('empresa')
      .preload('area')
  }

  // Buscar por ID y empresa
  async obtenerGestionPorId(id: number, empresaId: number) {
    return await GestionEpp.query()
      .where('id', id)
      .andWhere('id_empresa', empresaId)
      .preload('cargo')
      .preload('usuario')
      .preload('empresa')
      .preload('area')
      .firstOrFail()
  }

  // Actualizar
  async actualizarGestion(id: number, empresaId: number, data: Partial<GestionEpp>) {
    const gestion = await GestionEpp.query()
      .where('id', id)
      .andWhere('id_empresa', empresaId)
      .firstOrFail()

    gestion.merge(data)
    await gestion.save()
    return gestion
  }

  // Eliminar
  async eliminarGestion(id: number, empresaId: number) {
    const gestion = await GestionEpp.query()
      .where('id', id)
      .andWhere('id_empresa', empresaId)
      .firstOrFail()

    await gestion.delete()
    return { mensaje: 'Gestión EPP eliminada correctamente' }
  }
}
