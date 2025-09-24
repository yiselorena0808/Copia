import { defineConfig } from '@adonisjs/shield'

export default defineConfig({
  csrf: {
    enabled: true,
    exceptRoutes: [
      '/forgot-password',
      '/reset-password',
    ],
  },
})
