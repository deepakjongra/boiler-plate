const jwt = require("jsonwebtoken");

exports.userAuthenticate = (req, res, next) => {
  try {
    let token = "";
    if (req.headers.authorization != null) {
      const authHeader = decodeURIComponent(req.headers.authorization);
      if (
        authHeader.startsWith("Bearer ") ||
        authHeader.startsWith("Bearer%20")
      ) {
        if (authHeader.startsWith("Bearer%20")) {
          token = authHeader.substring(9);
        } else {
          token = authHeader.substring(7); // The part after "Bearer "
        }
      } else {
        res
          .status(403)
          .json({ status: false, message: "Invalid Authorization Header" });
      }
    } else {
      res
        .status(403)
        .json({ status: false, message: "Missing Authorization Header" });
    }

    const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const userRole = payload.role;
    const karyakartaId = payload.karyakartaId;

    if (userRole === "END_USER") {
      req.user = {
        karyakartaId: karyakartaId,
      };
      next();
    } else {
      res
        .status(403)
        .json({
          status: false,
          message: "You are not authorised to use this service",
        });
    }
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized User",
      error: error.message,
    });
  }
};
