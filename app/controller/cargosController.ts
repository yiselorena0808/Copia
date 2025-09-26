import CargoService from "#services/cargoService"

const service = new CargoService()

export default class CargosController {
  async listar({ response }) {
    const cargos = await service.listar()
    return response.json(cargos)
  }

  async crear({ request, response }) {
    const data = request.only(['cargo'])
    const cargo = await service.crear(data)
    return response.created(cargo)
  }

  async actualizar({ params, request, response }) {
    const data = request.only(['cargo'])
    const cargo = await service.actualizar(params.id, data)
    return response.json(cargo)
  }

  async eliminar({ params, response }) {
    await service.eliminar(params.id_cargo)
    return response.json({ message: 'Cargo eliminado' })
  }

  async productosPorCargo({ params, response }) {
    const productos = await service.productosPorCargoId(params.id)
    return response.json(productos)
  }

  async productosPorCargoNombre({ params, response }) {
    const productos = await service.productosPorCargoNombre(params.nombre)
    return response.json(productos)
  }
}
