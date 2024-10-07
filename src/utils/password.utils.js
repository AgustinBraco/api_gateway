import bcrypt from 'bcryptjs'

export const hashPassword = password =>
	bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isInvalidPassword = (sessionData, session) =>
	!bcrypt.compareSync(sessionData.password, session[0]?.password || session?.password)