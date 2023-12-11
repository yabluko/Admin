const User = require('../models/User');
const Note = require('../models/Note');
const bcrypt = require('bcrypt');


const getAllUsers = async (req, res) => {
    try{
        const user = await User.find().select('-password').lean();
        
        if(!user?.length){
            return res.status(400).json({message : 'No users found '});
        }
        res.json(user);
    }catch(err){
        throw new Error(`Here is ${err}`);
    }
}


const createUser = async (req, res) => {
    try{
        const {username , password , roles} = req.body;
        if(!username || !password || !Array.isArray(roles) || !roles.length){
            return res.status(400).json({message : `All fields are required`});
        }

        const duplicate = await User.findOne({username}).lean().exec();

        if (duplicate){
            return res.status(409).json({message : `Username already in used`});
        }

        const passwordHash = await bcrypt.hash(password , 10);

        const user = await User.create({username, "password" : passwordHash, roles});

        if(user){
            res.status(201).json({message : 'User was successfully created'});
        }else{
            res.status(400).json({message : 'Invalid user data recieved'});
        }

    }
    catch(err){
        return res.status(400).json({message : 'Invalid user data recieved'});
    }
}


const updateUser = async(req, res) => {
    try{
        const {id , username, password,roles, active} = req.body;
        if(!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean'){
            return res.status(400).json({message : 'All fields are required'});
        }

        const user = await User.findById(id).exec();

        if(!user){
            return res.status(404).json({message : `User not found`})
        }
        
        const duplicate = await User.findOne({username}).lean().exec();

        if(duplicate && duplicate?._id.toString() !== id){
            return res.status(409).json({message : `Duplicate username`});
        }

        user.username = username;
        user.roles = roles;
        user.active = active;

        if(password){
            user.password = await bcrypt.hash(password, 10);
        }
        const updatedUser = await user.save();

        res.json({message : `${updatedUser.username} updated`});
    }catch(err){
        throw new Error(`Here is ${err}`);
    }
}


const deleteUser = async(req, res) => {
    try{
        const { id } = req.body;
        if(!id){
            return res.status(400).json({message : "User ID is required"});
        }

        const notes = await Note.findOne({user : id}).lean().exec();
        if(notes){
            return res.status(400).json({message : "User has assigned to note"});
        }

        const user = await User.findById(id).exec();

        if(!user){
            return res.status(400).json({message : "User wasn't be found"});
        }

        const result = await user.deleteOne();
        const reply =  `Username ${user.username} with ${user._id} deleted`;

        res.json({message : reply});

    }catch(error){
        throw new Error(`Here is ${error}`);
    }
}

module.exports = { getAllUsers, createUser,  updateUser, deleteUser};

