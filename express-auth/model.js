const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/express-auth', {
  useNewUrlParser:true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, unique: true },
  password: { 
    type: String, 
    set(val) {
      return require('_bcrypt@3.0.8@bcrypt').hashSync(val, 8)
    }
  },
}))

// 删除数据
// User.db.dropCollection('users')

module.exports = { User }