let videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "15 minutes ago",
    views: 19,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 3,
    comments: 2,
    createdAt: "10 minutes ago",
    views: 1,
    id: 2,
  },
  {
    title: "Third Video",
    rating: 2,
    comments: 2,
    createdAt: "5 minutes ago",
    views: 523,
    id: 3,
  },
];
export const home = (req, res) => {
  return res.render("home", { pageTitle: "HOME", videos });
};

export const see = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("see", { pageTitle: `Watching : ${video.title}`, video });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Editing : ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "UPLOAD VIDEO" });
};

export const postUpload = (req, res) => {
  const newVideo = {
    title: req.body.title,
    rating: 0,
    comments: 0,
    createdAt: "Just Now",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};
