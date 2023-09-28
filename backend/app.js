const express = require("express");
const postRouter = require("./routes/post");
const db = require("./models");
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });
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

app.listen(3065, () => {
  console.log("서버 실행중 !!");
});
