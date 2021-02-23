const { sortBy, values } = require('lodash')

const Feature = require('../models/feature')
const dynamoStore = require('./dynamoStore')

const features = {}

function init () {
  create('Face Type A', 'face-1.png', 'face-1.png', 1)
  create('Face Type B', 'face-2.png', 'face-2.png', 2)
  create('Hair Style A', 'curly-hair.png', 'curly-hair.png', 3)
  create('Hair Style B', 'short-hair.png', 'short-hair.png', 4)
  create('Hair Style C', 'hair-up.png', 'hair-up.png', 5)
  create('Eye Shap A', 'small-eye.png', 'small-eye.png', 6)
  create('Eye Shap B', 'eye.png', 'eye.png', 7)
  create('Eye Shadow', 'eyeshadow.png', 'eyeshadow.png', 8)
  create('Blush', 'blush.png', 'blush.png', 9)
  create('Nose', 'nose.png', 'nose.png', 10)
  create('Mouth Shape A', 'no-lip.png', 'no-lip.png', 11)
  create('Mouth Shape B', 'red-lip.png', 'red-lip.png', 12)
  create('Mouth Shape C', 'nude-lip.png', 'nude-lip.png', 13)
  create('Beard', 'beard.png', 'beard.png', 14)
  create('Glasses', 'glasses.png', 'glasses.png', 15)
}

async function getAll () {
  // const tops = values(features)
  const tops = await dynamoStore.getAllItems('features')
  return sortBy(tops, ['order'])
}

async function create (name, previewImage, image, order) {
  const id = name.replace(/ /g, '_').toLowerCase()
  const feature = new Feature(id, name, previewImage, image, order)

  // features[id] = feature
  return dynamoStore.putItem('features', feature)
}

module.exports = {
  getAll,
  init
}
