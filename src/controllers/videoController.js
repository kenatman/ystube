export const home = (req, res) => {
  const videos = [1, 2, 3];
  return res.render("home", { pageTitle: "HOME", videos });
};

export const see = (req, res) => res.render("see");
export const edit = (req, res) => res.render("edit");

export const search = (req, res) => res.send(`SEARCH`);
export const deleteVideo = (req, res) => res.send(`DELETE VIDEO`);
export const upload = (req, res) => res.send(`UPLOAD VIDEO`);
