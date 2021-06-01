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
  return res.render("see", { pageTitle: `Watching ${video.title}`, video });
};
export const edit = (req, res) => res.render("edit");

export const search = (req, res) => res.send(`SEARCH`);
export const deleteVideo = (req, res) => res.send(`DELETE VIDEO`);
export const upload = (req, res) => res.send(`UPLOAD VIDEO`);
