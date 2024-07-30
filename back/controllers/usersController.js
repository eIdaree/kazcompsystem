const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const getAllUsers = asyncHandler(async (req,res) => {
    const users =await User.find().select('-password').lean()
    if(!users?.length){
        return res.status(400).json({message: 'No users found'})
    }
    res.json(users)
})

const createNewUser = asyncHandler(async (req, res) => {
    const { fname, lname, password, phone_number, email } = req.body;

    if (!fname || !lname || !phone_number || !email || !password ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPwd = await bcrypt.hash(password, 10);

        const userObject = { fname, lname, "password": hashedPwd, email, phone_number };

        const user = await User.create(userObject);

        if (user) {
            res.status(201).json({ message: `New user ${user.email} created` });
        } else {
            res.status(400).json({ message: 'Invalid user data received' });
        }
    } catch (err) {
        if (err.code === 11000) {
            if (err.keyValue.email) {
                return res.status(409).json({ message: 'Email already registered' });
            } else if (err.keyValue.phone_number) {
                return res.status(409).json({ message: 'Phone number already registered' });
            }
        }
        res.status(500).json({ message: 'An error occurred while creating the user', error: err.message });
    }
});


const updateUser = asyncHandler(async (req, res) => {
    const { id, roles, active, password, fname, lname, email, phone_number } = req.body;

    // Validate the required fields
    if (!id || !fname || !lname || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' });
    }

    // Find the user by ID
    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Check for duplicate phone number and email, excluding the current user's own records
    const phoneDuplicate = await User.findOne({ phone_number }).lean().exec();
    const emailDuplicate = await User.findOne({ email }).lean().exec();

    if (phoneDuplicate && phoneDuplicate._id.toString() !== id) {
        return res.status(409).json({ message: 'Phone number already registered' });
    }

    if (emailDuplicate && emailDuplicate._id.toString() !== id) {
        return res.status(409).json({ message: 'Email already registered' });
    }

    // Update the user's fields
    user.roles = roles;
    user.active = active;
    user.fname = fname;
    user.lname = lname;
    user.email = email; // Add email to the update
    user.phone_number = phone_number; // Add phone_number to the update

    // If a new password is provided, hash it before saving
    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }

    // Save the updated user information
    const updatedUser = await user.save();

    res.json({ message: `User ${updatedUser.email} updated successfully` });
});

const deleteUser = asyncHandler(async (req,res) => {
    const {id} = req.body

    if(!id){
        return res.status(400).json({message:'User ID Required'})
    }

   
    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({message:'User not found'})
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result.id} deleted`
    
    res.json(reply)

})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}