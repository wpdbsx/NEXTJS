const express = require("express");
const router = express.Router();
const {User, Post, Image, Comment} = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");
const {isLoggedIn, isNotLoggedIn} = require("./middlewares");

router.post("/", isNotLoggedIn, async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (exUser) {
            return res
                .status(403)
                .send("이미 사용중인 아이디입니다.");
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create(
            {email: req.body.email, nickname: req.body.nickname, password: hashedPassword, gender: req.body.gender, blog: req.body.blog}
        );

        // res.setHeader("Access-Control-Allow-Origin", "*")

        res
            .status(200)
            .send("ok");
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/',isLoggedIn,async (req, res, next) => {
    //GET /user
    try {
        if (req.user) {
             const fullUserWithoutPassword = await User.findOne({
                where: {
                    id: req.user.id
                },
                attributes: {
                    exclude: ["password"]
                },
                include: [
                    {
                        model: Post,
                        as: "Posts",
                        attributes: ["id"]
                    }, {
                        model: User,
                        as: "Followings",
                        attributes: ["id"]
                    }, {
                        model: User,
                        as: "Followers",
                        attributes: ["id"]
                    }
                ]
            });
            res
                .status(200)
                .json(fullUserWithoutPassword);
        } else {
            res
                .status(200)
                .json(null);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
})

router.post("/login", isNotLoggedIn, (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        //미들웨어 확장
        if (err) {
            console.error(err);
            return next(err);
        }

        if (info) {
            return res
                .status(401)
                .send(info.reason);
        }

        return req.login(user, async (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }
            //res.setHeader('Cookie',)
            const fullUserWithoutPassword = await User.findOne({
                where: {
                    id: req.user.id
                },
                attributes: {
                    exclude: ["password"]
                },
                include: [
                    {
                        model: Post,
                        as: "Posts",
                        attributes: ["id"]
                    }, {
                        model: User,
                        as: "Followings",
                        attributes: ["id"]
                    }, {
                        model: User,
                        as: "Followers",
                        attributes: ["id"]
                    }
                ]
            });

            return res.json(fullUserWithoutPassword);
        });
    })(req, res, next);
});

router.post("/logout", isLoggedIn, async (req, res, next) => {
    try {
        req.logout(() => {
            // res.redirect("/");
            res.send("ok");
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
