//require mongo

const mongo = require('mongoose')

//get instance of the mongoose schema
const schema = mongo.Schema

//create new schema for the users
const userSchema = new schema({
    email : String,
    password : String
})

//create model for the schema and export it
module.exports = mongo.model('user', userSchema, 'users') //users: the collection name in mongoAtlas

