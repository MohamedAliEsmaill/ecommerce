import express from "express";
import { signup, signin } from "../controllers/authController.mjs";
import { verifyToken } from "../middleware/authJWT.mjs";

const router = express.Router();

router.post("/api/register", signup, (req, res) => {});
router.post("/api/login", signin, (req, res) => {});
router.get("/api/Authorization", verifyToken, function (req, res) {
  const user = req.user;
  if (!user) {
    res.status(403).send({
      message: "Invalid JWT token",
    });
  }
  if (req.user.isAdmin) {
    res.status(200).send({
      message: "Congratulations! but there is no hidden content",
    });
  } else {
    res.status(403).send({
      message: "Unauthorized access",
    });
  }
});

export default router;
