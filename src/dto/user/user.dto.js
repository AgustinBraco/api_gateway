import { hashPassword } from "../../utils/index.js"

export class UserDTO {
	constructor(user) {
		this.email = user.email
		this.password = hashPassword(user.password)
		this.permission = 'user'
	}
}