const Boom = require('@hapi/boom')

const avatarStore = require('../data/avatars')
const featuresStore = require('../data/features')

async function getAvatar (req, h) {
  const features = await featuresStore.getAll()
  const avatar = await avatarStore.get(req.params.avatarId)
  const context = {
    auth: req.auth,
    avatar,
    features
  }

  return h.view('avatar', context)
}

async function postAvatar (req) {
  const data = req.payload
  const name = data.name
  const features = data.features
  const username = data.username
  const img = data.img

  try {
    return avatarStore.create(name, features, img, username)
  } catch (err) {
    console.error(`Error on putting s3 object: ${err}`)
    return Boom.badImplementation('Could not create avatar.')
  }
}

module.exports = (req, h) => {
  if (req.method === 'get') {
    return getAvatar(req, h)
  } else if (req.method === 'post') {
    return postAvatar(req)
  }
}
