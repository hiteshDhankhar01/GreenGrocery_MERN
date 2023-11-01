const User = require("../models/userScema");

const userDetails = async (req, res) => {
    try {
        let result = await User.findOne({ _id: req.params.id })

        res.status(200).json({ message: "User Found", result })
    } catch (error) {
        res.status(404).json({ message: "Internal Server Error" })
        console.log(error)
    }
}

const updateUser = async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User Update Successfully", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const deleteUser = async (req, res) => {
    try {
        const result = await User.findOneAndDelete({ _id: req.params.id });

        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User Delete Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { updateUser, deleteUser, userDetails }