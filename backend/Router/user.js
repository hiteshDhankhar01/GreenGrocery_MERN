const express = require("express")
const { updateUser, deleteUser, userDetails } = require("../controller/userController")

const router = express.Router()

router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)
router.get('/:id', userDetails)

module.exports = router