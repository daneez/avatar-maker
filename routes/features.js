module.exports = handlers => ({
  method: 'GET',
  path: '/features',
  handler: handlers.features,
  options: {
    auth: {
      mode: 'try'
    }
  }
})
