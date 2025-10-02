const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).send("Not authenticated");

    if (!allowedRoles.includes(req.user.Role)) {
      return res.status(403).send(`Access denied for role: ${req.user.Role}`);
    }
    next();
  };
};

module.exports = authorizeRoles;
