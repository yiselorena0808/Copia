import GestionEpp from "#models/gestion_epp"

export default class GestionEppService {
 public async crearGestionEpp(datos: any) {
    // Crear registro en la tabla gestion_epp
    const gestion = await GestionEpp.create({
      cedula: datos.cedula,
      id_usuario: datos.id_usuario,
      nombre: datos.nombre,
      apellido: datos.apellido,
      id_empresa: datos.id_empresa,
      id_cargo: datos.id_cargo,
      id_producto: datos.id_producto,
      importancia: datos.importancia,
      estado: datos.estado,
      fecha_creacion: datos.fecha_creacion,
    })

    return gestion
  }

  async listarGestiones(id_empresa: number) {
    try {
      const gestiones = await GestionEpp.query()
        .where("id_empresa", id_empresa) // ✅ filtrado por empresa del token
        .orderBy("fecha_creacion", "desc")
      return gestiones
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async obtenerGestionPorId(id: number, id_empresa: number) {
    const gestion = await GestionEpp.query()
      .where("id", id)
      .andWhere("id_empresa", id_empresa)
      .first()
    if (!gestion) throw new Error("Gestión no encontrada")
    return gestion
  }

  async actualizarGestion(id: number, id_empresa: number, datos: any) {
    const gestion = await GestionEpp.query()
      .where("id", id)
      .andWhere("id_empresa", id_empresa)
      .first()
    if (!gestion) throw new Error("Gestión no encontrada")

    await gestion.merge({
      cedula: datos.cedula,
      id_cargo: datos.id_cargo,
      productos: datos.productos,
      importancia: datos.importancia,
      estado: datos.estado,
      fecha_creacion: datos.fecha_creacion ?? gestion.fecha_creacion,
    }).save()

    return gestion
  }

  async eliminarGestion(id: number, id_empresa: number) {
    const gestion = await GestionEpp.query()
      .where("id", id)
      .andWhere("id_empresa", id_empresa)
      .first()
    if (!gestion) throw new Error("Gestión no encontrada")

    await gestion.delete()
    return { mensaje: "Gestión eliminada correctamente" }
  }
}
