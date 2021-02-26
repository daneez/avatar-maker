/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const features = {}

$.get('/features', function (data) {
  $.each(data, function () {
    features[this.id] = this
  })
  loadImages()
})

const canvas = document.getElementById('avatar')
const ctx = canvas.getContext('2d')
attachHandlers()

function loadImages () {
  $.each(features, function (key, val) {
    const img = new window.Image()
    img.setAttribute('crossOrigin', 'anonymous')
    img.src = '//avatar-maker-danni.s3-ap-southeast-2.amazonaws.com/features/' + val.image +  '?'
    val.img = img
  })
}

function attachHandlers () {
  $('.feature').click(function () {
    $(this).toggleClass('added')
    addFeature(this.id)
  })
}

function addFeature (id) {
  features[id].added = !features[id].added
  redrawAvatar()
}

function redrawAvatar () {
  ctx.clearRect(0, 0, 400, 400)
  $.each(features, function () {
    if (this.added) {
      ctx.drawImage(this.img, 0, 0, 400, 400)
    }
  })
}

function getAvatarImage () {
  return canvas.toDataURL('image/png')
}

function sendAvatar () {
  const topps = []

  $.map(features, function (feature) {
    if (feature.added) {
      topps.push(feature.id)
    }
  })

  const pkg = {
    features: topps,
    username: $('#userInfo').data('username'),
    name: document.getElementById('avatarName').value,
    img: getAvatarImage()
  }

  $.ajax({
    type: 'POST',
    url: '/avatar',
    data: JSON.stringify(pkg),
    contentType: 'application/json charset=utf-8',
    success: function (data) {
      window.location.assign('/avatar/' + pkg.name.replace(/ /g, '-'))
    }
  })
}
/* eslint-enable no-undef */
/* eslint-enable no-unused-vars */
