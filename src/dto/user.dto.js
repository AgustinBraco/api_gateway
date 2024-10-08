import { hashPassword } from "../utils/password.utils.js"

class UserDTO {
	constructor(user) {
		this.email = user.email
		this.password = hashPassword(user.password)
		this.role = 'user'
	}
}

export default UserDTO