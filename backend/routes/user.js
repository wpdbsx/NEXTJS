const express = require("express");
const router = express.Router();
const { User, Post, Image, Comment } = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    //미들웨어 확장
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      //res.setHeader('Cookie',)
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
            as: "Posts",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
        ],
      });
      console.log(fullUserWithoutPassword);
      return res.json(fullUserWithoutPassword);
    });
  })(req, res, next);
});
router.post("/", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
      gender: req.body.gender,
      blog: req.body.blog,
    });

    // res.setHeader("Access-Control-Allow-Origin", "*")

    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post("/logout", async (req, res, next) => {
  try {
    req.logout();
    req.session.destroy();
    res.send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
