const express = require("express");
const router = express.Router();
const { User, Post, Image, Comment } = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Op } = require("sequelize");

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
            { email: req.body.email, nickname: req.body.nickname, password: hashedPassword, gender: req.body.gender, blog: req.body.blog }
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

router.get('/', isLoggedIn, async (req, res, next) => {
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
                        through: { attributes: [] },
                        attributes: ["id"]
                    }, {
                        model: User,
                        as: "Followers",
                        through: { attributes: [] },
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
                        through: { attributes: [] },
                        attributes: ["id"]
                    }, {
                        model: User,
                        as: "Followers",
                        through: { attributes: [] },
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
router.patch('/nickname', isLoggedIn, async (req, res, next) => { //닉네임 수정
    try {

        await User.update({
            nickname: req.body.nickname,
        }, {
            where: { id: req.user.id }
        })
        res.status(200).json({ nickname: req.body.nickname })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => { //PATCH /user/1/follow
    try {
        const user = await User.findOne({ where: { id: req.params.userId } })
        if (!user) {
            return res.status(403).send('사용자가 없습니다.')
        }
        await user.addFollowers(req.user.id)
        res.status(200).json({ userId: parseInt(req.params.userId, 10), nickname: user.nickname })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.delete('/:userId/unfollow', isLoggedIn, async (req, res, next) => { //PATCH /user/1/follow
    try {

        const user = await User.findOne({ where: { id: req.params.userId } })
        if (!user) {
            return res.status(403).send('사용자가 없습니다.')
        }

        await user.removeFollowers(req.user.id)
        res.status(200).json({ userId: parseInt(req.params.userId, 10) })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.get('/followers', isLoggedIn, async (req, res, next) => { //GET /user/followers
    try {

        const user = await User.findOne({ where: { id: req.user.id } })
        if (!user) {
            return res.status(403).send('사용자가 없습니다.')
        }

        const followers = await user.getFollowers({
            limit: parseInt(req.query.limit),
            attributes: ["id", "nickname"],
            through: { attributes: [] },
        });
        res.status(200).json(followers)

    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.get('/followings', isLoggedIn, async (req, res, next) => { //GET /user/followers
    try {


        const user = await User.findOne({ where: { id: req.user.id } })
        if (!user) {
            return res.status(403).send('사용자가 없습니다.')
        }
        const followings = await user.getFollowings({
            limit: parseInt(req.query.limit),
            attributes: ["id", "nickname"],
            through: { attributes: [] },

        });

        res.status(200).json(followings)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => { //delete /user/follow/2
    try {

        const user = await User.findOne({ where: { id: req.params.userId } })
        if (!user) {
            return res.status(403).send('차단하려는 사용자가 없습니다.')
        }
        await user.removeFollowings(parseInt(req.user.id));
        res.status(200).json({ userId: parseInt(req.params.userId, 10) })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.get('/:userId', async (req, res, next) => { // GET /user/1
    //GET /user
    try {


        const fullUserWithoutPassword = await User.findOne({
            where: {
                id: req.params.userId
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
                    through: { attributes: [] },
                    attributes: ["id"]
                }, {
                    model: User,
                    as: "Followers",
                    through: { attributes: [] },
                    attributes: ["id"]
                }
            ]
        });
        if (fullUserWithoutPassword) {
            const data = fullUserWithoutPassword.toJSON();
            data.Posts = data.Posts.length;
            data.Followers = data.Followers.length;
            data.Followings = data.Followings.length;

            res
                .status(200)
                .json(data);

        } else {
            res
                .status(404)
                .json("존재하지 않는 사용자입니다.");

        }

    } catch (err) {
        console.error(err);
        next(err);
    }
})
router.get('/:userId/posts', async (req, res, next) => {
    try {


        const where = { UserId: req.params.userId };
        if (parseInt(req.query.lastId, 10)) {
            //초기 로딩이 아닐때
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) } //last Id보다 작은 id를 불러오는것 
        }

        const posts = await Post.findAll({
            // where : { id:lastId},
            where,
            limit: 10,
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC']
            ],
            include: [
                {
                    model: User,
                    attributes: ['id', 'nickname']
                }, {
                    model: Image
                }, {
                    model: Comment,

                    include: [
                        {
                            model: User,
                            attributes: ['id', 'nickname']
                        }

                    ]
                }, {
                    model: User, // 좋아요 누른사람
                    as: 'Likers',
                    attributes: ['id']
                },
                {
                    model: Post,
                    as: 'Retweet',
                    include: [{
                        model: User,
                        attributes: ['id', 'nickname']  // 리트윗 게시글의 작성자
                    }, { model: Image }]  // 리트윗 게시글 이미지
                }
            ]

        });
        console.log(posts)

        res
            .status(200)
            .json(posts);
    } catch (err) {
        console.error(err);
        next(err)
    }
})


module.exports = router;
