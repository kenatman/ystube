import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});

  res.render("home", { pageTitle: "HOME", videos });
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "UPLOAD VIDEO" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    res.render("upload", {
      pageTitle: "UPLOAD VIDEO",
      errorMessage: error._message,
    });
  }
};

export const see = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: `NOT FOUND VIDEO` });
  }
  return res.render("see", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: `NOT FOUND VIDEO` });
  }
  return res.render("edit", { pageTitle: `Editing ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;

  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: `NOT FOUND VIDEO` });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

  return res.redirect(`/videos/${id}`);
};
