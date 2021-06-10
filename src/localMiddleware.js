export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "YStube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  next();
};
