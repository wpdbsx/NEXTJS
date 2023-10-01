exports.isLoggedIn = (req, res, next) => {
  console.log("로그인상태 :  ", req.isAuthenticated());
  if (req.isAuthenticated()) {
    //로그인 한상태면
    next();
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  console.log("test");
  if (!req.isAuthenticated()) {
    console.log("test22");
    //로그인 안한상태면
    next(); // next에 인자가 없으면 다음 미들웨어로 갑니다.
  } else {
    res.status(401).send("로그인하지 않은 사용자만 접근 가능합니다.");
  }
};
