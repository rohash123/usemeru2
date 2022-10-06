var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var ddb = new AWS.DynamoDB.DocumentClient();   
let imageTable = "Image-smlgjixggravfewr2ehh3zy2pi-dev";

function generateRandom(min = 0, max = 100) {
  let difference = max - min; 
  let rand = Math.random();
  rand = Math.floor( rand * difference);
  rand = (rand + min);
  return String(rand);
} 
function genParams(key){
  let owner = key.split('/')[2]
  let vmKey = generateRandom();
  let name = key.split('/').pop();
  let online = 'public';
  let date = new Date().toISOString();
  var params = {
    TableName: imageTable,
    Item: {
      key: key,
      vmKey: vmKey,
      owner: owner,
      name: name,
      online: online,
      date: date ,
    }
}
return params
};

async function createItem(key){
  const params = genParams(key)
  console.log(params)
  try {
    await ddb.put(params).promise();
  } catch (err) {
    return err;
  }
}

exports.handler = async (event) => {
  let key = event.Records[0].s3.object.key;
  try {
    await createItem(key)
    return { body: 'Successfully created item!' }
  } catch (err) {
    return { error: err }
  }
};