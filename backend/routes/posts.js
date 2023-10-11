const express = require('express');
const { Post, Image, User, Comment } = require('../models')
const Sequelize = require("sequelize");
const router = express.Router();
const { Op } = require('sequelize')
router.get('/', async (req, res, next) => {
    try {

        const where = {};
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
                    // attributes: [
                    //     'id',
                    //     'content',
                    //     'UserId',
                    //     'PostId',
                    //     [
                    //         Sequelize.literal('CASE WHEN LENGTH(comments.content) >= 3 THEN true ELSE false END'), 'hasMoreComment'
                    //     ]
                    // ],
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

        res
            .status(200)
            .json(posts);
    } catch (err) {
        console.error(err);
        next(err)
    }
})


router.get('/related', async (req, res, next) => {
    try {

        const followings = await User.findAll({
            attributes: ['id'],
            include: [{
                model: User,
                as: 'Followers',
                where: { id: req.user.id }
            }]
        })
        const where = {

            UserId: {
                [Op.in]:
                    followings.map((v) => v.id)
            }
        };
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
                    // attributes: [
                    //     'id',
                    //     'content',
                    //     'UserId',
                    //     'PostId',
                    //     [
                    //         Sequelize.literal('CASE WHEN LENGTH(comments.content) >= 3 THEN true ELSE false END'), 'hasMoreComment'
                    //     ]
                    // ],
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

        res
            .status(200)
            .json(posts);
    } catch (err) {
        console.error(err);
        next(err)
    }
})

router.get('/unrelated', async (req, res, next) => {
    try {

        const followings = await User.findAll({
            attributes: ['id'],
            include: [{
                model: User,
                as: 'Followers',
                where: { id: req.user.id }
            }]
        })
        const where = {

            UserId: {
                [Op.notIn]:
                    followings.map((v) => v.id).concat(req.user.id)
            }
        };
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
                    // attributes: [
                    //     'id',
                    //     'content',
                    //     'UserId',
                    //     'PostId',
                    //     [
                    //         Sequelize.literal('CASE WHEN LENGTH(comments.content) >= 3 THEN true ELSE false END'), 'hasMoreComment'
                    //     ]
                    // ],
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

        res
            .status(200)
            .json(posts);
    } catch (err) {
        console.error(err);
        next(err)
    }
})

module.exports = router;
