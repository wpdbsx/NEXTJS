const express = require("express");
const router = express.Router();
const { Post, User, Image, Comment } = require('../models')
const { isLoggedIn } = require('./middlewares')
const multer = require("multer")
const path = require('path')
const fs = require('fs');

try {
    fs.accessSync('uploads')
} catch (error) {
    console.log("uploads 폴더 생성")
    fs.mkdirSync('uploads')
}


router.delete("/", (req, res) => {
    res.json({ id: 1 });
});
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {  //PATCH /post/1/like
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
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => { //DELETE /post/1/like
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

router.delete('/:postId', isLoggedIn, async (req, res, next) => { //게시글 삭제
    try {
        await Post.destroy({
            where: {
                id: req.params.postId,
                UserId: req.user.id
            },
        })
        res.json({ postId: parseInt(req.params.postId, 10) });
    } catch (error) {
        console.error(error);
        next(error);

    }
})

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) { //  하드디스크에 저장
            done(null, 'uploads');
        },
        filename(req, file, done) {   // text.png
            const ext = path.extname(file.originalname); // 확장자 추출(png) 
            const basename = path.basename(file.originalname, ext); //text
            done(null, basename + "_" + new Date().getTime() + ext); // text2143532.png 

        }
    }),
    limits: { fileSize: 20 * 1024 * 1024 } // 20MB
})
//array(여러개) ,sigle(한개) , none ,fills( 2개이상의 이미지파일에서 올릴때) 
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        const post = await Post.create(
            { content: req.body.content, UserId: req.user.id }
        );

        if (req.body.image) {
            if (Array.isArray(req.body.image)) { //이미지가 여러개면 이미지는 배열이 된다.

                const images = await Promise.all(req.body.image.map(async (image) => Image.create({ src: image })))
                console.log("!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$!@#$$!@")
                console.log(images)

                await post.addImages(images);
                // 디비에는 파일을 저장하는게 아니라 파일의 주소만 저장한다. 
                //파일을 캐싱할수있는데 디비에 넣으면 캐싱을 하지 못한다.
            } else {  //이미지를 하나만 올리면 배열이 아니라 단일객체로 온다.
                const image = await Image.create({ src: req.body.image })
                await post.addImages(image);
            }
        }
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
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => { //Post /post/images

    console.log(req.files) //업로드된 이미지의 정보가 있다.
    res.json(req.files.map((v) => v.filename));

})



module.exports = router;
