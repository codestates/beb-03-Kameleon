import express, { Router } from "express";
import {
  register,
  getUser,
  login,
  logout,
  verifyEmail,
  sendVerifyEmail,
  getLoadMyInfo,
  withdrawal,
} from "../../controller/User.controller";
import {} from "../../middleware";
const router = Router();

// router.post('/register', uploadImage.single("image"), register);
// router.get('/getUser', loginRequired, getUser);
// router.get('/withdrawal', loginRequired, withdrawal);
// router.post('/login', login);
// router.post('/logout', loginRequired, logout);
// router.post('/sendVerifyEmail', loginRequired, isNotEmailVerified, sendVerifyEmail);
// router.get('/verify-email', verifyEmail);
// router.get('/loadMyInfo', loginRequired, getLoadMyInfo);

export default router;
