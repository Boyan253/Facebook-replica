const Post = require('../models/Post');
const router = require('express').Router()
const User = require('../models/User');
const { updatePost, deletePost, likePost, dislikePost } = require('../services/post')
const userService = require('../services/user')
const Chat = require('../models/Chat');
const mongoose = require('mongoose')
const multer = require('multer');
const { followUser, unfollowUser } = require('../services/user');
// const GridFsStorage = require('multer-gridfs-storage');
// const storage = new GridFsStorage({
//     url: 'mongodb://127.0.0.1:27017/theFuture',
//     options: { useNewUrlParser: true, useUnifiedTopology: true },
//     file: (req, file) => {
//         return {
//             filename: file.originalname,
//         };
//     },
// });


// const upload = multer({ storage });

//Create
router.post('/posts', async (req, res) => {

    const { location, description, image, owner, ownerName, title, tags, ownerProfilePicture } = req.body;
    let data
    let imageUrl
    console.log(typeof image);
    if (typeof image !== "object") {

        imageUrl = `data:image/png;base64,${image}`
        data = { location, imageUrl, description, owner, ownerName, title, tags, ownerProfilePicture };//polzvai id vmesto username

    } else {
        imageUrl = `https://images.squarespace-cdn.com/content/v1/584fb58a725e254d6b0830a3/1580511138056-M3RVKI1B97QKRX48SKJT/PWB+LOGO+-+TM_White-01.png`

        data = { location, imageUrl, description, owner, ownerName, title, tags, ownerProfilePicture };//polzvai id vmesto username
    }

    try {
        const createdUser = await Post.create({ ...data })
        const post = { ...data, _id: createdUser._id, createdAt: createdUser.createdAt, updatedAt: createdUser.updatedAt, likes: createdUser.likes };

        res.status(200).json({ post });
    } catch (error) {
        console.log(error);
    }

});

//Edit
router.put('/posts/:postId', async (req, res) => {

    const token = req.headers.authorization;
    console.log(token);
    if (token == undefined) {
        return res.status(401).json('no Auth')
    }
    const { location, description, image, owner, ownerName, title, tags } = req.body;
    let imageUrl
    let data
    if (typeof image !== "object" && image !== undefined) {

        imageUrl = `data:image/png;base64,${image}`
        data = { location, imageUrl, description, title, tags };//polzvai id vmesto username

    } else {

        data = { location, imageUrl, description, title, tags };//polzvai id vmesto username
    }
    const id = req.params.postId

    try {
        const editResponse = await updatePost(id, data)
        res.json({ editResponse })

    } catch (err) {
        console.log(err);
    }
});

//Home
router.get("/posts", async (req, res) => {

    try {

        let posts = await Post.find({}).sort({ createdAt: 'desc' })

        res.status(200).json({ posts });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(200).json({ posts: [], count: 0 });
        }

    }
})


//Details
router.get('/posts/:id', async (req, res) => {

    try {
        //last Time i was trying to do details and connect it with the front end 
        const { id } = req.params
        const singularPost = await Post.findById(id)
        res.json({ singularPost })


    }

    catch (err) {
        res.render('404', { title: "404" })
    }

})

// Get Friends
router.get('/friends/:userId', async (req, res) => {

    const userId = req.params.userId
    try {

        const user = await User.findById(userId)
        const friends = await Promise.all(
            user.friends.map(friendId => {
                return User.findById(friendId)
            })
        )
        let friendList = []

        friends.map(friend => {
            const { _id, profilePicture, username, email } = friend;
            friendList.push({ _id, profilePicture, username, email })
        })
        res.json(friendList)
    } catch (error) {
        res.status(500).json(error)
    }

})

//Follow

router.put('/follow/:userId', async (req, res) => {

    const userToFollow = req.params.userId
    const { userId } = req.body
    const user = await followUser(userToFollow, userId)

    res.json({ friends: user.friends })

})

//Unfollow

router.put('/unfollow/:userId', async (req, res) => {

    const userToFollow = req.params.userId
    const { userId } = req.body
    const user = await unfollowUser(userToFollow, userId)
    console.log(user);
    res.json({ friends: user.friends })

})



//Like
router.post('/like/:postId', async (req, res) => {

    const { userId } = req.body
    const post = req.params.postId
    try {
        const like = await likePost(post, userId)
        res.json({ like })
    } catch (err) {
        console.log(err);
    }

    console.log('deleting is here by details');

})

//Dislike 
router.post('/dislike/:postId', async (req, res) => {
    const { userId } = req.body;
    const postId = req.params.postId;
    try {
        const dislike = await dislikePost(postId, userId);
        res.json({ dislike });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Could not dislike post' });
    }
});



