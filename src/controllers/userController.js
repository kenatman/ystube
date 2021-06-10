import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: `JOIN` });

export const postJoin = async (req, res) => {
  const { email, username, password, password2, name, location } = req.body;
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle: `JOIN`,
      errorMessage: `passwords don't match`,
    });
  }

  const exist = await User.exists({ $or: [{ email }, { username }] });
  if (exist) {
    return res.status(400).render("join", {
      pageTitle: `JOIN`,
      errorMessage: `email/username already exists`,
    });
  }
  try {
    await User.create({ email, username, password, password2, name, location });
    return res.redirect("/login");
  } catch (error) {
    res.status(400).render("join", {
      pageTitle: "JOIN",
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) =>
  res.render(`login`, { pageTitle: "LOGIN" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.render(`login`, {
      pageTitle: "LOGIN",
      errorMessage: "Acccount does not exist..",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    res.render(`login`, {
      pageTitle: "LOGIN",
      errorMessage: "Password don't match",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const edit = (req, res) => res.send(`EDIT MY PROFILE`);
export const deleteUser = (req, res) => res.send(`DELETE MY PROFILE`);
export const see = (req, res) => res.send(`SEE USER`);
export const logout = (req, res) => res.send(`LOGOUT`);
