import mongoose from 'mongoose'
import '../config/environment.js'

export const isInvalidDB = param => {
  if (param === 'sql' || param === 'mongo')
    return false
  else
    return true
}

export const isInvalidID = id => {
  if (mongoose.Types.ObjectId.isValid(id))
    return false
  else
    return true
}

export const isInvalidUser = user => {
  if (user.email && typeof user.email === 'string' && user.email.trim().length > 5)
    return false
  else if (user.password && typeof user.password === 'string' && user.password.trim().length > 1)
    return false
  else
    return true
}

export const isInvalidProduct = product => {
  if (product.name && typeof product.name === 'string' && product.name.trim().length > 1)
    return false
  else
    return true
}

export const isInvalidAdmin = (admin, key) => {
  if (admin.email === process.env.ADMIN_EMAIL && admin.password === process.env.ADMIN_PASSWORD && key === process.env.ADMIN_KEY)
    return false
  else
    return true
}