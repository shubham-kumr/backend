import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, username, email, password } = req.body;

    // Check for required fields
    if (!fullname || !username || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] });
    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }

    // Upload images to Cloudinary
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverimage?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

    // Create user in the database
    const newUser = await User.create({
        fullname,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverimage: coverImage ? coverImage.url : ""
    });

    if (!newUser) {
        throw new ApiError(500, "User not created");
    }

    // Return response
    return res.status(201).json(new ApiResponse(201, "User created successfully", { user: newUser }));
});

export { registerUser };
