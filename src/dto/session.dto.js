class UserDTO {
	constructor(user) {
		this.email = user.email
		this.password = user.password
		this.role = 'user'
	}
}

export default UserDTO