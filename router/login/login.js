const router = require('koa-router')()

const result = require('../../config/result.js')

const {getToken,Addurl,Tripurl} = require('../../config/databaseapi.js')

const {regcheck} = require('../../config/checking.js')
const { add } = require('nodemon/lib/rules')
//注册接口
router.post('/register',async ctx =>{
	//post接收前端传来的参数
	//post提交的值在ctx.request.body
	console.log('890')
    //new result(ctx).answer()
	//new getToken().gettoken()
	//let name = '周文静'
	//let query = `db.collection("ceshi").add({data:{name:'${name}'}})`
	//let res = await new getToken().posteve(Addurl,query)
	//console.log(res)
	//ctx.status = 200
	//console.log(ctx.request.body)
	let {account,password} =ctx.request.body
	//1.校验前端传来的值是否合法
	new regcheck(ctx,account,password).start()
	
	//console.log(account)
	//console.log(password)
	//查询手机号是否注册过
	const query = `db.collection('business-acc').where({account:'${account}'}).get()`
	try{
		const user = await new getToken().posteve(Tripurl,query)
		//console.log(user)
		if(user.data.length > 0){
			//已经注册过
			new result(ctx,'已经注册过',202).answer()
		}else{
			//没有注册过
			//[账号，密码，uid:商家唯一标识]
			//生成商家唯一标识id
			const uid = new Date().getTime()
			//console.log(uid)
			const struid = JSON.stringify(uid)
			const OBJ = {account,password,uid}
			const STR =  JSON.stringify(OBJ)
			const addquery = `db.collection('business-acc').add({data:${STR}})`
			const res =  await new getToken().posteve(Addurl,addquery) 
			console.log(res)
			new result(ctx,'注册成功').answer()
		}
	}catch(e){
		new result(ctx,'注册失败，服务器发送错误',500).answer()
	}
})

module.exports = router.routes()