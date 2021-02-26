const AWS = require('aws-sdk')
const AWSConfig = {
  region: "ap-southeast-2"
}
AWS.config.update(AWSConfig);

const dynamodb = new AWS.DynamoDB.DocumentClient()

async function putItem (table, item) {
  const params = {
    TableName: table,
    Item: item
  }

  return dynamodb.put(params).promise()
}

async function getAllItems (table) {
  const params = {
    TableName: table
  }

  const response = await dynamodb.scan(params).promise()
  return response.Items
}

async function getItem (table, idKey, id) {
  const params = {
    TableName: table,
    Key: {
      [idKey]: id
    }
  }

  const response = await dynamodb.get(params).promise()
  return response.Item
}

module.exports = {
  putItem,
  getAllItems,
  getItem
}

