export const isInvalidParam = param => {
  if (param === 'sql' || param === 'mongo')
    return false
  else
    return true
}

export const isValidUser = user => {
  if (!user.email || typeof user.email !== 'string' || user.email.trim() === 0)
    return false
  else if (!user.password || typeof user.password !== 'string' || user.password.trim() === 0)
    return false
  else
    return true
}

export const isValidProduct = product => {
  if (!product.name || typeof product.name !== 'string' || product.name.trim() === 0)
    return false
  else
    return true
}