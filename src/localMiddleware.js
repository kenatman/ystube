import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const isHeroku = process.env.NODE_ENV === `production`;

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_CLIENT,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const s3imageUploader = multerS3({
  s3: s3,
  bucket: "ystubeee/images",
  acl: "public-read",
});

const s3videoUploader = multerS3({
  s3: s3,
  bucket: "ystubeee/videos",
  acl: "public-read",
});

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "YStube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  res.locals.isHeroku = isHeroku;
  next();
};

export const privateOnly = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "You must login first!!");
    return res.redirect("/login");
  }
};

export const publicOnly = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "You already logged in!!!");
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars",
  limits: { fileSize: 3000000 },
  storage: isHeroku ? s3imageUploader : undefined,
});

export const videoUpload = multer({
  dest: "uploads/videos",
  limits: { fileSize: 10000000 },
  storage: isHeroku ? s3videoUploader : undefined,
});
