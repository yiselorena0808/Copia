import CargoService from "#services/cargoService";

const cargoService = new CargoService();

export default class CargosController {
  async crear({ request, response }) {
    try {
      const datos = request.body();
      const cargo = await cargoService.crearCargos(datos);
      return response.status(201).json({ msj: "Cargo creado", cargo });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async listar({ response }) {
    const cargos = await cargoService.todosCargos();
    return response.json(cargos);
  }

  async actualizar({ request, response, params }) {
    try {
      const id_cargo = params.id;
      const datos = request.body();
      const cargo = await cargoService.actualizarCargos(id_cargo, datos);
      return response.json({ msj: "Cargo actualizado", cargo });
    } catch (error) {
      return response.status(404).json({ error: "Cargo no encontrado" });
    }
  }

  async eliminar({ response, params }) {
    try {
      const id_cargo = params.id;
      await cargoService.eliminarCargos(id_cargo);
      return response.json({ msj: "Cargo eliminado" });
    } catch (error) {
      return response.status(404).json({ error: "Cargo no encontrado" });
    }
  }
}
