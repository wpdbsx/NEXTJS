const express = require('express');
const { Hashtag, User, Image, Comment, Post } = require('../models');
const { Op } = require('sequelize');
const image = require('../models/image');
const router = express.Router();



router.get('/:hashtag', async (req, res, next) => { //GET /hashtag/노드
    try {


        const where = {};
        if (parseInt(req.query.lastId, 10)) {
            //초기 로딩이 아닐때
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) } //last Id보다 작은 id를 불러오는것 
        }

        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [['createdAt', 'DESC'], [Comment, 'createdAt', 'DESC']],
            include: [{
                model: Hashtag,
                where: { name: decodeURIComponent(req.params.hashtag) },
            }, {
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                    order: [['createdAt', 'DESC']],
                }],
            }, {
                model: User, // 좋아요 누른 사람
                as: 'Likers',
                attributes: ['id'],
            }, {
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }, {
                    model: Image,
                }]
            }],
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