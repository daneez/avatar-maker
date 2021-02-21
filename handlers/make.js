const featureStore = require('../data/features')

async function makeAvatar (req, h) {
  const features = await featureStore.getAll()
  const context = {
    features: features,
    auth: req.auth
  }
  return h.view('avatar.make.hbs', context)
}

module.exports = (req, h) => {
  switch (req.params.target) {
    case 'avatar':
      return makeAvatar(req, h)
  }
}
