import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: false,
        unique: true
    },
    bio: {
        type: String,
        required: false,
        default: 'Squad member'
    },
    avatar: {
        type: String,
        required: false,
        default: 'https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg'
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

userSchema.methods.matchPassword = async function(enteredPassword) {
 return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema);

export default User