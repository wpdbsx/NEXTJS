const express = require("express");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const cors = require("cors");
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(
  cors({
    origin: "*",
    credentials: false, //쿠키 공유
  })
);
app.use(express.json()); // 프론트에서 보낸 데이터를 res.body에 넣는 역할을한다.
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello express");
});
app.get("/api", (req, res) => {
  res.send("hello express");
});
app.get("/api/posts", (req, res) => {
  res.json([
    { id: 1, cotent: "test" },
    { id: 2, cotent: "test" },

    { id: 3, cotent: "test" },
  ]);
});

app.use("/post", postRouter);

app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("서버 실행중 !!");
});
