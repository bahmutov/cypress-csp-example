const express = require('express')
const helmet = require('helmet')
const app = express()
// uncomment to set content-security-policy
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        // ughh, have to allow unsafe inline styles to be added by Cypress
        // https://github.com/cypress-io/cypress/issues/21374
        styleSrc: ["'self'", "'unsafe-inline'"],
        reportUri: ['/security-attacks'],
      },
    },
  }),
)
app.use(express.static('public'))

const port = 3003
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
