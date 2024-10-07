const isAdmin = (req, res, next) => {
  const user = req.session.user
  if (user.role !== 'admin')
    return res.status(403).json({ status: 'error', message: 'Access restricted' })
  next()
}

export default isAdmin