import User from "../model/user.js";
import bcrypt from bcrypt;



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
        
        // Save the new user to the database
        await newUser.save();
        
        // Respond with a success message
        return res.status(200).json({ msg: 'User signed up successfully' });
    } catch (error) {
        // Log the actual error for debugging
        console.error('Error while signing up user:', error);
        
        // Respond with a 500 status and error message
        return res.status(500).json({ msg: 'Error while signing up user' });
    }
};
