const mongoose = require('mongoose');

const Note = mongoose.model('Note', {
    Ntitle: {
        type: String,
        required: true
    },

    Ncontent: {
        type: String,
        required: true
    },

    postDate: {
        type: String,
        required: true
    },

    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});


module.exports = Note