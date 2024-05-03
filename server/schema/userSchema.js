import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    typingspeed: {
        type: Number,
    },
    highestspeed:{
        type: Number,
    },
    averageSpeed:{
        type: Number,
    },
    accuracy:{
        type: Number,
    },
    totalTests:{
        type: Number,
    },
    totalTime:{
        type: Number,
    },
});
const UserSchema = mongoose.model('UserData', userSchema);

export default UserSchema;