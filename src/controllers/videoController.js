import Video from "../models/Video";

export const home = (req, res) => {
  console.log(`start`);
  Video.find({}, (error, videos) => {
    console.log(`Search done`);
    return res.render("home", { pageTitle: "HOME", videos });
  });
  console.log(`last`);
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
  return res.redirect("/");
};
