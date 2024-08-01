import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import config from "../config.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const { googleClientID, googleClientSecret } = config;

export const googleAuth = async (req, res) => {
    const { code } = req.body;

    try {
        const { data } = await axios.post(
            `https://oauth2.googleapis.com/token`,
            {
                code,
                client_id: googleClientID,
                client_secret: googleClientSecret,
                redirect_uri: "postmessage",
                grant_type: "authorization_code",
            }
        );

        const { id_token, access_token } = data;

        const response = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${id_token}`,
                },
            }
        );

        const { email, name, picture } = response.data;

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ email, username: name, avatar: picture });
            await user.save();
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save();

        const options = {
            httpOnly: true,
            secure: true,
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    },
                    "User logged in successfully"
                )
            );
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};

export const logoutUser = asyncHandler(async (req, res) => {
    // Finding the user by decoding received bearer token from the auth middleware
    // Updating the refresh token
    // Sending response

    await User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined,
        },
    });

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
});
