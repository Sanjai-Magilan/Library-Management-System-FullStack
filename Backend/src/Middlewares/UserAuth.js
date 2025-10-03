const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const AuthenticationHeader = req.headers["authorization"];
    const Token = AuthenticationHeader && AuthenticationHeader.split(" ")[1];
    if (!Token) {
      req.User = { UserRole: "guest" };
      return next();
    }
    jwt.verify(Token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) return res.Status(403).send("Invalid or expired token");
      req.User = user;
      next();
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = auth;
