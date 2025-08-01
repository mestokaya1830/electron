const mongoose = require('mongoose');

const usersSC = new mongoose.Schema({
  name: {
    type: String, 
    required:[true, 'Name is required'], 
    minlength:['3', 'Name must be more then 3'], 
    maxlength:['255','Name must be less then 255']
  },
  password: {
    type: String, 
    required:[true, 'Password is required'], 
    minlength:['3', 'Password must be more then 3'], 
    maxlength:['255','Password must be less then 255']
  },
  token: {type: String}
})

module.exports = mongoose.model('users', usersSC)


//not when unique not works
//open mongosh use users then paste this db.users.ensureIndex( { "email": 1 }, { unique: true } )
