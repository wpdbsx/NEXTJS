const express = require("express");
const router = express.Router();
const { Post, User, Image, Comment, Hashtag } = require('../models')
const { isLoggedIn } = require('./middlewares')
const multer = require("multer")
const path = require('path')
const fs = require('fs');
const iconv = require('iconv-lite');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
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

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2'
})
const upload = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'react-yoontae',
        key(req, file, cb) {
            cb(null, iconv.decode(`original/${Date.now()}_${path.basename(file.originalname)}`, 'utf-8'))
            //파일 생성 
        }
    }),

    // multer.diskStorage({ //로컬 업데이트 
    //     destination(req, file, done) { //  하드디스크에 저장
    //         done(null, 'uploads');
    //     },
    //     filename(req, file, done) {   // text.png
    //         const ext = path.extname(file.originalname); // 확장자 추출(png) 
    //         const basename = path.basename(file.originalname, ext); // 파일명 추출
    //         const timestamp = new Date().getTime();
    //         const newFilename = `${basename}_${timestamp}${ext}`;

    //         done(null, iconv.decode(newFilename, 'utf-8')); // text2143532.png 


    //     }
    // }),
    limits: { fileSize: 20 * 1024 * 1024 } // 20MB
})
//array(여러개) ,sigle(한개) , none ,fills( 2개이상의 이미지파일에서 올릴때) 
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        const post = await Post.create(
            { content: req.body.content, UserId: req.user.id }
        );

        if (hashtags) {
            //findOrCreate 있으면 가져오고 없으면 등록한다.
            const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
                where: { name: tag.slice(1).toLowerCase() }
            })))
            // [[#노드 ,true],[#리액트,true]] 이런 형태라 v[0]을 등록

            await post.addHashtags(result.map((v) => v[0]))
        }

        if (req.body.image) {
            if (Array.isArray(req.body.image)) { //이미지가 여러개면 이미지는 배열이 된다.

                const images = await Promise.all(req.body.image.map(async (image) => Image.create({ src: image })))


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


    res.json(req.files.map((v) => v.location.replace(/\/original\//, '/thumb/'))); // original 이름이 있으면 thumb로 변경 

})

router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => { //Post /post/images
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
            include: [
                { model: Post, as: "Retweet" }
            ]
        })
        if (!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.')
        }
        if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
            //자신의 게시글을 리트윗하는것, 자신의게시글을 리트윗한 게시글을 다시 리트윗 하는것을 막음.
            return res.status(403).send('자신의 글은 리트윗할 수 없습니다.')
        }

        const retweetTargetId = post.RetweetId || post.id;
        const exPost = await Post.findOne({
            where: {
                UserId: req.user.id,
                RetweetId: retweetTargetId
            }
        }) // 이미 리트윗한 게시글

        if (exPost) {
            return res.status(403).send('이미 리트윗했습니다.')
        }

        const retweet = await Post.create({
            UserId: req.user.id,
            RetweetId: retweetTargetId,
            content: "retweet"
        })

        const retweetWithPrevPost = await Post.findOne({
            where: { id: retweet.id },
            include: [{
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname']  // 리트윗 게시글의 작성자
                }, { model: Image }]  // 리트윗 게시글 이미지
            }, {
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname']
                }]
            }, {
                model: User,
                as: 'Likers',
                attributes: ['id']
            }]
        })
        res.status(201).json(retweetWithPrevPost)

    } catch (error) {
        console.error(error);
        next(error)
    }

})

router.get('/:postId', async (req, res, next) => { //GET /post/1
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
            include: [
                { model: Post, as: "Retweet" }
            ]
        })
        if (!post) {
            return res.status(404).send('존재하지 않는 게시글입니다.')
        }


        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname']  // 리트윗 게시글의 작성자
                }, { model: Image }]  // 리트윗 게시글 이미지
            }, {
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname']
                }]
            }, {
                model: User,
                as: 'Likers',
                attributes: ['id']
            }]
        })
        res.status(200).json(fullPost)

    } catch (error) {
        console.error(error);
        next(error)
    }

})



module.exports = router;
