const express = require("express");
const router = express.Router();
const { Post, User, Image, Comment } = require('../models')
const { isLoggedIn } = require('./middlewares')

router.post("/", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.create(
            { content: req.body.content, UserId: req.user.id }
        );

        const fullPost = await Post.findOne({
            where: {
                id: post.id
            },

            include: [
                {
                    model: Image
                }, {
                    model: Comment, //댓글 작성자
                    include: [
                        {
                            model: User, // 댓글 작성자
                            attributes: ['id', 'nickname']
                        }
                    ]
                }, {
                    model: User, // 게시글 작성자
                    attributes: ['id', 'nickname']
                }, {
                    model: User, // 좋아요 누른사람
                    as: 'Likers',
                    attributes: ['id']
                }
            ]
        })
        res
            .status(201)
            .json(fullPost);
    } catch (err) {
        console.error(err)
    }
});

router.delete("/", (req, res) => {
    res.json({ id: 1 });
});
router.patch('/:postId/like', async (req, res, next) => {  //PATCH /post/1/like
    try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.')
        }
        await post.addLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id })
    } catch (error) {
        console.error(error);
        next(error);
    }
})
router.delete('/:postId/like', async (req, res, next) => { //DELETE /post/1/like
    try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.')
        }
        await post.removeLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id })
    } catch (error) {
        console.error(error);
        next(error);
    }
})
router.post(
    `/:postId/comment`,
    isLoggedIn,
    async (req, res, next) => { // POST /post/comment
        try {
            const post = await Post.findOne({
                where: {
                    id: req.params.postId
                }
            })

            if (!post) {
                return res
                    .status(403)
                    .sned('존재하지 않는 게시글입니다.')
            }
            const comment = await Comment.create(
                { content: req.body.content, PostId: req.params.postId, UserId: req.user.id }
            );
            const fullComment = await Comment.findOne({
                where: {
                    id: comment.id
                },
                include: [
                    {
                        model: User,
                        attributes: ['id', 'nickname']
                    }
                ]
            })
            res
                .status(201)
                .json(fullComment);
        } catch (err) {
            console.error(err)
        }
    }
);

module.exports = router;
