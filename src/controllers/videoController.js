export const home = (req, res) => {
  const videos = [
    {
      title: "First Video",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 1,
    },
    {
      title: "Second Video",
      rating: 3,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 2,
    },
    {
      title: "Third Video",
      rating: 2,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 3,
    },
  ];
  return res.render("home", { pageTitle: "HOME", videos });
};

export const see = (req, res) => res.render("see");
export const edit = (req, res) => res.render("edit");

export const search = (req, res) => res.send(`SEARCH`);
export const deleteVideo = (req, res) => res.send(`DELETE VIDEO`);
export const upload = (req, res) => res.send(`UPLOAD VIDEO`);
