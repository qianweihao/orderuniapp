const axios =require('axios')
const qs = require('querystring')
const result = require('./result.js')

let param =qs.stringify({
	grant_type:'client_credential',
	appid:'wx1d0c6d71ce38ff00',
	secret:'833c32b313a6363c31cf34b300f1c3c7'
})
//获取token的地址，必须要得到token才有权限操作云开发数据库
let url = 'https://api.weixin.qq.com/cgi-bin/token?' + param
//云环境id
let env = 'cloud1-2gdga1m2783758ca'
//数据库插入记录
let Addurl = 'https://api.weixin.qq.com/tcb/databaseadd?access_token='
//数据库查询记录
let Tripurl = 'https://api.weixin.qq.com/tcb/databasequery?access_token='
//数据库更新记录
let Updateurl ='https://api.weixin.qq.com/tcb/databaseupdate?access_token='
class getToken{
	constructor(){}
	async gettoken(){
		try{
			let token = await axios.get(url)
			//console.log(token)
			if(token.status == 200){
				return token.data.access_token
			}else{
				throw '获取token错误'
				//throw会进入catch
			}
		}catch(e){
			throw new result(e,500)
		}
	}
	//调用云开发http api接口
	async posteve(dataurl,query){
		try{
			let token = await this.gettoken()
			let data = await axios.post(dataurl+token,{env,query})
			//console.log(data)
			if(data.data.errcode == 0){
				return data.data
			}else{
				throw'请求出错'
			}
		}catch(e){
			throw new result(e,500)
		}
	}
}
module.exports = {getToken,Addurl,Tripurl,Updateurl}