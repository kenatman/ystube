import Video from "../models/Video";

// Callback way.
/* Video.find({}, (error, videos) => {
   return res.render("home", { pageTitle: "HOME", videos });
 }); */

// Promise way. async - await
export const home = async (req, res) => {
  const videos = await Video.find({});
  res.render("home", { pageTitle: "HOME", videos });
};

export const see = (req, res) => {
  const { id } = req.params;

  return res.render("see", { pageTitle: `Watching` });
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

export const postUpload = (req, res) => {
  const { title, description, hashtags } = req.body;
  const video = new Video({
    title,
    description,
    createdAt: new Date(),
    hashTags: hashtags.split(`,`).map((item) => `#${item}`),
    meta: { view: 0, ratings: 0 },
  });
  console.log(video);
  return res.redirect("/");
};
