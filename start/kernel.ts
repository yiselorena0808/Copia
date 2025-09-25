/*
|--------------------------------------------------------------------------
| HTTP kernel file
|--------------------------------------------------------------------------
*/

import router from '@adonisjs/core/services/router'
import server from '@adonisjs/core/services/server'

/**
 * Error handler
 */
server.errorHandler(() => import('#exceptions/handler'))

/**
 * Middleware globales (se ejecutan en todas las rutas)
 */
server.use([
  () => import('#middleware/container_bindings_middleware'),
  () => import('#middleware/force_json_response_middleware'),
  () => import('@adonisjs/cors/cors_middleware'),
])

/**
 * Middleware global de router
 */
router.use([
  () => import('@adonisjs/core/bodyparser_middleware'),
])

/**
 * Named middleware (solo si se invocan en rutas específicas)
 */
export const middleware = router.named({
  auth: () => import('#middleware/AuthJwt'), // protege con JWT
  empresa: () => import('#middleware/EmpresaMiddleware'), // valida empresa
})
