const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const ApiError = require('../../utils/apiError');
const sendMail = require('../../utils/sendMail');
const createToken = require('../../utils/createToken');
const db = require('../../db/models');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

const UserModel = db.User;

//@desc Signup
//@route POST /api/v1/auth/signup
//@access public
exports.signup = asyncHandler(async (req, res, next) => {
  const user = await UserModel.create(req.body);
  const token = createToken(user.id);
  res.status(201).json({ data: user, token });
});

//@desc Login
//@route POST /api/v1/auth/login
//@access public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ApiError('Invalid credentials', 401));
  }
  const token = createToken(user.id);
  res.status(200).json({ data: user, token });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user by email
  const user = await UserModel.findOne({
    where: { email: req.body.email },
  });

  if (!user) {
    return next(
      new ApiError(`User not found for this email ${req.body.email}`, 404)
    );
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(resetCode)
    .digest('hex');

  console.log(resetCode);
  console.log(hashedResetCode);

  await user.update({
    passwordResetToken: hashedResetCode,
    passwordResetExpires: new Date(Date.now() + 10 * 60 * 1000),
    passwordResetVerified: false,
  });

  const message = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          padding: 20px;
          margin: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .logo {
          width: 100px;
          height: auto;
        }
        .message {
          font-size: 16px;
          line-height: 1.5;
        }
        .code {
          font-size: 24px;
          font-weight: bold;
          color: #007bff;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          color: #888888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img class="logo" src="logo_url" alt="Auction Logo">
        </div>
        <div class="message">
          <p>Hi ${user.name},</p>
          <p>We have received a request to reset your password on Auction platform.</p>
          <p>Your reset code is: <span class="code">${resetCode}</span></p>
          <p>Enter this code to complete the reset request.</p>
          <p>Thanks for helping us keep your account secure.</p>
        </div>
        <div class="footer">
          <p>The Auction Team</p>
          <p>Contact us at <a href="mailto:info@example.com">AuctionSupport@gmail.com</a></p>
        </div>
      </div>
    </body>
  </html>
`;

  try {
    await sendMail({
      email: user.email,
      subject: 'Your Password reset code (Valid for 10 min )',
      message,
    });
  } catch (e) {
    await user.update({
      resetCode: undefined,
      passwordResetToken: undefined,
      passwordResetExpires: undefined,
    });

    return next(
      new ApiError(
        'Something went wrong when sending email, please try again later',
        500
      )
    );
  }

  res
    .status(200)
    .json({ status: 'success', message: 'Your reset code sent successfully' });
});

//@desc verify reset code
//@route POST /api/v1/auth/verifyResetCode
//@access public
exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
  const hashedCode = crypto
    .createHash('sha256')
    .update(req.body.resetCode)
    .digest('hex');

  const user = await UserModel.findOne({
    where: {
      passwordResetToken: hashedCode,
      passwordResetExpires: { [Sequelize.Op.gt]: new Date() },
    },
  });

  if (!user) {
    return next(
      new ApiError('Password reset token is invalid or has expired', 400)
    );
  }

  await user.update({
    passwordResetVerified: true,
  });

  res.status(200).json({ status: 'success' });
});

//@desc verify reset password
//@route POST /api/v1/auth/resetPassword
//@access public

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findOne({
    where: { email: req.body.email },
  });

  if (!user) {
    return next(
      new ApiError(`User not found for this email ${req.body.email}`, 404)
    );
  }

  if (!user.passwordResetVerified) {
    return next(new ApiError('Password reset token not verified', 400));
  }

  await user.update({
    password: req.body.newPassword,
    passwordResetToken: null,
    passwordResetExpires: null,
    passwordResetVerified: null,
  });

  const token = createToken(user.id);
  res.status(200).json({ token });
});
