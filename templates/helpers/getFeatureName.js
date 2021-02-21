const { find } = require('lodash')

module.exports = (featureId, features) => {
  const feature = find(features, (feature) => {
    return feature.id === featureId
  })
  return feature ? feature.name : featureId
}
