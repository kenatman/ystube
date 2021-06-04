import Video from "../models/Video";

// Callback way.
/* Video.find({}, (error, videos) => {
   return res.render("home", { pageTitle: "HOME", videos });
 }); */

// Promise way. async - await
export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    console.log(videos);
    console.log(`fisnish`);
    res.render("home", { pageTitle: "HOME", videos });
  } catch (error) {
    res.render("error-page", { error });
  }
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
