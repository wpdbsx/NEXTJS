module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      //id가 기본적으로 들어있다.
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
        unique: true, //고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, // 필수
      },
      gender: {
        type: DataTypes.CHAR(1),
        allowNull: false, // 필수
      },
      blog: {
        type: DataTypes.STRING(300),
        allowNull: false, // 필수
      },

      //Mysql에서는 user로 저장된다.
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", //한글 저장
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "followingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "followerId",
    });
  };
  return User;
};
