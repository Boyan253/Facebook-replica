const { Schema, model, Types: { ObjectId } } = require('mongoose')

//TODO change user model according to the exam description
//TODO add validation

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,

    },
    backgroundImage: {
        type: String,
        default: 'https://marketplace.canva.com/EAEmB3DmXk0/1/0/1600w/canva-bright-gradient-lettering-rainbow-facebook-cover-0Z5QgybLshE.jpg'
    },
    profilePicture: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8SiTWYOrsL_Ea5ILRPJlK9bLlBUFgxvyu1TFL4F2JBQ&s'
    },

    hashedPassword: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        default: '(Not Chosen)'
    },

    country: {
        type: String,
        default: '(Not Chosen)'
    },

    relationship: {
        type: String,
        default: '(Not Chosen)'
    },


    friends: {
        type: [ObjectId],
        ref: 'User',
        default: []
    }

},
    { timestamps: true }
)


userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
})
const User = model('User', userSchema)

module.exports = User