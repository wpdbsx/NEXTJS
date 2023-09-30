const passport = require("passport");
const local = require("./local");
const { User } = require("../models");
module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);

    //쿠키랑 묶어줄 id만 저장 세션이 무거워서 하나만 저장
  });

  passport.deserializeUser(async (id, done) => {
    try {
      // id를 통해 유저를 복구
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
