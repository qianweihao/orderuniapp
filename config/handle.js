//error为nodeJs自带错误
class result extends Error {
	constructor(msg,code) {
		super()
		this.msg = msg
		this.code = code
	}
}

module.exports = result