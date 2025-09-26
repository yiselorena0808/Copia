import Route from '@adonisjs/core/services/router'
import AuthJwtMiddleware from '#middleware/auth_jwt'

const authJwt = new AuthJwtMiddleware()

Route.group(() => {
  Route.post('/crear', 'ProductosController.crear').use(authJwt.handle.bind(authJwt))
  Route.get('/listar', 'ProductosController.listar').use(authJwt.handle.bind(authJwt))
  Route.get('/cargo/:nombreCargo', 'ProductosController.listarPorCargo').use(authJwt.handle.bind(authJwt))
  Route.put('/actualizar/:id', 'ProductosController.actualizar').use(authJwt.handle.bind(authJwt))
  Route.delete('/eliminar/:id', 'ProductosController.eliminar').use(authJwt.handle.bind(authJwt))
}).prefix('/productos')
