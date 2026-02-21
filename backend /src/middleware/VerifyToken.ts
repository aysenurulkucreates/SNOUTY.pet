import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "You are not authenticated!" });
  }

  jwt.verify(token, process.env.SECRET_KEY as string, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ msg: "Token is not valid!" }); // 'return' ile burada durduruyoruz!
    }
    req.user = user;
    next();
  });
};

export const verifyAdmin = (req: any, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ msg: "You are not authorized. Admin only!" });
  }
};
