import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: `JOIN` });

export const postJoin = async (req, res) => {
  const { email, username, password, password2, name, location } = req.body;
  if (password !== password2) {
    return res.render("join", {
      pageTitle: `JOIN`,
      errorMessage: `passwords don't match`,
    });
  }

  const exist = await User.exists({ $or: [{ email }, { username }] });
  if (exist) {
    return res.render("join", {
      pageTitle: `JOIN`,
      errorMessage: `email/username already exists`,
    });
  }

  // const emailExist = await User.exists({ email });
  // if (emailExist) {
  //   return res.render("join", {
  //     pageTitle: `JOIN`,
  //     errorMessage: `Email already exists`,
  //   });
  // }

  // const usernameExist = await User.exists({ username });
  // if (usernameExist) {
  //   return res.render("join", {
  //     pageTitle: `JOIN`,
  //     errorMessage: `username already exists`,
  //   });
  // }

  await User.create({ email, username, password, password2, name, location });
  return res.redirect("/login");
};

export const login = (req, res) => res.send(`LOGIN`);
export const edit = (req, res) => res.send(`EDIT MY PROFILE`);
export const deleteUser = (req, res) => res.send(`DELETE MY PROFILE`);
export const see = (req, res) => res.send(`SEE USER`);
export const logout = (req, res) => res.send(`LOGOUT`);
