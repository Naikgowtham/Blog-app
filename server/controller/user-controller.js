import { response } from "express";
import User from "../model/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import token from "../model/token.js";

dotenv.config();

export const signupUser = async (req, res) => {
    try {
        // const salt = await bcrypt.gensalt();
        const hashedPassword= await bcrypt.hash(req.body.password , 10);


        const user = {
            username: req.body.username,
            name: req.body.name,
            password: hashedPassword
        };

        const newUser = new User(user);
        await newUser.save();

        return res.status(200).json({ msg: 'User signed up successfully' });
    } catch (error) {
        
        console.error('Error while signing up user:', error);
        return res.status(500).json({ msg: 'Error while signing up user' });
    }
};

export const loginUser = async(req , res ) => {
    let user = await User.findOne({username: req.body.username});
    if(!user){
        return res.status(400).json({msg:'Username doesnt exists'})
    }

    try {
        let match =   await bcrypt.compare(req.body.password, user.password)
        if (match) {
            const accessToken = jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY ,{expiresIn:'15m'});
            const refreshToken = jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);

            const newToken= new token({token:refreshToken})
            await newToken.save();

            return res.status(200).json({accessToken:accessToken , refreshToken:refreshToken , name: user.name , username:user.username})
        } else {
            return response.status(400).json({msg: 'Password does not match'});
        }
    } catch (error) {
        return res.status(500).json({msg: 'Error while login in user'})
    }
}