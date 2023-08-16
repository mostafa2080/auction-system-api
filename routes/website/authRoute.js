const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  verifyPassResetCode,
} = require('../../controllers/website/authController');

const {
  signUpValidator,
  loginValidator,
  forgotPasswordValidator,
} = require('../../utils/validators/authValidator');
const router = express.Router();

router.route('/singUp').post(signUpValidator, signup);
router.route('/login').post(loginValidator, login);
router.route('/forgotPassword').post(forgotPasswordValidator, forgotPassword);
router.route('/verifyResetCode').post(verifyPassResetCode);
router.route('/resetPassword').put(resetPassword);

module.exports = router;
