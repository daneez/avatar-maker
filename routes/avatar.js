module.exports = handlers => ({
  method: 'GET',
  path: '/avatar/{avatarId}',
  handler: handlers.avatar,
  options: {
    auth: {
      mode: 'try'
    }
  }
})
