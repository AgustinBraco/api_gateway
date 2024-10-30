import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

const documentation = app =>
  app.use(
    '/api/docs',
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(
      swaggerJSDoc({
        definition: {
          openapi: '3.0.3',
          info: {
            title: 'API gateway documentation',
            version: '1.0.0',
            description:  'Service that routes requests to microservices that manage Products, Users, and Sessions across both SQL and MongoDB databases. \n\n' +
                          'Examples: \n' +
                          '- DB: sql OR mongo \n' +
                          '- Product ID: aa7f8b8cea0bb06c90b0907e \n' +
                          '- User ID: 3882dfbc5142847eab50246a'
          },
        },
        apis: ['docs/*.yaml'],
      }),
    ),
  )

export default documentation
