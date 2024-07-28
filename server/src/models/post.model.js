import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        notes: [
            {
                type: {
                    type: String,
                    enum: ["image", "pdf"],
                    required: true,
                },
                url: {
                    type: String, // Cloudinary URL
                    required: true,
                },
            },
        ],
        isPublished: {
            type: Boolean,
            default: true,
        },
        views: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

postSchema.plugin(mongooseAggregatePaginate);

export const Post = mongoose.model("Post", postSchema);
