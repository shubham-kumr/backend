import { Router } from "express";

import {
    loginUser,
    registerUser,
    logoutUser,
    refreshAccessToken, 
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    getUserChannelProfile, 
    getWatchHistory 
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(upload.fields([
    {
        name: 'avatar', maxCount: 1
    },
    {
        name: 'coverImages', maxCount: 3
    }
]), registerUser)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").put(verifyJWT, updateAccountDetails)

router.route("/avatar").patch(verifyJWT, upload.single('avatar'), updateAccountDetails)
router.route("/cover-images").patch(verifyJWT, upload.array("coverimage"), updateAccountDetails)

router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)

export default router;