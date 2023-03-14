const jwt  = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {Users} = require('../models');

const userSignin = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await Users.findOne({ where:{ email: email }});
        if(!user) return res.status(400).json({ message: "User not Registered"});
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(400).json({ message: "Password not matched"});  
        const token = jwt.sign({ email, id: user.id}, process.env.JWT, { expiresIn: '5hr'});
        return res.status(200).json({ message: "success", data: user, token});
        
    }catch(error){
        return res.status(500).json(error);
    }
}

const signUp = async (req, res) => {
    const { email, password, confirmPassword, mobile, fullname } = req.body;
    
        if(password !== confirmPassword) return res.status(400).json({ message: "Password not matched"}); 
        const user = await Users.findOne({ where:{ email: email }});
        if(user) return res.status(400).json({ message: "User Already Registered"});
        const hashPassword = await bcrypt.hash(password, 12);
        const updatedUser = await Users.create({ email: email, password: hashPassword, fullname: fullname, mobile: mobile });
        const token = jwt.sign({ email, id: updatedUser.id }, process.env.JWT, { expiresIn: '5hr'});
        return res.status(201).json({ message: "success", data: updatedUser, token});
    
}

module.exports = { userSignin, signUp }