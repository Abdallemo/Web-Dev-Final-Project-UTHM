// middleware/authMiddleware.js
const Tutorial = require('./../models/toturialModel');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

async function checkTutorialOwnership(req, res, next) {
  const tutorial = await Tutorial.findById(req.params.id);
  if (tutorial.user.equals(req.user.id)) {
    return next();
  }
  res.redirect('/');
}

module.exports = {
  ensureAuthenticated,
  checkTutorialOwnership
};
