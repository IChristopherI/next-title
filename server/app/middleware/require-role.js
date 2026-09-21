import { prisma } from "../prisma/prisma.js";

export function requireRole(...roles) {
  return async (req, res, next) => {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { Role: true },
    });

    const allowedRoles = roles.map((role) => role.toUpperCase());

    if (!user || !allowedRoles.includes(user.Role.toUpperCase())) {
      return res.status(403).json({ message: "Forbidden" });
    }

    return next();
  };
}
