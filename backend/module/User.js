import mongoose from 'mongoose';

const userModel = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String, 
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    avatarUrl: String,
},
{
    timestamp: true,
})

export default mongoose.model('userModel', userModel);