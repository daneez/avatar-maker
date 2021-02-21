const { get } = require('lodash')

const userStore = require('../data/users')
const avatarStore = require('../data/avatars')

async function postUser (req, h) {
  const user = await userStore.create(req.payload.username.toLowerCase(), req.payload.password)
  const sid = String(Math.random())
  await req.server.app.cache.set(sid, user, 0)
  req.cookieAuth.set({ sid: sid, user: user })
  return h.redirect('/login')
}

async function getUser (req, h) {
  const username = get(req, 'params.username') || get(req, 'auth.credentials.user.username')
  const avatars = await avatarStore.getForUser(username)
  const context = {
    username: username,
    auth: req.auth,
    avatars: avatars
  }

  return h.view('user', context)
}

module.exports = (req, h) => {
  if (req.method === 'get') {
    return getUser(req, h)
  }
  if (req.method === 'post') {
    return postUser(req, h)
  }
}
