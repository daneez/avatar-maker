const avatarStore = require('../data/avatars')

module.exports = async (req, h) => {
  const avatars = await avatarStore.getRecent()
  const context = {
    auth: req.auth,
    avatars: avatars
  }

  return h.view('index', context)
}
