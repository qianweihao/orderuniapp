const multer = require('@koa/multer')
const COS = require('cos-nodejs-sdk-v5')

var cos = new COS({
    SecretId: 'AKIDR9qSxKZhksslXBB84vhP3eAYvvslYErs',
    SecretKey: 'rVx7ZyvoeSCsSxN0PxX4ZGsNKArOnNkt',
	Protocol:'https:'
});

let Bucket = 'qianweihao-1314932886'
let Region = 'ap-nanjing'
let cosfun = function(filename,path){
	return new Promise((resolve,reject)=>{
		cos.uploadFile({
			Bucket,
			Region,
			Key: 'diancan/' + filename,              
			FilePath: path,  
		}).then(res=>{
			resolve(res.Location)  //返回图片地址
			
		})
		.catch(err=>{
			reject(err)
		})

	})

}

//配置上传文件所在的目录和更改文件名
const storage = multer.diskStorage({  //磁盘存储引擎
	destination:(req,file,cb) =>{ //存储前端传来的文件
		cb(null,'upload/image')  //相当于重定向作用
	},
	filename:(req,file,cb) =>{
		//防止文件重名更改前缀
		let fileFormat = (file.originalname).split(".")
	    let num = `${Date.now()}-${Math.floor(Math.random(0,1) * 10000000)}${"."}${fileFormat[fileFormat.length - 1]}`
		console.log(num)
		cb(null,num)
	}
})

const upload = multer({ storage})

module.exports = {upload,cosfun}