const express = require('express');
const { Post, Image, User, Comment } = require('../models')
const Sequelize = require("sequelize");
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            // where : { id:lastId},
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
