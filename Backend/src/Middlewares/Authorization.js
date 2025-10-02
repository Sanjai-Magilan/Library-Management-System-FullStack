const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.User.UserRole) return res.status(401).send("Not authenticated");

    if (!allowedRoles.includes(req.User.UserRole)) {
      return res.status(403).send(`Access denied for role: ${req.User.UserRole}`);
    }
    next();
  };
};

module.exports = authorizeRoles;
