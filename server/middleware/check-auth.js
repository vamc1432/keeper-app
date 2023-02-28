const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "My_app_is_keeping_notes");
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
    //console.log(req.userData);
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};