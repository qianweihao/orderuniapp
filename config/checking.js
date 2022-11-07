const result = require('./handle.js')
//公共参数校验
class checking{
	constructor(ctx,...obj){
		this.ctx = ctx
		this.obj = obj
		console.log(obj)
	}
	
	//校验前端传来的值为undefined
	Errunder(){
		let bvc = this.obj.indexOf(undefined)
		console.log(bvc) // -1
		if(bvc != -1){
			throw new result('参数填写错误',400)
		}
	}
	
	//校验手机号码格式
	Phone(mobile,num){
		let phone = /^1[3456789]\d{9}$/
		if(!phone.test(this.obj[num])){
			throw new result(mobile,202)
		}
	}
	
	//密码校验 6-20位数字和字母结合
	Password(pass,num){
		let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/
		if(!reg.test(this.obj[num])){
			throw new result(pass,202)
		}
	}
}

//注册校验
class regcheck extends checking {
	start(){
		super.Errunder()
		super.Phone('请填写正确的手机号码',0)
		super.Password('密码必须6-20位数字字母组合',1)
	}
}


module.exports = {regcheck}