import multer from "multer";

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "YStube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const privateOnly = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnly = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars",
  limits: { fileSize: 3000000 },
});

export const videoUpload = multer({
  dest: "uploads/videos",
  limits: { fileSize: 10000000 },
});
