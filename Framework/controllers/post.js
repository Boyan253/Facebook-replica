const Post = require('../models/Post');
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/User');
const { updatePost, deletePost, likePost } = require('../services/post')
const Chat = require('../models/Chat');
const multer = require('multer');
const { isAuthenticated } = require('../middleware/jwt');
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

router.post('/posts', async (req, res) => {
    const { location, description, image, owner, ownerName, title, tags } = req.body;
    let data
    let imageUrl
    console.log(typeof image);
    if (typeof image !== "object") {

        imageUrl = `data:image/png;base64,${image}`
        data = { location, imageUrl, description, owner, ownerName, title, tags };//polzvai id vmesto username

    } else {
        imageUrl = `https://images.squarespace-cdn.com/content/v1/584fb58a725e254d6b0830a3/1580511138056-M3RVKI1B97QKRX48SKJT/PWB+LOGO+-+TM_White-01.png`

        data = { location, imageUrl, description, owner, ownerName, title, tags };//polzvai id vmesto username
    }

    try {
        const createdUser = await Post.create({ ...data });
        const post = { ...data, _id: createdUser._id, createdAt: createdUser.createdAt, updatedAt: createdUser.updatedAt };

        res.status(200).json({ post });
    } catch (error) {
        console.log(error);
    }
});

router.put('/posts/:postId', async (req, res) => {
    const token = req.headers.authorization;
    if (token == 'undefined') {
        return res.status(401).json({ message: 'Missing authorization token' });
    }
    const { location, description, image, owner, ownerName, title, tags } = req.body;
    let imageUrl
    let data
    console.log(image == undefined);
    if (typeof image !== "object" && image !== undefined) {

        imageUrl = `data:image/png;base64,${image}`
        data = { location, imageUrl, description, title, tags };//polzvai id vmesto username

    } else {
        imageUrl = `https://images.squarespace-cdn.com/content/v1/584fb58a725e254d6b0830a3/1580511138056-M3RVKI1B97QKRX48SKJT/PWB+LOGO+-+TM_White-01.png`

        data = { location, imageUrl, description, title, tags };//polzvai id vmesto username
    }
    const id = req.params.postId

    try {
        const result = await updatePost(id, data)
        res.json({ result })

    } catch (err) {
        console.log(err);
    }
});
router.get("/posts", async (req, res) => {

    try {

        let posts = await Post.find({})
            .lean();

        res.status(200).json({ posts });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(200).json({ posts: [], count: 0 });
        }

    }
})

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

router.post('/like/:postId', async (req, res) => {
    const { userId } = req.body
    console.log(req.body);
    const post = req.params.postId
    try {
        const like = await likePost(post, userId)
        res.json({ like })
    } catch (err) {
        console.log(err);
    }

    console.log('deleting is here by details');
})



router.get('/delete/:postId', async (req, res) => {
    const post = req.params.postId
    try {
        await deletePost(post)
    } catch (err) {
        console.log(err);
    }

})


router.get('/profile/:userId', async (req, res) => {
    const token = req.headers.authorization;
    if (token == 'undefined') {
        return res.status(401).json({ message: 'Missing authorization token' });
    }
    const currentUser = await User.findById(req.params.userId)
    const userPost = await Post.find({ owner: currentUser._id })
    res.json(userPost)

})

router.get('/', async (req, res) => {
    const userId = req.query.userId
    const username = req.query.username
    try {

        const user = userId
            ? await User.findById(req.params.id)
            : await User.findOne({ username: username })


        const reworkedUser = { id: user._id.toString(), email: user.email, username: user.username, profilePicture: user.profilePicture }

        res.json({ reworkedUser })

    } catch (error) {
        console.log(error);
    }






})
router.get('/users/:userId', async (req, res) => {
    const token = req.headers.authorization;
    console.log(token == 'undefined');
    if (token == 'undefined') {
        return res.status(401).json({ message: 'Missing authorization token' });
    }
    const currentUser = await User.findById(req.params.userId)



    const reworkedUser = { id: currentUser._id.toString(), email: currentUser.email, username: currentUser.username, profilePicture: currentUser.profilePicture }

    res.json({ reworkedUser })

})
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