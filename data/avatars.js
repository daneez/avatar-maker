const { filter, orderBy, values } = require('lodash')

const Avatar = require('../models/avatar')
const ImageStore = require('../lib/imageStore')
const AvatarStore = require('./avatarStore')

const avatars = {}

async function init () {
  await AvatarStore.initialize()
}

async function create (name, features, img, username) {
  const imgUrl = await ImageStore.save(name.replace(/ /g, '-'), img)
  const avatar = new Avatar(name, features, imgUrl, username)
  // avatars[avatar.id] = avatar
  // return avatar
  return AvatarStore.create(prepAvatar(avatar))
}

// for mocks that don't need avatar images saved
function batchImport (name, features, imgUrl, username) {
  const avatar = new Avatar(name, features, imgUrl, username)
  // avatars[avatar.id] = avatar
  AvatarStore.create(prepAvatar(avatar))
}

async function getForUser (username) {
  // const userAvatars = filter(avatars, avatar =>
  //   avatar.username === username
  // )
  // return userAvatars
  return AvatarStore.findAll({
    where: {
      username
    },
    raw: true
  }).then(debriefAvatars)
}

async function getRecent () {
  // const recentAvatars = orderBy(avatars, ['created'], ['desc'])
  // return values(recentAvatars).splice(0, 5)
  return AvatarStore.findAll({
    order: [['created', 'DESC']],
    limit: 4,
    raw: true
  }).then(debriefAvatars)
}

async function get (avatarId) {
  // if (!avatars[avatarId]) throw new Error('Avatar not found')
  // return avatars[avatarId]
  return AvatarStore.findOne({
    where: {
      id: avatarId
    },
    raw: true
  }).then(debriefAvatar)
}

function prepAvatar (avatar) {
  return {
    ...avatar,
    features: JSON.stringify(avatar.features)
  }
}

function debriefAvatar (avatar) {
  return {
    ...avatar,
    features: JSON.parse(avatar.features)
  }
}

function debriefAvatars (avatars) {
  return avatars.map(debriefAvatar)
}

module.exports = {
  batchImport,
  create,
  get,
  getForUser,
  getRecent,
  init
}
