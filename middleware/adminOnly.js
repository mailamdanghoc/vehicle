module.exports = function adminOnly(req, res, next) {
  if (!req.user || !req.user.roles) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const isAdmin = req.user.roles.includes('administrator');

  if (!isAdmin) {
    return res.status(403).json({ message: 'Admin only' });
  }

  next();
};
