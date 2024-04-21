import User from "../models/User.mjs";

export async function getAllProfiles(req, res) {
  if (!req.user) {
    return res.status(401).json({
      error: "Unauthorized: User not found",
    });
  } else if (req.user.role !== "admin") {
    return res.status(401).json({
      error: "Unauthorized: User not authorized",
    });
  }
  try {
    let users = await User.find();
    res.status(200).json({
      message: "get all profiles",
      data: users,
    });
  } catch (error) {
    console.error(`Error getting profiles: ${error}`);
    res.status(500).json({
      error: "Error getting all profiles",
    });
  }
}
export async function getProfile(req, res) {
  if (!req.user) {
    return res.status(401).json({
      error: "Unauthorized: User not found",
    });
  }
  try {
    let userId = req.user._id;
    let currentUser = await User.findOne(userId);
    res.status(200).json({
      message: "get profile for current user",
      data: currentUser,
    });
  } catch (error) {
    console.error(`Error getting profile: ${error}`);
  }
}

export async function updateProfile(req, res) {
  if (!req.user) {
    return res.status(401).json({
      error: "Unauthorized: User not found",
    });
  }
  try {
    await User.findByIdAndUpdate(req.user._id, req.body);
    res.status(200).json({
      message: "update profile for current user",
      data: await User.findById(req.user._id),
    });
  } catch (error) {
    console.error(`Error updating profile: ${error}`);
    res.status(500).json({
      error: "Error updating profile",
    });
  }
}

export async function updatePassword(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      error: "Unauthorized: User not found",
    });
  }
  try {
    const { currentPassword, password, passwordConfirm } = req.body;
    const user = await User.findById(req.user._id).select("+password");
    if (!user || !(await user.correctPassword(currentPassword))) {
      res.status(401).json({
        error: "Incorrect current password",
      });
    }
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    await user.save();
    res.status(200).json({
      message: "update password for current user",
    });
  } catch (error) {
    console.error(`Error updating password: ${error}`);
    res.status(500).json({
      error: "Error updating password",
    });
  }
}
