import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, fileType) => {
    try {
        if (!localFilePath) return null;

        let uploadOptions = {
            resource_type: "auto",
        };

        if (fileType === "pdf") {
            uploadOptions.resource_type = "raw";
        }

        // Upload on Cloudinary
        const response = await cloudinary.uploader.upload(
            localFilePath,
            uploadOptions
        );

        console.log("File is uploaded on Cloudinary:", response.url);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        throw new Error(`Failed to upload file: ${error.message}`);
    }
};

const deleteFromCloudinary = async (fileLink) => {
    try {
        if (!fileLink) return null;

        // Extract public ID using URL parsing
        const url = new URL(fileLink);
        const pathSegments = url.pathname.split("/");
        const filename = pathSegments[pathSegments.length - 1];
        const publicId = filename.split(".")[0];

        // Determine resource type
        let resourceType = "image";
        if (fileLink.includes("/raw/upload/")) {
            resourceType = "raw";
        } else if (fileLink.includes("/video/")) {
            resourceType = "video";
        }

        // Delete from Cloudinary
        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
        });
        console.log(`${publicId} is deleted from Cloudinary (${resourceType})`);
        return response;
    } catch (error) {
        throw new Error(`Failed to delete file: ${error}`);
    }
};

export { uploadOnCloudinary, deleteFromCloudinary };
