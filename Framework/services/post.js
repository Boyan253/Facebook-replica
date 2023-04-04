const Post = require('../models/Post')


async function getTripsCount(userId) {
    return Post.find({ owner: userId }).lean()
}

async function updatePost(id, post) {

    const existing = await Post.findById(id)

    existing.title = post.title
    if (post.imageUrl) {

        existing.imageUrl = post.imageUrl

    }
    existing.tags = post.tags
    existing.description = post.description
    existing.location = post.location
    await existing.save()
    return existing
}

const dislikePost = async (postId, userId) => {
    try {
        const post = await Post.findById(postId);
        if (!post) throw new Error('Post not found');

        const index = post.likes.findIndex((like) => like.toString() === userId.toString());
        if (index === -1) throw new Error('Like not found');

        post.likes.splice(index, 1);
        await post.save();

        return post.likes;
    } catch (err) {
        throw new Error(`Could not dislike post: ${err.message}`);
    }
};



async function likePost(postId, userId) {
    const post = await Post.findById(postId)
    if (post.likes.includes(userId)) {
        const err = new Error('Already Liked Post')
        return err
    } else {
        post.likes.push(userId)
    }


    await post.save()
    return post.likes.length
}

async function deletePost(postId) {
    return Post.findByIdAndDelete(postId)
}


module.exports = { getTripsCount, updatePost, deletePost, likePost, dislikePost }