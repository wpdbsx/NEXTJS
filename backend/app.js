const express = require("express");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const hashTagRouter = require("./routes/hashtag");
const db = require("./models");
const cors = require("cors");
const passportConfig = require("./passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const morgan = require('morgan')
const dotenv = require("dotenv");
const path = require('path')
dotenv.config();
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
passportConfig();
app.use(
  cors({
    origin: ["http://localhost:3000", 'yoontae.com'],
    credentials: true, //쿠키 공유
  })
);
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'))
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan('dev'))
}


app.use('/', express.static(path.join(__dirname, 'uploads'))) // path.join은 운영체제의 차이점에 따라 알아서 경로를 지정해준다.
app.use(express.json()); // 프론트에서 보낸 데이터를 res.body에 넣는 역할을한다.
app.use(express.urlencoded({ extended: true }));



app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express');
});


app.use("/post", postRouter);

app.use("/user", userRouter);
app.use("/posts", postsRouter);
app.use('/hashtag', hashTagRouter)
//에러처리 미들웨어 따로 만들려면 쓰면된다.
// app.use((err, req, res, next) => {});

app.listen(80, () => {
  console.error("서버 실행중 !!");
});
