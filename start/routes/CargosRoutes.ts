import CargosController from "../../app/controller/cargosController.js";
import Route from "@adonisjs/core/services/router"

const cargosController = new CargosController()
Route.post('/crearCargo', cargosController.crear)
Route.get('/listarCargos', cargosController.listar)
Route.put('/actualizarCargo/:id', cargosController.actualizar)
Route.delete('/eliminarCargo/:id', cargosController.eliminar)