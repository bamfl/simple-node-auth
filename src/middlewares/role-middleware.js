const errorHandler = (res, error) => {
  console.dir(error);
  res.status(403).send(error);
};

const roleMiddleware = (roles) => {
  if (!roles) {
    return errorHandler(res, { message: "roleMiddleware did not get roles" });
  }

  return (req, res, next) => {
    if (req.method === "OPTIONS") return next();

    try {
      const userRoles = req.user.roles;

      if (!userRoles)
        return errorHandler(res, { message: "User has not roles" });

      if (!userRoles.some((role) => roles.includes(role))) {
        return errorHandler(res, { message: "Forbidden" });
      }

      next();
    } catch (error) {
      return errorHandler(res, error);
    }
  };
};

export default roleMiddleware;
