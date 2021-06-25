import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: `desc` })
    .populate("owner");
  res.render("home", { pageTitle: "HOME", videos });
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "UPLOAD VIDEO" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  const { video, thumbnail } = req.files;
  const {
    session: {
      user: { _id },
    },
  } = req;

  try {
    const newVideo = await Video.create({
      fileUrl: video[0].path,
      thumbnailUrl: thumbnail[0].path,
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    await user.save();
    req.flash("info", "Uploaded Successfully^^");
    return res.redirect("/");
  } catch (error) {
    res.status(400).render("upload", {
      pageTitle: "UPLOAD VIDEO",
      errorMessage: error._message,
    });
  }
};

export const see = async (req, res) => {
  const { id } = req.params;

  const video = await Video.findById(id).populate("owner");

  if (!video) {
    return res.status(404).render("404", { pageTitle: `NOT FOUND VIDEO` });
  }
  return res.render("see", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  const {
    session: {
      user: { _id },
    },
  } = req;
  if (!video) {
    return res.status(404).render("404", { pageTitle: `NOT FOUND VIDEO` });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "Not Authorized");
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Editing ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const {
    session: {
      user: { _id },
    },
  } = req;

  const video = await Video.findOne({ _id: id });

  if (!video) {
    return res.status(404).render("404", { pageTitle: `NOT FOUND VIDEO` });
  }

  if (String(video.owner) !== String(_id)) {
    req.flash("error", "Not Authorized");
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  req.flash("info", "Video Updated Well!!");
  return res.redirect(`/videos/${id}`);
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    session: {
      user: { _id },
    },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: `NOT FOUND VIDEO` });
  }

  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: { $regex: keyword, $options: `i` },
    }).populate("owner");
    //{title: new RegExp(keyword, `i`)}.. $regex is MongoDB operator not mongoose..
  }
  return res.render("search", { pageTitle: `SEARCH VIDEO`, videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views += 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    params: { id },
    session: { user },
    body: { text },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }

  const comment = await Comment.create({ text, owner: user._id, video: id });
  return res.sendStatus(201);
};
