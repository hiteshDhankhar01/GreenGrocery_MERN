const mongoose = require("mongoose");

const UserScema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", UserScema);

module.exports = User;


// const mongoose = require("mongoose");

// const UserScema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true, // Change "require" to "required"
//     },
//     email: {
//         type: String,
//         required: true, // Change "require" to "required"
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true, // Change "require" to "required"
//     },
//     photo: {
//         type: String,
//         required: true, // Change "require" to "required"
//     }
// })

// const User = mongoose.model("User", UserScema); // Export the User model

// module.exports = User; // Export the User model




// const mongoose = require("mongoose");

// const UserScema = new mongoose.Schema({
//     name: {
//         type: String,
//         require: true,
//     },
//     email: {
//         type: String,
//         require: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         require: true,
//     },
//     photo: {
//         type: String,
//         require: true,
//     }
// })

// // module.export = mongoose.model("User", UserScema)
// module.exports = User;