const handlers = require('../handlers')

const routes = [
  require('./login'),
  require('./login.post'),
  require('./logout'),
  require('./main'),
  require('./make'),
  require('./avatar'),
  require('./avatar.post'),
  require('./register'),
  require('./static'),
  require('./features'),
  require('./user'),
  require('./user.post')
]

module.exports.register = server => {
  const handledRoutes = []

  for (const route of routes) {
    handledRoutes.push(route(handlers))
  }

  server.route(handledRoutes)
}
