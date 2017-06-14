const User = require('../models/user');

function authenticateUser(req, res, next) {
  if(!req.session.userId) return next();

  console.log('You are logged in');
  User
  .findById(req.session.userId)
  .then((user) => {
    if(!user) {
      return req.session.regenarate(() => res.redirect('/'));
    }
    req.user = user;
    res.locals.user = user;
    res.locals.isAuthenticated = true;
    req.session.userId = user.id;

    console.log(res.locals);

    next();

  });
}
module.exports = authenticateUser;