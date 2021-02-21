module.exports = function (name, features, img, username) {
  this.id = name.replace(/ /g, '-')
  this.name = name
  this.features = features
  this.img = img
  this.username = username
  this.created = (new Date()).getTime()
}
