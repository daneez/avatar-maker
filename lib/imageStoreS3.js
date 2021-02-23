const AWS = require('aws-sdk')
const s3 = new AWS.S3()

module.exports.save = async (name, data) => {
  const params = {
    Bucket: 'avatar-maker-danni',
    Key: `avatars/${name}.png`,
    Body: Buffer.from(data, 'base64'),
    ContentEncoding: 'base64',
    ContentType: 'image/png'
  }

  await s3.putObject(params).promise()
  return `//avatar-maker-danni.s3-ap-southeast-2.amazonaws.com/${params.Key}`
}