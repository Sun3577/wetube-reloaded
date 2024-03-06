import express from "express";
import {
  getEdit,
  postEdit,
  remove,
  see,
  logout,
  startGithubLogin,
  finishGithubLogin,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import multer from "multer";
import { get } from "mongoose";
import {
  protectingMiddleware,
  publicOnlyMiddleware,
  avatarUpload,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectingMiddleware, logout);
userRouter
  .route("/edit")
  .all(protectingMiddleware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(protectingMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/remove", remove);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/:id", see);

export default userRouter;
