const Sequelize = require('sequelize')

const database = 'avatar_maker'
const host = 'avatar-db.cfytyxuzfzwr.ap-southeast-2.rds.amazonaws.com'
const username = 'postgres'
const password = 'postgres'

const pgClient = new Sequelize(
  database,
  username,
  password,
  {
    host: host,
    dialect: 'postgres'
  }
)

const Avatar = pgClient.define('avatar', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  features: {
    type: Sequelize.STRING
  },
  img: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  created: {
    type: Sequelize.BIGINT
  }
})

Avatar.initialize = async () => {
  return Avatar.sync({ force: true }).then(() => {
    console.log('postgres connection ready')
  }).catch(err => console.error(err))
}

module.exports = Avatar
