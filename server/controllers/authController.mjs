import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User.mjs";
import appError from "../utils/appError.mjs";
import catchAsync from "../utils/catchAsync.mjs";
import sendEmail from "../utils/email.mjs";

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: "success",
    token,
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const { fullName, email, username, password, passwordConfirm, phone } =
    req.body;
  if (password !== passwordConfirm) {
    return next(new appError("Passwords do not match", 400));
  }
  const newUser = await User.create({
    fullName,
    email,
    username,
    password,
    passwordConfirm,
    phone,
  });

  createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await user.correctPassword(password))) {
    return next(new appError("Incorrect username or password", 401));
  }

  createSendToken(user, 200, res);
});

export const logout = (req, res) => {
  res.status(200).json({ status: "success" });
};

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new appError("You are not logged in. Please log in to access.", 401)
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new appError("The user belonging to this token no longer exists.", 401)
    );
  }

  req.user = currentUser;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new appError("You do not have permission to perform this action.", 403)
      );
    }
    next();
  };
};

export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new appError("User not found with this email address.", 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `http://localhost:3000/api/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 minutes)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
      resetToken,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new appError("Error sending the email. Please try again later.", 500)
    );
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new appError("Token is invalid or has expired", 400));
  }

  // Update user's password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm; // Ensure passwordConfirm matches new password
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  createSendToken(user, 200, res); // Send new token after password reset
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, password, passwordConfirm } = req.body;
  const user = await User.findById(req.user._id).select("+password");

  if (!user || !(await user.correctPassword(currentPassword))) {
    return next(new appError("Incorrect current password", 401));
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  createSendToken(user, 200, res);
});

