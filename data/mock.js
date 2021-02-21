const avatars = require('./avatars')
const users = require('./users')
const features = require('./features')

const mockAvatars = [
  require('./mock_avatars/vintage_avatar.json'),
  require('./mock_avatars/positive_mood.json'),
  require('./mock_avatars/be_cool.json'),
  require('./mock_avatars/busy_look.json'),
  require('./mock_avatars/free_style.json'),
  require('./mock_avatars/lazy_mood.json')
]

module.exports.hydrate = async () => {
  users.create('danni', 'pass', () => {})
  users.create('tom', 'pass', () => {})
  users.create('lily', 'pass', () => {})

  await avatars.init()
  for (const avatar of mockAvatars) {
    avatars.batchImport(avatar.name, avatar.features, avatar.img, avatar.username)
  }

  // prep features
  features.init()
}
