const isAuth = (req, res, next) => {
  const user = req.session.user
  if (!user)
    return res.status(401).json({ status: 'error', message: 'Authentication required', data: null })
  next()
}

export default isAuth