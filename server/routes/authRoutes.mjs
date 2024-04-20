import express from "express";
import {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} from "../controllers/authController.mjs";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.patch("/updatePassword", protect, updatePassword);

// ALL THE BELOW ROUTES NEEDS ADMIN AUTHORIZATION
// router.use(protect, restrictTo("admin"));

// router
//   .route("/")
//   .get(getAllUsers)
//   .post(createUser);

// router
//   .route("/:id")
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser);

export default router;
