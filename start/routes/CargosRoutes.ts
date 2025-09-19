import CargosController from "../../app/controller/cargosController.js";
import Route from "@adonisjs/core/services/router"
import AuthJwt from "../../app/middleware/auth_jwt.js";

const authJwt= new AuthJwt()

const cargosController = new CargosController()
Route.post('/crearCargo', cargosController.crear).use(authJwt.handle.bind(authJwt))
Route.get('/listarCargos', cargosController.listar).use(authJwt.handle.bind(authJwt))
Route.put('/actualizarCargo/:id', cargosController.actualizar).use(authJwt.handle.bind(authJwt))
Route.delete('/eliminarCargo/:id', cargosController.eliminar).use(authJwt.handle.bind(authJwt))