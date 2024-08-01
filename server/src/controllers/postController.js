import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    uploadOnCloudinary,
    deleteFromCloudinary,
} from "../utils/cloudinary.js";

const getAllPosts = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 10,
        query = "",
        sortBy = "createdAt",
        sortType = "desc",
        username,
    } = req.query;

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: { [sortBy]: sortType === "asc" ? 1 : -1 },
    };

    const matchedConditions = {
        isPublished: true,
    };

    if (query) {
        matchedConditions.$or = [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { tags: { $in: [new RegExp(query, "i")] } },
        ];
    }

    if (username) {
        const user = await User.findOne({ username });
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        matchedConditions.user = user._id;
    }

    try {
        const aggregationPipeline = [
            { $match: matchedConditions },
            { $sort: options.sort },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $unwind: "$user" },
            {
                $project: {
                    title: 1,
                    description: 1,
                    tags: 1,
                    notes: 1,
                    views: 1,
                    createdAt: 1,
                    "user.username": 1,
                    "user.avatar": 1,
                },
            },
        ];

        const result = await Post.aggregatePaginate(
            Post.aggregate(aggregationPipeline),
            options
        );

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    result,
                    "List of posts fetched successfully"
                )
            );
    } catch (error) {
        throw new ApiError(500, `Internal Server Error: ${error.message}`);
    }
});

const createPost = asyncHandler(async (req, res) => {
    const { title, description, tags } = req.body;
    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }

    const notesFiles = req.files;
    const notes = [];

    console.log(req.files);
    console.log(req.body);

    try {
        if (notesFiles && notesFiles.length > 0) {
            for (const file of notesFiles) {
                const fileType = file.mimetype.startsWith("application/pdf")
                    ? "pdf"
                    : "image";
                const uploadedFile = await uploadOnCloudinary(
                    file.path,
                    fileType
                );
                if (uploadedFile) {
                    notes.push({
                        type: fileType,
                        url: uploadedFile.url,
                    });
                }
            }
        }

        const post = await Post.create({
            title,
            description,
            tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
            notes,
            user: req.user._id,
        });

        return res
            .status(201)
            .json(new ApiResponse(201, post, "Post created successfully"));
    } catch (error) {
        // Clean up any uploaded files if there's an error
        for (const note of notes) {
            await deleteFromCloudinary(note.url);
        }
        throw new ApiError(500, `Internal Server Error: ${error.message}`);
    }
});

const getPostById = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if (!postId) {
        throw new ApiError(400, "Post ID is required");
    }

    const post = await Post.findById(postId)
        .populate("user", "username email avatar passoutYear college program")
        .lean();

    if (!post || !post.isPublished) {
        throw new ApiError(404, "Post not found or is not published");
    }

    await Post.findByIdAndUpdate(postId, { $inc: { views: 1 } });

    return res
        .status(200)
        .json(new ApiResponse(200, post, "Post fetched successfully"));
});

const updatePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { title, description, tags } = req.body;

    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }

    const post = await Post.findById(postId);
    if (!post) throw new ApiError(404, "Post not found");
    if (req.user._id.toString() !== post.user.toString()) {
        throw new ApiError(
            401,
            "Unauthorized: Post does not belong to the user"
        );
    }

    const updateFields = {
        title,
        description,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : post.tags,
    };

    const notesFiles = req.files?.notes;
    if (notesFiles && notesFiles.length > 0) {
        const newNotes = [];
        for (const file of notesFiles) {
            const fileType = file.mimetype.startsWith("application/pdf")
                ? "pdf"
                : "image";
            const uploadedFile = await uploadOnCloudinary(file.path, fileType);
            if (uploadedFile) {
                newNotes.push({
                    type: fileType,
                    url: uploadedFile.url,
                });
            }
        }
        updateFields.notes = [...post.notes, ...newNotes];
    }

    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $set: updateFields },
        { new: true }
    );

    if (!updatedPost) {
        throw new ApiError(404, "Post not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedPost, "Post updated successfully"));
});

const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) throw new ApiError(404, "Post not found");

    if (req.user._id.toString() !== post.user.toString()) {
        throw new ApiError(
            401,
            "Unauthorized: Post does not belong to the user"
        );
    }

    // Delete associated notes from Cloudinary
    for (const note of post.notes) {
        await deleteFromCloudinary(note.url);
    }

    await Post.findByIdAndDelete(postId);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Post deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if (!postId) throw new ApiError(400, "Post ID is required");

    const post = await Post.findById(postId);
    if (!post) throw new ApiError(404, "Post not found");

    if (req.user._id.toString() !== post.user.toString()) {
        throw new ApiError(
            401,
            "Unauthorized: Post does not belong to the user"
        );
    }

    post.isPublished = !post.isPublished;
    await post.save({ validateBeforeSave: false });

    const responseMessage = post.isPublished
        ? "Post Published"
        : "Post Unpublished";
    return res.status(200).json(new ApiResponse(200, {}, responseMessage));
});

export {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
    togglePublishStatus,
};
