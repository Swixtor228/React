const db = require('../models');
const User = db.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, "SECRET_KEY_RANDOM", {expiresIn: '24h'});
}

exports.login = async (req, res) => { 
    const {login, password} = req.body;
    const user = await User.findOne({raw:true, where: {name:login}});
    if(!user) {
        return res.status(400).json({message:'user does not exist!'})
    }
    console.log(user);
    const validPassword = bcrypt.compareSync(password, user.password);
    if(!validPassword) {
        return res.status(400).json({message:'wrong password!'})
    }
    const token = generateAccessToken(user.id, user.roles)
    return res.json({token})
}

exports.registration = async (req, res) => { 
    const name = req.body.name;
    const candidate = await User.findOne({raw:true, where: {name:name}});
    if(candidate) {
        return res.send({message:'This user already exists!'})
    }
    const hashPassword = bcrypt.hashSync(req.body.password, 7);
    const user = {
        name: name,
        password: hashPassword,
        phone: +req.body.phone,
        email: req.body.email,
        roles: 'client'
    }
    User.create(user).then(()=>{
        res.send({message:'User created!'})
    }).catch(err=>console.log(err));    
}