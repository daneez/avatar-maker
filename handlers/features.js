const featureStore = require('../data/features')

module.exports = () => {
  const features = featureStore.getAll()
  return features
}
