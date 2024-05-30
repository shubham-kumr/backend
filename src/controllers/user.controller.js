import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
    //res.status(200).json({ message:"ok" });

    //get user details from frontend
    //validation - not empty
    // check if user already exists: username, email
    //check for images, check for avatar
    //upload them to cloudinary, avatar
    //create user object - create entry in db 
    // remove passwd and refresh token field from response
    //check for user creation
    //return response

    const {fullname, username, email, password} = req.body;
    console.log(email)

    // if(fullname === "") {
    //     throw new ApiError(400, "Fullname cannot be empty")
    // }

    if([fullname, username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }
    
    const existedUser = User.findOne({
        $or: [
            {username: username},
            {email: email}
        ]
    }).then((user) => {
        if(user) {
            throw new ApiError(400, "User already exists")
        }
    })

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverimage?.[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverimage: coverImage?.url || "",
        email,
        password,
        username: username.tolowerCase()
    })

    const createdUser = User.findById(user._id).select("-password -refreshToken")

    if(!createdUser) {
        throw new ApiError(500, "User not created")
    }

    return res.status(201).json(
        new ApiResponse(200, "User created successfully", {user: createdUser})
    )


});

export  {registerUser};