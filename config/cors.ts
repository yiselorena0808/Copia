import { defineConfig } from '@adonisjs/cors'

const corsConfig = defineConfig({
  enabled: true,
  origin: ['http://localhost:5173', 'https://backsst.onrender.com'], // sin "*"
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'], // agrega PATCH para actualizar
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})

export default corsConfig
