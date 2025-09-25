import CargosController from '../../app/controller/cargosController.js'
import Route from '@adonisjs/core/services/router'
import AuthJwt from '../../app/middleware/auth_jwt.js'

const authJwt = new AuthJwt()
const cargosController = new CargosController()
Route.group(() => {
  Route.post('/crear', cargosController.crear)
  Route.get('/listar', cargosController.listar)
  Route.put('/actualizar/:id_cargo', cargosController.actualizar)
  Route.delete('/eliminar/:id_cargo', cargosController.eliminar)
  Route.get('/:id_cargo/productos', cargosController.productosPorCargo)
})
  .prefix('/cargos')
  .use(authJwt.handle.bind(authJwt))