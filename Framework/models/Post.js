const { Schema, model, Types: { ObjectId } } = require('mongoose');
const EMAIL_MATCH = `match: [/^[A-Za-z0-9_\.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/, 'Email is not valid!']`
const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,

        },
        imageUrl: {
            type: String,
            // required: true,

        },
        likes: {
            type: [ObjectId],
            default: []
        },
        tags: {
            type: String,
            required: true
        },
        owner: {
            type: ObjectId,
            ref: "User",
            required: true
        },
        ownerName: {
            type: String,
            required: true
        },
        comments: { type: [], default: [] },


    },
    { timestamps: true }
);

const Post = model('Post', postSchema);
module.exports = Post
