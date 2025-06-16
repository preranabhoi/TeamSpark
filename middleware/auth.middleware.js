import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
    let token;
  
    if (req.cookies && req.cookies.test) {
      token = req.cookies.test;
    }
    
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Requires role: ${roles.join(" or ")}`,
      });
    }
    next();
  };
};
