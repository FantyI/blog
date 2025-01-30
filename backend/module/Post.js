import mongoose from 'mongoose'

const PostCreate = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    tag: {
        type: Array,
        default: [],
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'userModel',
        required: true,
    },
    imageUrl: String,
},{
    timestamps: true,
})

export default mongoose.model('PostModel', PostCreate);