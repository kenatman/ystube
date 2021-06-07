import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  console.log(videos);
  res.render("home", { pageTitle: "HOME", videos });
};

export const see = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  return res.render("see", { pageTitle: video.title, video });
};
export const getEdit = (req, res) => {
  const { id } = req.params;

  return res.render("edit", { pageTitle: `Editing` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  return res.redirect(`/videos/${id}`);
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
      hashTags: hashtags.split(`,`).map((item) => `#${item}`),
    });
    return res.redirect("/");
  } catch (error) {
    res.render("upload", {
      pageTitle: "UPLOAD VIDEO",
      errorMessage: error._message,
    });
  }
};
