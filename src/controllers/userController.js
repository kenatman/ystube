import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: `JOIN` });

export const postJoin = async (req, res) => {
  const { email, username, password, name, location } = req.body;
  await User.create({ email, username, password, name, location });
  return res.redirect("/login");
};

export const login = (req, res) => res.send(`LOGIN`);
export const edit = (req, res) => res.send(`EDIT MY PROFILE`);
export const deleteUser = (req, res) => res.send(`DELETE MY PROFILE`);
export const see = (req, res) => res.send(`SEE USER`);
export const logout = (req, res) => res.send(`LOGOUT`);
