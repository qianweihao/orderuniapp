const result = require('./handle.js')

const abnormal = async (ctx,next) =>{
	try{
		await next()
	}catch(err){
		const isresult = err instanceof result
		if(isresult){
			ctx.body = {
				msg:err.msg
			}
			ctx.status = err.code
		}else{
			ctx.body = {
				msg:'服务器抛出错误'
			}
			ctx.status = 500
		}
	}
}

module.exports = abnormal