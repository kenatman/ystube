import User from "../models/User";
import Video from "../models/Video";
import bcrypt from "bcrypt";
import fetch from "node-fetch";
import { compileFile } from "pug";

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
  const user = await User.findOne({ username, socialOnly: false });
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

// 1. Request a user's GitHub identity
export const startGithubLogin = (req, res) => {
  const baseUrl = `https://github.com/login/oauth/authorize`;
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: `read:user user:email`,
  };
  const urlParams = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${urlParams}`;
  return res.redirect(finalUrl);
};

// 2. Users are redirected back to your site with the code by GitHub App
export const finishGithubLogin = async (req, res) => {
  const baseUrl = `https://github.com/login/oauth/access_token`;
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const UrlParams = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${UrlParams}`;
  // 3. getting access_token with the given code.
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: { Accept: "application/json" },
    })
  ).json();
  // JS "in" operator returns Boolean.
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    // 4. with the access_token, get User info through API.
    const apiUrl = `https://api.github.com`;
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: { Authorization: `token ${access_token}` },
      })
    ).json();

    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: { Authorization: `token ${access_token}` },
      })
    ).json();

    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );

    if (!emailObj) {
      // set notification
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        email: emailObj.email,
        avatarUrl: userData.avatar_url,
        username: userData.login,
        password: "",
        socialOnly: true,
        name: userData.name ? userData.name : "Unknown",
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    res.redirect("/login");
  }
};

export const getEdit = (req, res) => {
  return res.render(`edit-profile`, { pageTitle: `EDIT PROFILE` });
};

export const postEdit = async (req, res) => {
  const {
    body: { email, username, name, location },
    session: {
      user: { _id, avatarUrl },
    },
    file,
  } = req;
  const isHeroku = process.env.NODE_ENV === `production`;

  try {
    // mongoose method : third parameter
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        email,
        username,
        name,
        location,
        avatarUrl: file ? (isHeroku ? file.location : file.path) : avatarUrl,
      },
      { new: true }
    );

    req.session.user = updatedUser;

    return res.redirect("/users/edit");

    //manual method : ... spread syntax
    //await User.findByIdAndUpdate(_id, { email, username, name, location });
    //req.session.user = { ...req.session.user, email, username, name, location };
  } catch (error) {
    return res.render("edit-profile", {
      pageTitle: "EDIT PROFILE",
      errorMessage: `ERROR`,
    });
  }
};

export const logout = (req, res) => {
  req.session.loggedIn = false;
  req.session.user = null;
  req.flash("info", "Bye Bye");
  return res.redirect("/");
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    req.flash("info", "This is social Login.. You can not access password");
    return res.redirect("/");
  }
  return res.render(`users/change-password`, { pageTitle: `CHANGE PASSWORD` });
};

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword2 },
    session: {
      user: { _id, password },
    },
  } = req;
  const oldMatch = await bcrypt.compare(oldPassword, password);
  if (!oldMatch) {
    return res.status(400).render("users/change-password", {
      pageTitle: `CHANGE PASSWORD`,
      errorMessage: ` Old Password does match..`,
    });
  }
  if (newPassword !== newPassword2) {
    return res.status(400).render("users/change-password", {
      pageTitle: `CHANGE PASSWORD`,
      errorMessage: `New Password confirmation does not match..`,
    });
  }
  const newHashedPassword = await bcrypt.hash(newPassword, 5);
  await User.findByIdAndUpdate(_id, { password: newHashedPassword });
  // method 2 :
  // const user = await User.findById(_id);
  // user.password = newPassword;
  // await user.save();
  // // req.session.user.password = user.password;
  req.flash("info", "Password Updated");
  return res.redirect("/users/logout");
};

export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "videos",
    populate: { path: "owner" },
  }); // double populate...
  if (!user) {
    return res.status(404).render("404", { pageTitle: `User Not Found` });
  }

  return res.render("users/profile", { pageTitle: user.name, user });
};

export const deleteUser = (req, res) => res.send(`DELETE MY PROFILE`);
