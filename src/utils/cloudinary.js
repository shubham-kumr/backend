import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (localFilePAth) => {
    try {
        if (!localFilePAth) return null;
        const response = await cloudinary.uploader.upload(localFilePAth, { resource_type: "auto" });

        console.log("File is uploaded successfully on cloudinary", response.url);
        return response
    } catch (error) {
        fs.unlinkSync(localFilePAth);
        return null;
    }
}

export {uploadOnCloudinary}
