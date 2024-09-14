let jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // the token has to saved in the postman headers
  let token = req.headers["token"];

  jwt.verify(token, "SecretKey123456789", function (err, decoded) {
    if (err) {
      res.status(401).json({ status: "Unauthorized" });
    } else {
      // get username from decoded token and add with req headers
      let username = decoded["data"]["UserName"];
      req.headers.username = username;
      next();
    }
  });
};
