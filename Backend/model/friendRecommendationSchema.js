const mongoose = require('mongoose');

const FriendRecommendationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recommendations: [{
        friend: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        mutualFriends: {
            type: Number,
            default: 0
        },
        commonInterests: {
            type: [String],
            default: []
        }
    }]
}, {
    timestamps: true
});

const FriendRecommendation = mongoose.model('FriendRecommendation', FriendRecommendationSchema);

module.exports = FriendRecommendation;