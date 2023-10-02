const express = require("express");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const db = require("./models");
const cors = require("cors");
const passportConfig = require("./passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const morgan =require('morgan')
const dotenv = require("dotenv");

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
    origin: "http://localhost:3000",
    credentials: true, //쿠키 공유
  })
);
app.use(morgan('dev'))
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



app.use("/post", postRouter);

app.use("/user", userRouter);
app.use("/posts", postsRouter);

//에러처리 미들웨어 따로 만들려면 쓰면된다.
// app.use((err, req, res, next) => {});

app.listen(3065, () => {
  console.error("서버 실행중 !!");
});
