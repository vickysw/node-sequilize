const { User } = require("../models/UserModel");

checkDuplicateUsernameOrEmail = (req, res, next) => {
  console.log(User);
  User.findOne({
    where: {
      uname: req.body.uname,
    },
  }).then((user) => {
    // console.log('--user---'+user);
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    User.findOne({
      where: {
        mobile: req.body.mobile,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({ message: "Failed! mobile is already in use!" });
        return;
      }
      next();
    });
    
  });
};

module.exports = { checkDuplicateUsernameOrEmail };