//Delete

router.get('/delete/:postId', async (req, res) => {

    const post = req.params.postId
    try {
        const deletedPost = await deletePost(post)
        res.json({ deletedPost })
    } catch (err) {
        console.log(err);
    }

})

//Profile
router.get('/profile/:userId', async (req, res) => {

    const id = req.params.userId
    const token = req.headers.authorization;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log('Profile does not exist!');

        return res.status(400).json({ error: 'Invalid profile' });

    }
    if (token == undefined) {
        console.log('Missing Auth');
        return res.status(401)
    }

    try {
        const currentUser = await User.findById(id)
        const userPost = await Post.find({ owner: currentUser._id })
        res.json(userPost)
    } catch (error) {
        res.status(404)
    }

})

//Edit Profile
router.put('/profile/:userId', async (req, res) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = req.params.userId;
    const { image, backgroundImage, fullName, email, city, country, relationship } = req.body;
    // construct the updated data object
    const updatedData = {};

    if (typeof image !== "object" && image !== undefined) {
        if (image) updatedData.image = `data:image/png;base64,${image}`;
    }
    if (typeof backgroundImage !== "object" && backgroundImage !== undefined) {
        if (backgroundImage) updatedData.backgroundImage = `data:image/png;base64,${backgroundImage}`;
    }

    if (email) updatedData.email = email;
    if (city) updatedData.city = city;
    if (country) updatedData.country = country;
    if (fullName) updatedData.username = fullName;
    if (fullName) updatedData.relationship = relationship;

    try {
        const updatedUser = await userService.editProfile(userId, updatedData);

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Posts getComments  
router.get('/posts/:postId/comments', async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.postId }).sort()
        if (!post || !post.comments) {
            res.json([]);
        } else {
            console.log(post.comments);

            res.json(post.comments);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


//Posts postComments  
router.post('/posts/:postId/comments', async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.postId });
        if (!post) {
            return res.status(404).send('Post not found');
        }
        console.log(req.body);
        const comment = {
            username: req.body.username,
            text: Array.isArray(req.body.text) ? req.body.text[0] : req.body.text,
            profilePicture: req.body.profilePicture
        };
        post.comments.push(comment);
        await post.save();
        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


router.get('/', async (req, res) => {
    const userId = req.query.userId
    const username = req.query.username
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid profile' });

        }
        else if (!await User.findById(req.params.id)) {
            return res.status(400).json({ error: 'Invalid profile' });

        }
        const user = userId
            ? await User.findById(req.params.id)
            : await User.findOne({ username: username })


        const reworkedUser = { id: user._id.toString(), email: user.email, username: user.username, profilePicture: user.profilePicture, backgroundImage: user.backgroundImage, city: user.city, country: user.country, relationship: user.relationship }

        res.json({ reworkedUser })

    } catch (error) {
        console.log(error);
    }

})
//get User
router.get('/users/:userId', async (req, res) => {

    const id = req.params.userId
    const token = req.headers.authorization;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid profile' });

    } else if (!await User.findById(req.params.userId)) {
        return res.status(400).json({ error: 'Invalid profile' });

    }
    if (token == 'undefined') {
        return res.status(401).json({ message: 'Missing authorization token' });
    }
    const currentUser = await User.findById(req.params.userId)

    const reworkedUser = {
        id: currentUser._id.toString(), email: currentUser.email, username: currentUser.username, profilePicture: currentUser.profilePicture, friends: currentUser.friends, backgroundImage: currentUser.backgroundImage, city: currentUser.city, country: currentUser.country, relationship: currentUser.relationship
    }
    console.log(reworkedUser);

    res.json({ reworkedUser })

})
//Guard
router.get('/protected', (req, res) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Missing authorization token' });
    }

    const secretKey = 'your_secret_key';

    try {
        const payload = jwt.verify(token, secretKey);
        res.json({ message: 'Protected resource' });
    } catch (err) {
        res.status(401).json({ message: 'Invalid authorization token' });
    }

});






//мултер не работи сега 
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/images')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })
// const upload = multer({ storage })

// router.post('/profile/upload', upload.single("file"), (req, res) => {
//     try {

//         return res.status(200).json('file uploaded succesfully')

//     } catch (error) {

//         console.log(error);

//     }
// })
//ChatPage Comments
router.post('/comments', async (req, res) => {

    try {
        const { author, text } = req.body;
        const newComment = new Chat({ author, text });
        const savedComment = await newComment.save();
        res.json(savedComment);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding comment');
    }

});


module.exports = router