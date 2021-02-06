const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser') 
// const mongoose = require('mongoose')
// console.log(mongoose)
const {  User } = require('./model.js')

const app = express()

app.use(express.json()) // 解析 json
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false})) // 解析表单

app.get('/api', (req, res) => {
    res.send('ok iiii')
})

// 注册接口
app.post('/api/register', async (req, res) => {
    console.log(req.body)
   
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
    })

    res.send(user)
})

// 生成token用
const SECRET = '99999999998777777777773333'

// 登录接口
app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        username: req.body.username
    })

    console.log('user', user, '------req body', req.body)
    // 处理不存在的用户
    if(!user) {
        return res.status(422).send({
            message: 'none user'
        })
    }

    // 验证密码是否正确
    const isPasswordValid = require('_bcrypt@3.0.8@bcrypt').compareSync(
        req.body.password,
        user.password
    )

    if(!isPasswordValid) {
        return res.status(422).send({
            message: 'wrong password'
        })
    }

    // 返回一个token
    const token = require('jsonwebtoken').sign({
        id: String(user._id)
    }, SECRET)

    res.send({
        user,
        token
    })
})

// 根据 token 获取个人信息

app.get('/api/profile', async (req, res) => {
    // 解析请求头里面的 token
    console.log(String(req.headers.authorization))
    // return
    const rawData = String(req.headers.authorization).split(' ').pop()

    // 包含 id 和 iat 字段的 对象 
    const tokenData = require('jsonwebtoken').verify(
        rawData,
        SECRET
    )

    const { id } = tokenData 

    const user = await User.findById(id)

    console.log('user', user)

    res.send(user)

})

app.get('/api/users', async (req, res) => {
    const users = await User.find()
    res.send(users)
})

app.listen(7474, () => {
    console.log('runing on: 127.0.0.1:7474')
})

// console.log(mongoose)
