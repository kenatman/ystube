const fakeUser = { userName: "YS", loggedIn: false };

export const home = (req, res) =>
  res.render("home", { pageTitle: "HOME", fakeUser });
export const see = (req, res) => res.render("see");
export const edit = (req, res) => res.render("edit");

export const search = (req, res) => res.send(`SEARCH`);
export const deleteVideo = (req, res) => res.send(`DELETE VIDEO`);
export const upload = (req, res) => res.send(`UPLOAD VIDEO`);
