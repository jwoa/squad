import mongoose from 'mongoose';

const tasksSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true
});

const projectSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    tasks: [tasksSchema],
    numTasks: {
        type: Number,
        required: true,
        default: 0
    },
    budget: {
        type: Number,
        required: false,
        default: 0
    }
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

export default Project