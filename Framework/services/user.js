const User = require("../models/User")

const { compare, hash } = require('bcrypt')


//TODO add all fields required by the exam
async function register(username, email, password) {

    const existing = await getUserByEmail(email)
    if (existing) {
        throw new Error('Username is taken')
    }
    const hashedPassword = await hash(password, 10)
    const user = new User({
        username,
        email,
        hashedPassword,
    });
    await user.save();
    return user;
}
//TODO change identifier
async function login(email, password) {
    const user = await getUserByEmail(email)
    if (!user) {
        throw new Error('Incorrect Email or Password')
    }
    const hashMatch = await compare(password, user.hashedPassword)

    if (!hashMatch) {
        throw new Error('Incorrect Email or Password')
        

    }
    console.log(user);
    return user

}


//TODO idenfity user by given identifier(email or username or whatever)

async function getUserByEmail(email) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') })
    return user
}


async function followUser(userToFollow, userId) {

    const user = await User.findById(userId)
    if (user.friends.includes(userToFollow)) {
        const err = new Error('Already Followed User')
        console.log(err);
        return user
    } else {
        user.friends.push(userToFollow)
        await user.save()

    }
    return user

}


async function unfollowUser(userToUnfollow, userId) {
    const user = await User.findById(userId);
    console.log(userId);
    if (!user.friends.includes(userToUnfollow)) {
        const err = new Error('User not found in friends list');
        console.log(err);
        return err;
    } else {
        if (user.friends.includes(userToUnfollow)) {
            await user.updateOne({ $pull: { friends: userToUnfollow } });
            await user.save()
        }
    }
}




module.exports = {
    login,
    register,
    followUser,
    unfollowUser
}