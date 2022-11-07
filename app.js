const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')() //实例化路由
const cors = require('koa2-cors')
const abnormal = require('./config/abnormal.js')


app.use(cors())
app.use(json())
app.use(bodyParser())
app.use(abnormal)

//注册 登录
const login = require('./router/login/login.js')
//配置路由接口
router.use('/api',login)

app.use(router.routes()).use(router.allowedMethods())

app.listen(5000);
console.log('成功')